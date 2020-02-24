<?php

  # Class To Fetch Any User's Data As Long The User's Id Is Provided
  class User{

  	# Class Attributes
    private $Query;
    private $Context;
    private $UserId, $ViewerId;
    private $Data;

    # From Here, There'll Be Class Methods
    # Class Constructor
  	function __construct($context, $user_id, $viewer_id = ""){

  		# Method Arguments All Have To Be Numbers
  		if(preg_match("/[0-9]/",$context )){

  			# Import The Database Framework
  			require_once('C:/xampp/htdocs/kampuscrush/api/framework/db/query.php');

  			$this->Query = new Query();

  			$this->Context = $context;

  			$this->UserId = $user_id;

  			 if($viewer_id == ""){

          require_once('C:/xampp/htdocs/kampuscrush/api/include/sessions.php');

          $session = new Session();

          $this->ViewerId = $session->id;

         }else{

          $this->ViewerId = $viewer_id;

         }
  			 # For Context = 1, Show User Info... All
  			  if($this->Context == 1){

  			  	# A Call To The info() Method
  			  	$this->BasicInfo();

            echo json_encode($this->Data);

  			  } # End Of If-Else

  		 } # End Of If-Else

  	} # End Of Constructor

  	# Method BasicInfo() Definition
    public function init(){

      $this->Basicinfo();

      return $this->Data;

    }
  	private function Basicinfo(){

  		# Check If Indeed The User Id Provided Is Associated With A User
  		if($this->Query->count("SELECT count(user_id) FROM users WHERE user_id = '$this->UserId' OR user_athandle = '$this->UserId'") == 1){

  			# User Id Is Associated With A User
  			$data = $this->Query->row("SELECT user_name, user_athandle, user_email, user_stunumber, user_id, user_date FROM users WHERE user_id = '$this->UserId' OR user_athandle = '$this->UserId'");

        $this->UserId = $data["user_id"];


        // Formating The Data Returned

        $this->Data["basic_info"] = $data;

  			$this->Data["info"] = $this->Query->row("SELECT * FROM user_info WHERE user_id = '$this->UserId'");

        $this->Data['images'] = $this->getImgs();

  			$this->Data['activity'] = $this->getFollowing();

        $this->Data['media'] = $this->getMediaInfo();
  			
  		}else{

  			# User Id Is Not Associated With A User, Terminate With An Error Message
  			$this->onError("User Data No Found"); # Show Error

  		} # End Of If-Else

  	} # End Of BasicInfo()

  	# Method getFollowing() Definition


  	private function getFollowing(){

      $reply = array();

  		# Making Sure That The Ids Provided Aren't The Same
  		if($this->UserId != $this->ViewerId){

  			# This Key Is To Tell If The Viewer Id Belongs To The One Who's Logged In
  			$reply["me"] = false;

  			# Check If You Follow This User
  		  $reply['following'] = ($this->Query->count("SELECT count(follow_id) FROM follow WHERE user_1_id = '$this->ViewerId' AND user_2_id = '$this->UserId'") == 0) ? false : true;

  		}else{

  			$reply['me'] = true;

        $reply['following'] = false;

  		} # End Of If-Else

  		# Get How Many Users You Follow & How Many Follow You
  		$reply['followers'] = $this->Query->count("SELECT count(follow_id) FROM follow WHERE user_2_id = '$this->UserId'");

  		$reply['follows'] = $this->Query->count("SELECT count(follow_id) FROM follow WHERE user_1_id = '$this->UserId'");

      return $reply;

  	} # End Of getFollowing()

  	# Method getMediaInfo() Definition
  	# Fetch All Media Related Data
  	private function getMediaInfo(){

  			return array(

  				"totCount" => $this->Query->count("SELECT count(media_id) FROM mediauploads WHERE user_id = '$this->UserId'"),

  				"imgCount" => $this->Query->count("SELECT count(media_id) FROM mediauploads WHERE user_id = '$this->UserId' AND type = 'photo' OR type = 'image'"),

  				"vidCount" => $this->Query->count("SELECT count(media_id) FROM mediauploads WHERE user_id = '$this->UserId' AND type = 'video'"),

  				"audCount" => $this->Query->count("SELECT count(media_id) FROM mediauploads WHERE user_id = '$this->UserId' AND type = 'audio'")

  			);

  	} # End Of getMediaInfo()

    # getImg() To Retrieve User Image
    private function getImgs() {

      $profile = 'profile';
      $cover = 'cover';

      return array(

        "profileImg" => $this->Query->count("SELECT count(image_id) FROM profilepic WHERE user_id = '$this->UserId' AND type = '$profile'") == 0 ? "https://kampuscrush.com/default.png" : $this->Query->row("SELECT image_link FROM profilepic WHERE user_id = '$this->UserId' AND type = '$profile'")['image_link'],

        "coverImg" => $this->Query->count("SELECT count(image_id) FROM profilepic WHERE user_id = '$this->UserId' AND type = '$cover'") == 0 ? "http://localhost/kampuscrush/default_cover.jpg" : $this->Query->row("SELECT image_link FROM profilepic WHERE user_id = '$this->UserId' AND type = '$cover'")['image_link']

      );

    } # End Of getImg()

  	# From Here, Auxilliary Methods... Not For Context But To Help Context Methods And For Code Re-Usability
  	# onError Method Is For Displaying All Kinds Of Errors To The User
  	private function onError($errorMessage){

  		# Format The Error Message In Json Format For Better Manipulation In Other Langs
  		echo json_encode(
  			array(
  				"error" => true,
  				"message" => $errorMessage
  			)

  		);

  	} # End Of onError()

  } # End Of Class

   
   # Test The Class

   if(isset($_GET['context']) && isset($_GET['u_id'])){
      if(isset($_GET['v_id'])){

      }else{
        new User($_GET['context'], $_GET['u_id'],"");
      }
   }

?>