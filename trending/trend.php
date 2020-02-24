
   <?php
      require_once('../i/api/include/sessions.php');

      $session = new Session();
      $tag = "";
      if(isset($_GET['tag'])){

        $tag = $_GET['tag'];


      }else{

        $tag = '#';

      }
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

      $session->log(getUserIpAddr(), $_SERVER["HTTP_USER_AGENT"], 'trending #'.$tag);
   ?>

<!DOCTYPE html>
<html>
<head>
	<title> Yazz | #<?php echo $tag; ?> </title>
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="../css/yazz.styles.css" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
</head>
<body id="body" class="">
  <script type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>
  <script type="text/javascript" src="../js/recorder.js"></script>
    <div class="" id="main">
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
    	<br class="visible-lg" />
    		<div class="row">
    			<div class="col-lg-3">
    				
    			</div>
    			<div class="col-lg-5" id="view">
    				
    			</div>
    			<div class="col-lg-4 visible-lg">
    			  <div class="">

            <div class="app-side-bar">

              <?php

                 require_once('../i/api/framework/layouts/post_layout.html');

              ?>

              <div class="space-small"></div>
              
              <?php

                 require_once('../i/api/framework/layouts/suggest.html');

              ?>

            </div>

          </div>

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

      Load('http://localhost/yazz/i/api/posts/?context=3&u_id=<?php echo $tag;  ?>');

        if(isMobile){

          UserInterface.navHeader();

        }

     }

   </script>
   <script type="text/javascript" src="../js/yazz.main.js"></script>
   
</body>
</html>