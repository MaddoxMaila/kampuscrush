<?php
session_start();

   class Login{
   	private $email,$password;
   	private $Query;
   	private $user;
    //Class Construct!!
   	function __construct($email, $password = ""){
   		 $this->email = $email;
   		 $this->password = md5($password);
   		 require_once('../framework/db/query.php');
   		 $this->Query = new Query();
   		 $this->login();
   	}
   	//Login Function
   	private function login(){
   		//Check If User Is A Registered User!
   		if($this->Query->count("SELECT count(user_id) FROM users WHERE user_email = '$this->email' AND user_password = '$this->password'") == 1){
   			//If Registered, Get User Info
   			  $this->user = $this->Query->row("SELECT * FROM users WHERE user_email = '$this->email' AND user_password = '$this->password'");
   			   //Check profile photo
   			  //Local Variables
   			  $image = '';
   			  $id = $this->user['user_id'];
   			  if($this->Query->count("SELECT count(image_id) FROM profilepic WHERE user_id='$id'")){
   			  	$image = $this->Query->row("SELECT image_link,image_id FROM profilepic WHERE user_id='$id'");
   			  }

              $_SESSION['id']=$this->user['user_id'];
              setcookie("id",$this->user['user_id'],strtotime('+30 days'),"/","","",TRUE);
   			  //Format The Data In Json Format
   			  echo json_encode(
   			  	   array(
   			  	   	     "login" => true,
                          "error" =>false,
   			  	   	     "message" => "User Logged In Successful!",
   			  	   	     "user_id" => $this->user['user_id'],
   			  	   	     "user_name" => $this->user['user_name'],
   			  	   	     "user_athandle" => $this->user['user_athandle'],
   			  	   	     "image_url" => $image['image_link'],
   			  	   	     "image_id" => $image['image_id'],
                          "redirect" => true,
                          "url" => "http://localhost/yazz/home/"
   			  	   	   )
   			  	 );

   		}else{
   			  echo json_encode(
   			  	array(
   			  		"login" => false,
   			  		"message" => "User Login Unsuccessful!, Check Password or Email",
                  "redirect" => false,
                  "error" => false
   			  )
   			);
   		}
   	}
   }


   if(isset($_POST['email']) && isset($_POST['password'])){
      new Login($_POST['email'], $_POST['password']);
   }


?>