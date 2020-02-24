<?php

  class Bio{

  	private $Query;
  	private $Id;
  	private $name, $email, $bio, $res, $color, $course, $where, $cpass, $pass;
  	private $counter = 0;


  	function __construct($name="",$mail="",$bio="",$res="",$color="",$course="",$where="",$cpass="",$pass){

  		  require_once('../framework/db/query.php');

  		  $this->Query = new Query();

  		  require_once('../include/sessions.php');

  		  $session = new Session();

  		  $this->Id = $session->id;
  		  $this->pass = md5($pass);

  		  if($this->Query->count("SELECT count(user_id) FROM users WHERE user_id = '$this->Id' AND user_password = '$this->pass'") == 0){

  		  	echo json_encode(
  		  		array(

  		  			"error" => true,
  		  			"message" => "Passwords Does Not Match, Could Not Make Changes"
  		  		)
  		  	);

  		  } else{

  		  	$this->name = $name;
  		  	$this->email = $mail;
  		  	$this->bio = $bio;
  		  	$this->res = $res;
  		  	$this->color = $color;
  		  	$this->course = $course;
  		  	$this->where = $where;
  		  	$this->cpass = $cpass;

  		  	$this->main();

  		  } # End Of If

  	} # End Of Constructor

  	private function main(){
//$name, $email, $bio, $res, $color, $course, $where, $cpass, $pass;
  		if($this->name != ""){

  			$this->change('users', 'user_name', $this->name);

  		}
  		if($this->email != ""){

  			$this->change('users', 'user_mail', $this->email);

  		}
  		if($this->bio != ""){

  			$this->change('user_info', 'bio', $this->bio);

  		}
  		if($this->color != ""){

			  $this->change("user_info","color",$this->color);

		  }
		  if($this->res != ""){

			  $this->change("user_info","res",$this->res);

		  }
		  if($this->course != ""){

			  $this->change("user_info","course",$this->course);

		  }
		  if($this->where != ""){

			  $this->change("user_info","frequent_place",$this->where);

		  }
		  if($this->cpass != ""){

			  $this->change("users","user_password",md5($this->cpass));
			  $this->change("users","user_repassword",md5($this->cpass));

		  }

		  echo json_encode(

		  	array(
		  		"error" => false,
		  		"message" => "Refresh For (".$this->counter.") Changes To Take Effect"

		  	)

		  );

  	}

  	private function change($table, $column, $value){

  		if($this->Query->insert("UPDATE $table SET $column = '$value' WHERE user_id = '$this->Id'")){

  			  $this->counter++;

  		}else{

  			echo json_encode(

  				array(
  					"error" => true,
  					"message" => "Changes Could Not Take Effect"
  				)
  			);
  			exit();
  		}

  	}

  }
   
   if(isset($_POST['password'])){

    if(isset($_POST['ch-name']) || isset($_POST['ch-email']) || isset($_POST['ch-password']) || isset($_POST['ch-bio']) || isset($_POST['ch-hangout']) || isset($_POST['ch-residence']) || isset($_POST['ch-course']) || isset($_POST['ch-color'])){

	//$name="",$mail="",$bio="",$res="",$color="",$course="",$where="",$cpass="",$pass
	new Bio($_POST['ch-name'],$_POST['ch-email'],$_POST['ch-bio'],$_POST['ch-residence'],$_POST['ch-color'],$_POST['ch-course'],$_POST['ch-hangout'],$_POST['ch-password'],$_POST['password']);

    }else{

    	echo json_encode(array("error"=>true,"message"=>"Its An Error 2"));
    	exit();

    }
}else{

	echo json_encode(array("error"=>true,"message"=>"Its An Error 1"));
	exit();

}

?>