<?php

   
   class React{

   	private $Query, $Id, $pId, $Context, $execQuery;
    private $date, $time, $type;
    private $notifType;
    private $Response;


   	function __construct($context, $id="", $post_id, $type ="", $comment_text ="", $comment_file = ""){

   		if(preg_match("/[0-9]/", $context)){

   			require_once('../framework/db/query.php');

   			$this->Query = new Query();

   			if($id == ""){ # For Browser

   				require_once('../include/sessions.php');
   				$session = new Session();
   				$this->Id = $session->id;

   			}else{

   				$this->Id = $id;

   			} # End Of If

   			$this->Context = $context;
   			$this->pId = $post_id;

        switch ($this->Context) {

          case 1 :

             $this->notifType = 'like';

             $this->type = $type;
             $this->like();

            break;

          case 2 :

             $this->notifType = 'comment';

             $this->comment();

            break;

          case 3 :

              $this->viewComments();

            break;

          case 4 :

              $this->views();

            break;

          case 5 :

             $this->execQuery = $this->Query->rows("SELECT * FROM reaction WHERE post_id = '$this->pId'");

             $this->getPostAnalytics("reaction");

            break;

          case 6 :

             $this->execQuery = $this->Query->rows("SELECT * FROM comments WHERE post_id = '$this->pId'");

             $this->getPostAnalytics("comments");

            break;
          
          default:
             
             echo json_encode(
                array(

                  "error" => true,
                  "message" => "Context Failure"

                )
             );

            exit();

            break;
        } # End Of Switch
   		 } # End Of If 

   	 } # End Of Constructor

      private function getPostAnalytics($table){

        if($this->Query->count("SELECT count(post_id) FROM $table WHERE post_id = '$this->pId'") > 0){

            $this->Response['error'] = false;
            $this->Response['list'] = true;

             require_once('C:/xampp/htdocs/kampuscrush/api/user/user.php');

            while($row = $this->Query->assoc($this->execQuery)){

              $user = new User(2, $row[ $this->Context == 5 ? 'liker_id' : 'user_id'], $this->Id);

              $this->Response['users'][] = array(

                "user_info" => $user->init()

              ); # End Of Array


            } # End Of While

        }else{

            $this->Response['error'] = true;
            $this->Response['list'] = false;

        } # End Of If

          echo json_encode($this->Response);
          exit();

    } # End Of Get Post Analytics 

       # Method To Log In A View/ Listen Each Time A Media Button Is Clicked

       private function views(){

         # Log Each Media Button Interaction But If A User Has Already Been Logged, Dont Log It, Pass

          if($this->Query->count("SELECT count(play_id) FROM plays WHERE user_id = '$this->Id' AND post_id = '$this->pId'") == 0){

            # Since This User Has Not Interated With This Media, Log The View/ Listen
            $this->date = date('m/d/Y');
            $this->time = date('g:ia');
            $this->type = $this->Query->row("SELECT type FROM mediauploads WHERE media_id = '$this->pId'")['type'];

              if($this->Query->insert("INSERT INTO plays VALUES('$this->Id', '$this->pId', NULL,'$this->date', '$this->time', '$this->type')")){

                 # On Successful Media Interaction Log
                  echo json_encode(

                     array(
                        "error" => false,
                        "pass" => false,
                        "count" => $this->Query->count("SELECT count(play_id) FROM plays WHERE post_id = '$this->pId'"),
                        "type" => $this->type
                     )
                  );

              }else{

                 # On Unsuccessful Media Interaction Log

                  echo json_encode(

                     array(
                        "error" => true,
                        "message" => "Media Interaction Log Error"
                     )
                  );

              } # End Of If

          }else{

            # Pass
            echo json_encode(

              array(
                "error" => false,
                "pass" => true
              )
            );

          } # End Of If

       } # End Of views()

   	 # Method For Liking
   	 private function like(){

   	 	# Check If Already Liked
   	 	if($this->Query->count("SELECT count(like_id) FROM reaction WHERE liker_id = '$this->Id' AND post_id = '$this->pId' AND type = '$this->type'") == 0){

   	 		# If Not Like, The Like!

   	 		# Insert Like
   	 		if($this->Query->insert("INSERT INTO reaction VALUES('$this->Id','$this->pId','$this->type',NULL)")){

   	 			echo json_encode(
   	 				array(
   	 					"error" => false,
   	 					"message" => "flamed",
   	 					"count" => $this->Query->count("SELECT count(like_id) FROM reaction WHERE post_id = '$this->pId' AND type = '$this->type'"),
              "type" => $this->type
   	 				)
   	 			); # Echo Json Object As Response

          $this->addNotification();

   	 		}else{

   	 			echo json_encode(
   	 				array(
   	 					"error" => false,
   	 					"message" => "Unable To Like",
   	 				)
   	 			); # Echo Json Object As Response
   	 		} # End Of If


   	 	} else{
   	 		# If Liked, Then Unlike!

   	 		# Delete The Like Previously Added
   	 		if($this->Query->delete("DELETE FROM reaction WHERE liker_id = '$this->Id' AND post_id = '$this->pId' AND type = '$this->type'")){

   	 			echo json_encode(
   	 				array(
   	 					"error" => false,
   	 					"message" => "unflamed",
   	 					"count" => $this->Query->count("SELECT count(like_id) FROM reaction WHERE post_id = '$this->pId' AND type = '$this->type'"),
              "type" => $this->type
   	 				)
   	 			); # Echo Json Object As Response
   	 		}else{

   	 			echo json_encode(
   	 				array(
   	 					"error" => false,
   	 					"message" => "Unable To Unlike",
   	 				)
   	 			); # Echo Json Object As Response
   	 		} # End Of If

   	 	}# End Of If

   	 } # End Of like() Method

       # Method For Viewing Comments
       private function viewComments(){

         $reactionType = 'comment';

         require_once('C:/xampp/htdocs/kampuscrush/api/user/user.php');
         # Check First If There Are Commments
         if($this->Query->count("SELECT count(comment_id) FROM comments WHERE post_id = '$this->pId'") > 0){

            # There Are Comments To Show
            $exeCom = $this->Query->rows("SELECT * FROM comments WHERE post_id = '$this->pId'"); # Query All Comments
            $resp = array();
            $resp["error"] = false;
            $resp["message"] = "comments";
            $resp["count"] = $this->Query->count("SELECT count(comment_id) FROM comments WHERE post_id = '$this->pId'"); # Get Total Count Of The Comments

             while($comment = $this->Query->assoc($exeCom)){

               # Get All Comments By Looping

               $info = new User(2, $comment['user_id'], $this->Id);

               #Check If User Has Profile Uploaded
               $resp["comments"][] = array(

                  "comment_info" => $comment,

                  "user_info" => $info->init(),

                  "likesCount" => $this->Query->count("SELECT count(like_id) FROM reaction WHERE post_id = '$this->pId' AND type = '$reactionType'"),

                  "isLiked" => $this->Query->count("SELECT count(like_id) FROM reaction WHERE post_id = '$this->pId' AND liker_id = '$this->Id' AND type = '$reactionType'") == 0 ? false : true,
               );

             } # End Of While Loop

             echo json_encode($resp); # Echo the Json Object As Response To The Client

         }else{

            # The Are No Comments To Show

            echo json_encode(
               array(
                  "error" => false,
                  "message" => "Be The First To Comment"
               )
            );

         } # End Of If
       } # End Of ViewComments() Method

       private function addNotification(){

          $data = $this->Query->row("SELECT user_id,type FROM mediauploads WHERE media_id = '$this->pId'");

          $ownerId = $data['user_id'];
          $type = $data['type'];

          if($this->Query->count("SELECT count(notif_holder_id) FROM notif_holder WHERE owner_id = '$ownerId' AND post_id = '$this->pId' AND notif_type = '$this->notifType' ") == 0){

             if(!$this->Query->insert("INSERT INTO notif_holder VALUES('$this->Id', '$this->pId', '$ownerId', '$this->notifType', 0,'$type', NULL)")){
                
                exit();

             }else{

                 if(!$this->Query->insert("INSERT INTO notif_counter VALUES('$this->Id', '$this->pId', '$this->notifType', NULL)")){
                  
                  exit();
                }

             }

          }else{

            if(!$this->Query->insert("INSERT INTO notif_counter VALUES('$this->Id', '$this->pId', '$this->notifType', NULL)")){
                  exit();
              }
          }

       }

   } # End Of Class Def


   if(isset($_GET['context']) && isset($_GET['pid'])){


      if($_GET['context'] == 1 || $_GET['context'] == 4){ # Liking && Logging Media Interation

         new React($_GET['context'], "", $_GET['pid'], $_GET['type'], "", "");

      }else if($_GET['context'] == 2){ # Commenting

      } else if($_GET['context'] == 3 || $_GET['context'] == 5 || $_GET['context'] == 6){ # Showing comments

         new React($_GET['context'], "", $_GET['pid'], "","","");

      }
   }
?>