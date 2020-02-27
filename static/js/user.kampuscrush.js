

  if($.isMobile){

  	NAV.setAttribute('class', 'app-user-info-nav navbar-fixed-top');

  	$.get('.nav-user-img').src = user.user.img_url;
    $.html('.nav-user-handle', user.user.isLogged ? `@${user.user.handle.length > 7 ? user.user.handle.substring(0, 7) + '...' : user.user.handle} ` : '@default');
    $.get('.nav-user-link').href = user.user.isLogged ? `http://localhost/kampuscrush/usr/${user.user.handle}` : 'http://localhost/kampuscrush/login/';

  }

  /* SET USER DETAILS */


  $.get('.app-user-cover-image').style.backgroundImage = `url(${UserAccount.getImgs().cover})`;
  $.get('.profile-user-profile-img').src = UserAccount.getImgs().profile;
  $.html('.followers-text-count', UserAccount.getActivity().followers);
  $.html('.following-text-count', UserAccount.getActivity().follows);
  $.html('.camera-count', UserAccount.getMedia().images);
  $.html('.video-count', UserAccount.getMedia().videos);
  $.html('.audio-count', UserAccount.getMedia().audios);
  $.get('.profile-user-bio').append(UI.UserInfo(UserAccount));

  $.html('.profile-back-btn', Icons.back({color : '#111', width  : 24, height : 24}));
  $.get('.profile-back-btn').onclick = () => {

    history.back();

  }
  $.html('.profile-user-name', UserAccount.getBasic().name);
  $.html('.profile-user-handle', `@${UserAccount.getBasic().handle}`);
  $.html('.user-profile-handle', `${UserAccount.getBasic().name}`);


  /* Window LOAD */

  class UserRequests{

    constructor(){

      this.FollowModelList = [];

    } // End Of Constructor

    Follows(args){

       args.btn.onclick = $.isMobile ? () => {

         UI.ScreenOverlay({nav : true, header : args.head}, () => {});

         $.req({method : 'GET', url : args.url, form : null, bar : false}, (response) => {

             if(response.list){

              R.UserModelList = [];
              $.removeLoader();

                response.follow_list.forEach((UserItem, index) => {

                   R.UserModelList.push(new UserModel(UserItem));

                   $.get('.app-block-popout-content').append(UI.UserRow(R.UserModelList[index], (Media) => {

                       Media.right.append(UI.FollowButton(R.UserModelList[index], (response) => {}));
                       let InfoSpan = $.span({class : 'cardbody-info-span', text : ''});

                       InfoSpan.append($.span({class : 'info-bio app-grey-text', text : `<br/><span class="glyphicon glyphicon-pencil"></span> &nbsp;<span class="cardbody-bio">${R.UserModelList[index].getInfo().bio === null ? '' : UI.RegText(R.UserModelList[index].getInfo().bio.toString().substring(0, 30))}</span>`}));

                       Media.body.append(InfoSpan);

                  })); // End Of Append

                }); // End Of For Each Loop

             }else{

                UI.Banner({view : $.isMobile ? '.app-block-popout-content' : '#app-viewport', text : `@${UserAccount.getBasic().handle} Has No ${args.head}`});

             } // End Of If

         }); // End Of Request

       } /* End Of Mobile Screen Follow Implementation */ : () => {

          R.UserCardBodyGenerate({url : args.url , bodyWrapper : 'profile-follow-wrapper' , view : '#app-viewport', callback : (array) =>{

              UI.Grid({gridMain : '#app-viewport', gridItem : '.profile-follow-wrapper'});

           }}); // End Of Function

       } /* End Of Deskop Screen Follow Implementation */

    } // End Of Follows

  } // End Of Class

  const UR = new UserRequests(); // Class Object

window.addEventListener('DOMContentLoaded', () => {

   /* CREATE PROFILE NAV ICONS */

      if(UserAccount.getActivity().me){

        /* USER LOGGED IN IS VIEWING HIS/HER OWN PROFILE */

         // Add Setting/ Edit Profile Button

         let SettingsBtn = $.create('a', 'profile-settings-btn btn btn-success');
         SettingsBtn.textContent = 'Edit Profile';

         $.get('.second-buttons-tab').append($.center(SettingsBtn));

      }else{
        /* USER LOGGED IN IS VIEWING ANOTHER USER'S PROFILE */

          // Add Message Button
          let MessageBtn = $.create('a', 'profile-message-btn btn btn-success');

          // MessageBtn.innerHTML = Icons.message({ color  : '#fff', width : 17, height : 17});
          MessageBtn.textContent = 'Slide To DM';

          $.get('.first-buttons-tab').append($.center(MessageBtn));

           UI.NavDropDowns({dropdownBtn : '.profile-message-btn', dropdown : '.app-message-dropdown', header : '.chats-dropdown-header', headerClass : 'navbar-fixed-top chats-dropdown-header app-header', backBtn : '.chats-back-btn', backBtnCall : () => {

            navShown();

           }}, () => {

                navShown();

               // $.get('.app-user-info-nav').style.display = 'none'; 
               R.ViewMessages({id : UserAccount.getBasic().id}, () => {

                  if(!user.user.isLogged) $.toast({text : `You Have To Login To Slide In @${UserAccount.getBasic().handle}'s DM`, time : 4000}); return;

               }); // End Of View Messages Call


           }); // End Of Nav Dropdown Call

          // Add Follow Button

          $.get('.second-buttons-tab').append($.center(UI.FollowButton(UserAccount, (follow) => {

              $.html('.followers-text-count', follow.followers);
              $.html('.following-text-count', follow.following);

          }))); // End Of Adding Follow Button

      } // End Of If

   UI.onLoadIcons({context : 'user'}); // Add Icons

   LoadFeed({
     URL : `../../api/posts/?context=2&u_id=${UserAccount.getBasic().id}`,
     array : R.PostModelList,
     callback : (arrayModel) => {

        $.get('.camera-btn').onclick = UserAccount.getMedia().images > 0 ? () => { R.MonoMedia({type : 'image', array : arrayModel}); } : () => { $.toast({text : 'No Images', time : 3000}); }

        $.get('.video-btn').onclick = UserAccount.getMedia().videos > 0 ? () => { R.MonoMedia({type : 'video', array : arrayModel}); } : () => { $.toast({text : 'No Videos', time : 3000}); }

        $.get('.audio-btn').onclick = UserAccount.getMedia().audios > 0 ? () => { R.MonoMedia({type : 'audio', array : arrayModel}); } : () => { $.toast({text : 'No Audio', time : 3000}); }

            $.get('.list-btn').addEventListener('click', () => {

              $.html('#app-viewport', '');

              R.MonoMedia({type : 'all', array : arrayModel});

            }); // End Of List Event Listener

            /* GRID LISTENER */

            $.get('.saved-btn').addEventListener('click', () => {

                $.html('#app-viewport', '');

                LoadFeed({

                  URL : `../../api/posts/?context=4&u_id=${UserAccount.getBasic().id}`,
                  array : R.SavedModelList,
                  callback : (arrayModel) => {},
                  extras : false,
                  peopleYouMayKnow : () => {},
                  explore : () => {}

                }); // Load Feed

             }, 
             false); // End Of Saved EventListener
     },
     extras : false, 
     peopleYouMayKnow : () => {}/* End Of People You May Know Function */ ,
     explore : () => {} /* End Of Explore, Explore Shows Trending Content*/

}); // End Of Load Function

   UR.Follows({btn : $.get('.following-btn'), url : `../../api/follow/?context=2&u_id=${UserAccount.getBasic().id}`, head : 'Following'});
   UR.Follows({btn : $.get('.followers-btn'), url : `../../api/follow/?context=3&u_id=${UserAccount.getBasic().id}`, head : 'Followers'});

}, false);