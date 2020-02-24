<?php
session_start();

class Session{
	  public $log,$resp;
	  private $model;
	  public  $id, $username, $img_url;
	  private $Query;

	function __construct(){

     require_once('C:/xampp/htdocs/kampuscrush/api/framework/db/query.php');

     $this->Query = new Query();
     $this->check_session();
	}

	private function check_user($id){

		if($this->Query->count("SELECT count(user_id) FROM users WHERE user_id = '$id'") == 1){
			 return true;
		}else{
			return false;
		}

	}



	private function isMobileDevice($agee) {

    return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $agee);
  }

	public function log($ipAddress, $agent, $place){
		$device = "";
		if($this->isMobileDevice($agent)){

			$device = 'mobile';

		}else{

			$device = 'desktop';

		}

		$time = date('g:ia');
		$date = date('m/d/Y');

		$status = "";

		$status = $this->log == true ? "Online" : "Offline";

		if(!$this->Query->insert("INSERT INTO track VALUES('$ipAddress', '$date', '$time', '$place', '$device', '$status', NULL)")){
			 echo "error";
			 exit();
		}

	}

	private function check_session(){

		if(isset($_SESSION['id'])){

			 if($this->check_user($_SESSION['id'])){
			 	
			 	  $this->id = $_SESSION['id'];

			 	  $this->username = $this->Query->row("SELECT user_athandle FROM users WHERE user_id = '$this->id'")['user_athandle'];

			 	  $this->img_url = ($this->Query->count("SELECT count(image_id) FROM profilepic WHERE user_id = '$this->id'") == 0 ? "https://kampuscrush.com/default.png" : $this->Query->row("SELECT image_link FROM profilepic WHERE user_id = '$this->id'")['image_link']);

			    $this->log = true;

			 }else{

			 	$this->id = "0";
			  $this->log = false;
			  $this->img_url = 'https://kampuscrush.com/default.png';

			 }

		}else{

			$this->id = "0";
			$this->log = false;
			$this->img_url = 'https://kampuscrush.com/default.png';

		}

		$this->resp = array(
       "user_id" => $this->id,
       "handle" => $this->username,
       "img_url" => $this->img_url,
       "isLogged" => $this->log
		);

	}

 public function user(){

 	   if($this->log){

 	   	  require_once('C:/xampp/htdocs/kampuscrush/api/user/user.php');

 	      $User = new User(2, $this->id, $this->id);

 	      $this->model = $User->init();

 	   }else{

 	   	  $this->model = array();

 	   }

 	   return $this->model;

  } # End Of User 

}

//$s = new Session();


?>