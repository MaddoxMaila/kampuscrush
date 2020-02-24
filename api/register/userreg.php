<?php
class __Registration{
	private $_userDetails,$JSON_reply,$CONNX;
	private function __dir(){
		require_once('../includes/connect.php');
    $connect = new Connection;
		$this->CONNX = $connect->__CONX();
	}
  private function __create_row_user_info(){
    $eml = $this->_userDetails['email'];
    $usn = $this->_userDetails['handle'];
    $sqlID = mysqli_query($this->CONNX,"SELECT user_id FROM users WHERE user_athandle='$usn' AND user_email='$eml'");
      if(!$sqlID){
        $this->JSON_reply=array("error123"=>true,"message"=>"this error Almost,Account Not Created. Check Connection");
         exit();
       }else{
         $usr = mysqli_fetch_assoc($sqlID);
         $id = $usr['user_id'];
           $sqlINSERT = mysqli_query($this->CONNX,"INSERT INTO user_info VALUES('$id',NULL,'hotpink',NULL,NULL,NULL)");
              if(!$sqlINSERT){
                 $this->JSON_reply=array("error123"=>true,"redirect" => false,"message"=>"this error Almost,Account Not Created. Check Connection");
                 exit();
              }else{
                  //$this->JSON_reply=array("error"=>false,"files"=>true,"created"=>true,"redirect"=>true,"url"=>"../");
                  require_once('../login/login.php');
                  new Login($this->_userDetails['password'],$this->_userDetails['email']);
            }
       }
  }
	private function __createHTACCESS(){
    $usn=$this->_userDetails['handle'];
    $eml=$this->_userDetails['email'];
    $local_reply="";
    $getID="SELECT user_id FROM users WHERE user_athandle='$usn' AND user_email='$eml'";
    $_SQLid=mysqli_query($this->CONNX,$getID);
    if(!$_SQLid){
    	$local_reply=array("error"=>true,"htcreated"=>false);
    }else{
    	$local_reply=array("error"=>false,"htcreated"=>true,"content"=>"DirectoryIndex ../../home/home.php?pp=".mysqli_fetch_assoc($_SQLid)['user_id']." \n ErrorDocument 404 http://192.168.43.13/campuscrush/ \n IndexIgnore *");
    }
    return $local_reply;
  }
  public function __init($handle,$username,$email,$stuNum,$date,$password,$repassword){
  	if(md5($password)==md5($repassword)){
  		$this->__dir();
  		$this->_userDetails=array("handle"=>$handle,"username"=>$username,"email"=>$email,"student_num"=>$stuNum,"date"=>$date,"password"=>$password,"re_password"=>$repassword);
  		$this->__createUser();
  	}else{
  		$this->JSON_reply=array("error"=>false,"redirect" => false,"pass"=>false,"message"=>"The Re-Entered Password Must Match The Original Password");
  		echo json_encode($this->JSON_reply);
  	}
  }
  private function __isUserNameTaken(){
  	$local_reply=true;
  	$usn=$this->_userDetails['handle'];
  	$_checkNAME="SELECT count(user_id) FROM users WHERE user_athandle='$usn'";
  	$_sqlCHECK=mysqli_query($this->CONNX,$_checkNAME);
  	if(!$_sqlCHECK){
  		$local_reply=array("error"=>true);
  	}else{
  		if(mysqli_fetch_row($_sqlCHECK)[0]==1){
  			$local_reply=array("error"=>false,"usernametaken"=>true);
  		}else{
  			$local_reply=array("error"=>false,"usernametaken"=>false);
  		}
  	}
  	return $local_reply;
  }
  private function __isEmailTaken(){
  	$local_reply=true;
  	$eml=$this->_userDetails['email'];
  	$_checkNAME="SELECT count(user_id) FROM users WHERE user_email='$eml'";
  	$_sqlCHECK=mysqli_query($this->CONNX,$_checkNAME);
  	if(!$_sqlCHECK){
  		$local_reply=array("error"=>true);
  	}else{
  		if(mysqli_fetch_row($_sqlCHECK)[0]==1){
  			$local_reply=array("error"=>false,"emailtaken"=>true);
  		}else{
  			$local_reply=array("error"=>false,"emailtaken"=>false);
  		}
  	}return $local_reply;
  }
  private function __createUser(){
  	if($this->__isUserNameTaken()["error"]==true){
  		$this->JSON_reply=array("error"=>true,"created"=>false,"message"=>"Account Not Created,Check Connection");
  	}else{
  		if($this->__isUserNameTaken()['usernametaken']==true){
  			$this->JSON_reply=array("error"=>false,"redirect" => false,"email"=>false,"usernametaken"=>true,"files"=>false,"created"=>false,"message"=>"Username Already In-Use");
  		}else{
  			if($this->__isEmailTaken()["error"]==true){
  				$this->JSON_reply=array("error"=>true,"redirect" => false,"message"=>"Account Not Created, Check Connection");
  			}else{
  				if($this->__isEmailTaken()["emailtaken"]==true){
  					$this->JSON_reply=array("error"=>false,"redirect" => false,"username"=>false,"emailtaken"=>true,"files"=>false,"created"=>false,"message"=>"Email Already In-Use");
  				}else{
  					$handle=$this->_userDetails['handle'];
  					$username=$this->_userDetails['username'];
  					$email=$this->_userDetails['email'];
  					$student_num=$this->_userDetails['student_num'];
  					$birth=$this->_userDetails['date'];
  					$password=md5($this->_userDetails['password']);
  					$repassword=md5($this->_userDetails['re_password']);
  		$createUSER="INSERT INTO users(user_athandle,user_name,user_email,user_stunumber,user_date,user_password,user_repassword) VALUES('$handle','$username','$email','$student_num','$birth','$password','$repassword')";
  					$sqlCREATE=mysqli_query($this->CONNX,$createUSER);
  					if(!$sqlCREATE){
  						$this->JSON_reply=array("error123"=>true,"redirect" => false,"message"=>"this error Almost,Account Not Created. Check Connection");
  					}else{
  						$userDIRECTORY=getcwd()."/../usr/".$this->_userDetails['handle'];
  						   if(mkdir($userDIRECTORY)){
  						   	  if($this->__createHTACCESS()["error"]==false){
  						   	  	$theFile=$userDIRECTORY."/.htaccess";
  						   	  	  if(file_put_contents($theFile, $this->__createHTACCESS()["content"])){
  						   	  	  	 if(mkdir($userDIRECTORY."/photos") && mkdir($userDIRECTORY."/videos") && mkdir($userDIRECTORY."/covers") && mkdir($userDIRECTORY."/images") && mkdir($userDIRECTORY."/posts")){
                            $this->__create_row_user_info();
  						   	  	  	}else{
  						   	  	  		$this->JSON_reply=array("error2"=>false,"redirect" => false,"files"=>true,"created"=>false);
  						   	  	  	}
  						   	  	  }
  						   	  	}else{
  						   	  		$this->JSON_reply=array("error2"=>false,"redirect" => false,"files"=>true,"created"=>false);
  						   	  	}
  						   	  }else{
  						   	  	$this->JSON_reply=array("error3"=>false,"redirect" => false,"files"=>true,"created"=>false);
  						   	  }
  						   	}
  						   }
  						 }
  						}
  					}
  					echo json_encode($this->JSON_reply);
  				}
  			}
if(isset($_POST['h']) && isset($_POST['u']) && isset($_POST['e']) && isset($_POST['s']) && isset($_POST['p']) && isset($_POST['r'])){
          $Register=new __Registration;
$accoutBirth=date('Y/m/d');
$Register->__init($_POST['h'],$_POST['u'],$_POST['e'],$_POST['s'],$accoutBirth,$_POST['p'],$_POST['r']);
}
?>