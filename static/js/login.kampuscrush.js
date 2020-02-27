
window.addEventListener('DOMContentLoaded', () => {

	jQuery.noConflict();

	$.get('.nav-user-link').onclick = () => {

      $.html(user.user.isLogged ? '.left-back-btn-user-xs' : '.left-back-btn-xs', Icons.back({color : '#111', width : 24, height : 24}));

      UI.backButton({btn : user.user.isLogged ? '.left-back-btn-user-xs' : '.left-back-btn-xs'}, () => {

         $.get('.app-left-bar').style.display = 'none';

      } /* End Of Callback */);

      $.get($.isMobile ? '.home-user-header-text' : '').classList.add('icon-text');
      $.get('.app-left-bar').style.display = 'block';

    } // End Of Onclick 

  jQuery(document).ready(() => {

  if(!user.user.isLogged){

    jQuery('.home-user-wrapper').hide();
    jQuery('.register-form').hide();
    let toggle = false;

    jQuery($.isMobile ? '.home-sign-up-xs' : '.home-sign-up').click(() => {

       if(toggle){

         jQuery('.login-form').show();
         jQuery('.register-form').hide();
         toggle = false;

         $.html($.isMobile ? '.home-sign-up-xs' : '.home-sign-up', 'To Register');

       }else{

         jQuery('.login-form').hide();
         jQuery('.register-form').show();
         toggle = true;
         $.html($.isMobile ? '.home-sign-up-xs' : '.home-sign-up', 'To Login');

       }

    }); // End Of Sign Up Click

    }else{

      jQuery('.home-login-wrapper').hide();
      $.get('.home-user-body').append(UI.UserCard(user.model));

    }

  }); // End Of Jquery Init

     $.get('.compose-img').src = user.user.img_url;

    $.get('.nav-user-img').src = user.user.img_url;
    $.html('.nav-user-handle', user.user.isLogged ? `@${user.user.handle.length > 7 ? user.user.handle.substring(0, 7) + '...' : user.user.handle} ` : '@default');

});

class Login{


	constructor(){

		this.URL = {
			login : '../api/login/',
			register : '../api/register/',
			forgot : '../api/mail/'
		}

		this.buttons = {};

	} /* End Of Constructor */

	setBtns(args){

		this.buttons.loginBtn = args.login;
		this.buttons.registerBtn = args.register;
		// this.buttons.forgotBtn = args.forgot;

	}
	getUrl(){ return this.URL; } /* End Of getUrl */
	getBtn(){ return this.buttons; } /* End Of getBtns */

	onSubmit(args){

		  args.setButtons(); /* Set All Buttons Before Est */

		 /*

		   Est The Login Button

		 */

		  this.getBtn().loginBtn.addEventListener('submit', (e) => {

		  	  e.preventDefault();

		  	  this.onLogin();

		  }, false);

		  /*

		     Est The Register Button

		  */

		  this.getBtn().registerBtn.addEventListener('submit', (e) => {

		  	  e.preventDefault();

		  	  this.onRegister();

		  }, false);

		  /*

		    Est The Forgot Password Button

		  */

		  /*this.getBtn().forgotBtn.addEventListener('submit', (e) => {

		  	  e.preventDefault();

		  	  this.onForgotPassword();

		  }, false);*/

	} /* End Of Submit */

	/*

	  Method To Process The Response From Server

	*/
	onResponse(res){

		$.toast({text : res.message, time : 4000});

	} /* End Of Response */

	/*

	  Method To Handle The Registration Process

	*/
	onRegister(){

		if($.value('.reg-email') == '' || $.value('.reg-username') == '' || $.value('reg-password') == ''){

			$.toast({text : 'Make Sure All Credential Fields Are Filled', time : 4000});

		}else{

			$.req({method : 'POST', url : this.getUrl().register, form : new FormData($.get('.register-form')), bar : false}, (response) => {
				  
				  this.onResponse(response);

			});

		}

	} /* End Of Register */

	/*

	  Method To Handle The Login Process

	*/
	onLogin(){

		if($.value('.login-email') == '' || $.value('.login-password') == ''){

			$.toast({text : 'Make Sure All Credential Fields Are Filled', time : 4000});

		}else{

			$.req({method : 'POST', url : this.getUrl().login, form : new FormData($.get('.login-form')), bar : false}, (response) => {
				
				this.onResponse(response);

			});

		}

	} /* End Of Login */
	onForgotPassword(args){} /* End Of Forgots */

} /* End Of Class */


const mLogin = new Login(); /* Create A Login Object */


mLogin.onSubmit({

	setButtons : () => {

		mLogin.setBtns({

			login : $.get('.login-form'),
			register : $.get('.register-form')/*,
			forgot : $.get('.forgot-button')*/

		}); /* End Of SetBtns */

	} /* End Of set Buttons */

}); /* End Of Submit */

