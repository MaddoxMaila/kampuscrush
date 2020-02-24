<?php
  
   class Messenger{

      #Class Variables
       private $UserId = 0;
       private $Query = "", $execQuery = "", $cxt = "";
       private $ChatUserId = 0;
       private $message = "",$count="";
       private $chats = "", $user = array(), $img = array(), $chatReply = array();

       /*
         $UserId Is For Logged In User Id

         $ChatUserId Is For Chat User Id, User Who Is Texting With Logged In User
       */
        function __construct($context,$loggedUserId = "",/* Next Variables Are For Sending Messages & Receiving */ $id = "",$message = ""){
             $this->cxt = $context;
             require_once('../framework/db/query.php');
             $this->Query = new Query();
             /*
           $context = 3
             If All Variables Are Set, User Is Sending A Message
           $context = 2
             Only $message Is Not Set, User Views Messages With A With Certain Chat
           $context = 1
             $id And $message Are Not Set, Logged In User Views Only Chats
            */  
             $this->UserId = $loggedUserId;

             switch ($this->cxt) {

               case 1 :

                    # Call View Chats Method
                    $this->viewChats();

                 break;
               
               case 2 :

                    # Call View Messages Method
                    $this->ChatUserId = $id;
                    $this->viewMessages();

                 break;

               case 3 :

                     # Call Send Messages Method
                     $this->ChatUserId = $id;
                     $this->message = $message;
                     $this->sendMessages();


                 break;

               default:
                 # code...

               echo json_encode(
                  array(
                    "error" => true,
                    "message" => "Messages Error"
                  )
                );

               exit();

                 break;
             }

        } # End Of __constructor() Method

        private function viewChats(){

         # Check If You Already Have Messages
         if($this->Query->count("SELECT count(chat_id) FROM chats WHERE user_id_one = '$this->UserId' OR user_id_two = '$this->UserId'") == 0){

              # Has Zero Chats
              echo json_encode(
               array(
                  "list" => false,
                  "message" => "Start A Conversation!"
               )
              );

         }else{
            
            # Atleast Has One Conversation Going
            $this->execQuery = $this->Query->rows("SELECT * FROM chats WHERE user_id_one = '$this->UserId' OR user_id_two = '$this->UserId' ORDER BY chat_id DESC");
            $x = 0;
            $this->chatReply["list"] = true;

            require_once('../user/user.php');

            while( $this->chats = $this->Query->assoc($this->execQuery)){

               # Check For Chat User Id
                /* if($this->UserId == $this->chats['user_id_one']){

                  $this->ChatUserId = $this->chats['user_id_two'];

                 }else{

                  $this->ChatUserId = $this->chats['user_id_one'];

                 } # End Of Else-If*/

                 $this->ChatUserId = ($this->UserId == $this->chats['user_id_one']) ? $this->chats['user_id_two'] : $this->chats['user_id_one'];

                 $User = new User(2, $this->ChatUserId, $this->UserId);

                 $this->chatReply["chats"][] = array(

                  # User Info 
                  "user_info" => $User->init(),

                  #Chat InFo
                  "chat" => array(
                    "message" => $this->chats['last_msg'],
                    "seen" => $this->chats['seen'],
                    "chat_id" => $this->chats['chat_id'],
                    "count" => $this->Query->count("SELECT COUNT(msg_id) FROM messages WHERE user_id_one = '$this->UserId' AND user_id_two = '$this->ChatUserId' OR user_id_one = '$this->ChatUserId' AND user_id_two = 'UserId'")
                   )

                 );

                 $x++;
                 
            } # End Of While Loop

            #Format The Data In Json Format
            echo json_encode($this->chatReply);

         } # End Of Else-If 

        } # End Of viewChats() Method

        # Method viewMessages() For Showing Conversation Between Two Users
        private function viewMessages(){

             # Check If This Two Users Have A Conversation Together
            if($this->Query->count("SELECT count(msg_id) FROM messages WHERE user_id_one = '$this->UserId' AND user_id_two = '$this->ChatUserId' OR user_id_one = '$this->ChatUserId' AND user_id_two = '$this->UserId'") == 0){

               echo json_encode(
                  array(
                     "chats" => false,
                     "message" => "Start A New Conversation!"
               )

              );
            }else{

                $this->execQuery = $this->Query->rows("SELECT * FROM messages WHERE user_id_one = '$this->UserId' AND user_id_two = '$this->ChatUserId' OR user_id_one = '$this->ChatUserId' AND user_id_two = '$this->UserId'");

               $this->chatReply['chats'] = true;
               
               require_once('../user/user.php');

               # While Loop For Getting Messages
               while($msg = $this->Query->assoc($this->execQuery)){

                $User = new User(2, $msg['user_id_one'], $this->UserId);

                  $this->chatReply["messages"][] = array(

                      "message" => $msg,

                      "user_info" => $User->init()

                  );

               } # End Of While Loop

               # Format chatReply Into Array
               echo json_encode($this->chatReply);
            }

        } # End Of viewMethod() Method

        # Method To Enable Sending Of Messages Between Users
        private function sendMessages(){

           # Check If The Already Have An Ongoing Conversation
           # So That We'd Be Able To Update The Current Message 'lst_msg' column
           # Delete The Current Last Message To Insert Another One
           if($this->Query->count("SELECT count(chat_id) FROM chats WHERE user_id_one = '$this->UserId' AND user_id_two = '$this->ChatUserId' OR user_id_one = '$this->ChatUserId' AND user_id_two = '$this->UserId'") == 1){

             # Since count == 1, Theres Already An Ongoing Conversation
             # Delete Then Insert, To Update
             if($this->Query->delete("DELETE FROM chats WHERE user_id_one = '$this->UserId' AND user_id_two = '$this->ChatUserId' OR user_id_one = '$this->ChatUserId' AND user_id_two = '$this->UserId'")){

               # Row Deletion Was Successful
               $this->text(); # For Insert, Calling An Auxilliary Method For Code Re-Use

             }else{

               # Row Deletion Was Unsuccessful
               # Error Reporting
               echo json_encode(
                  array(
                     "chats" => false,
                     "message" => "Row Deletion Failed"
                  )
               );

             } #End Of If-Else

           }else{

             # Theres No Ongoing Conversation
             # Insert, Signaling The Start Of A New Conversation
              $this->text(); # For Insert, Calling An Auxilliary Method For Code Re-Use
           } #End Of If-Else

        } # End Of sendMessages() Method

        # Auxilliary Methods, Methods Not Included In Context But Help Context Methods Achieve Their Full Potential

        # Method text() For Inserting Into The Database
        private function text(){

           # Insert First Inside The Temporary Chats Table
            if($this->Query->insert("INSERT INTO chats(user_id_one,user_id_two,last_msg,seen) VALUES('$this->UserId','$this->ChatUserId','$this->message',0)")){

               # Get Message Date & Time
               $mDATE = date("m/d/Y");
               $mTIME = date("g:ia");

               # If The Chats Table Insert Is Successful, Insert Into The Main Table
               if($this->Query->insert("INSERT INTO  messages(user_id_one,user_id_two,message,msg_date,msg_time,seen) VALUES('$this->UserId','$this->ChatUserId','$this->message','$mDATE','$mTIME',0)")){

                  #If The Insert Is Also Successful, Refresh The Whole Screen To Show Current Messages Including The One Just Has Been Sent
                  $this->viewMessages();

               }else{

                  # Show Error Message
                  echo json_encode(
                     array(
                        "chats" => false,
                        "message" => "Message Sent Unsuccessful"
                     )
                  );
               } # End Of If-Else

            }else{

               # Show Error Message
               echo json_encode(
                  array(
                     "chats" => false,
                     "message" => "Chat Sent Unsuccessful"
                  )
               );
            } # End Of If-Else

        } #End Of text() Method

   } # End Of Class

  #Test Class
  if(isset($_GET['id']) && isset($_GET['cxt'])){
    if($_GET['cxt'] == 1){

      new Messenger($_GET['cxt'],$_GET['id']);

    }else if($_GET['cxt'] == 2 && isset($_GET['uid'])){

      new Messenger($_GET['cxt'],$_GET['id'],$_GET['uid']);

    }else if($_GET['cxt'] == 3 && isset($_GET['uid']) && isset($_GET['message'])){

      new Messenger($_GET['cxt'],$_GET['id'],$_GET['uid'],$_GET['message']);

    }else{

      # If The Right Context Is Not Met
      echo json_encode(
          array(
             "chats" => false,
             "message" => "Error In Context"
          )
      );
    }
}else{
   # If Context & Logged In User Id Are Not Set
   echo json_encode(
       array(
          "chats" => false,
          "message" => "Server Side Error"
       )
   );
}


?>