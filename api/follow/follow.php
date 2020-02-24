<?php

   //"INSERT INTO follow VALUES('$this->ID','$this->uID','$follow','$this->DATE','$this->TIME',NULL

 
  class Follow{
  	private $Id,$uId, $ExId;
  	private $Context, $execQuery, $Query;
  	private $Date,$Time;
  	public $Info;

      function __construct($context,$id = "", $acc_id = ""){ 
        # $id for logged in User, $acc_id for User being Followed Or Unfollowed

          if(preg_match("/[0-9]/", $context)){ # No Strings Wanted

            if($id == ""){

              require_once('C:/xampp/htdocs/kampuscrush/api/include/sessions.php');

              $session = new Session();

              $this->Id = $session->id;

            }else{

              $this->Id = $id;

            } # End Of If

            $this->Context = $context;
            $this->uId = $acc_id;

            require_once('C:/xampp/htdocs/kampuscrush/api/framework/db/query.php');

            # Database Object
            $this->Query = new Query();

            # Check For Context

            if($this->Context == 1){
               # For Following
              $this->followUser();
              exit();
              
            }else if($this->Context == 2){

               # For Listing People You Follow

              # count To Check For Following
                if($this->Query->count("SELECT count(follow_id) FROM follow WHERE user_1_id = '$this->uId'")){

                  # The Are People You Follow

                  # Initialize The Query
                   $this->execQuery = $this->Query->rows("SELECT * FROM follow WHERE user_1_id = '$this->uId'");

                   # Execute The Query
                   $this->listFollows();
                   exit();

                }else{

                  echo json_encode(
                     array(
                      "error" => false,
                      "list" => false
                     )
                  );

                } # End Of Following Check

            }else if($this->Context == 3){

               # For Listing People Who Follow You

              # Check If There Are People Who Follow You

               if($this->Query->count("SELECT count(follow_id) FROM follow WHERE user_2_id = '$this->uId'")){

                 # You Have Followers
                  $this->execQuery = $this->Query->rows("SELECT * FROM follow WHERE user_2_id = '$this->uId'");
                  $this->listFollows();
                  exit();

               }else{

                 echo json_encode(
                   array(
                    "error" => false,
                    "list" => false
                   )
                 );
               } # End Of If 

            } else if($this->Context == 4){

              # for Listing Users You Might Follow
              $this->execQuery = $this->Query->rows("SELECT user_id FROM users WHERE user_id != '$this->Id' LIMIT 5");
               $this->youMightKnow();
               exit();
            }else if($this->Context == 5){

              $this->execQuery = $this->Query->rows("SELECT `text` FROM mediauploads WHERE `text` LIKE '#%'");
              $this->followTrending();
              exit();
            } # End Of If

          } # End Of If

      } # End Of Constructor

      # Method For Following Users
  	private function followUser(){

       # Check If You Follow This User
      if($this->Query->count("SELECT count(follow_id) FROM follow WHERE user_1_id = '$this->Id' AND user_2_id = '$this->uId'") == 0){

         $this->Date = date('d/m/Y');
         $this->Time = date('g:ia');
         $follow ='follow';

        # Follow This User
         # (user_1_id,user_2_id,f_type,f_date,f_time,follow_id)

         if($this->Query->insert("INSERT INTO follow VALUES('$this->Id','$this->uId','$follow','$this->Date','$this->Time',NULL)")){


              # Follow Was Successful
              echo json_encode(
                array(
                  "error" => false,
                  "message" => "Following",
                  "follow" => true,
                  "followers" => $this->Query->count("SELECT count(follow_id) FROM follow WHERE user_2_id = '$this->uId'"),
                  "following" => $this->Query->count("SELECT count(follow_id) FROM follow WHERE user_1_id = '$this->uId'")
                )
              );

              // For Adding Notification 
                $notifType = 'Started Following You';
                $type = 'account';
                if(!$this->Query->insert("INSERT INTO notif_holder VALUES('$this->Id', 0,'$this->uId','$notifType', 0, '$type', NULL)")){

                  exit();

                }

              // End Of Notification

           } else{

              # There Was Error With Following
                echo json_encode(
                  array(
                    "error" => true,
                    "message" => "Couldn't Follow This User"
                  )
                );

           }# End Of If 

      }else{


        # Unfollow This User
           if($this->Query->delete("DELETE FROM follow WHERE user_1_id = '$this->Id' AND user_2_id = '$this->uId'")){

              # Unfollow Was Successful
                echo json_encode(
                array(
                  "error" => false,
                  "message" => "Follow",
                  "follow" => false,
                  "followers" => $this->Query->count("SELECT count(follow_id) FROM follow WHERE user_2_id = '$this->uId'"),
                  "following" => $this->Query->count("SELECT count(follow_id) FROM follow WHERE user_1_id = '$this->uId'")
                )
              );

                // Add Notification To Show Unfollow
                $type = 'account';
                $notifType = 'Unfollowed You';
                $followTypeCheck = 'Started Following You';
                if($this->Query->delete("UPDATE notif_holder SET notif_type = '$notifType' WHERE user_id = '$this->Id' AND owner_id = '$this->uId' AND type = '$type' AND notif_type = '$followTypeCheck'")){

                  exit();

                }

           }else{

              # The Was Error With Unfollowing
                echo json_encode(
                  array(
                    "error" => true,
                    "message" => "Couldn't Unfollow This User"
                  )
                );
           } # End Of If

      } # End Of If

    } # End Of followUser()

    # Method To List Followers And Following
    private function listFollows(){

      require_once('C:/xampp/htdocs/kampuscrush/api/user/user.php');

       # Loop Through The List

      while($row = $this->Query->assoc($this->execQuery)){

         # Get External User Id
           if($this->Context == 2){

              # External User Id is on user_2_id
               $this->ExId = $row['user_2_id'];

           } else if($this->Context == 3){

              # External User Id is on user_1_id
               $this->ExId = $row['user_1_id'];

           }# End Of If

           $this->Info["list"] = true;
           $obj = new User(2, $this->ExId, $this->Id);
           $this->Info["follow_list"][] = $obj->init();
           

      } # End Of While Loop

      echo json_encode($this->Info);
    } # End of listFollows()

     # Method For Finding Trending HashTags
    private function followTrending(){

       # Loop Through The Table Rows Returned

         while($row = $this->Query->assoc($this->execQuery)){

          $line = $row['text'];
          

         } # End Of While Loop

    } # End Of followTrending()

    # Method For Showing People You Might Want To Follow
    private function youMightKnow(){

      require_once('C:/xampp/htdocs/kampuscrush/api/user/user.php');

      while($row = $this->Query->assoc($this->execQuery)){

        $this->ExId = $row['user_id'];

          if($this->Query->count("SELECT count(follow_id) FROM follow WHERE user_1_id = '$this->Id' AND user_2_id = '$this->ExId'") == 0){

             $this->Info["list"] = true;
             $obj = new User(2, $this->ExId, $this->Id);
             $this->Info["follow_list"][] = $obj->init();

          } # End Of If

      } # End Of Loop

      echo json_encode($this->Info);

    } # End of youMightKnow()

  } # End Of Class Definition!



  if(isset($_GET['context'])){
  	
    if(isset($_GET['u_id'])){

      new Follow($_GET['context'], "", $_GET['u_id']);

    }else{

      new Follow($_GET['context'],"","");
      
    }
  }


?>