<?php

   class Search{

   	 private $Query, $Context;
   	 private $searchTerm = "";
   	 private $execQuery = "";
   	 private $ExId, $Id;
   	 private $Response = array();

   	  function __construct($search, $id = ""){

   	  	 	  require_once('../framework/db/query.php');
   	  	 	  $this->Query = new Query();

   	  	 	    if($id == ""){

   	  	 	    	  require_once('../include/sessions.php');

   	  	 	    	  $session = new Session();

   	  	 	    	  $this->Id = $session->id;

   	  	 	    }else{

   	  	 	    	$this->Id = $id;

   	  	 	    }
   	  	 	  $this->searchTerm = $search;

   	  	 	    if(substr($this->searchTerm, 0, 1) == '@'){

   	  	 	    	 	  $this->searchTerm = substr($this->searchTerm, 1);
   	  	 	    	 	  $this->Context = 1;

   	  	 	    }else if(substr($this->searchTerm, 0, 1) == '#'){

   	  	 	    	    $this->searchTerm = substr($this->searchTerm, 1);
   	  	 	    	    $this->Context = 2;

   	  	 	    }else{

   	  	 	    	   $this->Context = 3;

   	  	 	    } # End Of If

   	  	 	    if($this->Context == 1 || $this->Context == 3){

   	  	 	    	  # For Searching Users

   	  	 	    	 # Check If There Are Users Whose Names Start With The Search Term
   	  	 	    	if($this->Query->count("SELECT count(user_id) FROM users WHERE user_athandle LIKE '$this->searchTerm%'") == 0){ 

   	  	 	    		   # No Users!

   	  	 	    		   echo json_encode(
   	  	 	    		   	  array(
   	  	 	    		   	  	'error' => false,
   	  	 	    		   	  	'found' => false,
   	  	 	    		   	  	'message' => 'No Results For '.$this->searchTerm,
                              'list' => []
   	  	 	    		   	  )
   	  	 	    		   );

   	  	 	    	}else{

   	  	 	    		   # There Are Users
   	  	 	    		$this->execQuery = $this->Query->rows("SELECT user_id FROM users WHERE user_athandle LIKE '$this->searchTerm%' LIMIT 8");

   	  	 	    		$this->searchUsers();
   	  	 	    	} # End Of If

   	  	 	    } # End Of If

   	  } # End Of Constructor

   	  private function searchUsers(){

   	  	 # Loop Through The Results Set
   	  	  require_once('../user/user.php');

   	  	  $this->Response['error'] = false;
           $this->Response['list'] = array();

   	  	while($row = $this->Query->assoc($this->execQuery)){

   	  		 $this->ExId = $row['user_id'];

   	  		 $user = new User(2, $this->ExId, $this->Id);

   	  		 $this->Response['list'][] = $user->init();
   	  	} # End Of While Loop

         $this->Response['found'] = empty($this->Response['list']) ? false : true;

   	  	echo json_encode($this->Response);

   	  } # End Of seach()

   } # End Of Class

   
   if(isset($_POST['query'])){

   	    new Search($_POST['query'], "");
   }

?>