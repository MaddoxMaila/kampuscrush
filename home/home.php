
   <?php
      require_once('../api/include/sessions.php');
      require_once('../api/posts/media.php');

      $session = new Session();

      function getUserIpAddr(){
        $ip = "";
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){

        //ip from share internet
        $ip = $_SERVER['HTTP_CLIENT_IP'];

    }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){

        //ip pass from proxy
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];

    }else{

        $ip = $_SERVER['REMOTE_ADDR'];

    }

    return $ip;

    }

      $session->log(getUserIpAddr(), $_SERVER["HTTP_USER_AGENT"], 'home');
   ?>

<!DOCTYPE html>
<html>
<head>
	<title> KampusCrush | Home </title>
	<link rel="stylesheet" type="text/css" href="../static/css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="../static/css/yazz.styles.css" />
  <link rel="stylesheet" type="text/css" href="../static/css/flickity.css" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
</head>
<body id="body" class="">
   <!-- Third Party Scripts -->
   <script type="text/javascript" src="../static/js/jquery-3.2.1.min.js"></script>
   <script type="text/javascript" src="../static/js/bootstrap.min.js"></script>
   <script type="text/javascript" src="../static/js/flickity.pkgd.js"></script>
   <script type="text/javascript" src="../static/js/wavesurfer.js"></script>
   <script type="text/javascript" src="../static/js/mansory.js"></script>
   <!-- My Scripts -->
   <script type="text/javascript" src="../static/js/attack.js"></script>
   <script type="text/javascript" src="../static/js/datamodels.js"></script>
    <div class="" id="main">
    	 <?php 
         
            # Get Navbar
            require_once('../api/framework/navigation/navbar.html');

            # Get Modal
            require_once('../api/framework/modal/modal.html');

            # Get File Input Form
            require_once('../api/framework/forms/uploadForm.html');

            # Get Toast
            require_once('../api/framework/modal/toast.html');
        ?>
    	
    	<br />
    	<br />
    	<br class="visible-lg" />
      <div class="app-user-info-nav navbar-fixed-top home-top-nav-xs visible-xs">
        
          <div class="media">
            <div class="media-top media-left"></div>
            <div class="media-body"></div>
            <div class="media-top media-right">
              <center>
                <a class="share-btn">
                  <span class="share-icon"></span>
                  <span class="icon-text app-grey-text">Share</span>
                </a>
              </center>
            </div>
          </div>


      </div>
      <!-- SHARE - UPLOAD FOR MOBILE -->
      <?php

         require_once('../api/framework/layouts/mobileShare.html');

      ?>
    	<div class="space-small"></div>
      <div class="space-small"></div>
    		<div class="row">
    			<div class="col-lg-3">
            <?php 

              require_once('../api/framework/layouts/leftSideBar.html');

            ?>
    			</div>
    			<div class="col-lg-5">
            <div id="app-viewport"></div>
            <div class="extra-viewport"></div>
            <div class="space-large"></div>
            <div class="space-large"></div>

            <?php

              require_once('../api/framework/layouts/forgotpass.html');

            ?>
    				
    			</div>
    			<div class="col-lg-4">

            <div class="app-side-bar">

              <?php

                 require_once('../api/framework/layouts/post_layout.html');

              ?>

              <div class="space-small"></div>
              
              <?php

                 require_once('../api/framework/layouts/suggest.html');

              ?>

            </div>


    		  </div>
    		</div>
    </div>
   <script type="text/javascript">

     let user ={

         user : <?php echo json_encode($session->resp); ?>,
         model : new UserModel(<?php echo json_encode($session->user()); ?>)

       };


   </script>
    
   <script type="text/javascript" src="../static/js/kampuscrush.js"></script>
    <script type="text/javascript" src="../static/js/main.kampuscrush.js"></script>
    <script type="text/javascript" src="../static/js/Recorderjs-master/dist/recorder.js"></script>
    <script type="text/javascript" src="../static/js/login.kampuscrush.js"></script>

   
</body>
</html>