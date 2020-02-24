<?php

   class Notifications{

   	 private $Query, $Context, $execQuery;
   	 private $Id, $ExId;
   	 private $Response = array();

   	   function __construct($context, $id = ""){

   	   	  if(preg_match("/[0-9]/", $context)){

   	   	  	  require_once('../framework/db/query.php');
   	   	  	  $this->Query = new Query();

   	   	  	    if($id == ""){

   	   	  	    	require_once('../include/sessions.php');
   	   	  	       $session = new Session();
   	   	  	       $this->Id = $session->id;

   	   	  	    }else{

   	   	  	    	$this->Id = $id;

   	   	  	    } # End Of If

   	   	  	    $this->Context = $context;

   	   	  	    if($this->Context == 1){

   	   	  	    	  $this->execQuery = $this->Query->rows("SELECT * FROM notif_holder WHERE owner_id = '$this->Id' ORDER BY notif_holder_id DESC");

   	   	  	    	  $this->showNotifications();
   	   	  	    } # End Of If

   	   	  } # End Of If

   	   } # End Of Constructor

   	   private function showNotifications(){

   	   	  if($this->Query->count("SELECT count(notif_holder_id) FROM notif_holder WHERE owner_id = '$this->Id'") > 0){ 

   	   	  	require_once('../user/user.php');
   	   	  	# User Has Notifications

   	   	  	$this->Response['error'] = false;
   	   	  	$this->Response['notifs'] = true;
               $count = "";

   	   	  	  while($row = $this->Query->assoc($this->execQuery)){

   	   	  	  	 $this->ExId = $row['user_id'];


   	   	  	  	 $user = new User(100, $this->ExId, $this->Id);
                   if($row['notif_type'] == 'like' || $row['notif_type'] == 'comment'){
                          $type = $row['notif_type'];
                          $post_id = $row['post_id'];

                          $count = $this->Query->count("SELECT count(n_counter_id) FROM notif_counter WHERE user_id = '$this->ExId' AND post_id = '$post_id' AND type = '$type'");

                     }else{

                          $count = 1;

                     } # End Of If 

   	   	  	  	 $this->Response['notifications'][] = array(

                      'info' => $user->init(),
                     'notif_holder' => $row,
                     'count' => $count
                   );

   	   	  	  	   

                  
   	   	  	  } # End Of While Loop
   	   	  
   	   	  }else{

   	   	  	# User Has No Notifications
   	   	  	 $this->Response['error'] = false;
   	   	  	 $this->Response['notifs'] = false;

   	   	  } # End Of If

   	   	  echo json_encode($this->Response);
   	   } # End Of showNotification()

   } # End Of Class


   if(isset($_GET['context'])){

   	  if($_GET['context'] == 1){

   	  	 new Notifications($_GET['context'], "");
   	  }
   }

?>