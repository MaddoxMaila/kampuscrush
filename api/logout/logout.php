<?php
session_start();
 class LogOut
 {
 	function __construct()
 	{
 		$this->__destroy_cookies();
 	}
 	private function __destroy_cookies(){
 		if(isset($_COOKIE['id'])){
 			setcookie("user",'',strtotime('-30 days'),"/");
      setcookie("id",'',strtotime('-30 days'),"/");
      $this->__destroy_sessions();
 		}else{
 			echo json_encode(array("error" =>true,"logged_out" => false,"message" => "Couldn\'t Log You Out, Cookies"));
 		}
 	}
 	private function __destroy_sessions(){
 		$_SESSION=array();
 		session_destroy();
 		if(isset($_SESSION['user_id']) && isset($_SESSION['userid'])){
 			 echo json_encode(array("error" =>true,"logged_out" => false,"message" => "Couldn\'t Log You Out, Sessions"));
 	    }else{
 	     echo json_encode(array("error" =>false,"logged_out" => true,"redirect" =>true,"url" =>"../../instance/"));
 	    }
 		}
 }

  new LogOut();

?>