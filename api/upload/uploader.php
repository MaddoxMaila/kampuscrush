<?php


 /*
   
   Class For Adding Comments And New Posts

 */

 class Upload{

 	private $Query, $Context, $Type ,$execQuery;
 	private $Id, $Handle;
 	private $Date, $Time, $getCWD = '../../usr/';
 	private $Media_URL, $Media_PATH, $Media_TYPE;
 	private $Media_FILE, $Text;
 	private $pID;
 	private $notifType;
 	 function __construct($context, $id = "", $post_id = "", $text = "" ,$media_file = "", $type =""){

 	 	 /* Check For Empty Variable */

 	 	  if(preg_match("/[0-9]/", $context)){

 	 	  	$this->Date = date('d/m/Y');
 	 	  	$this->Time = date('g:ia');
 	 	  	$this->Context = $context;
 	 	  	$this->Text = $text;
 	 	  	$this->Media_FILE = $media_file;

 	 	  	require_once('../framework/db/query.php');
 	 	  	$this->Query = new Query();

 	 	  	  if($id == ""){

 	 	  	  	require_once('../include/sessions.php');
 	 	  	    $session = new Session();
 	 	  	    $this->Id = $session->id;

 	 	  	  }else{

 	 	  	  	$this->Id = $id;

 	 	  	  }

 	 	  	  if($this->Media_FILE != ""){

 	 	  	  	$this->prepareFileInfo(); 

 	 	  	  }else{
 	 	  	  	$this->Media_FILE = NULL;
 	 	  	  	$this->Media_TYPE = 'text';
 	 	  	  }

 	 	  	if($this->Context == 1){

 	 	  		/*  FOR POSTS  */

 	 	  		  if($type != ""){

 	 	  		  	 $this->Type = $type;

 	 	  		  }

 	 	  		$this->notifType = 'Mentioned You On A Post';

 	 	  		$this->execQuery = "INSERT INTO mediauploads VALUES('$this->Id', '$this->Media_URL', '$this->Text', '$this->Date', '$this->Time', '$this->Media_TYPE', NULL)";

 	 	  		$this->uploadMedia();

 	 	  		$this->pID = $this->Query->row("SELECT media_id FROM mediauploads WHERE media_url = '$this->Media_URL' AND user_id = '$this->Id' AND `text` = '$this->Text' AND media_date = '$this->Date' AND media_time =  '$this->Time' AND type = '$this->Media_TYPE'")['media_id'];

 	 	  		$this->addNotification('@');

 	 	  		// $this->createAccess();

 	 	  	}else if($this->Context == 2){

 	 	  		/*  FOR COMMENTS  */

 	 	  		$this->pID = $post_id;

 	 	  		$this->notifType = 'Mentioned You On A Comment';

 	 	  		$this->execQuery = "INSERT INTO comments VALUES('$this->Id', '$this->pID', '$this->Text', '$this->Media_URL', '$this->Date', '$this->Time', '$this->Media_TYPE', NULL)";

 	 	  		$this->uploadMedia();

 	 	  		$this->addNotification('@');

 	 	  	}else if($this->Context == 3){

 	 	  		// Check If Already User Has A Non-default Profile Picture Inplace
 	 	  		if($this->Query->count("SELECT count(image_id) FROM profilepic WHERE user_id = '$this->Id'") == 0){

 	 	  			// Has A Default Profile Picture Inplace

 	 	  			$this->execQuery = "INSERT INTO profilepic VALUES('$this->Id', '$this->Text', '$this->Media_URL','$this->Date', '$this->Time', NULL)";
 	 	  		  $this->uploadMedia();

 	 	  		}else{

 	 	  			// Has A Non-Default Profile Picture Inplace

 	 	  			// Delete The One Inplace, The Insert The Newly Uploaded

 	 	  			 if($this->Query->delete("DELETE FROM profilepic WHERE user_id = '$this->Id'")){

 	 	  			 	// Delete Was Successful

 	 	  			 	 $this->execQuery = "INSERT INTO profilepic VALUES('$this->Id', '$this->Text', '$this->Media_URL','$this->Date', '$this->Time', NULL)";
 	 	  		     $this->uploadMedia();

 	 	  			 }else{

 	 	  			 	// Delete Was Not Successful

 	 	  			 	  $this->onError('Changing Profile Picture Failed');

 	 	  			 } // End Of Delete If

 	 	  		} // End Of Count If

 	 	  	} # End Of If

 	 	  } # End Of If

 	 } # End Of Constructor


   private function uploadMedia(){

   	   if($this->Media_FILE == ""){

   	   	$this->Media_TYPE = 'text';
   	   	 echo $this->insert();
   	   }else{

   	   	$this->moveFile();

   	   }

   } # End Of uploadPost()

 	 private function prepareFileInfo(){

 	 	  $fileExt = explode('.', $this->Media_FILE['name']);
 	 	  $fileExt = strtolower(end($fileExt));

 	 	  $this->Handle = $this->Query->row("SELECT user_athandle FROM users WHERE user_id = '$this->Id'")['user_athandle'];

 	 	    # Rename The File
 	 	    if($fileExt != "blob"){

 	 	    	$this->Media_FILE['name'] = md5($this->Date.$this->Time).'_'.$this->Handle.'.'.$fileExt;

 	 	    }else{

 	 	    	$this->Media_FILE['name'] = md5($this->Date.$this->Time).'_'.$this->Handle.'.wav';

 	 	    }

 	 	    if($fileExt == 'jpg' || $fileExt == 'jpeg' || $fileExt == 'png'){

 	 	    	  # Uploading Images
 	 	    	$this->Media_TYPE = 'image';

 	 	    	 if($this->Context == 3){

 	 	    	 	 $this->Media_URL = 'http://192.168.43.13/kampuscrush/usr/'.$this->Handle.'/photos/'.$this->Media_FILE['name'];

 	 	    	 	 $this->Media_PATH = $this->getCWD.$this->Handle.'/photos/';

 	 	    	 }else{

 	 	    	 	# Media URL For Accessing Via Web
 	 	    	  $this->Media_URL = 'http://192.168.43.13/kampuscrush/usr/'.$this->Handle.'/images/'.$this->Media_FILE['name'];

 	 	    	  # Media Path On The Server
 	 	    	  $this->Media_PATH = $this->getCWD.$this->Handle.'/images/';  


 	 	    	 } // End Of If

 	 	    } else if($fileExt == 'mp4' || $fileExt == 'mkv'){

 	 	    	  # Uploading Videos
 	 	    	$this->Media_TYPE = 'video';
 	 	    	# Media URL For Accessing Via Web
 	 	    	$this->Media_URL = 'http://192.168.43.13/kampuscrush/usr/'.$this->Handle.'/videos/'.$this->Media_FILE['name'];

 	 	    	# Media Path On The Server
 	 	    	$this->Media_PATH = $this->getCWD.$this->Handle.'/videos/';


 	 	    }else if($fileExt == 'blob'){

 	 	      # Not Supported File Format
 	 	    	 # Uploading Audios
 	 	    	$this->Media_TYPE = 'audio';
 	 	    	# Media URL For Accessing Via Web
 	 	    	$this->Media_URL = 'http://192.168.43.13/kampuscrush/usr/'.$this->Handle.'/audios/'.$this->Media_FILE['name'];

 	 	    	# Media Path On The Server
 	 	    	$this->Media_PATH = $this->getCWD.$this->Handle.'/audios/'; 	 	    	 

 	 	    }else{

 	 	    	$this->onError('Unsupported File Format');

 	 	    } # End Of If

 	 } # End Of prepareFileInfo()

 	 private function insert(){


 	     if($this->Query->insert($this->execQuery)){

 	 	  	   	  # True, Insert Was Successful, Whole Upload Was Successful

 	 	  	   	  # Folder Post

 	 	  	   	    // Dont Forget To Implement

 	 	  	   	  # End Of Folder Post

 	 	  	   	  return json_encode(
 	 	  	   	  	array(
 	 	  	   	  		'error' => false,
 	 	  	   	  		'upload' => true,
 	 	  	   	  		'message' => 'Upload Successful',
 	 	  	   	  		'url' => $this->Media_URL
 	 	  	   	  	)
 	 	  	   	  );

 	 	  	   }else{

 	 	  	   	 # False, Insert Wasnt Successful, Whole Upload Wasnt Successful
 	 	  	   	  $this->onError('Upload Failed, Try Again');

 	 	  	   } # End Of If
 	 }

 	 private function moveFile(){

 	 	  if(move_uploaded_file($this->Media_FILE['tmp_name'], $this->Media_PATH.basename($this->Media_FILE['name']))){

 	 	  	  # File Was Moved To Location Successfully
 	 	  	  # Then Insert Upload Info Into Database

 	 	  	   echo $this->insert();

 	 	  }else{

 	 	  	   $this->onError('Error Occured While Uploading File');

 	 	  } # End Of If

 	 } # End Of moveFile()
 	 public function createFolder(){

 	 	  $this->execQuery = $this->Query->rows("SELECT user_id,media_id FROM mediauploads");

 	 	  while($row = $this->Query->assoc($this->execQuery)){

 	 	  	$user_id = $row['user_id'];

 	 	  	$name = $this->Query->row("SELECT user_athandle FROM users WHERE user_id = '$user_id'")['user_athandle'];

 	 	  	$id = $row['media_id'];

 	 	  	$path = getcwd().'/../../../usr/'.$name.'/posts/'.$id;

 	 	  	if(mkdir($path)){

 	 	  		echo "Created Folder '".$path."'' For : ".$name."<br /><br />";
 	 	  		$file = $path.'/.htaccess';
 	 	  		$contents = 'DirectoryIndex ../../../../read/read.php?id='.$id;

 	 	  		 if(file_put_contents($file, $contents)){

 	 	  		 	echo "Created File '".$file."' For : ".$name."<br /><br />";

 	 	  		 }else{

 	 	  		 	 echo "Not Created For ".$name."<br />";

 	 	  		 }
 	 	  	}else{

 	 	  		echo "Not Created For ".$name."<br />";

 	 	  	}

 	 	  }

 	 }

 	 private function createAccess(){

 	 	 $dir = getcwd().'/../../../usr/'.$this->Query->row("SELECT user_athandle FROM users WHERE user_id = '$this->Id'")['user_athandle'].'/posts/';
 	 	 $fileContent =  'DirectoryIndex ../../../../read/read.php?id='.$this->pID;

 	 	   if(mkdir($dir.$this->pID)){

 	 	   	  $file = $dir.$this->pID.'/.htaccess';

 	 	   	  if(!file_put_contents($file, $fileContent)){

 	 	   	  echo 'Error';
 	 	   	  exit();
 	 	     }

 	 	   }

 	 }

 	 private function addNotification($tag){

 	 	   $tokens = explode(' ', $this->Text);

 	 	   foreach($tokens as $mention){

 	 	   	if(strstr($tag, substr($mention, 0, 1))){

 	 	   		 $newMention = substr($mention, 1);

 	 	   		 $ownerId = $this->Query->row("SELECT user_id FROM users WHERE user_athandle = '$newMention'")['user_id'];

 	 	   		 $type = 'account';

 	 	   		  if(!$this->Query->insert("INSERT INTO notif_holder VALUES('$this->Id', '$this->pID', '$ownerId', '$this->notifType', 0, '$type', NULL)")){
 	 	   		  	exit();
 	 	   		  }

 	 	   	 } // End Of StrStr

 	 	   } // End Of ForEach

 	 } // End Of AddNotification

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

 } # End Of Class


 // $context, $id = "", $post_id = "", $text = "" ,$media_file = ""
 if(isset($_POST['context'])){

 	  if(!isset($_FILES['media'])){
 	  	$_FILES['media'] = "";
 	  }
 	  // For Posting
 	  if($_POST['context'] == 1 || $_POST['context'] == 3){

 	  	new Upload($_POST['context'], "", "", $_POST['text'], $_FILES['media']);

 	  }else if($_POST['context'] == 2){

 	  	new Upload($_POST['context'], "", $_POST['p_id'], $_POST['text'], $_FILES['media']);
 	  }
 }else{

 	  echo json_encode(
 	  	 array(

 	  	 	'error' => true,
 	  	 	'message' => 'Unable To Process Your Request'
 	  	 )
 	  );
 	  exit();
 }

?>