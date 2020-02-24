<?php
$cxt = $id = $hashed = "";

  if(isset($_GET['cxt'])){

  	$cxt = $_GET['cxt'];
  	$id = $_GET['id'];
  	$hashed = $_GET['hash'];

  }else{
  	exit();
  }
  require_once('../i/api/include/sessions.php');

      $session = new Session();
      if($session->log == true){
      	header("location : https://kampuscrush.com/home/");
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

      $session->log(getUserIpAddr(), $_SERVER["HTTP_USER_AGENT"], 'login');

?>
<!DOCTYPE html>
<html>
<head>
	<title>KampusCrush | Login</title>
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="../css/yazz.styles.css" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
	<style type="text/css">
	.login-navbar{
		height:60px;
	}
	.crush-update-btn{
	   	width: 100%;
	   }
	.login-create-div{
		width:0;
		background-color: white !important;
		z-index: 9999 !important;
		height: 100%;
		position: fixed;
		right: 0px;
		top:0;
	}
	</style>
</head>
   <body>
   	<script type="text/javascript" src="../js/jquery-3.2.1.min.js"></script>
	  <script type="text/javascript" src="../js/bootstrap.js"></script>
	  <script type="text/javascript" src="../js/populr.js"></script>
	  <script type="text/javascript">
		

	  </script>
	  <div class="container-fluid">
	  	<div class="nav navbar navbar-fixed-top login-navbar" style="background-color: #fff">
	  		<div class="row">
	  		<div class="col-md-12">
	  			<div style="width: 100%;height: 58px;border:0.03em solid lightgrey;padding: 1%;">
	  				<table style="width: 100%;">
	  					<tr>
	  						<td class="app-tab" style="width: 15%;">
	  							<center>
	  								<a href="https://kampuscrush.com/home/" class="btn btn-default">
	  									<span class="glyphicon glyphicon-home"></span>
	  									<span class="">Home</span>
	  								</a>
	  							</center>
	  						</td>
	  						<td class="app-tab" style="width: 55%;">
	  							<h4>
	  								KampusCrush
	  							</h4>
	  						</td>
	  						<td class="app-tab" style="width: 30%;">
	  							<center>
	  								<a href="../login/" class="btn btn-default form-control"  id="login-create-btn">
	  				           Sign In | Sign Up
	  				         </a>
	  							</center>
	  						</td>
	  					</tr>
	  				</table>
	  			</div>
	  		</div>
	  	</div>
	  	</div>
	  	    <br />
	  			<br />
	  			<br />
	  			<br />
	  			<br class="visible-lg" />

	  	<div class="row container-fluid">
	  		<div class="col-md-3">
	  		</div>
	  		<div class="col-md-5" style="border: 0.03em solid lightgrey; background-color: #fff">
	  			<div >
	  			<h4 class="login-login-header">
	  					&nbsp;&nbsp;&nbsp;Reset Password
	  				</h4>
	  			<center>
	  				<div class="login-login-form">
	  					<div class="form-group  container-fluid">
	  						<span class="login-login-error" id="dismiss-reporting"></span>
		            <form id="form-forgot" class="form-group" method="POST">
			            <div class="input-group input-group-md" data-toggle="tooltip" title="Password">
				          <span class="input-group-addon">
					        <span class="glyphicon glyphicon-lock"></span>
				          </span>
				          <input type="password" name="password" id="email" class="form-control" placeholder="Password" required/>
			            </div>
			            <br />
			            <div class="input-group input-group-md" data-toggle="tooltip" title="Your Comfirm Password">
			            	<span class="input-group-addon">
			            		<span class="glyphicon glyphicon-lock"></span>
			            	</span>
			            	<input type="password" name="re_password" id="password" class="form-control" placeholder="Comfirm Password" required />
			            	<input type="hidden" name="context" value="<?php echo $cxt; ?>">
			            	<input type="hidden" name="id" value="<?php echo $id; ?>" />
			            	<input type="hidden" name="hash" value="<?php echo $hashed; ?>">
			            </div>
			            <br />
			            <table style="width: 100%;">
			            	<tr>
			            		<td class="app-tab">
			            			<center>
			            				<button type="submit" class="btn btn-default crush-update-btn">Reset</button>
			            			</center>
			            		</td>
			            		<td class="app-tab visible-lg" style="width: 45%;"></td>
			            		<td class="app-tab" style="padding-left: 2%;">
			            		</td>	
			            	</tr>
			            </table>
			          </form>
			        </div>
	  				</div>
	  			</center>
	  		</div>
	  		</div>
	  	</div>
	  		</div>
	  		<div class="col-md-4">
	  		 
	  		</div>

	  	</div>
	  	
	  </div>
   	<script type="text/javascript">

   		$(document).ready(function(){
   			$('[data-toggle="tooltip"]').tooltip();

   			$("#form-forgot").submit(function(e){

   				e.preventDefault();

   				$.ajax({
   					url: "../i/api/framework/mailer/",
   					method: "POST",
   					data: new FormData(this),
   					contentType:false,
   					processData:false,
   					success: function(data){
   						let resp = JSON.parse(data);
   						html('dismiss-reporting', resp.message);
   					}
   				});

   			});

   		});
   	</script>
   </body>
</html>