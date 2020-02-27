



let userNav = document.querySelector('.app-user-info-nav');

  if(isMobile){
  	userNav.setAttribute('class', 'nav navbar navbar-fixed-top ');
  }

  // Declare The UserInterface Object
  let Liked = [];
  let ui = new UI(document);
  let modalUI = select('.app-block-popout');
  let modalContent = select('.app-block-popout-content');
  let modalHead = select('.modal-nav-name');
  let filter = false;
  let view = select('#view');



window.onload = () => {

   // Get This Users' Posts
    Load(`http://localhost/yazz/i/api/posts/?context=2&u_id=${account_user.basic_info.user_id}`);

          if(PostsArrayList.length == 0){

            ui.toast('No User Posts');
            view.innerHTML = "";
            view.appendChild(ui.emptyPosts(`<a href="http://localhost/yazz/usr/${account_user.basic_info.user_athandle}" >@${account_user.basic_info.user_athandle}</a> Hasn't Shared Anything Yet, Comeback After A While`));

    }



    select('.following-text-count').textContent = account_user.follows;
    select('.app-profile-img').src = account_user.basic_info.img_url;
    select('.followers-text-count').textContent = account_user.followers;
    select('.bio-text').textContent = account_user.add_info.bio == null ? "" : account_user.add_info.bio;
    select('.map-text').textContent = account_user.add_info.res;
    select('.date-user').textContent = account_user.basic_info.user_date;
    select('.mail-user').textContent = account_user.basic_info.user_email;
    select('.camera-count').textContent = account_user.media.media_images;
    select('.video-count').textContent = account_user.media.media_videos;
    select('.audio-count').textContent = account_user.media.media_audio;
    select('.user-name').textContent = account_user.basic_info.user_name;
    select('.handle').textContent = `@${account_user.basic_info.user_athandle}`;
    
    // tr = app-user-info-nav-tr
    // td = user-name-tab
    let Row = select('.app-user-info-nav-tr');
    let UserNameTd = select('.user-name-tab');
    // Check If User Logged In

      if(user.isLogged){ // true, User Is Logged In

      	 // Check If Profile Belongs To User Logged In

      	 if(account_user.me){ // true, Show Settings Icon, Edit Profile Button

      	 	  let EditTd = document.createElement('td');
      	 	  let SettingsTd = document.createElement('td');
      	 	  Row.appendChild(EditTd);
      	 	  Row.appendChild(SettingsTd);

      	 	  let EditCenter = ui.center();
      	 	  let EditBtn = ui.anchor();
      	 	  EditCenter.appendChild(EditBtn);
      	 	  EditTd.appendChild(EditCenter);

      	 	  EditBtn.setAttribute('class', 'btn btn-info');
      	 	  EditBtn.textContent = 'Logout';

              EditBtn.addEventListener('click', 
                () => {

                  http.params('GET','http://localhost/yazz/i/api/logout/', null);

                  http.request(

                      (data) => {

                         try {
                           
                           let response = JSON.parse(data);

                            if(response.error){

                                if(!response.log_out){

                                  ui.toast(response.message);

                                } // End Of If
                            }else{

                              if(response.logged){

                                window.location = response.url;

                              }else{

                                ui.toast(response.message);

                              } // End Of If
                            } // End Of If

                         } catch(e) {
                           // statements
                           ui.toast(e);

                         } // End Of Try-Catch

                      } // End Of Anonymous Function

                    ); // End Of Request

               }, // End Of Callback function
              false); // End Of Event

      	 	  let SettingsCenter = ui.center();
      	 	  let SettingBtn = ui.anchor();
      	 	  let SettingIcon = ui.span();
      	 	  SettingBtn.appendChild(SettingIcon);
      	 	  SettingsCenter.appendChild(SettingBtn);
      	 	  SettingsTd.appendChild(SettingsCenter);

      	 	  SettingBtn.setAttribute('class', 'btn btn-info');

            SettingBtn.onclick = () => {

               select('.edit-pop-out').style.display = 'block';

               select('.close-edit').onclick = (e) => {

                  e.preventDefault();

                select('.edit-pop-out').style.display = 'none';

               }

               select('#crush-update-btn').onclick = (e) => {
                  e.preventDefault();

                  let EditForm = new FormData(select('#crush-update-form'));
                  http.params('POST', 'http://localhost/yazz/i/api/bio/', EditForm);

                  http.request(

                    (data) => {

                      try{

                        let response = JSON.parse(data);

                        if(response.error){

                          // There Was An Error
                          ui.toast(response.message);

                        }else{

                          // There Was no Error
                          ui.toast(response.message);

                        } // End Of Error Check

                      }catch(e){

                        ui.toast(e);
                        console.log(e);

                      } // End Of Try-Catch

                    } // End OF Request Callback Function

                  ); // End Of Request

               }

            }

      	 	  SettingIcon.setAttribute('class', 'glyphicon glyphicon-cog');

      	 	  UserNameTd.style.width = '50%';


      	 }else{ // false, Show Follow Button

      	 	   

      	 	   let FollowTd = document.createElement('td');

             FollowTd.setAttribute('class', 'app-tab app-user-follow-tab');
      	 	   let MessageTd = document.createElement('td');

      	 	   Row.appendChild(MessageTd);
      	 	   let center = ui.center();
      	 	   let MessageBtn = ui.anchor();
      	 	   let MessageIcon = ui.span();

      	 	   MessageTd.appendChild(center);
      	 	   center.appendChild(MessageBtn);
      	 	   MessageBtn.appendChild(MessageIcon);

      	 	   MessageBtn.setAttribute('class', 'btn btn-info');
      	 	   MessageIcon.setAttribute('class', 'glyphicon glyphicon-envelope');

      	 	   // Open This Users Messages
      	 	   MessageBtn.onclick = () => {
      	 	   	  	let modal = select('.app-block-popout');
      	 	   	    modal.style.display = 'block';
      	 	   	    select('.modal-nav-name').textContent = `@${account_user.basic_info.user_athandle}`;
                  select('.app-block-popout-content').appendChild(ui.inputUI('jgfsd',3));
                   // Implement The Back Button
                   select('.modal-back-btn').onclick = () => {

                    modal.style.display = 'none';
                    select('.app-modal-view').innerHTML = "";

                    select('.app-block-popout-content').removeChild(select('.app-input-wrapper'));
                  }
      	 	   	    // View Messages Between LoggedIn User & This Account User

      	 	   	    http.params('GET', `http://localhost/yazz/i/api/messages/?cxt=2&id=${user.user_id}&uid=${account_user.basic_info.user_id}`, null);
      	 	   	    http.request((data) => {
      	 	   	    	  // Try Catch Block
      	 	   	    	   try {
      	 	   	    	   	
      	 	   	    	   	 let response = JSON.parse(data);
      	 	   	    	   	 let modalView = select('.app-modal-view');

      	 	   	    	   	 // Check If There Are Chats

      	 	   	    	   	 if(response.chats){

      	 	   	    	   	 	 // There Are Chats

      	 	   	    	   	 	 // Loop Through All The Chats

      	 	   	    	   	 	 for(let i = 0; i < response.messages.length; i ++){

      	 	   	    	   	 	 	 modalView.appendChild(ui.viewMessages(response.messages[i]));

      	 	   	    	   	 	 } // End Of While Loop
      	 	   	    	   	 	 console.log(modalView);
      	 	   	    	   	 }else {
      	 	   	    	   	 	
      	 	   	    	   	 	// There No Chats
      	 	   	    	   	 }

      	 	   	    	   } catch(e) {
      	 	   	    	   	// statements
      	 	   	    	   	console.log(e);
      	 	   	    	   } // End Of Try Catch
      	 	   	      } // End Of Anonymous Function

      	 	   	    ); // End Of Request

      	 	   } // End Of Messages OnClick

      	 	   Row.appendChild(FollowTd);
      	 	   FollowTd.appendChild(ui.followBtn(account_user,1));

      	 	   UserNameTd.style.width = '55%';
      	 } // End Of If

      }else{ // false, User Is Not Logged

      	let LoginTd = document.createElement('td');
      	Row.appendChild(LoginTd);

      	let center = ui.center();
      	let LoginBtn = ui.anchor();

      	center.appendChild(LoginBtn);
      	LoginTd.appendChild(center);

      	LoginBtn.setAttribute('class', 'btn btn-default');
      	LoginBtn.textContent = 'Follow';

      	UserNameTd.style.width = '60%';
      	// Button Onclick
      	LoginBtn.onclick = () => {
      		ui.login(`You Need To Login First To Follow @ ${account_user.basic_info.user_athandle}`)
      	} // End Of Button Onclick

      } // End Of If

      // On back Button click 

  select('.back-btn').onclick = () => {

  	window.history.back();

  } // End Of Back Btn Click

  select('.text-text').textContent  = 'Activity';


  select('.camera-btn').onclick = () => {

    select('.text-text').textContent  = 'Images';
      	 // Get Pictures Only

      	 view.innerHTML = "";
         filter = true;
         PostsArray = [];

      	if(account_user.media.media_images > 0){ // Check If Posts Are There

      		 PostsArrayList.forEach(

            (obj) => {

      	 	   if(obj.postType == "photo" || obj.postType == "image"){ // Get Only Pictures

                PostsArray.push(obj);
                let wrapper = ui.div();
                let space = ui.div();
                space.setAttribute('class', isMobile ? 'space-small' : 'space-large');
                wrapper.setAttribute('class', 'app-post-wrapper');
      	 	   	  let PostBodyWrapper = ui.div();
                PostBodyWrapper.setAttribute('class', 'app-post-body-wrap');

      	 	   	  PostBodyWrapper.appendChild(ui.header(obj));
      	 	   	  PostBodyWrapper.appendChild(ui.postBody(obj,2));
      	 	   	  PostBodyWrapper.appendChild(ui.reactionBody(obj));

                wrapper.appendChild(PostBodyWrapper);
      	 	   	  view.appendChild(wrapper);
                view.appendChild(space);

      	 	   }

      	   } // End Of Arrow Function
      	 ); // End Of ForEach Loop

      	}else{ // There Are No Posts

      		view.appendChild(ui.emptyPosts(`<a href="http://localhost/yazz/usr/${account_user.basic_info.user_athandle}" >@${account_user.basic_info.user_athandle}</a>'s Images Folder Is Empty`));
          ui.toast('No Images');

      	}  // End Of List Checking

      } // End Of Camera Onclick

      // On Videos Click

      select('.video-btn').onclick = () => {
        select('.text-text').textContent  = 'Videos';
      	view.innerHTML = "";
        filter = true;
        PostsArray = [];

      	if(account_user.media.media_videos > 0){ // Check If Posts Are There

      		 PostsArrayList.forEach((obj) => {

      	 	   if(obj.postType == "video"){ // Get Only Video

                PostsArray.push(obj);
      	 	   	  let wrapper = ui.div();
                let space = UserInterface.div();
                space.setAttribute('class', isMobile ? 'space-small' : 'space-large');
                wrapper.setAttribute('class', 'app-post-wrapper');
                let PostBodyWrapper = ui.div();
                PostBodyWrapper.setAttribute('class', 'app-post-body-wrap');

      	 	   	  PostBodyWrapper.appendChild(ui.header(obj));
      	 	   	  PostBodyWrapper.appendChild(ui.postBody(obj,2));
      	 	   	  PostBodyWrapper.appendChild(ui.reactionBody(obj));

                wrapper.appendChild(PostBodyWrapper);
      	 	   	  view.appendChild(wrapper);
                view.appendChild(space);

      	 	   }

      	   } // End Of Arrow Function
      	 ); // End Of ForEach Loop

      	}else{ // There Are No Posts

      		view.appendChild(ui.emptyPosts(`<a href="http://localhost/yazz/usr/${account_user.basic_info.user_athandle}" >@${account_user.basic_info.user_athandle}</a>'s Videos Folder Is Empty`));
          ui.toast('No Videos');

      	}  // End Of List Checking
      } // End Of Video OnClick

       // On Audios Click

       select('.audio-btn').onclick = () => {

        select('.text-text').textContent  = 'Audios';


       	view.innerHTML = "";
        filter = true;
        PostsArray = [];

      	if(account_user.media.media_audio > 0){ // Check If Posts Are There

      		 PostsArrayList.forEach((obj) => {

      	 	   if(obj.postType == "audio"){ // Get Only Audios

                PostsArray.push(obj);

      	 	   	  let wrapper = ui.div();
                let space = UserInterface.div();
                space.setAttribute('class', isMobile ? 'space-small' : 'space-large');
                wrapper.setAttribute('class', 'app-post-wrapper');
                let PostBodyWrapper = ui.div();
                PostBodyWrapper.setAttribute('class', 'app-post-body-wrap');

      	 	   	  PostBodyWrapper.appendChild(ui.header(obj));
      	 	   	  PostBodyWrapper.appendChild(ui.postBody(obj,2));
      	 	   	  PostBodyWrapper.appendChild(ui.reactionBody(obj));

                wrapper.appendChild(PostBodyWrapper);
      	 	   	  view.appendChild(wrapper);
                view.appendChild(space);

      	 	   }

      	   } // End Of Arrow Function
      	 ); // End Of ForEach Loop

      	}else{ // There Are No Posts

      		view.appendChild(ui.emptyPosts(`<a href="http://localhost/yazz/usr/${account_user.basic_info.user_athandle}" >@${account_user.basic_info.user_athandle}</a>'s Audios Folder Is Empty`));
          ui.toast('No Audios');

      	}  // End Of List Checking
       } // End Of Audio OnClick

       // Showing People You Follow
       select('.following-btn').onclick = () => {


       	 let modalView = select('.app-modal-view');

         select('.modal-back-btn').addEventListener('click', 
              () => {

                modalUI.style.display = 'none';
                modalView.innerHTML = "";
            }
         );
       	 modalUI.style.display = 'block';

       	 modalHead.textContent = `${account_user.follows} Following`;

       	   http.params('GET', `http://localhost/yazz/i/api/follow/?context=2&u_id=${account_user.basic_info.user_id}`, null);
       	   http.request((data) => {

       	   	    // Try Catch block

       	   	      try {

       	   	      	let response = JSON.parse(data);
                    console.log(response);
       	   	      	// Check If List Is Empty
       	   	      	if(response.list){

       	   	      		 // Not Empty

       	   	      		  // Loop Through The Objects
       	   	      		  for(let i = 0; i < response.follow_list.length; i ++){

       	   	      		  	 let UserWrapper = ui.div();

       	   	      		  	 UserWrapper.appendChild(ui.followsList(response.follow_list[i]));

       	   	      		  	 modalView.appendChild(UserWrapper);
       	   	      		  	 console.log(modalView);

       	   	      		  } // End Of For Loop

       	   	      	}else{

       	   	      		// List Empty

       	   	      	} // End Of If
       	   	      	
       	   	      } catch(e) {
       	   	      	
       	   	      	console.log(e);
       	   	      } // End Of Try Catch

       	     } // End Of Anonymous Function
       	  ); // End Of Request
       } // End of Following OnClick

       // on followers click

       select('.followers-btn').onclick = () => {

        let modalView = select('.app-modal-view');
        select('.modal-back-btn').addEventListener('click', 
              () => {

                modalUI.style.display = 'none';
                modalView.innerHTML = "";
            }
         );
       	   
       	 modalUI.style.display = 'block';

       	 modalHead.textContent = `${account_user.followers} Followers`;

       	   http.params('GET', `http://localhost/yazz/i/api/follow/?context=3&u_id=${account_user.basic_info.user_id}`, null);
       	   http.request((data) => {

       	   	    // Try Catch block

       	   	      try {

       	   	      	let response = JSON.parse(data);

       	   	      	// Check If List Is Empty
       	   	      	if(response.list){

       	   	      		 // Not Empty

       	   	      		  // Loop Through The Objects
       	   	      		  for(let i = 0; i < response.follow_list.length; i ++){

       	   	      		  	 let UserWrapper = ui.div();

       	   	      		  	 UserWrapper.appendChild(ui.followsList(response.follow_list[i]));


       	   	      		  	 modalView.appendChild(UserWrapper);
       	   	      		  	 console.log(modalView);

       	   	      		  } // End Of For Loop

       	   	      	}else{

       	   	      		// List Empty

       	   	      	} // End Of If
       	   	      	
       	   	      } catch(e) {
       	   	      	
       	   	      	console.log(e);
       	   	      } // End Of Try Catch

       	     } // End Of Anonymous Function
       	  ); // End Of Request

       } // End Of followes OnClick

       // Grid Layout
       select('.grid-btn').onclick = () => {
          let view = select('#view');
          view.appendChild(ui.loader());
          view.innerHTML = "";

          if(PostsArray.length == 0){

            PostsArray = PostsArrayList;
            view.appendChild(ui.emptyPosts(`<a href="http://localhost/yazz/usr/${account_user.basic_info.user_athandle}" >@${account_user.basic_info.user_athandle}</a>'s Gallery Grid Is Empty`));
            ui.toast('Grid Is Empty');

          }else{
            select('.text-text').textContent  = 'Gallery';

            PostsArray.forEach(

                (ListItem) => {

                  let wrapper = ui.div();
                  let ItemBtn = ui.anchor()

                  
                  wrapper.setAttribute('class', 'grid-post-wrapper');

                   if(ListItem.postType == 'image' || ListItem.postType == 'photo'){

                      let img = document.createElement('img');
                      img.src = ListItem.postUrl;
                      img.setAttribute('class', 'img-responsive');
                      ItemBtn.appendChild(img);

                   }else if(ListItem.postType == 'video'){

                      let vid = document.createElement('video');
                      vid.setAttribute('class', 'img-responsive')
                      let source = document.createElement('source');
                      source.src = ListItem.postUrl;
                      vid.appendChild(source);
                      ItemBtn.appendChild(vid);

                   }

                   // On Grid Item Click
                   ItemBtn.addEventListener('click',
                      () => {
                        select('.app-block-popout-comment').style.display = 'block';
                        ui.toast('Grid Item Clicked');

                        /*

                          Dont Forget To Implement The Back Button

                        */

                        ui.FullBodyPostView(ListItem);

                      }, // End Of Anonymous Function
                   false);

                  wrapper.appendChild(ItemBtn);
                  view.appendChild(wrapper);

                } // End OF Anonymous function
              ); // End Of ForEach Loop

             var blocks = view.children;
             console.log(blocks);
             console.log(blocks.length);
             var pad = 10, cols = 3, newLeft, newTop;

             // Loop Through All The Children
             for(let i = 1; i < blocks.length; i ++){
              console.log(i);
                // For Creating A New Rows
                if(i % cols == 0){

                    newTop = (blocks[i - cols].offsetTop + blocks[i - cols].offsetHeight) + pad;
                    blocks[i].style.top = `${newTop}px`;
                    console.log(newTop);

                } else{

                    if(blocks[i - cols]){

                      newTop = (blocks[i - cols].offsetTop + blocks[i - cols].offsetHeight) + pad;
                      blocks[i].style.top = `${newTop}px`;
                      console.log(newTop);

                    }

                    newLeft = (blocks[i - 1].offsetLeft + blocks[i - 1].offsetWidth) + pad;
                    blocks[i].style.left = `${newLeft}px`;
                    console.log(newLeft);

                }// End Of If

             } // End OF Loop

          }




          console.log(PostsArray);


         
       } // End grid Button


       select('.saved-btn').addEventListener('click', 

        () => {

          select('.text-text').textContent  = 'Flamed Posts';

            let view = select('#view');
            view.innerHTML = "";



            view.appendChild(ui.loader());

            http.params('GET', `http://localhost/yazz/i/api/posts/?context=4&u_id=${account_user.basic_info.user_id}`, null);
            http.request(

                 (data) => {
                  // Catch Exceptions
                     try {
                        
                        let response = JSON.parse(data);

                        if(response.list){ // There Is A List

                          for(let i = 0; i < response.posts.length; i ++){

                             let PostsModel = new PostDataModel(
                             response.posts[i].user_info.user_name,
                             response.posts[i].user_info.user_athandle,
                             response.posts[i].img_url,
                             response.posts[i].user_info.user_id,
                             response.posts[i].post_info.media_id,
                             response.posts[i].post_info.media_url,
                             response.posts[i].post_info.type,
                             response.posts[i].post_info.media_date,
                             response.posts[i].post_info.media_time,
                             response.posts[i].post_info.text,
                             response.posts[i].comment_count,
                             response.posts[i].likes_count,
                             response.posts[i].liked,
                             response.posts[i].views
                            );

                             Liked.push(PostsModel);

                          } // End Of Loop

                          // Loop Through All The Items
                          let PostBodyWrapperDiv = null;
                          view.innerHTML = "";
                          PostsArray = [];
                          Liked.forEach(

                              (ListItem) => {

                                  PostsArray.push(ListItem);
                                  let wrapper = UserInterface.div();
                                  let space = UserInterface.div();
                                  space.setAttribute('class', isMobile ? 'space-small' : 'space-large');
                                  wrapper.setAttribute('class', 'app-post-wrapper');
                                  PostBodyWrapperDiv = document.createElement('div');
                                  PostBodyWrapperDiv.setAttribute('class','app-post-body-wrap');
                                  PostBodyWrapperDiv.setAttribute('id', 'app-post-' + ListItem.postId);
                                  PostBodyWrapperDiv.appendChild(UserInterface.header(ListItem));
                                  PostBodyWrapperDiv.appendChild(UserInterface.postBody(ListItem,2));
                                  PostBodyWrapperDiv.appendChild(UserInterface.reactionBody(ListItem));

                                   // body tag

                                  wrapper.appendChild(PostBodyWrapperDiv);


                                  view.appendChild(wrapper);
                                  view.appendChild(space);

                              } // End Of Anonymus Function

                          ); // End Of Loop

                        }else{ // Theres No List

                          view.innerHTML = "";
                          ui.toast(`@${account_user.basic_info.user_athandle} Hasn't Flamed At Other Users Posts, Come Back After A While To See What @${account_user.basic_info.user_athandle} Likes`);
                          view.appendChild(ui.emptyPosts(`<a href="http://localhost/yazz/usr/${account_user.basic_info.user_athandle}" >@${account_user.basic_info.user_athandle}</a>'s Saved Folder Is Empty`));
                        }// End Of If

                     } catch(e) {
                        
                        ui.toast(e);
                        console.log(e);

                     } // End Of Try-Catch

                 } // End Of Arrow Function

              ); // End Of Request

        },

        false
        ); // End Of Click Event

       select('.list-btn').addEventListener('click',
           () => {

               select('.text-text').textContent  = 'Activity';
               let view = select('#view');

              let PostBodyWrapperDiv = null;
              view.innerHTML = "";
              PostsArray = [];
              
              if(PostsArrayList.length > 0){

                 PostsArrayList.forEach(
                 (ListItem) => {

                    PostsArray.push(ListItem);
                    let wrapper = UserInterface.div();
                    let space = UserInterface.div();
                    space.setAttribute('class', isMobile ? 'space-small' : 'space-large');
                    wrapper.setAttribute('class', 'app-post-wrapper');
                    PostBodyWrapperDiv = document.createElement('div');
                    PostBodyWrapperDiv.setAttribute('class','app-post-body-wrap');
                    PostBodyWrapperDiv.setAttribute('id', 'app-post-' + ListItem.postId);
                    PostBodyWrapperDiv.appendChild(UserInterface.header(ListItem));
                    PostBodyWrapperDiv.appendChild(UserInterface.postBody(ListItem,2));
                    PostBodyWrapperDiv.appendChild(UserInterface.reactionBody(ListItem));

                                   // body tag

                    wrapper.appendChild(PostBodyWrapperDiv);


                    view.appendChild(wrapper);
                    view.appendChild(space);

                 }  // End Of Anonymous Function

              ); // End Of For Each  Loop

              }else{

                ui.toast(`${account_user.basic_info.user_athandle} Hasn't Posted Anything Yet, Come Back After A While`);
                view.appendChild(ui.emptyPosts(`<a href="http://localhost/yazz/usr/${account_user.basic_info.user_athandle}" >@${account_user.basic_info.user_athandle}</a>'s Main Folder Is Empty`));
              
              } // End Of If

           },  // End Of Anonymous Function 

           false); // End Of Click Event


       select('.change-image-btn').style.display  = (user.user_id == account_user.basic_info.user_id ? 'block' : 'none'); // Show Change Image Button Only If This Page Belongs To Logged In User

       select('.change-btn').onclick = () => {

           select('.media-form').addEventListener('change', 
              (e) => {

                 let fileName = e.target.value.split('\\').pop();
                 
                 select('.change-file-name').textContent = fileName.toString().length > 28 ? fileName.substring(0, 11) + '...' : fileName.toString();

                   select('.change-image-body').style.display = 'block';

                    select('.change-remove-btn').onclick = () => {

                      select('.change-image-body').style.display = 'none';
                      select('.media-form').value = "";

                      ui.toast('Profile Picture Change Cancelled');

                    } // End Of Cancel Button Click

                    select('.change-img-btn').onclick = () => {

                      let image = new FormData();

                      image.append('media', select('.media-form').files[0]);
                      image.append('context', 3);
                      image.append('text', '');

                      http.params('POST', 'http://localhost/yazz/i/api/upload/', image);

                      http.request(

                          (reply) => {

                            // Try-Catch For Exception Handling!
                            try {

                              let response = JSON.parse(reply);

                               // Check For Server Side Errors
                               if(response.error){ // If True, Then There Was An Error

                                  ui.toast(response.message);

                               }else{ // If False, Then There Was No Error

                                  // Check For Successful Upload

                                  if(response.upload){ // Upload Was Successful

                                    select('.app-profile-img').src = response.url;

                                    select('.change-image-body').style.display = 'none';
                                     select('.media-form').value = "";

                                    ui.toast('Profile Picture Changed Successful!');

                                  }else{ // Upload Was Not Successful

                                    ui.toast(response.message);

                                  } // End Of Upload If

                               } // End Of Error If

                            } catch(e) {
                              
                              ui.toast(e);

                            } // End Of Try-Catch Block

                          } // End Of Anonymous Function Callback 

                        ); // End Of Request!

                    } // End Of Change Button Click
               } , 

              false);

       } // End Of Button Click

  } // End Of window.onload

  