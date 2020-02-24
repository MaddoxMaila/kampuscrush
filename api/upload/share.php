<?php

  require '../include/query.php';

  class Share extends Query{

  	private $Context, $execQuery, $workingDirectory;
  	private $Id, $Handle, $postId;
  	private $FileRoot, $FileExt, $FileURL, $File;
  	private $Date, $Time, $header;
  	private $newPostId, $AccessContents = "../../../../read/fullpost.php?post_id=", $AccessFile, $payLoad;

  	private __construct($context, $Id, $postId = "", $text = "", $file = ""){

  		if(preg_match('/[0-9]/', $context)){

  			 parent::__construct();

  			 $this->Context = $cotext;
  			 $this->Text = $text;
  			 $this->File = $file;

  			 # Set Id Of Currently Logged In User

  			   if($Id == ""){

  			   	 require_once('../include/sessions.php');

  			   	 $mSession = new Session();

  			     $this->Id = $mSession->id;

  			   }else{

  			   	$this->Id = $Id;

  			   } # End Of If


  			   $this->setFields();  # To Initialize Important Fields Used By The Class

  			   if($this->File != ""){

			   	   $this->prepareFile();  # Since A File Is Uploaded, Prepare The File

  			   }else{

  			   	  # It's Just A Text Post

			   	    $this->FileType = 'text';
			   	    $this->FileURL = ""

  			   } # End Of If


  			 switch ($this->Context) {

  			 	case 1 :  # Sharing Main Posts

	  			 	  $this->header = '/photos/'; # Only If The Post Is An Image

	  			 	  $this->setQuery("INSERT INTO mediauploads VALUES('$this->Id', '$this->FileURL', '$this->Text', '$this->Date', '$this->Time', '$this->FileType', NULL)");

  			 		break;

  			 	case 2 : # Sharing Comments/ Commenting On Other Users Posts

	  			 	  $this->header = '/photos/'; # Only If The Comment Is An Image

	  			 	  $this->setQuery("INSERT INTO comments VALUES('$this->Id', '$this->postId', '$this->Text', '$this->FileURL', '$this->Date', '$this->Time', '$this->FileType', NULL)");

  			 		break;

  			 	case 3 : # Updating Profile Picture

	  			 	  $this->header = '/images/';

	  			 	  $this->changeImage('profile');

  			 	  break;

  			 	case 4 : # Updating Cover Picture

	  			 	  $this->header = '/covers/';

	  			 	  $this->changeImage('cover');

  			 	  break;

  			 	default : 

  			 	    $this->onError("Sharing Failed, Unspecified Upload Mode");

  			 	   exit();

  			 	   break;


  			 } # End Of Switch

  			 $this->share();


  		} # End Of If Preg_Match
  		else{

  			$this->onError("Sharing Failed, No Authourazation");

  			return;

  		}

  	} # End Of Construct

  	private function changeImage($type){

  		if($this->count("SELECT count(image_id) FROM profilepic WHERE user_id = '$this->Id' AND type = '$type'") == 0){

  			# Since Theres No Row Of An Image, Insert A New

  			$this->setQuery("INSERT INTO profilepic VALUES('$this->Id', '$this->Text', '$this->FileURL','$this->Date', '$this->Time','$type', NULL)");

  		}else{

  			if($this->delete("DELETE FROM profilepic WHERE user_id = '$this->Id' AND type ='$type'")){

  				# After Deleting, Insert The New Image

  				$this->setQuery("INSERT INTO profilepic VALUES('$this->Id', '$this->Text', '$this->FileURL','$this->Date', '$this->Time','$type', NULL)"); 

  			}else{

  				$this->onError("Failed To Change ".$type);

  			} # End Of If Delete

  		} # End Of If Count

  	} # End Of changeImage

  	private function setQuery($query){

  		$this->execQuery = $query

  	} # End Of set Query

  	private function setFields(){

  		$this->Handle = $this->row("SELECT user_athandle FROM users WHERE user_id = '$this->Id'")['user_athandle'];

  		$this->rootURL = 'http://localhost/kampuscrush/usr/'.$this->Handle.'/';

  		$this->workingDirectory = '../../usr/'.$this->Handle.'/';

  	} # End Of Set Fields

  	private function prepareFile($file){

  		$this->FileExt = strtolower(end(explode('.', $this->File['name'])));

  		$this->File['name'] = $this->FileExt == "blob" ? md5($this->Date.$this->Time).'_'.$this->Handle.'.'.$this->FileExt : md5($this->Date.$this->Time).'_'.$this->Handle.'.wav';

  		   switch ($this->FileExt) {

  		   	case 'png' :
  		   	case 'gif' :
  		   	case 'jpeg':
  		   	case 'jpg' :   # FOR IMAGES

  		   	  $this->FileType = 'image';

  		   	  $this->FileURL = $this->rootURL.$this->header.$this->File['name'];

  		   	  $this->FileRoot = $this->workingDirectory.$this->header;

  		   		break;

  		   	case 'mp4':
  		   	case 'mkv':    # FOR VIDEOS

  		   	  $this->FileType = 'video';

  		   	  $this->FileURL = $this->rootURL.'videos/'.$this->File['name'];

  		   	  $this->FileRoot = $this->workingDirectory.'videos/';

  		   	  break;

  		   	case 'blob':   # FOR AUDIOS

  		   	  $this->FileType = 'audio';

  		   	  $this->FileURL = $this->rootURL.'audios/'.$this->File['name'];

  		   	  $this->FileRoot = $this->workingDirectory.'audios/';

  		   	  break;

  		   	default   :    # FOR FILES NOT SUPPORTED   


  		   		break;
  		   } # End Of Switch

  	} # End Of prepareFile

  	 private function insert(){

 	     if($this->Query->insert($this->execQuery)){

  	   	  # True, Insert Was Successful, Whole Upload Was Successful

  	   	  # Folder Post

  	   	    // Dont Forget To Implement
 	     	    // Just Did, -- 02:12pm 02, 02, 2020--

  	   	  # End Of Folder Post

 	     	  $this->createPostFolder($this->getLastPostId()); # This Should Actually Return The Final Json Payload

  	   }else{

  	   	 # False, Insert Wasnt Successful, Whole Upload Wasnt Successful
  	   	  $this->onError('Upload Failed, Try Again');

  	   } # End Of If

 	 }  # End Of Insert

 	  private function getLastPostId(){ 

 	  	return $this->getLastId($this->getConnection());

 	  } # End Of getLastPostId

  	private function moveFile(){

  		if(move_uploaded_file($this->File['tmp_name'], $this->FileRoot.basename($this->File['name']))){

  			$this->insert(); # Now Insert The Whole File

  		}else{

  			$this->onError("Failed To Upload File");

  		} # End Of If

  	} # End Of Upload File

  	private function getPayLoad(){

  		 $this->payLoad = "";

  		 if($this->Context == 1){

  		 	require_once('../posts/media.php');

  		 	  $this->payLoad = json_decode(new Media(6, "", $lastId));

  		 }else if($this->Context == 2){

  		 	 require_once('../react/react.php');

  		 	 $this->payLoad = json_decode(new React(3, "", $lastId));

  		 }

  		 return $this->payLoad;

  	} # End Of getPayLoad

  	private function createPostFolder($postId){

  		$this->header = '/posts/';
  		$this->newPostId = $postId;
  		$this->FileRoot = getcwd().'/../../../usr/'.$this->Handle.$this->header.;

  		if(mkdir($this->FileRoot)){ # Create A Folder, Using The Posts Id

  			$this->AccessFile = $this->FileRoot.'/.htaccess';
  			$this->AccessContents .= $this->AccessContents.$this->newPostId;

  			if(file_put_contents($this->AccessFile, $this->AccessContents)){ # Create The HtAccess File To Re-route Which Page Gets Rendered

  				return json_encode(

  					array(

  						"error" => false,
  						"message" => "Sharing Successful!"
  					  "shared" => $this->Context <= 2 ? $this->payLoad : "" 

  					)

  				);

  			}else{

  				 $this->onError("Access File Creation Failed");
  			}

  		}else{

  			$this->onError("Folder Creation Failed");

  		} # End OF MkDir

  	} # End OF Create Post Folder

  	private function share(){

  		($this->File == "" ? $this->insert() : $this->moveFile());

  	} # End Of Share

  	private function addNotification($tag){

 	 	   $tokens = explode(' ', $this->Text);

 	 	   foreach($tokens as $mention){

 	 	   	if(strstr($tag, substr($mention, 0, 1))){

 	 	   		 $newMention = substr($mention, 1);

 	 	   		 $ownerId = $this->Query->row("SELECT user_id FROM users WHERE user_athandle = '$newMention'")['user_id'];

 	 	   		 $type = 'account';

 	 	   		  if(!$this->Query->insert("INSERT INTO notif_holder VALUES('$this->Id', '$this->pID', '$ownerId', '$this->notifType', 0, '$type', NULL)")){
 	 	   		  	exit();
 	 	   		  } # End of If

 	 	   	 } # End Of StrStr

 	 	   } # End Of ForEach

 	 } # End Of AddNotification

 	 private function onError($e){

 	 	  echo json_encode(

 	 	  	array(
 	 	  		'error' => true,
 	 	  		'upload' => false,
 	 	  		'message' => $e
 	 	  	)
 	 	  );
 	 	  exit();

 	 } # End Of onError();

  }  # End Of Class





?>