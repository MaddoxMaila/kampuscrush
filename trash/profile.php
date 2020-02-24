<?php
      require_once('../api/include/sessions.php');

      require_once('../api/user/user.php');

      $handle = trim(str_replace("/","",substr($_SERVER['REQUEST_URI'], 16)));

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

      $session->log(getUserIpAddr(), $_SERVER["HTTP_USER_AGENT"], 'profile -'.$handle);
   ?>
<!DOCTYPE html>
<html>
<head>
	<title id="app-title">KampusCrush | @<?php echo $handle; ?></title>
	<link rel="stylesheet" type="text/css" href="../../static/css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="../../static/css/yazz.styles.css" />
  <link rel="stylesheet" type="text/css" href="../../static/css/flickity.css" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
	<style type="text/css">
	
	  @media only screen and (min-width: 700px){

	  	.app-profile-nav{
	  		position: fixed;
	  		top: 59px;
		    width: 40.45%;
		    background-color: #FBFCFC;
		    height: 45px;
		    z-index: 999;
		  }

		  .user-right-bar{
		    padding: 1%;
		    height: 400px;
		    position: fixed;
		    width: 22.59%;
		  }

		  .app-user-info-body{
		  	position: fixed;
		  	width: 32%;
		  }

		  .col-4{
		  	padding-left: 2%;
		  }
	  }

	</style>
</head>
<body id="body" class="" style="overflow-x: hidden;">
	<!-- Third Party Scripts -->
   <script type="text/javascript" src="../../static/js/jquery-3.2.1.min.js"></script>
   <script type="text/javascript" src="../../static/js/bootstrap.min.js"></script>
   <script type="text/javascript" src="../../static/js/flickity.pkgd.js"></script>
   <script type="text/javascript" src="../../static/js/wavesurfer.js"></script>
   <script type="text/javascript" src="../../static/js/mansory.js"></script>
   <!-- My Scripts -->
   <script type="text/javascript" src="../../static/js/attack.js"></script>
   <script type="text/javascript" src="../../static/js/datamodels.js"></script>
	<div class="overrall">
		
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
    	<br />
    	<br  class="visible-lg" />
		<div class="row">
			
			<div class="col-md-4 col-4">
				<div class="app-user-info-body">
					<div class="app-user-info-nav">
						<table class="app-user-info-nav-table">
							<tr class="app-user-info-nav-tr">
								<td class="app-tab app-user-info-nav-tab back-tab">
									<center>
										<a class="profile-back-btn">
											
										</a>
									</center>
								</td>
								<td class="app-tab app-user-info-nav-tab user-name-tab">
									<a class="name-link" onclick="window.location = `../${UserAccount.getBasic().handle}`">
										<span class="profile-user-name app-bold-text"></span>
										<br>
										<span class="profile-user-handle app-grey-text"></span>
									</a>
								</td>
								<td class="app-tab app-user-info-nav-tab first-buttons-tab">
								</td>
								<td class="app-tab app-user-info-nav-tab second-buttons-tab">
								</td>
							</tr>
						</table>
					</div>

					<div class="app-user-cover-image" style="height: 240px;">
						
					</div>

					<div class="app-full-user-info-body container-fluid">
						
						<!-- Start Of Media -->
						<div class="profile-user-info">
						<div class="media">
						  
						  <div class="media-left media-top">
						  	 <img width="70" height="70" class="img-circle media-object profile-user-profile-img" />
						  </div>

						  <div class="media-body">
						  	<span class="user-profile-handle app-bold-text"></span>
						  	<div class="profile-user-bio" style="padding: 1%;"></div>
						  	<table class="app-full-user-info-table">
							<tr class="app-follows-tr">
								<td class="app-tab app-full-info-tab following-tab">
										<a class="following-btn">
											<span class="following-text-count app-max-text"> 

											</span>
											<span class="app-grey-text">
												Following
											</span>
										</a>
								</td>
								<td class="app-tab app-full-info-tab followers-tab">
									<a class="followers-btn">
										<span class="followers-text-count app-max-text">
											
										</span>
										<span class="app-grey-text">
											Followers
										</span>
									</a>
								</td>
								
							</tr>
						</table>

					</div>
					<!-- End of Media -->
					<div class="space-small visible-xs"></div>

					<div class="space-large visible-lg"></div>
					<table class="app-full-user-info-body">
							<tr class="icons-tr">
								<td class="app-tab total-media-tab camera-icon">
									<center>
										<a class="camera-btn media-btn">
											
										</a>
									</center>
								</td>
								<td class="app-tab total-media-tab video-icon">
									<center>
										<a class="video-btn media-btn">
											
										</a>
									</center>
								</td>
								<td class="app-tab total-media-tab audio-icon">
									<center>
										<a class="audio-btn media-btn">
											
										</a>
									</center>
								</td>
							</tr>
							<tr class="count-tr">
								<td class="app-tab total-media-tab camera-count-tab">
									<center>
										<a class="camera-btn media-btn">
											<span class="camera-count app-bold-text"></span>
										</a>
									</center>
								</td>
								<td class="app-tab total-media-tab video-count-tab">
									<center>
										<a class="video-btn media-btn">
											<span class="video-count app-bold-text"></span>
										</a>
									</center>
								</td>
								<td class="app-tab total-media-tab audio-count-tab">
									<center>
										<a class="audio-btn media-btn">
											<span class="audio-count app-bold-text"></span>
										</a>
									</center>
								</td>
							</tr>
						</table>

				</div>
			</div>
						<!-- End Of Media -->
					
						
					</div>
				</div>
			</div>

			<div class="col-md-5">
				 <div class="app-profile-nav">
				 	<br class="visible-lg" />
				 	<div class="action-profile-nav">
				 	 <table class="app-profile-nav-table">
				 	 	 <tr>
				 	 	 	 <td class="app-tab app-profile-tab list-tab">
				 	 	 	 	 <center>
				 	 	 	 	 	 <a class="list-btn user-nav-btn">
				 	 	 	 	 	 	</a>
				 	 	 	 	 </center>
				 	 	 	 </td>
				 	 	 	 <td class="app-tab app-profile-tab grid-tab">
				 	 	 	 	 <center>
				 	 	 	 	 	<a class="grid-btn user-nav-btn">
				 	 	 	 	 		
				 	 	 	 	 	</a>
				 	 	 	 	 </center>
				 	 	 	 </td>
				 	 	 	 <td class="app-tab app-profile-tab saved-tab">
				 	 	 	 	 <center>
				 	 	 	 	 	<a class="saved-btn user-nav-btn">
				 	 	 	 	 		
				 	 	 	 	 	</a>
				 	 	 	 	 </center>
				 	 	 	 </td>
				 	 	 </tr>
				 	 </table>
				 	</div>
				 </div>
				  <div class="space-large visible-lg"></div>
				   <div class="space-large visible-lg"></div>
				   <div class="space-small visible-xs"></div>
				   <div id="app-viewport"></div>

				 <div class="space-large"></div>
				 <div class="space-large"></div>
			</div>
			<div class="col-md-3">
				<div class="user-right-bar">
					hello
				</div>

			</div>


		</div>
	</div>
	 
	<script type="text/javascript" src="../../static/js/kampuscrush.js"></script>
  <script type="text/javascript">
   	   let user ={

         user : <?php echo json_encode($session->resp); ?>,
         model : new UserModel(<?php echo json_encode($session->user()); ?>)

       };

       <?php 

          $User = new User(2,$handle,"");

       ?>

   	   const UserAccount = new UserModel(<?php echo json_encode($User->init()); ?>);
    </script>
  <script type="text/javascript" src="../../static/js/user.kampuscrush.js"></script>
  <script type="text/javascript" src="../../static/js/Recorderjs-master/dist/recorder.js"></script>
   
</body>
</html>