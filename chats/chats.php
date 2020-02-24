
   <?php
      require_once('../i/api/include/sessions.php');

      $session = new Session();
   ?>

<!DOCTYPE html>
<html>
<head>
	<title> Yazz | Home </title>
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="../css/yazz.styles.css" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
  <style type="text/css">

    .chat-view{
       border: 0.05em solid lightgrey;
       width: 25%;
       height: 540px;
       position: fixed;
       overflow-y: auto;
    }

    .messages-view{
      border: 0.05em solid lightgrey;
      width: 40%;
      height: 540px;
      position: fixed; 
      overflow-y: auto;
    }
    .app-chat-nav-top{
      position: fixed;
      width: 27%;
    }
    .app-chat-view{
      width: 100%;
      height: auto;
    }

  </style>
</head>
<body id="body" class="">
  <script type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>
    <div class="container-fluid">
    	 <?php 
         
            # Get Navbar
            require_once('../i/api/framework/navigation/navbar.html');

            # Get Modal
            require_once('../i/api/framework/modal/modal.html');

             # Get File Input Form
            require_once('../i/api/framework/forms/uploadForm.html');

            # Get Toast
            require_once('../i/api/framework/modal/toast.html');

        ?>
    	
    	<br />
    	<br />
    	<br />
    	<br />
    		<div class="row">
    			<div class="col-lg-2">
    				kjjjjjn
    			</div>
    			<div class="col-lg-3" id="">
            <div class="chat-view">
    				   <div class="app-chat-nav-top">
            
            <table class="app-modal-nav-table">
              <tr>
                <td class="app-modal-nav-tab app-modal-navback-tab app-tab">
                  <center>
                    <a class="modal-back-btn modal-close">
                      <span class="glyphicon glyphicon-chevron-left"></span>
                    </a>
                  </center>
                </td>
                <td class="app-modal-nav-tab app-modal-name-tab app-tab">
                  <center>
                    <span class="modal-nav-name"></span>
                  </center>
                </td>
                <td class="app-modal-nav-tab app-modal-nav-options app-tab">
                  <center>
                    <a class="modal-options">
                      <span class="glyphicon glyphicon-option-vertical"></span>
                    </a>
                  </center>
                </td>
              </tr>
            </table>
            
          </div>
          <br>
          <br>
          <div class="app-chat-view"></div>
            </div>
    			</div>
    			<div class="col-lg-5">
    			   <div class="app-modal-view">
                gbhnjmkbhnj   
             </div>
    		  </div>
          <div class="col-lg-2">
            hbtgvrfcex
          </div>
    		</div>
    </div>

   <script type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>
   <script type="text/javascript" src="../js/bootstrap.min.js"></script>
   <script type="text/javascript" src="../js/populr.js"></script>
   <script type="text/javascript" src="../js/yazz.script.js"></script>

    <script type="text/javascript">
   	   let user =<?php echo json_encode($session->resp); ?>;

         window.onload = () => {
             if(!user.isLogged){
                window.location = '../home/';
             }else{

               let ui = new UI(document);

               ui.chatsUI('.app-chat-view','.modal-nav-name');

             } // End Of Logged In Check
         } // End Of Onload
    </script>

   
</body>
</html>