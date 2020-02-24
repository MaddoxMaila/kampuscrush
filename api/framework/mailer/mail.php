<?php
    

    /**
     Class To Send Email Users Or To Reset Passwords IF They Forgotten 

     */
    class Email
    {
    	private $Connection;
    	private $MAIL_FROM = "",$MAIL_TO = "",$MAIL_SUBJECT = "",$MAIL_MESSAGE = "",$MAIL_HEADER = "";
    	private $EMAIL_ADDRESS = "";
    	private $USER_DETAILS = "";
    	//New Added Code
    	private $R_ID = "",$R_HASH_PASSWORD = "";
    	private $N_PASS = "",$N_REPASS = "";
    	//End Of New Added Code
    	function __construct($cxt,$mailAddress = "",$id = "",$hashedpass = "",$newPASS = "",$reNewPASS = ""){
    		  if(preg_match("/[0-9]/",$cxt)){
    		  	require_once("../../include/connect.php");
    		  	$this->Connection = $_CNX ->__CONX();
    		  	  if($cxt == 1){
    		  	  	//Sending The Reset Link Via Email
                    $this->EMAIL_ADDRESS = $mailAddress;
    		  	  	$this->__checkEMAIL();
    		  	  }/*More New Added Code */else if($cxt == 2){
    		  	  	$this->R_ID = $id;
    		  	  	$this->R_HASH_PASSWORD = $hashedpass;
    		  	  	   if($newPASS === $reNewPASS){
    		  	  	   	$this->N_PASS = $newPASS;
    		  	  	   	$this->N_REPASS = $reNewPASS;
    		  	  	   	$this->__getUSER();
    		  	  	   }else{
    		  	  	   	echo json_encode(array("error" => true, "message" => "Password And Re-Comfirmed Password Must Be The Same"));
    		  	  	   }
    		  	  }
    		  }else{
    		  	echo json_encode(array("error" => true, "message" => "Unable To Respond"));
    		  }
    	}

    	private function __query($sql,$err_id){

    		  $sqlQUERY = mysqli_query($this->Connection,$sql);
    		     if(!$sqlQUERY){
    		     	echo json_encode(array("error" => true, "message" => "Error".$err_id));
    		     	exit();
    		     }else{
    		     	return $sqlQUERY;
    		     }
    	}
    	//New Added Functions For Changing The Password
    	private function __getUSER(){
    		if(mysqli_fetch_row($this->__query("SELECT count(user_id) FROM users WHERE user_id = '$this->R_ID'",4))[0] == 1){
    			 //GEt USers Info
    			$this->USER_DETAILS = mysqli_fetch_assoc($this->__query("SELECT user_id,user_email,user_athandle,user_password FROM users WHERE user_id = '$this->R_ID'",5));
    			      //Type Comparing
    			    if($this->USER_DETAILS['user_password'] == $this->R_HASH_PASSWORD){
    			    	 //Since The Hashes Are Equal
    			    	//The Reset Link Wasn't Tempered With
    			    	$this->__resetPassWord();
    			    }else{
    			    	echo json_encode(array("error" => true, "message" => "Make Sure That The Link Is The Same As The Link Sent Via Email<br />".$this->USER_DETAILS['user_password']."==".$this->R_HASH_PASSWORD));
    			    }
    		}
    	}
    	private function __resetPassWord(){
    		 if(mysqli_affected_rows($this->__query("UPDATE users SET user_password = '$this->N_PASS', user_repassword = '$this->N_REPASS' WHERE user_id = '$this->R_ID'",6)) == 1){
    		 	 require_once('../../login/login.php');
    		 	 new Login($this->N_PASS,$this->USER_DETAILS['user_email'],33);
    		 }else{
    		 	 echo json_encode(array("error" => true, "message" => "Was Unable TO Reset Password"));
    		 	 exit();
    		 }
    	}
    	//End Of For Changing The PassWord
    	private function __MAIL_PARAMS(){


    		//Setting Paramaters Needed For Recovering Password!
    		ini_set( 'display_errors', 1 );
        error_reporting( E_ALL );
        $this->MAIL_FROM = 'teamkampus@kampuscrush.com';
        $this->MAIL_TO = $this->EMAIL_ADDRESS;
        $this->MAIL_SUBJECT = 'Reset Account Password';
    		$this->MAIL_MESSAGE = 'Click To Reset Password https://kampuscrush.com/reset?cxt=2&id='.$this->USER_DETAILS['user_id'].'&hash='.md5($this->USER_DETAILS['user_password']).'';
    		$this->MAIL_HEADER = 'From:'.$this->MAIL_FROM;
    		//$to,$subject,$message, $headers
    		    if(mail($this->MAIL_TO,$this->MAIL_SUBJECT,$this->MAIL_MESSAGE,$this->MAIL_HEADER)){
    		    	echo json_encode(array("error" => false, "message" => "Reset Email Link Sent To ".$this->USER_DETAILS['to']." Successfully"));
    		    }else{
    		    	echo json_encode(array("error" => true, "message" => "Reset Email Link Was Not Sent Successfully"));
    		    	exit();
    		    }
    	}
    	   //If Context Is Forgot Password
    	private function __checkEMAIL(){

    		//Check If Email Exists In The Database
    		 if(mysqli_fetch_row($this->__query("SELECT count(user_id) FROM users WHERE user_email = '$this->EMAIL_ADDRESS'",1))[0] == 1){
    		 	   $this->USER_DETAILS = mysqli_fetch_assoc($this->__query("SELECT user_id,user_athandle,user_password FROM users WHERE user_email = '$this->EMAIL_ADDRESS'",123));
    		 	   $this->__MAIL_PARAMS();
    		 }else{
    		 	//Email Does Not Exist
    		 	echo json_encode(array("error" => false, "message" => "Account With This $this->EMAIL_ADDRESS Email Address Does Not Exist, Check Spelling & Try Again"));
    		 }

    	}

    }

    //new Email(1,"maddoxmaila719@gmail.com");
    //$cxt,$mailAddress = "",$id = "",$hashedpass = "",$newPASS = "",$reNewPASS = ""
    //new Email(2,"snack@gmail",1,"90110a19bb45ef792bc9f30cecef2b44","maddd","maddd");

    if(isset($_POST['context'])){

        if($_POST['context'] == 1){

            new Email($_POST['context'], $_POST['email']);

        }else if($_POST['context'] == 2){

            new Email($_POST['context'], "", $_POST['id'], $_POST['hash'], $_POST['password'], $_POST['re_password']);

        }

    }
?>