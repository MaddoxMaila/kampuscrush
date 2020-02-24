<?php
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
	  								<button class="btn btn-default form-control" onclick="__open()" id="login-create-btn">
	  				           Register
	  				         </button>
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
	  					&nbsp;&nbsp;&nbsp;Login
	  				</h4>
	  			<center>
	  				<div class="login-login-form">
	  					<div class="form-group  container-fluid">
	  						<span class="login-login-error" id="login-login-error"></span>
		            <form id="crush-login-form" class="form-group" method="POST">
			            <div class="input-group input-group-md" data-toggle="tooltip" title="Your Email Address">
				          <span class="input-group-addon">
					        <span class="glyphicon glyphicon-link"></span>
				          </span>
				          <input type="text" name="email" id="email" class="form-control" placeholder="Email Address" required/>
			            </div>
			            <br />
			            <div class="input-group input-group-md" data-toggle="tooltip" title="Your Password">
			            	<span class="input-group-addon">
			            		<span class="glyphicon glyphicon-lock"></span>
			            	</span>
			            	<input type="Password" name="password" id="password" class="form-control" placeholder="Password" required />
			            </div>
			            <br />
			            <table style="width: 100%;">
			            	<tr>
			            		<td class="app-tab">
			            			<center>
			            				<button type="submit" class="btn btn-default crush-update-btn">Login</button>
			            			</center>
			            		</td>
			            		<td class="app-tab visible-lg" style="width: 45%;"></td>
			            		<td class="app-tab" style="padding-left: 2%;">

			            			<a class="" data-toggle="modal" data-target=".forgot-password">
	  			                <span class="app-bold-text" style="color: #5bc0de">Forgot Password?</span>
	  			               </a>
	  			              </center>
			            		</td>	
			            	</tr>
			            </table>
			          </form>
			        </div>
	  				</div>
	  			</center>
	  		</div>
	  	<div class="modal fade forgot-password" id="scheck" role="dialog">
	        <div class="modal-dialog">
		       <div class="modal-content">
			       <div class="modal-header">
			       	 <center>
			       	 	<h3>
			       	 		Forgot Password?
			       	 	</h3>
			       	 </center>
				     </div>
			     <div class="modal-body" id="forgot-password">
				     <div class="forgot-forgot-password">
				     	<div class="container-fluid">
				     		<form class="form-group" id="form-forgot">
				     			<center>
				     			<span class="error-reporting" id="dismiss-reporting"></span>
				     		</center>
				     			<div class="input-group input-group-md" data-toggle="tooltip" title="Your Email Address">
				     				<span class="input-group-addon">
				     					<span class="glyphicon glyphicon-link"></span>
				     				</span>
				     				<input type="text" required id="forgot-email" name="email" class="form-control" placeholder="Enter Email" />
				     				<input type="hidden" name="context" value="1" />
				     			</div>
				     			<br />
				     			<button type="submit" class="btn btn-default form-control">Send Reset Link To Email</button>
				     		</form>
				     	</div>
				     </div>
			     </div>
		      <div class="modal-footer">
		      	<button class="btn btn-default" data-dismiss="modal">Dismiss</button>
	        </div>
	     </div>
	     </div>
       </div>
	  		</div>
	  	</div>
	  		</div>
	  		<div class="col-md-4">
	  		 <div class="app-block-popout">
	  			<div class="login-create-div" id="login-create-div">
	  				<div class="app-register">
	  					  <table class="table-bordered" style="width: 100%">
	  					  	<tr>
	  					  		<td class="app-tab">
	  					  			<h3> &nbsp;&nbsp;Register</h3>
	  					  		</td>
	  					  		<td class="app-tab">
	  					  			<center>
	  					  				<a onclick="__open()">
	  					  					<span class="glyphicon glyphicon-chevron-right"></span>
	  					  				</a>
	  					  			</center>
	  					  		</td>
	  					  	</tr>

	  					  </table>


	  				</div>
	  				<br />
	  				<form id="crush-register-form" class="form-group container-fluid" method="POST">
	  					<span id="register-on-error"></span>
			            <div class="input-group input-group-md" data-toggle="tooltip" title="Your Handle">
				          <span class="input-group-addon">
					        <span class="glyphicon glyphicon-link"></span>
				          </span>
				          <input type="text" name="h" id="handle" class="form-control" placeholder="User Handle You'll Be Using" required />
			            </div>
			            <br />
			            <div class="input-group input-group-md" data-toggle="tooltip" title="Your Username">
			            	<span class="input-group-addon">
			            		<span class="glyphicon glyphicon-lock"></span>
			            	</span>
			            	<input type="text" name="u" id="username" class="form-control" placeholder="Your Username, Can Be Changed" required>
			            </div>
			            <br />
			            <div class="input-group input-group-md" data-toggle="tooltip" title="Your Valid Email Address">
			            	<span class="input-group-addon">
			            		<span class="glyphicon glyphicon-link"></span>
			            	</span>
			            	<input type="text" name="e" id="email-reg" class="form-control" placeholder="Your Email Address" required>
			            </div>
			            <br />
			            <div class="input-group input-group-md" data-toggle="tooltip" title="Your University Student Number">
			            	<span class="input-group-addon">
			            		<span class="glyphicon glyphicon-barcode"></span>
			            	</span>
			            	<input type="text" name="s" id="student" class="form-control" placeholder="Student Number" required>
			            </div>
			            <br />
			            <div class="input-group input-group-md" data-toggle="tooltip" title="Password Youll Be Using">
			            	<span class="input-group-addon">
			            		<span class="glyphicon glyphicon-lock"></span>
			            	</span>
			            	<input type="password" name="p" id="password-reg" class="form-control" placeholder="Password" required>
			            </div>
			            <br />
			            <div class="input-group input-group-md" data-toggle="tooltip" title="Reconfirm The Above Password">
			            	<span class="input-group-addon">
			            		<span class="glyphicon glyphicon-lock"></span>
			            	</span>
			            	<input type="password" name="r" id="re-password" class="form-control" placeholder="Reconfirm Password" required>
			            </div>
			            <br />
			            	<button type="submit" class="btn btn-default crush-update-btn">Sign Up</button>
			          </form>
	  			</div>
	  		</div>
	  		</div>

	  	</div>
	  	
	  </div>
   	<script type="text/javascript">
   		var isOpen = false;
   		 function __open(){
   			if(isOpen == false){
   				select('.app-block-popout').style.display = 'block';
   				  if(screen.width < 600){
   				  	tag("login-create-div").style.width = "100%";
   				  }else{
   				  	tag("login-create-div").style.width = "530px";
   				  }
   				tag("login-create-div").style.boxShadow = "0px 5px 5px 0px rgb(220,220,220,0.6)";
   				tag("login-create-div").style.transitionDuration = "0.6s";
   				
   				isOpen = true;
   			}else if(isOpen == true){

   				select('.app-block-popout').style.display = 'none';
   				tag("login-create-div").style.width = "0";
   				tag("login-create-div").style.transitionDuration = "0.6s";
   				tag("login-create-div").style.boxShadow = "0px 0px 0px 0px rgb(220,220,220,0.6)";
   				
   				isOpen =false
   			}
   		}

   		function isEmpty(){
   			if(select("#email") == "" && select("#password")){
   				Html("login-login-error","Login Fields Empty.");
   				return false;
   			}else if(select("#email") == "" || select("#password") == ""){
   				Html("login-login-error","Fill In All Fields.");
   				return false;
   			}else{
   				return true;
   			}
   		}
   		function __redirect(str){
   			data = JSON.parse(str);
   				if(data["error"] == false){
   					if(data["redirect"] == true){
   						window.location = data["url"];
   					}else{
   						Html("login-login-error",data["message"])
   						Html("register-on-error",data["message"]);
   					}
   				}else{
   					Html("login-login-error",data["message"]);
   					Html("register-on-error",data["message"]);
   				}
   			
   		}
   		$(document).ready(function(){
   			$('[data-toggle="tooltip"]').tooltip();
   			$("#crush-login-form").submit(function(e){
   				e.preventDefault();
   				   if(isEmpty() == true){
   				   	$.ajax({
   				   		url:"../i/api/login/",
						    method:"POST",
						    data:new FormData(this),
						    contentType:false,
						    processData:false,
						    success:function(data){
						    	  __redirect(data);
						    }
   				   	});
   				   }
   			});

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

   			$("#crush-register-form").submit(function(e){
   				e.preventDefault();
   				$.ajax({
   					url:"../register/",
   					method:"POST",
   					data:new FormData(this),
   					contentType:false,
   					processData:false,
   					success:function(data){
   						__redirect();
   					}
   				});
   			});
   		});
   	</script>
   </body>
</html>