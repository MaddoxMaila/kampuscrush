<?php

 # Class Definition For Fetching User Posts

  class Media{

  	private $Query;
  	private $UserId, $Id;
  	private $Context;
  	private $execQuery, $tMultiDimArray;
  	private $Reply = "", $Hash;
    # Class Constructor
  	function __construct($context,$id = "", $userr_id = "#"){
  		if(preg_match("/[0-9]/", $context)){

  			$this->Context = $context;

          if($id == ""){
            require_once('C:/xampp/htdocs/kampuscrush/api/include/sessions.php');

            $session = new Session();

            $this->Id = $session->id;

          }else{

            $this->Id = $id;

          }

  			require_once('C:/xampp/htdocs/kampuscrush/api/framework/db/query.php');

  			$this->Query = new Query();

  			if($this->Context == 1){

  				# Get All Media Posts
  				$this->execQuery = $this->Query->rows("SELECT * FROM mediauploads ORDER BY media_id DESC LIMIT 50");
  				
          $this->getPosts();

          echo json_encode($this->Reply);

  			}else if($this->Context == 2){

  			   	$this->UserId = $userr_id;
  			   	# Get Media Posts By ID
            if($this->Query->count("SELECT count(media_id) FROM mediauploads WHERE user_id = '$this->UserId'") > 0){

              $this->execQuery = $this->Query->rows("SELECT * FROM mediauploads WHERE user_id = '$this->UserId' ORDER BY media_id DESC");

              echo json_encode($this->getPosts());

            }else{

              echo json_encode(

                array(

                  "list" => false
                )

              );

            }

  			 }else if($this->Context == 3){

          $this->Hash = '#'.$userr_id;

         // echo $this->Hash;
           $this->execQuery = $this->Query->rows("SELECT * FROM mediauploads WHERE `text` LIKE '%$this->Hash%' ORDER BY media_id DESC");

           echo json_encode($this->getPosts());

         }else if($this->Context == 4){

             $this->UserId = $userr_id;
             
             if($this->Query->count("SELECT count(like_id) FROM reaction WHERE liker_id = '$this->UserId'") == 0){

               echo json_encode(array(

                   "list" => false
               )

              );

             }else{

                 $query = $this->Query->rows("SELECT post_id FROM reaction WHERE liker_id = '$this->UserId' ORDER BY like_id DESC");

                 $reply = array();

                 while($row = $this->Query->assoc($query)){

                  $mid = $row['post_id'];

                  $this->execQuery = $this->Query->rows("SELECT * FROM mediauploads WHERE media_id = '$mid'");
                  
                  $reply = $this->getPosts();


               } # End Of While Loop

               echo json_encode($reply);

             }


         }else if($this->Context == 5){ # For Implementing Trending

            $text = 'text';
            $audio = 'audio';

            $this->execQuery = $this->Query->rows("SELECT media_id FROM mediauploads WHERE type != '$text' AND type != '$audio'");

            $this->trendingAudios(); # Call Method To Get Trending!!

         }else if($this->Context == 6){

            $this->Hash = $userr_id;

            $this->execQuery = $this->Query->rows("SELECT * FROM mediauploads WHERE media_id ='$this->Hash'");

            $reply = $this->getPosts();

            echo json_encode($reply);

         } # End Of If

  		} # End Of If-Else

  	} #End Of Constructor

  	# Method getPosts() Definition
  	private function getPosts(){

      $reactionType = 'post';

  		while($post = $this->Query->assoc($this->execQuery)){

  			$mediaId = $post['media_id'];

  			$mediaOwnerId = $post['user_id'];

        require_once('C:/xampp/htdocs/kampuscrush/api/user/user.php');

        # Create User Object
        $User = new User(2, $mediaOwnerId, $this->Id);

        $this->Reply['list'] = true;

  			$this->Reply['posts'][] = array(
  				# User Information
  				"user" => $User->init(),

  				# Actual Posts Details
  				"post" => $post, # Since $post Is An Associative Array Itself

  				"commentCount" => $this->Query->count("SELECT count(comment_id) FROM comments WHERE post_id = '$mediaId'"),

  				"likesCount" => $this->Query->count("SELECT count(like_id) FROM reaction WHERE post_id = '$mediaId' AND type = '$reactionType'"),

  				"isLiked" => $this->Query->count("SELECT count(like_id) FROM reaction WHERE post_id = '$mediaId' AND liker_id = '$this->Id' AND type = '$reactionType'") == 0 ? false : true,
          
          "views" => $this->Query->count("SELECT count(play_id) FROM plays WHERE post_id = '$mediaId'")
          
  			); # End Of Array

  		} # End Of While Loop
  		
        return $this->Reply;
  	} # End Of getPosts() Method


    # Method For Filtering Audio Posts By Highest Listened!
    private function trendingAudios(){

      # Loop Through All The Rows!
      while($row = $this->Query->assoc($this->execQuery)){

          $pId = $row['media_id'];

            $this->tMultiDimArray[] = array(
                "id" => $pId,
                "count" => $this->Query->count("SELECT count(like_id) FROM reaction WHERE post_id = '$pId'")
            );

         } # End Of While Loop

         # Sort The Multidim Array
         arsort($this->tMultiDimArray);
         // print_r($this->tMultiDimArray);
         $LIMIT = count($this->tMultiDimArray) - 20; # Limit The Array To Show Limited Number Of Posts
         $reply = array();
         # Show The Trending In Json Format!!
         for($i = count($this->tMultiDimArray) - 1; $LIMIT <= $i; $i--){

           # Check If Posts Has Been Listened To First
              if($this->tMultiDimArray[$i]['count'] == 0){

                continue;

              }else{
                
                $post_id = $this->tMultiDimArray[$i]['id'];

                $this->execQuery = $this->Query->rows("SELECT * FROM mediauploads WHERE media_id = '$post_id'");

                $reply = $this->getPosts();

              } # End Of If

           } # End Of For Loop

           echo json_encode($reply);

    } # End Of trendingAudios() Method

  } # End Of Class Definition

  if(isset($_GET['context'])){

    if($_GET['context'] == 1 || $_GET['context'] == 5){

      new Media($_GET['context'],"","");

    }else if($_GET['context'] == 2 || $_GET['context'] == 3 || $_GET['context'] == 4 || $_GET['context'] == 6){

      if(isset($_GET['u_id'])){

        new Media($_GET['context'],"", $_GET['u_id']);

      }

    } # End Of Context If

  } # End Of Context Isset If

?>