<?php

   class UserInfo{

   	  private $Query, $UserId;
   	  public $userInfo = array();

   	  function __construct(){
   	  	

   	  	require_once('C:/xampp/htdocs/kampuscrush/api/framework/db/query.php');

   	  	$this->Query = new Query();
   	  	
   	  }
   	  public function init($id){

   	  	$this->UserId = $id;
   	  	 $this->user_info();
   	  	$this->user_img();
   	  }
      private function user_info(){

      	$this->userInfo = $this->Query->row("SELECT user_name, user_athandle,user_stunumber, user_email, user_date, user_id FROM users WHERE user_id = '$this->UserId' OR user_athandle = '$this->UserId'");

      }

      private function user_img(){

      	 if($this->Query->count("SELECT count(image_id) FROM profilepic WHERE user_id ='$this->UserId'") == 0){
      	 	$this->userInfo['img_url'] = "no url";
      	 }else{
      	 	$this->userInfo['img_url'] = $this->Query->row("SELECT image_link FROM profilepic WHERE user_id = '$this->UserId'")['image_link'];
      	 }
      }
   }

?>