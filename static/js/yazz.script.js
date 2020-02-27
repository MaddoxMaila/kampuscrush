

/*

   Coder : Tshepang Maddox Maila
   email : maddoxmaila719@gmail.com
   github : github.com/MaddoxMaila/

   License : Intellectual Property!

*/

 let isMobile = screen.width > 700 ? false : true;

  let navigation = document.querySelector('.app-nav');
  if(isMobile){
  	navigation.setAttribute('class','nav navbar navbar-fixed-bottom app-nav')
  }

class PostDataModel{
	// Constructor
	constructor(username,handle,imgUrl,userId,postId,postUrl,postType,postDate,postTime,postText,postCommentsCount,postLikeCount,postIsLiked, postView){
		this.username = username;
		this.handle = handle;
		this.imgUrl = imgUrl;
		this.userId = userId;
		this.postId = postId;
		this.postUrl = postUrl;
		this.postType = postType;
		this.postDate = postDate;
		this.postTime = postTime;
		this.postText = postText;
		this.postCommentsCount = postCommentsCount;
		this.postLikeCount = postLikeCount;
		this.postIsLiked = postIsLiked;
		this.postView = postView;
	} // End Of Constructor
} // End Of Class


class ajax{
	constructor(){
		this.method = null;
	  this.url = null;
	  this.data = new FormData();
	  this.xhr = new XMLHttpRequest();
	  this.response = null;
	}
  params(method,url,data){
	this.method = method;
	this.url = url;
	this.data = data;
	
}

  isOnline(){
	if(navigator.onLine){
		return true;
	}else{
		return false;
	}
}
// Method for Showing the Progress bar when Uploading
    	progressbar(bar){
    		var progress = 0;
    	  this.xhr.upload.onprogress = (e) => {

    	  	var done = e.position || e.loaded, total = e.totalSize || e.total;
  			  progress =(Math.floor(done / total * 1000) / 10 );
  			  bar.style.display = 'block';
  			  bar.style.height = '5px';
  			  bar.style.width = `${progress}%`;
  			  if(progress == 100){
  			  	select('.progress').style.height = 'none';
  			  }
  			  console.log(progress);

  			  /* Show Toast When Done */
    	  } // End Of Arrow Function

    	} // End Of ProgressBar
  request(callback,bar = ""){
   var self = this;
	self.xhr.onreadystatechange = function(){
			if(self.xhr.readyState == 4){
			  if(self.xhr.status == 200){
			    callback(self.xhr.responseText);
			} // End Of If
		 } // End Of If
		
	} // End Of Anonymous Function
	  if(bar != ""){
	  	this.progressbar(bar);
	  }
	self.xhr.open(this.method, this.url, false);
	self.xhr.send(this.data);
 }
}
/* End Of Class Definitions */

/* Start Of Inflatables */
   var http = new ajax();
   var PostsArray = [];
    var PostsArrayList = [];
    var TrendingArrayList = [];
   let CommentArrayList = [];
   let list = null;
   var UserInterface = null;
   var Context = null, recorder = null;
    
    let Load = (url) => {

    	UserInterface = new UI(document);
    	// For Populating The Dom With POSTS;

    	http.params('GET',url,null);

    	let view = select('#view');
      view.appendChild(UserInterface.loader());
    	//console.log(PostsArrayList);
        http.request((response) => {

        	const data = JSON.parse(response);
        	list = data.list;
        	// Check If There Posts In Response
        if(list){

        	  for(let i = 0; i < data.posts.length; i ++){
        		let PostsModel = new PostDataModel(
        			data.posts[i].user_info.user_name,
        			data.posts[i].user_info.user_athandle,
        			data.posts[i].img_url,
        			data.posts[i].user_info.user_id,
        			data.posts[i].post_info.media_id,
        			data.posts[i].post_info.media_url,
        			data.posts[i].post_info.type,
        			data.posts[i].post_info.media_date,
        			data.posts[i].post_info.media_time,
        			data.posts[i].post_info.text,
        			data.posts[i].comment_count,
        			data.posts[i].likes_count,
        			data.posts[i].liked,
        			data.posts[i].views
        			);
        	  PostsArrayList.push(PostsModel);
        	} // End Of Fo Loop
          /* Show Posts On Screen */
      //console.log(UserInterface.nameHeader());
         let	PostBodyWrapperDiv = null;
         view.innerHTML = "";
         PostsArray = [];
         PostsArrayList.forEach(
         	(obj) => {


              PostsArray.push(obj);
         	   let wrapper = UserInterface.div();
         	   let space = UserInterface.div();
         	   space.setAttribute('class', isMobile ? 'space-small' : 'space-large');
         	   wrapper.setAttribute('class', 'app-post-wrapper');
             PostBodyWrapperDiv = document.createElement('div');
             PostBodyWrapperDiv.setAttribute('class','app-post-body-wrap');
             PostBodyWrapperDiv.setAttribute('id', 'app-post-' + obj.postId );
             PostBodyWrapperDiv.appendChild(UserInterface.header(obj));
             PostBodyWrapperDiv.appendChild(UserInterface.postBody(obj,2));
             PostBodyWrapperDiv.appendChild(UserInterface.reactionBody(obj));

         // body tag

              wrapper.appendChild(PostBodyWrapperDiv);


              view.appendChild(wrapper);
              view.appendChild(space);


          }); // End Of For Loop

        } // End Of If Checking List
        	
         /* End OF Show  */
       } // End Of Anonymous Callback Function

     ); // End http.request() Method

         // Going To Main Messages Page

      // Check If Logged In

        

        	 select('.app-messages-btn').onclick = () => {
        
        	 	if(user.isLogged){
        	 	  

        	 	     // Open Modal
        	 	     select('.app-block-popout').style.display = 'block';
        	 	     select('.modal-nav-name').textContent = 'Messages';

        	 	     UserInterface.chatsUI('.app-modal-view','.modal-nav-name');

        	    // Of Device Check
        	  }else{
        	  	UserInterface.login('You Need To Login First To Access Messages');
        	   } // End Of If
        	 } // End Of Button Click

         // End Of Login Check

          if(!isMobile){
          		UserInterface.suggestions('.suggested-body');
          }

    
        if(isMobile){

              select('.app-search-btn').onclick = () => {

                let modal = select('.app-block-popout');
                let modalView = select('.app-modal-view');

                select('.modal-table').style.display = 'none';

                modal.style.display = 'block';

                

                let SearchTable = document.createElement('table');
                let Tr = document.createElement('tr');
                let BackTd = document.createElement('td');
                let BoxTd = document.createElement('td');
                let IconTd = document.createElement('td');

                SearchTable.setAttribute('class', 'table-bordered app-search-table xs-search');

                BackTd.setAttribute('class', 'app-tab search-tab');
                IconTd.setAttribute('class', 'app-tab search-tab');

                SearchTable.appendChild(Tr);
                Tr.appendChild(BackTd);
                Tr.appendChild(BoxTd);
                Tr.appendChild(IconTd);

                // For Back Td

                let BackCenter = UserInterface.center();
                let BackBtn = UserInterface.anchor();
                let Icon = UserInterface.span();

                Icon.setAttribute('class', 'glyphicon glyphicon-chevron-left');
                BackBtn.appendChild(Icon);
                BackCenter.appendChild(BackBtn);

                BackTd.appendChild(BackCenter);

                BackBtn.onclick = () => {

                    modal.style.display = 'none';

                    modalView.innerHTML = ""

                    select('.modal-table').style.display = 'inline-block';
                    select('.modal-table').style.width = '100%';

                    select('.app-modal-nav-top').removeChild(select('.xs-search'));


                } // End Of Back Button Implementation

                // For Box Td

                let Box = document.createElement('input');
                Box.type = 'search';
                Box.placeholder = 'Search yazz';
                Box.setAttribute('class', 'xs-input-search');

                Box.addEventListener('keyup', 

                  () => {

                      let xsForm = new FormData();

                      xsForm.append('query', Box.value);

                      http.params('POST', 'http://localhost/yazz/i/api/search/', xsForm);
                      http.request(

                           (data) => {

                              search(data);

                           } // End Of Arrow Function

                        ); // End Of Request

                  },
                  false
                ); // End Of Event

                BoxTd.appendChild(Box);

                // For Icon Td

                let IconCenter = UserInterface.center();
                let IconIcon = UserInterface.span();

                IconIcon.setAttribute('class', 'glyphicon glyphicon-search');

                IconCenter.appendChild(IconIcon);

                IconTd.appendChild(IconCenter);

                select('.app-modal-nav-top').appendChild(SearchTable);

           } // End Of Search Click

        } // End Of Checking Screen

        // Properly Set Up The Navbar
        select('.app-login-img').src = user.img_url;

        select('.app-login-btn').href = user.isLogged ? `http://localhost/yazz/usr/${user.handle}` : 'http://localhost/yazz/login/';
        select('.app-login-btn').textContent = user.isLogged ? `@${user.handle}` : 'Sign In | Sign Up';


         	// On User Start Search

         	select('.app-search-input').onkeyup = () => {

         		let inputTextBox = select('.app-search-input');
         		  select('.app-search-dropdown').style.display = 'block';

         		   // Hide If Input Is Empty
         		    if(inputTextBox.value == ""){

         		    	select('.app-search-dropdown').style.display = 'none';

         		    }else{

         		    	  // Handle Search Requests
         		        let SearchForm = new FormData();

         		        SearchForm.append('query', inputTextBox.value);

         		        http.params('POST', 'http://localhost/yazz/i/api/search/', SearchForm);
         		        http.request(
         		        	  (data) => {

                          search(data);

         		          } // End Of Anonymous Callback Function
         		       ); // End Of Http Request
         		    } // End Of If

         	} // End Of Input Key
        
        select('.app-notification-btn').onclick = () => {

           if(user.isLogged){

              select('.app-block-popout').style.display = 'block';
          select('.modal-nav-name').textContent = 'Notifications';

          // Implement The Back Button
            select('.modal-back-btn').onclick = () => {

              // Hide The Modal
              select('.app-modal-view').innerHTML = "";
              select('.app-block-popout').style.display = 'none';

            } // End Of Back-Button ONclick

            // Override Parameters

            http.params('GET','http://localhost/yazz/i/api/notifs/?context=1', null);
            http.request(
               (data) => {

              try {
                
                 let response = JSON.parse(data);

                   if(!response.error){

                      if(response.notifs){ // Notifs Not Empty

                         // Loop Through The Notificatios

                         for(let i = 0; i < response.notifications.length; i ++){

                            let wrapper = UserInterface.div();
                            let space = UserInterface.div();
                            space.setAttribute('class', 'space-small');

                            wrapper.appendChild(UserInterface.notifications(response.notifications[i]));

                            select('.app-modal-view').appendChild(wrapper);
                            select('.app-modal-view').appendChild(space);

                         } // End Of While Loop

                      }else{ // Notifs Empty

                        // !!!! IMPLEMEMENT
                        UserInterface.toast(response.message)

                      } //End Of If

                   }else{ //BackEnd Error

                     UserInterface.toast(response.message)

                   } // End OF If

              } catch(e) {
                // Toast For The Exception
                UserInterface.toast(e);
                console.log(e);

              } // End Of Try Catch

            } // End Of Anonymous Function
          ); // End Of Request


           }else {

            UserInterface.login('You Have To Login First To View Your Notifications');

           }// End Of If
        	
        } // End Of Notification Button onClick

        window.addEventListener('mouseup',
        	(event) => {
        		let DropDown = select('.app-search-dropdown');
        		  if(event.target != DropDown && event.target.parentNode != DropDown){
        		  	DropDown.style.display = 'none';
        		  }

           },
           false
       );

    } // End On GetPosts()  

    function search(data){
       // Exception Handling For Any Error That Might Occur
       try {

          let response = JSON.parse(data);
          let DropDownView = select('.dropdown-view');
          let modalView = select('.app-modal-view');
          (isMobile ? modalView : DropDownView).innerHTML = "";

           // Check For BackEnd Errors
            if(!response.error){

              // There Are no Error

              // Check If Search Result Where Found
                if(response.found){

                  // True, There Are Results

                  // Loop Through The Results

                  response.list.forEach(

                    (listItem) => {

                         let wrapper = UserInterface.div();
                         wrapper.appendChild(UserInterface.followsList(listItem,2));

                         (isMobile ? modalView : DropDownView).appendChild(wrapper);

                     } // End Of Anonymous Function

                 );// End Of For Loop


               }else{

                 // False, There Were No Results

               } // End Of Found If

           }else{
             // There Are Error

             // toast The Error Message To The User
             UserInterface.toast(response.message);

           } // End Of If
                            
          } catch(e) {
                             
             UserInterface.toast(e);

          } // End Of Try-Catch

} // End Of Search 
    
/* End Of Inflatables */

/* Start Of UI Generation */

  class UI{

  	constructor(dom){
  		this.dom = dom;
  		this.headerTable = null;
  		this.modal = select('.app-block-popout');
  	}

  	notifications(obj){

  		 let NotifTable = this.dom.createElement('table');

  		 NotifTable.setAttribute('class', 'app-notif-table');

  		 let Tr = this.dom.createElement('tr');

  		 let ImgTd = this.dom.createElement('td');
  		 let CountTd = this.dom.createElement('td');
  		 let ThirdTd = this.dom.createElement('td');

  		 NotifTable.appendChild(Tr);
  		 Tr.appendChild(ImgTd);
  		 Tr.appendChild(CountTd);
  		 Tr.appendChild(ThirdTd);

  		 ImgTd.setAttribute('class', 'app-tab app-img-tab notif-tab');
  		 CountTd.setAttribute('class', 'app-tab notif-text-tab notif-tab');
  		 ThirdTd.setAttribute('class', 'app-tab last-tab notif-tab');

  		 let Img = this.dom.createElement('img');
  		 Img.src = obj.info.basic_info.img_url
  		 Img.setAttribute('class', 'img-circle img-responsive');

       Img.setAttribute('height', '35');
       Img.setAttribute('width', '35');

  		 ImgTd.appendChild(Img);
  		 let NotifBtn = this.anchor();
  		 let NotifText = this.span();

  		 NotifBtn.appendChild(NotifText);
  		 NotifBtn.setAttribute('class', 'notif-btn');

  		 CountTd.appendChild(NotifBtn);

  		 NotifBtn.onclick = () => {

  		 	  window.location = `http://localhost/yazz/usr/${obj.info.basic_info.user_athandle}/posts/${obj.notif_holder.post_id}`;

  		 } // End Of Onclick

  		   if(obj.notif_holder.notif_type == 'like'){
  		   	 
  		   	 // Notification Type Is Like
  		   	 NotifText.innerHTML = obj.count - 1 == 0 ? `<span class="app-bold-text">${obj.info.basic_info.user_athandle}</span> Liked <span class="glyphicon glyphicon-fire liked"></span> Your Post` : `<span class="app-bold-text">${obj.info.basic_info.user_athandle}</span> and ${obj.count} Liked <span class="glyphicon glyphicon-fire liked"></span> Your Post`;

  		   }else if(obj.notif_holder.notif_type == 'comment'){

  		   	  // Notif Type Is Comment
  		   	  NotifText.innerHTML = obj.count - 1 == 0 ? `<span class="app-bold-text">${obj.info.basic_info.user_athandle}</span> Liked <span class="glyphicon glyphicon-fire liked"></span> Your Post` : `<span class="app-bold-text">${obj.info.basic_info.user_athandle}</span> and ${obj.count} Liked <span class="glyphicon glyphicon-fire liked"></span> Your Post`;

  		   }else if(obj.notif_holder.notif_type == 'Started Following You' || obj.notif_holder.notif_type == 'Unfollowed You'){

  		   	   NotifText.innerHTML = `<span class="app-bold-text">${obj.info.basic_info.user_athandle}</span> Has ${obj.notif_holder.notif_type}`;

  		   	   NotifBtn.onclick = () => {

  		   	   	  window.location = `http://localhost/yazz/usr/${obj.info.basic_info.user_athandle}/`;

  		   	   } // End Of Onclick

  		   }else{

  		   	  // Mentioned On A Comment And Post

  		   	  NotifText.innerHTML = `<span class="app-bold-text">${obj.info.basic_info.user_athandle}</span> Has ${obj.notif_holder.notif_type}`;

  		   } // End Of If!!


  		   return NotifTable;
  	} // End Of Notifition

  	// Showing Suggestions Of Users To Follow
  	suggestions(tag){

  		let root = select(tag);
  		http.params('GET', 'http://localhost/yazz/i/api/follow/?context=4', null);
         http.request((data) => {

         	    try {
         	    	 
         	    	 let response = JSON.parse(data);

         	    	   if(response.list){ // True, That means The JSON Array Is Not Empty

         	    	   	   // Loop Through Arrays
         	    	   	    for(let i = 0; i < response.follow_list.length; i ++){

         	    	   	    	let wrapper = this.div();

         	    	   	    	wrapper.appendChild(this.followsList(response.follow_list[i],2));

         	    	   	    	root.appendChild(wrapper);

         	    	   	    } // End Of Loop

         	    	   }else { // False, MEans JSON Array Was Empty

         	    	   	  this.toast('Couldn\'t Get More Suggestions');

         	    	   }

         	    } catch(e) {

         	    	this.toast(e);

         	    } // End Of Try-Catch

         } ,// End Of Arrow Function
         ''
       ); // End Of Request Method Follow Suggestions

  	} // End Of Suggestionss

   /* For Header Names */
   header(obj){

   	  // Implement Header Using Bootstraps Media Class

   	  let HeaderBody = this.div();
   	  HeaderBody.setAttribute('class', 'app-media-header');

   	  let Media = this.div();
   	  let MediaLeft = this.div();
   	  let MediaBody = this.div();
   	  let MediaRight = this.div();

   	  HeaderBody.appendChild(Media);

   	  Media.appendChild(MediaLeft);
   	  Media.appendChild(MediaBody);
   	  Media.appendChild(MediaRight);

   	  Media.setAttribute('class','media');
   	  MediaLeft.setAttribute('class','media-left');
      MediaBody.setAttribute('class',`media-body header-media-body-${obj.postId}`);
      MediaRight.setAttribute('class','media-right');

      let Img = new Image();
      Img.src = obj.imgUrl;

      Img.setAttribute('class', 'img-circle');

      Img.setAttribute('height', '35');
      Img.setAttribute('width', '35');

      MediaLeft.appendChild(Img);


      var UrlAnchor = this.anchor();
  		var UrlSpan = this.span();

  		UrlSpan.innerHTML = `<span class="app-mid-text">${obj.username}</span><br/><span class="app-grey-text">@${obj.handle}</span>`;

  		UrlSpan.setAttribute('class', 'app-mid-text');
  		UrlAnchor.href = `http://localhost/yazz/usr/${obj.handle}`;
  		UrlAnchor.appendChild(UrlSpan);
  		MediaBody.appendChild(UrlAnchor);

  		var IconTdSpan = this.span();
  		var IconAnchor = this.anchor();
  		IconAnchor.setAttribute('class', 'app-options-btn');
  		IconTdSpan.setAttribute('class','glyphicon glyphicon-option-vertical');
  		IconAnchor.appendChild(IconTdSpan);

  		//MediaRight.appendChild(IconAnchor);

  		return HeaderBody;

   }

    tags(text){

       let handleText = text.replace(/@+([a-zA-Z0-9_]+)/g, 
        (x , y) => {
          return `<a class='app-tag' href='http://localhost/yazz/usr/${y}'>${x}</a>`;
      });


      let hashText = handleText.replace(/#+([a-zA-Z0-9_]+)/g, 

           (x, y) => {

              return `<a class='app-tag' href='http://localhost/yazz/trending/?tag=${y}'>${x}</a>`;

           }
        );

      return hashText;
  	 
    }


    // For Showing Post

  	postBody(obj, context){

  		let MediaBodyDiv = this.div();
  		MediaBodyDiv.setAttribute('class', 'app-media-body');
  		let MediaAnchor = this.anchor();
  		let TextBody = this.div();
  		let Text = this.span();

  		let MediaInfoBody = this.div();

  		let TimeText = this.span();
  		let ViewText = this.span();

  		MediaInfoBody.appendChild(TimeText);
  		MediaInfoBody.appendChild(ViewText);

  		MediaInfoBody.setAttribute('class', 'media-info-body');
  		TimeText.setAttribute('class', 'app-timer media-text');
  		ViewText.setAttribute('class','app-counter media-text');

      obj.postText = this.tags(obj.postText);

  		Text.setAttribute('class', 'app-post-text');
  		TextBody.setAttribute('class', 'app-post-text-body');
  		if(obj.postType == "photo" || obj.postType == "image"){
  			// UI for Photo
  			let ImgWrapper = this.div();
  			ImgWrapper.setAttribute('class', 'app-image-body');
  			let img = this.dom.createElement('img');
  			img.setAttribute('class', 'img-square app-media img-responsive');
  			img.src = obj.postUrl;
  			ImgWrapper.appendChild(img);
  			MediaAnchor.appendChild(ImgWrapper);
  			MediaBodyDiv.appendChild(MediaAnchor);
  		} else
  		   if(obj.postType == "video"){
  		   	// UI for Video
  		   	let video = this.dom.createElement('video');
  		   	let source = this.dom.createElement('source');
  		   	let videoWrapper = this.div();

  		   	videoWrapper.setAttribute('class', 'app-video-body');

  		   	source.src = obj.postUrl;
  		   	video.appendChild(source);
  		   	video.setAttribute('class', 'app-media app-video');

  		   	ViewText.textContent = obj.postView > 1 || obj.postView == 0 ? `${obj.postView} views` : `${obj.postView} view`;

  		   	videoWrapper.appendChild(video);
  		   	videoWrapper.appendChild(MediaInfoBody);

  		   	let time = new Time(video, obj.postId);
  		   	MediaAnchor.onclick = () => {

  		   		time.action();
  		   		time.log(ViewText);
  		   	}

  		   	time.showTime(TimeText);
  		   	

  		   	// Auto Play

  		   	  	 if(!isMobile){
                  window.addEventListener('scroll',
                    () => {
                      time.autoplay(video);
                   },
                 false);
               }

  		   	// End Of Auto Play
  		   	
  		   	MediaAnchor.appendChild(videoWrapper);
  		   	MediaBodyDiv.appendChild(MediaAnchor);

  		   	// End For Video
  		   }else 
  		     if(obj.postType == "audio"){

  		     	// UI For Audio
  		   	   let Canvas = this.div('div');
  		   	   let props = this.AudioBody(obj.postUrl); // Return Array Of Media Body && The Actual Audio!

  		   	   let time = new Time(props[1], obj.postId); // Create TimeObject For Handling Media Action, Showing Time And Updating Media Progressbar

  		   	   time.showTime(TimeText, props[3]);
  		   	   ViewText.textContent = obj.postView > 1 || obj.postView == 0 ? `${obj.postView} listens` : `${obj.postView} listen`;

  		   	   Canvas.setAttribute('class', 'app-audio-canvas');

  		   	   Canvas.appendChild(props[0]); // Append The Media Body
  		   	   props[4].appendChild(MediaInfoBody);
  		   	   MediaInfoBody.classList.remove('media-info-body');
  		   	   MediaInfoBody.classList.add('app-audio-info-body');

  		   	   props[2].onclick = () => {

  		   	   	  time.action();
  		   	   	  time.log(ViewText);

  		   	   } // End Of Play/Pause

  		   	   MediaAnchor.appendChild(Canvas);
  		   	   
  		   	   // Check For Device To Enable Auto Play
  		   	     if(isMobile){

  		   	     	  window.addEventListener('scroll', 
  		   	     	  	   () => {

  		   	     	  	  time.autoplay(props[1]); // Call The Autoplay Method And Pass It The Media, In This Case, Audio!

  		   	     	  	   },
  		   	     	  	false
  		   	     	  	);

  		   	     } // End Of If
  		   	   
  		   	   MediaBodyDiv.appendChild(MediaAnchor);
  		   	   
  		   	   
  		   } // End Of If
         
  		  if(context == 2){
          TextBody.appendChild(Text);
          Text.innerHTML = obj.postText;
          MediaBodyDiv.appendChild(TextBody);
        }

  		return MediaBodyDiv; 
  	} // End Of postBody

  	

  	commentReaction(obj, context){

  		 let commentTable = this.dom.createElement('table');
  		 let tr = this.dom.createElement('tr');
  		 let TextTd = this.dom.createElement('td');

       obj.postText = this.tags(obj.postText);

  		 
  		 commentTable.setAttribute('class', 'app-comment-table');
  		 TextTd.setAttribute('class', 'app-tab comment-tab text-tab');
  		 commentTable.appendChild(tr);
  		 tr.appendChild(TextTd);
  		 

  		 let TextCom = this.span();
  		 TextCom.setAttribute('class', 'app-text comment-text-text');
  		
  		 TextTd.appendChild(TextCom);
  		 TextCom.innerHTML = obj.postText;

  		 let DateText = this.span();
  		 DateText.setAttribute('class', 'app-text date-text');
  		 DateText.textContent = `${obj.postDate}`;
  		 if(context == 1){
  		 	 let IconTd = this.dom.createElement('td');
  		   IconTd.setAttribute('class', 'app-tab comment-tab icon-tab');
  		   tr.appendChild(IconTd);
  		   let IconCenter = this.center();
  		   let IconBtn = this.anchor();
  		   let Icon = this.span();

  		   IconTd.appendChild(IconCenter);
  		   IconCenter.appendChild(IconBtn);
  		   IconBtn.appendChild(Icon);
  		   Icon.setAttribute('class', 'glyphicon glyphicon-fire');

  		   	 return commentTable;
  		 } else if(context == 2){

  		 	 let DateTd = this.dom.createElement('td');
  		 	 DateTd.setAttribute('class', 'app-tab comment-tab date-tab');
  		 	 tr.appendChild(DateTd);

  		 	 let dateCenter = this.center();
  		 	 

  		 	 dateCenter.appendChild(DateText);
  		 	 DateTd.appendChild(dateCenter);

  		 	 	 return commentTable;
  		 	 
  		 }
  	} // End Of CommentReaction

  	
  	reactionBody(obj){

  		let table = this.dom.createElement('table');
  		let tr = this.dom.createElement('tr');
  		let LikeTd = this.dom.createElement('td');
  		let CommentTd = this.dom.createElement('td');
  		let DateTd = this.dom.createElement('td');
  		tr.appendChild(LikeTd);
  		tr.appendChild(CommentTd);
  		tr.appendChild(DateTd);
  		table.appendChild(tr);

      table.setAttribute('class','app-reaction-table');
  		LikeTd.setAttribute('class', 'app-react-icons like-react-tab app-tab');
  		CommentTd.setAttribute('class', 'app-react-icons comment-react-tab app-tab');
  		DateTd.setAttribute('class', 'app-react-icons date-react-tab app-tab');

  		let LikeCenter = this.center();
  		LikeTd.appendChild(LikeCenter);
  		let LikeBtn = this.anchor();
  		LikeCenter.appendChild(LikeBtn);
  		let Icon = this.span();
  		LikeBtn.appendChild(Icon);
  		let LikeIconCount = this.span();
  		LikeBtn.appendChild(LikeIconCount);
  		LikeIconCount.setAttribute('id', `post-${obj.postId}`);
  		LikeIconCount.setAttribute('class', 'app-icon-count app-grey-text');

  		// Check If User Already Liked
  		  if(obj.postIsLiked && obj.postLikeCount > 0){

  		  	Icon.setAttribute('class', 'glyphicon glyphicon-fire fire app-react-icon');
  		    LikeIconCount.textContent = obj.postLikeCount == 0 ? "" : obj.postLikeCount;

  		  }else{

  		  	Icon.setAttribute('class', 'glyphicon glyphicon-fire app-react-icon');
  		    LikeIconCount.textContent = obj.postLikeCount == 0 ? "" : obj.postLikeCount;

  		  } // End Of If

  		  // !!!!!!!!!Check if USER is Logged In FIRST!!!!!!
  		   if(user.isLogged){
  		   	 // User Can Like Since, isLogged Is True

  		   	 // When Post Is Like
  		       LikeBtn.onclick = () => {
  		       	/*
  		       	var formData = new FormData();
  		       	formData.append("context",1);
  		       	formData.append("pid", obj.postId);
  		       	console.log(formData);
  		       	*/

  		       	// Set New Params To The Ajax Method
  		       	http.params('GET',`http://localhost/yazz/i/api/react/?context=1&pid=${obj.postId}`,null);
  		       	// Exec The Actual Request
  		       	  http.request(
  		       	  	(str) => {
  		       	  	  let response = JSON.parse(str);
  		       	  	  
  		       	  	  // Check For Error
  		       	  	  if(!response.error){
  		       	  	  	 if(response.message == 'flamed'){

  		       	  	  	// Change Icon Color

  		       	  	  	   Icon.removeAttribute('class', 'glyphicon glyphicon-fire app-react-icon');
  		       	  	  	   Icon.setAttribute('class', 'glyphicon glyphicon-fire fire app-react-icon');
  		       	  	  	   LikeIconCount.textContent = response.count > 0 ? response.count : "";

  		       	  	    }else if(response.message == "unflamed"){

  		       	  	  	//Revert Icon Color To Normal
  		       	  	  	   Icon.removeAttribute('class', 'glyphicon glyphicon-fire fire app-react-icon');
  		       	  	  	   Icon.setAttribute('class', 'glyphicon glyphicon-fire app-react-icon');
  		       	  	  	   LikeIconCount.textContent = response.count > 0 ? response.count : "";

  		       	  	    } // End Of If
  		       	  	  }else{

  		       	  	  	this.toast(`Could Not Add Flame To @${obj.handle}'s Post`);

  		       	  	 } // End Of Error Check

  		       	   } // Anonymous Callback Function

  		         ); // End Of Request

  		       } // End Of Like Click

  		   }else{

  		   	 // Cannot Like Since, isLogged Is False
  		   	 // Show User Login Button
  		   	 LikeBtn.onclick = () => {

  		   	 	 this.login(`You Need To Login Or Create An Account First To Like @${obj.handle} Post`);

  		   	 } // End Of Anonymous Onclick

  		   } // End Of If

  		let CommentCenter = this.center();
  		let CommentIcon = this.span();
  		let CommentIconCount = this.span();
  		let CommentBtn = this.anchor();

  		CommentTd.appendChild(CommentCenter);
  		CommentCenter.appendChild(CommentBtn);
  		CommentBtn.appendChild(CommentIcon);
  		CommentBtn.appendChild(CommentIconCount);

  		 CommentIcon.setAttribute('class', 'glyphicon glyphicon-comment app-react-icon');
  		 CommentIconCount.textContent = obj.postCommentsCount > 0 ? obj.postCommentsCount : "";
  		 CommentIconCount.setAttribute('class', 'app-icon-count app-grey-text');

       CommentBtn.setAttribute('id', `read-comment-${obj.postId}`);

  		   // When Comment Btn Is Clicked, Show Comments Of That Post

  		   CommentBtn.onclick = () => {
 
  		   	 this.modal.style.display = 'block';
  		   	 select('.modal-nav-name').textContent = obj.postCommentsCount == 0 ? 'No Comments' : `${obj.postCommentsCount} Comments`;
  		   	 select('.app-modal-view').innerHTML = "";
  		   	 select('.app-block-popout-content').appendChild(this.inputUI('jh',2, obj));

  		   	 // Implement The Modal Back Button

  		   	  select('.modal-back-btn').onclick = () => {

  		   	  	this.modal.style.display = 'none';
  		   	  	select('.app-modal-view').innerHTML = "";
  		   	  	CommentArrayList = [];
  		   	  	select('.app-block-popout-content').removeChild(select('.app-input-wrapper'));
  		   	  }
            
            let ModalView = select('.app-modal-view');

            ModalView.appendChild(this.comments(obj.postId));

  		   } // End Of Comment Btn Click

  		   let div = this.div();
  		   div.appendChild(table);
  		   div.setAttribute('class','app-reaction-body');
  		  return div;

  	} // End Of Reaction Body

    comments(id){

          CommentArrayList = [];
           // Get The Top Level Element For Displaying Comments
           let wrapper = this.div();

           // Get Comments
           http.params('GET',`http://localhost/yazz/i/api/react/?context=3&pid=${id}`,null);
             http.request(

              (data) => {

               try {

                 let response = JSON.parse(data);
                 // Error Checking
                 if(!response.error){

                    // Check For Comments > 0
                    if(response.message == "comments"){ // There Are > 0 Comments

                      //Loop Through All The Comments To Collect The Data
                       for(let i = 0; i < response.comments.length; i ++){
//username, handle,imgUrl,userId,postId,postUrl,postType,postDate,postTime,postText,postCommentsCount,postLikeCount,postIsLiked
                        
                        let CommentModel = new PostDataModel(
                           response.comments[i].user_info.user_name,
                           response.comments[i].user_info.user_athandle,
                           response.comments[i].user_info.img_url,
                           response.comments[i].comment_info.user_id,
                           response.comments[i].comment_info.comment_id,
                           response.comments[i].comment_info.comment_url,
                           response.comments[i].comment_info.comment_type,
                           response.comments[i].comment_info.comment_date,
                           response.comments[i].comment_info.comment_time,
                           response.comments[i].comment_info.comment_text,
                           null,
                           null,
                           null,
                           null
                          );
                        //Add The Objects To ArrayList

                        CommentArrayList.push(CommentModel);

                       } // End Of For Loop

                      //CommentIconCount.textContent = response.comments.length > 0 ? response.comments.length : "";
                       // Show Comments
                       

                         CommentArrayList.forEach((Comment) => {

                          let CommentBody = this.dom.createElement('div');
                          CommentBody.setAttribute('class', 'app-comment-body')
                          CommentBody.appendChild(this.header(Comment));
                          CommentBody.appendChild(this.postBody(Comment,1));
                          CommentBody.appendChild(this.commentReaction(Comment,1));


                          wrapper.appendChild(CommentBody);
                        } // End Of Anonymous Function Callback
                       ); // End Of ForEach Loop
                         
                         

                    } else { // There Are < 0 Comments
                       
                       this.toast('No Comments');

                    } // End Of Comments Checking

                 }else{

                  // !!!!!!!!! Show Proper Error Message !!!!!!!!
                  this.toast(`Could Not Load Comments Of This Post`);

                 } // End Of Error Checking

               } catch(e) {

                // !!!!!!!!! Show Proper Error Message !!!!!!!!
                 this.toast(e);
                 console.log(e);

               } // End Of Try/Catch

             } // End Of Anonymous Function Callback

           ); // End Of Request
             return wrapper;
    }

  	// Method To Show And Animate When Theres No Media && Posts To Show
  	emptyPosts(text){

  		let center = this.center();
      let div = this.div();
      div.setAttribute('class', '');
      div.appendChild(center);

      let icon = this.span();
      icon.setAttribute('class', 'glyphicon glyphicon-folder-close app-empty-posts');

      let h4 = this.dom.createElement('h2');
      h4.innerHTML = text;

      center.appendChild(icon);
      center.appendChild(h4);
       // To Change And Animate Icon
       setInterval(
        	() => {

        		icon.classList.toggle('glyphicon-folder-open');

        }, // End Of Call Back Function
        500);
       

       return div;
  	} // End Of emptyPosts() Method

  	followBtn(obj,context){

  		/*

  		 context = 1, Follow User

  		 context = 2, Follow User From Follow List

  		 context = 3, Follow List On Who Might Follow
  		*/

  		let fCenter = this.center();
      let FollowBtn = this.anchor();

      fCenter.appendChild(FollowBtn);
      	 	   

      	 	  // Check If Viewer Follows This Account
      	 	   if(obj.following){ // true, Viewer Is A Follower

      	 	   	 FollowBtn.textContent = 'Following'
      	 	   	 FollowBtn.setAttribute('class', 'btn btn-success');
      	 	   	 

      	 	   }else{ // false, Viewer Is Not A Follower

      	 	   	  FollowBtn.textContent = 'Follow';
      	 	   	  FollowBtn.setAttribute('class', 'btn btn-default');

      	 	   } // End Of If

      	 	   // Add Onclick Method For Following
      	 	   FollowBtn.onclick = () => {

      	 	   	if(user.isLogged){

      	 	   	// Set Parameters For Request
      	 	   	 http.params('GET', `http://localhost/yazz/i/api/follow/?context=1&u_id=${obj.basic_info.user_id}`,null);
      	 	   	 // Make Request

      	 	   	 http.request(

      	 	   	 	(data) => {
      	 	   	 	 // Try For Json Data Being Returned
      	 	   	 	    try {
      	 	   	 	    	
      	 	   	 	    	let resp = JSON.parse(data);

      	 	   	 	    	 // Check For Error In Response
      	 	   	 	    	  if(!resp.error){

      	 	   	 	    	  	 // Check follow Condition

      	 	   	 	    	  	 if(resp.follow){
      	 	   	 	    	  	 	 // Click Was Following
      	 	   	 	    	  	 	 FollowBtn.removeAttribute('class','btn btn-default');
      	 	   	 	    	  	 	 FollowBtn.setAttribute('class', 'btn btn-success');
      	 	   	 	    	  	 }else{
      	 	   	 	    	  	 	 FollowBtn.removeAttribute('class','btn btn-success');
      	 	   	 	    	  	 	 FollowBtn.setAttribute('class', 'btn btn-default');
      	 	   	 	    	  	 }

      	 	   	 	    	  	 FollowBtn.textContent = resp.message;
      	 	   	 	    	  	   if(context == 1){

      	 	   	 	    	  	   	// Following  User From Their User Profile
      	 	   	 	    	  	   	 select('.following-text-count').textContent = resp.following;
      	 	   	 	    	  	     select('.followers-text-count').textContent = resp.followers;

      	 	   	 	    	  	   } // End Of Follow


      	 	   	 	    	  }else{
      	 	   	 	    	  	//!!! DONT FORGET TO ERROR CHECK

      	 	   	 	    	  } // End Of Error Checking

      	 	   	 	    } catch(e) {
      	 	   	 	    	// statements
      	 	   	 	    	this.toast(e);

      	 	   	 	    } // # End Of Try 

      	 	   	   } // End Of Arrow Function

      	 	   	 ); // End Of Request

      	 	   	}else{

      	 	   		this.login(`You Need To Login First To Follow @${obj.basic_info.user_athandle}`);

      	 	   	} // End Of Login Check

      	 	   } // End On FollowBtn OnClick method

      	 	   return fCenter;
  	}

  	// Input For UI for comments and messages
  	inputUI(url, cxt, obj = "") {

  		let inputWrapper = this.div();
  		inputWrapper.setAttribute('class', 'app-input-wrapper');

      let center = this.center();
      let showTime = this.span();
      showTime.setAttribute('class', 'comment-recording-timer app-bold-text');
      center.appendChild(showTime);

      let space = this.div();
      space.setAttribute('class', 'space-small');

      let RecBody = this.div();

      RecBody.setAttribute('class', 'comment-rec-body');

  		   let InputTable = this.dom.createElement('table');
  		   let InputTr = this.dom.createElement('tr');
  		   let RecordTd = this.dom.createElement('td');
  		   let MediaTd = this.dom.createElement('td');
  		   let MessageTd = this.dom.createElement('td');
  		   let SendTd = this.dom.createElement('td');
         let DeleteTd = this.dom.createElement('td');

  		   InputTable.setAttribute('class', "app-input-table table-bordered");
  		   RecordTd.setAttribute('class', 'app-tab app-input-tab rec-tab');
  		   MediaTd.setAttribute('class', 'app-tab app-input-tab media-tab');
  		   MessageTd.setAttribute('class', 'app-tab app-input-tab input-tab');
  		   SendTd.setAttribute('class', 'app-tab app-input-tab send-tab');
         DeleteTd.setAttribute('class', 'app-tab app-input-tab trash-can-tab');

         DeleteTd.style.display  = 'none';


  		   let Progress = this.div();
  		   let ProgressBar = this.div();

  		   Progress.setAttribute('class', 'comment-progress progress');
  		   ProgressBar.setAttribute('class', 'comments-progress-bar progress-bar');


  		   Progress.appendChild(ProgressBar);
  		   inputWrapper.appendChild(InputTable);

         inputWrapper.appendChild(space);
         inputWrapper.appendChild(space);

         inputWrapper.appendChild(center);

         inputWrapper.appendChild(space);
         inputWrapper.appendChild(space);

         inputWrapper.appendChild(RecBody);
  		   inputWrapper.appendChild(Progress);
  		   InputTable.appendChild(InputTr);

         InputTr.appendChild(DeleteTd);
  		   InputTr.appendChild(RecordTd);
  		   InputTr.appendChild(MediaTd);
  		   InputTr.appendChild(MessageTd);
  		   InputTr.appendChild(SendTd);
         

         let ButtonTrash = this.dom.createElement('a');
         let TrashIcon = this.span();

         TrashIcon.setAttribute('class', 'glyphicon glyphicon-trash');
         ButtonTrash.setAttribute('class', 'btn btn-default trash-can-btn');

         ButtonTrash.appendChild(TrashIcon);
         DeleteTd.appendChild(ButtonTrash);

  		   let RecCenter = this.center();
  		   let RecBtn = this.anchor();
         RecBtn.setAttribute('class', 'btn btn-default');
  		   let RecIcon = this.span();

  		   RecIcon.innerHTML = `<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13">
                            <path fill="#111" fill-opacity="1" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z">
                            </path>
                          </svg>`;

  		   RecordTd.appendChild(RecCenter);
  		   RecCenter.appendChild(RecBtn);
  		   RecBtn.appendChild(RecIcon);

  		   let MediaCenter = this.center();
  		   let MediaBtn = this.dom.createElement('label')
         let Anch = this.anchor();
         Anch.setAttribute('class', 'btn btn-default glyphicon glyphicon-camera');
  		   let MediaIcon = this.span();

  		   MediaBtn.setAttribute('for', 'media-form');
  		   MediaIcon.setAttribute('class', "glyphicon glyphicon-camera");

  		   MediaTd.appendChild(MediaCenter);
  		   MediaCenter.appendChild(MediaBtn);
  		   //MediaBtn.appendChild(MediaIcon);
         MediaBtn.appendChild(Anch);

  		   let TextInput = this.dom.createElement('textarea');
  		   MessageTd.appendChild(TextInput);
  		   TextInput.placeholder = "Text Message";
  		   TextInput.setAttribute('class', 'app-text-input')


  		   let SendCenter = this.center();
  		   let SendBtn = this.anchor();
         SendBtn.setAttribute('class', 'btn btn-default');
  		   let SendIcon = this.span();
  		   SendIcon.setAttribute('class', "glyphicon glyphicon-send");

  		   SendTd.appendChild(SendCenter);
  		   SendCenter.appendChild(SendBtn);
  		   SendBtn.appendChild(SendIcon)

  		  let MediaUpload = new Upload(SendBtn, RecBtn, cxt, obj);

  		return inputWrapper;

  	} // End Of input UI

  	// UI for when user is not logged in
  	login(str){
  		select('.app-block-popout-content').style.height = isMobile ? '100%' : '300px';
  		select('.app-modal-view').innerHTML = "";
  		let modal = select('.app-block-popout');
  		select('.modal-back-btn').onclick = () => {

         modal.style.display = 'none';
         select('.app-modal-view').innerHTML = "";
         select('.app-block-popout-content').style.height = isMobile ? '100%' : '630px';
       }
  		modal.style.display = 'block'

  		let heading = select('.modal-nav-name');
  		heading.textContent = 'Login';

  		let div = this.div();
  		let center = this.center();
  		let span = this.dom.createElement('h4');
  		let LoginBtn = this.anchor();
  		let br = this.dom.createElement('br');
  		div.appendChild(center);

  		center.appendChild(span);
  		center.appendChild(br);
  		center.appendChild(LoginBtn);

  		span.textContent = str;
  		LoginBtn.setAttribute('class', 'btn btn-default');
      LoginBtn.href = 'http://localhost/yazz/login/';
  		LoginBtn.textContent = 'Go To Login';
  		let modalContent = select('.app-modal-view');
  		modalContent.appendChild(div);

  		this.toast('Creating An Account Or If Already Have One, Login To Unlock More Interaction');

  		  
  	} // End of UI login

  	/*

  	  this Method is for various things
  	    (i) for showing followers list
  	    (ii) for showing following list
  	    (iii) for showing people you might follow

  	*/
  	followsList(obj,context){

  		let FollowTable = this.dom.createElement('table');
  		let HeaderTr = this.dom.createElement('tr');
  		let BioTr = this.dom.createElement('tr');
  		let ImgTd = this.dom.createElement('td');
  		let NameTd = this.dom.createElement('td');
  		let FollowTd = this.dom.createElement('td');
  		let BioTd = this.dom.createElement('td');

  		FollowTable.appendChild(HeaderTr);
  		FollowTable.appendChild(BioTr);

  		FollowTable.setAttribute('class', 'app-follow-table');
  		ImgTd.setAttribute('class', 'app-tab app-follow-list app-img-tab');
  		ImgTd.setAttribute('rowspan', '2');
  		NameTd.setAttribute('class', 'app-tab app-follow-list app-name-tab');
  		FollowTd.setAttribute('class', 'app-tab app-follow-list list-follow-btn');
  		FollowTd.setAttribute('rowspan', '2');
  		BioTd.setAttribute('class', 'app-tab app-follow-libold');

  		HeaderTr.appendChild(ImgTd);
  		HeaderTr.appendChild(NameTd);
  		HeaderTr.appendChild(FollowTd);
  		BioTr.appendChild(BioTd);

  		let Image = this.dom.createElement('img');
  		let NameLink = this.anchor();
  		let NameText = this.span();
  		let BioText = this.span();

  		ImgTd.appendChild(Image);

  		NameTd.appendChild(NameLink);
  		NameLink.appendChild(NameText);

  		NameLink.href = `http://localhost/yazz/usr/${obj.basic_info.user_athandle}`;

  		BioTd.appendChild(BioText);

  		Image.src = obj.basic_info.img_url;
      Image.setAttribute('height', '35');
      Image.setAttribute('width', '35');
  		Image.setAttribute('class', 'img-circle media-object img-responsive');
  		NameText.innerHTML = `<span class="app-mid-text">${obj.basic_info.user_name}</span><br/><span class="app-grey-text">@${obj.basic_info.user_athandle}</span>`;
  		NameText.setAttribute('class', 'app-mid-text');
  		BioText.textContent = obj.add_info.bio;
  		BioText.setAttribute('class', 'app-text app-small-text');
  		
        if(!obj.me){
          FollowTd.appendChild(this.followBtn(obj,context));
        }

  		// Return The Table
  		return FollowTable;

  	} // End of followsList

  	// For Viewing Messages Between Two Users
  	viewMessages(obj){

  		let Div = this.div();

  		// Dealing With Left Div

  		    let Table = this.dom.createElement('table');
  		    let FirstTr = this.dom.createElement('tr');
  		    let SecTr = this.dom.createElement('tr');
  		    let MessageTd = this.dom.createElement('td');
  		    let TimeTd = this.dom.createElement('td');

  		    Table.appendChild(FirstTr);
  		    Table.appendChild(SecTr);

  		    
  		      if(user.user_id != obj.user_id_two){

  		      	let ImgTd = this.dom.createElement('td');
  		      	 FirstTr.appendChild(ImgTd);
  		      	 let Image = this.dom.createElement('img');
  		      	 Image.src = obj.img_url;
  		      	 Image.setAttribute('class', 'img-circle img-responsive');
               Image.setAttribute('width', '35');
               Image.setAttribute('height', '35');
  		      	 ImgTd.appendChild(Image);

  		      	 ImgTd.setAttribute('class', 'app-tab app-message-tab img-message-tab');
  		      	 ImgTd.setAttribute('rowspan', '2');

  		      	 Div.setAttribute('class', 'app-message app-message-bubble app-left-message');

  		      }else if(user.user_id == obj.user_id_one){

  		      	Div.setAttribute('class', 'app-message app-message-bubble app-right-message');

  		      }
  		    FirstTr.appendChild(MessageTd);
  		    SecTr.appendChild(TimeTd);


  		    let MessageText = this.span();
  		    let TimeText = this.span();

  		    MessageTd.appendChild(MessageText);
  		    TimeTd.appendChild(TimeText);

  		    Table.setAttribute('class', 'app-message-table');
  		    MessageTd.setAttribute('class', 'app-tab app-message-tab text-message-tab')
  		    TimeTd.setAttribute('class', 'app-tab app-message-tab time-message-tab');

  		    MessageText.setAttribute('class', 'app-message text-message');
  		    TimeText.setAttribute('class', 'app-message time-message date-text');
  		    MessageText.textContent = obj.message;
  		    var seen = obj.seen == 0 ? "" : "seen";
  		    TimeText.textContent = `${obj.date} ${obj.time} ${seen}`;

  		    Div.appendChild(Table);

  		    // Implement The Back Button

  		    select('.modal-back-btn').onclick = () => {
              select('.app-modal-view').innerHTML = "";

              this.chatsUI('.app-modal-view','.modal-nav-name');

              select('.app-block-popout-content').removeChild(select('.app-input-wrapper'));
          }

  		    return Div;

  		// End Of LeftDiv

  	} // End of viewMessages()

  	// UI For Viewing Chats

  	chatsUI(tag, nametag){

  		
  			select('.modal-back-btn').onclick = () => {
  				select('.app-block-popout').style.display = 'none';
  				select(tag).innerHTML = ""
  			}


  		 // Override Params For Request
  		http.params('GET', `http://localhost/yazz/i/api/messages/?cxt=1&id=${user.user_id}`,null);
      http.request(

      	(data) => {
         
          // try catch block

           try {

           	    let response = JSON.parse(data);

        	 	     // Check If There are Conversations
        	 	    if(response.chats){ // true, user has one or more chats
        	 	    	let ChatsWrapper = this.div();
                  ChatsWrapper.setAttribute('class', 'app-chats-wrapper');
        	 	    	 // Loop Through All Messages
        	 	    	 let i = 0;
        	 	    	 response.chat.forEach(

                    (obj) => {

        	 	    	 	    let ChatsTable = this.dom.createElement('table');
        	 	    	 	    let FirstTr = this.dom.createElement('tr');
        	 	    	 	    let SecTr = this.dom.createElement('tr');

        	 	    	 	    ChatsTable.appendChild(FirstTr);
        	 	    	 	    ChatsTable.appendChild(SecTr);
        	 	    	 	    ChatsTable.setAttribute('class', 'app-chats-table');

        	 	    	 	    let ImgTd = this.dom.createElement('td');
        	 	    	 	    let ChatNameTd = this.dom.createElement('td');
        	 	    	 	    let ChatMessageTd = this.dom.createElement('td');
        	 	    	 	    let SeenTd = this.dom.createElement('td');

        	 	    	 	    FirstTr.appendChild(ImgTd);
        	 	    	 	    FirstTr.appendChild(ChatNameTd);
        	 	    	 	    FirstTr.appendChild(SeenTd);
        	 	    	 	    SecTr.appendChild(ChatMessageTd);

        	 	    	 	    let ImgCenter = this.center();
        	 	    	 	    let Image = this.dom.createElement('img');
        	 	    	 	    let ChatBtn = this.anchor();
        	 	    	 	    let NameText = this.span();
        	 	    	 	    let MessageBtn = this.anchor();
        	 	    	 	    let MessageText = this.span();
        	 	    	 	    let SeenCenter = this.center();
        	 	    	 	    let SeenText = this.span();

        	 	    	 	    ImgCenter.appendChild(Image);
        	 	    	 	    ImgTd.appendChild(ImgCenter);

        	 	    	 	    ChatNameTd.appendChild(ChatBtn);
        	 	    	 	    ChatBtn.appendChild(NameText);

        	 	    	 	    ChatBtn.setAttribute('class', 'app-chat-btn');

        	 	    	 	    ChatMessageTd.appendChild(MessageBtn);
        	 	    	 	    MessageBtn.appendChild(MessageText);

        	 	    	 	    MessageBtn.setAttribute('class', 'app-chat-btn');

        	 	    	 	    // When You Wanna Check The Messages
        	 	    	 	    MessageBtn.onclick = ChatBtn.onclick = () => {

        	 	    	 	    	  select('.modal-nav-name').textContent = `@${obj.user_handle}`;
        	 	    	 	    	  select('.app-block-popout-content').appendChild(this.inputUI("hjsd",1));

      	 	   	    // View Messages Between LoggedIn User & This Account User

      	 	   	    http.params('GET', `http://localhost/yazz/i/api/messages/?cxt=2&id=${user.user_id}&uid=${obj.user_id}`, null);
      	 	   	    http.request(

      	 	   	    	(data) => {
      	 	   	    	  // Try Catch Block
      	 	   	    	   try {
      	 	   	    	   	
      	 	   	    	   	 let response = JSON.parse(data);
      	 	   	    	   	 let modalView = select('.app-modal-view');
      	 	   	    	   	 modalView.innerHTML = "";

      	 	   	    	   	 // Check If There Are Chats

      	 	   	    	   	 if(response.chats){

      	 	   	    	   	 	 // There Are Chats

      	 	   	    	   	 	 // Loop Through All The Chats

      	 	   	    	   	 	 for(let i = 0; i < response.messages.length; i ++){

                            let space = this.div();
                            space.setAttribute('class', 'space-small');
      	 	   	    	   	 	 	 modalView.appendChild(this.viewMessages(response.messages[i]));
                             modalView.appendChild(space);

      	 	   	    	   	 	 } // End Of While Loop
      	 	   	    	   	 }else {

      	 	   	    	   	 	
      	 	   	    	   	 	// There No Chats
      	 	   	    	   	 } // End Of If

      	 	   	    	   } catch(e) {
      	 	   	    	   	// statements
      	 	   	    	   	this.toast(e);

      	 	   	    	   } // End Of Try Catchs
      	 	   	      } // End Of Anonymous Function

      	 	   	    ); // End Of Request
        	 	    	 	    } // End Of Onclick On One Of The Messages 
        	 	    	 	    SeenTd.appendChild(SeenCenter);
        	 	    	 	    SeenCenter.appendChild(SeenText);

        	 	    	 	    ImgTd.setAttribute('class', 'app-tab app-chats-tab img-message-tab');
        	 	    	 	    ImgTd.setAttribute('rowspan', '2');

        	 	    	 	    ChatNameTd.setAttribute('class', 'app-tab app-chats-tab name-chat-tab');
        	 	    	 	    ChatMessageTd.setAttribute('class', 'app-tab app-chats-tab message-chat-tab');
        	 	    	 	    SeenTd.setAttribute('class', 'app-tab app-chat-tab seen-chat-tab');
        	 	    	 	    SeenTd.setAttribute('rowspan', '2');

        	 	    	 	    Image.setAttribute('class', 'img-square app-small-img');
        	 	    	 	    SeenText.setAttribute('class', 'seen-text');
        	 	    	 	    NameText.setAttribute('class', 'app-handle-text app-mid-text');
        	 	    	 	    MessageText.setAttribute('class', 'app-message-text app-grey-text');

        	 	    	 	    Image.src = obj.img_url;
                        Image.setAttribute('height', '35');
                        Image.setAttribute('width', '35');
                        Image.setAttribute('class', 'img-circle img-responsive');
        	 	    	 	    NameText.textContent = `@${obj.user_handle}`;
        	 	    	 	    MessageText.textContent = obj.message;
        	 	    	 	    SeenText.textContent = obj.seen == 0 ? obj.count : "";
        	 	    	 	    if(obj.seen == 0){
        	 	    	 	    	i++;
        	 	    	 	    }
        	 	    	 	    ChatsWrapper.appendChild(ChatsTable);
        	 	    	    } // End Of Anonymous function

        	 	    	 ); // End For Loop

        	 	    	 select(nametag).textContent = `Chats : ${i}`;

                    let space = this.div();
                    space.setAttribute('class', 'space-small');

        	 	    	 select(tag).appendChild(ChatsWrapper);
                   select(tag).appendChild(space);

        	 	    } else{ // false, user has no chats

                  this.toast('You Have No Chats');

        	 	    } // End Of Check
           } catch(e) {
           	// statements
           	  this.toast(e);
           } // End OF try catchs
 
        } // End Of Anonymous Arrow Function

      ); // End Of Request

  	} // End Of Chats Of UI

    // Header Navigation For Users

      navHeader(){
        let div = this.div();

        div.setAttribute('class', 'app-nav nav navbar navbar-fixed-top app-user-info-nav');
        let navTable = this.dom.createElement('table');
        navTable.setAttribute('class', 'app-nav-header-table');

        div.appendChild(navTable);
        let Tr = this.dom.createElement('tr');
        Tr.setAttribute('class', 'app-special-nav-tr');
        navTable.appendChild(Tr);

        let NameTd = this.dom.createElement('td');
        let MessageTd = this.dom.createElement('td');
        let UserTd = this.dom.createElement('td');
        let LogTd = this.dom.createElement('td');

        MessageTd.setAttribute('class', 'app-tab special-nav-messages special-nav-tab');
        UserTd.setAttribute('class', 'app-tab special-nav-users special-nav-tab');
        LogTd.setAttribute('class', 'app-tab special-nav-log special-nav-tab');

        let AppName = this.dom.createElement('h4');
        AppName.setAttribute('class', 'app-name');
        AppName.textContent = 'KampusCrush';

        NameTd.appendChild(AppName);

          if(user.isLogged){

             // Messages Td

             let Mcenter = this.center();
             let Mbtn = this.anchor();
             let MIcon = this.span();

             MIcon.setAttribute('class', 'glyphicon glyphicon-plus');
             Mbtn.setAttribute('class', 'app-uploader-btn btn btn-default');

             let isOpen = false;

               Mbtn.onclick = () => {

                   if(isOpen){

                    select('.app-compose-body').style.height = '0px';
                    isOpen = false;

                   }else{

                    select('.app-compose-body').style.height = '100%';
                    isOpen = true;

                   }

                   select('.app-compose-body').style.transitionDuration = '1s';

               } // End Of Go To Share Button Click
               select('.compose-back-btn').onclick = () => {

                   Mbtn.click();
                   this.toast('closed!');

               }

             Mbtn.appendChild(MIcon);
             Mcenter.appendChild(Mbtn);

             MessageTd.appendChild(Mcenter);

             // User Profile Td

             let Ucenter = this.center();
             let Ubtn = this.anchor();
             Ubtn.setAttribute('class', 'btn btn-info');
             let UIcon = this.span();

             UIcon.setAttribute('class', 'glyphicon glyphicon-user');

             Ubtn.onclick = () => {

                window.location = `http://localhost/yazz/usr/${user.handle}/`;

             } // End Of OnClick

             Ubtn.appendChild(UIcon);
             Ucenter.appendChild(Ubtn);
             UserTd.appendChild(Ucenter);

             Tr.appendChild(NameTd);
             Tr.appendChild(MessageTd);
             Tr.appendChild(UserTd);

          } else{

            let LogBtn = this.anchor();

            LogBtn.setAttribute('class', 'btn btn-default');
            LogBtn.innerHTML = 'Login';

            LogBtn.onclick = () => {

              window.location = 'http://localhost/yazz/login/';


            } // End Of Onclick

            LogTd.appendChild(LogBtn);

            Tr.appendChild(NameTd);
            Tr.appendChild(LogTd);


          } // End Of Logged In Check

          select('#main').appendChild(div);

      } // End Of Method

      // Method For Viewing Trending

      viewTrending(view){

      	   http.params('GET', 'http://localhost/yazz/i/api/posts/?context=5');
      	   http.request(
      	   	  
      	   	   (data) => {

      	   	   	  try {
      	   	   	  	
      	   	   	  	let response = JSON.parse(data);

      	   	   	  	if(response.list){ // There Are Posts

      	   	   	  		// Loop Through The List
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

        	               TrendingArrayList.push(PostsModel);

      	   	   	  		} // End Of Loop

      	   	   	  		TrendingArrayList.forEach(

      	   	   	  			(PostItem) => {

      	                   let Body = this.div();
      	                   Body.setAttribute('class', 'app-trending-wrapper');

      	                   Body.appendChild(this.header(PostItem));
      	                   Body.appendChild(this.postBody(PostItem));

      	                   console.log(Body);

      	                   view.appendChild(Body);
      	   	   	  			} // End Of Anonymous ForEach Callback Function
      	   	   	  	); // End Of For Each

      	   	   	  	}else{ // Theres No List

      	   	   	  		this.toast('No Trending List!');

      	   	   	  	} // End Of List If

      	   	   	  } catch(e) {
      	   	   	    
      	   	   	    this.toast(e);

      	   	   	  } // End Of Try-Catch

      	   	   } // End Of Request Callback Function

      	   	); // End Of Request

      } // End Of Trending

      // For Showing & Playing Audio Uploads
      // Creating Custom Audio Media Player
      AudioBody(url){

      	 let Audio = this.dom.createElement('audio');
      	 Audio.src = url;

      	 let Media = this.div();
      	 let MediaLeft = this.div();
      	 let MediaBody = this.div();
      	 let MediaRight = this.div();
      	 let space = this.div();
      	 
      	 Media.setAttribute('class','media');
      	 MediaLeft.setAttribute('class','media-left');
      	 MediaBody.setAttribute('class','media-body');
      	 MediaRight.setAttribute('class','media-right audio-media-right');

      	 Media.appendChild(MediaLeft);
      	 Media.appendChild(MediaBody);
      	 Media.appendChild(MediaRight);

      	 let MediaBtn = this.anchor();
      	 let MediaIcon = this.span();

      	 MediaBtn.appendChild(MediaIcon);

      	 MediaIcon.setAttribute('class','glyphicon glyphicon-play audio-icon-btn');

      	  MediaLeft.appendChild(MediaBtn);

      	  // For MediaBody,  Showing The Progress Of The Audio
      	  let Progress = this.div();
      	  let AudioProgress = this.div();

      	  Progress.setAttribute('class','progress audio-progress-bar');
      	  AudioProgress.setAttribute('class','progress-bar ');

      	  Progress.appendChild(AudioProgress);

      	  space.setAttribute('class', 'space-small');

      	  MediaBody.appendChild(Progress);

      	  return [Media, Audio, MediaBtn, AudioProgress, MediaRight]; // Return Array With Media Body And The Actual Audio

      } // End OF AudioBody

    // Implementing Full Body Post View

    FullBodyPostView(Item){

      let body = select('.post-media-body');

      body.appendChild(this.postBody(Item,3));

      select('.close').onclick = () => {

        select('.app-block-popout-comment').style.display = 'none';
        select('.post-media-body').innerHTML = "";

      } // End Of On Click

    } // End Of FullBodyPostView

  	// Implementing the Toast IU

  	toast(str){

  		select('.toast-text').textContent = str;
  		select('.app-toast').style.display = 'block';

  		// Clear The Toast After 3000ms, 1000ms = 1s
  		setTimeout(
  			() => {
  			select('.app-toast').style.display = 'none';
  		}, 
  		4000);

  	} // End of toast()

    // Spinning Loader To Show That Content Is Being Requested
    loader(){

      let center = this.center();
      let Loader = this.div();

      Loader.setAttribute('class', 'app-loader');

      center.appendChild(Loader);

      return center;

    } // End Of Loader

  	// For center Tag
  	center(){
  		let center = this.dom.createElement('center');
  		return center;
  	} // End Of center

  	// For Span Tag
  	span(){
  		let span = this.dom.createElement('span');
  		return span;
  	} // End Of Span

  	// For Anchor
  	anchor(){
  		let anchor = this.dom.createElement('a');
  		return anchor;
  	}
  	div(){
  		let div = this.dom.createElement('div');
  		return div;
  	}
  } // End Of UI
  
/* END Of UI Generation*/
// Function To Initialize All Audio Variables
          function audioINIT(){
             // Try-Catch For Exception Handling

            try {
              
              window.AudioContext = window.AudioContext || window.webkitAudioContext;
              navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
              window.URL = window.URL || window.webkitURL;

              Context = new AudioContext;
              // Debuggig
                console.log('Context Available');
                console.log('UserMedia' + (navigator.getUserMedia ? 'Available' : 'Not Available'));

            } catch(e) {
              // statements
              console.log(e);
              alert('No Web Audio Support');

            } // End Of Try-Catch

            navigator.getUserMedia({audio: true}, 
              startUserMedia,

                 (e) => {

                    console.log('No Live Audio Input!\n' + e);

                 }

              );

          } // End Of audioINIT()

          // Function To Initialize & Create The Recorder Object
          function startUserMedia(stream){

            var audio = Context.createMediaStreamSource(stream);
            recorder = new Recorder(audio);

            console.log('Recorder Initialized!');

          } // End Of startUserMedia()

          var isRecording = false;
          var timer = 5, interval;

           // Function To Start Recording
           function audioStart(tag_timer){

            // Since Context Is In Suspended State, We HAve To Resume It

             Context.resume().then(

                    () => {

                      console.log('Audio Is Recording!!');

                      recorder && recorder.clear(); // Clear Any Audio That Might Have Been Stored From Last Recording Session!

                      recorder && recorder.record(); // Start Recording!

                          // This Means Recording Happens In Comment Context

                          if(tag_timer[0] == '.comment-recording-timer'){

                            select('.app-input-wrapper').style.height = '200px';
                            select('.media-tab').style.display = 'none';

                          }else {
                            
                            select('.during-recording').style.display = 'block';

                          }

                      UserInterface.toast("Recording Started...");

                      

                      // Timer To Store Recording Time And Limit That Recording Time!

                      interval = setInterval(

                        () => {


                          if(timer == 0){ // Stop Recording Once The Timer Reaches 0 seconds

                            tag_timer[1].click();
                            clearTimeout(interval);

                          }

                          select(tag_timer[0]).innerHTML = `00m : ${timer}s `;
                          console.log(timer);
                          timer -= 1; // Decrement The Timer
                        
                        }, // Anonymous Function!
                         1000
                        );

                    } // End Of Callback Anonymous Function

                  ); // End Of then()

           } // End Of audioStart()

           // Function To End Recording

           function audioStop(callback){

             clearTimeout(interval);

              recorder && recorder.stop();

              UserInterface.toast("Recording Stopped!...");
              timer = 60;
              
              recorder && recorder.exportWAV(

                (blob) => {

                   console.log(blob);
                   var url = URL.createObjectURL(blob);
                   var au = document.createElement('audio');
                   console.log(url);
                   
                   // Call Back Function To Point Actually Where You Want This Audio File To Go,
                   // && And To Able To Send It To Which PArt Of The Server

                   callback(UserInterface.AudioBody(url), blob);

                   recorder.clear();

                   Context = null;
                   recorder = null;
                } // End Of Callback Anonymous Function 

              ); // End Of exportWAV()

           } // End Of audioStop()

           function audioToggle(tag_timer,callback){

              if(isRecording){

                audioStop(callback);

                isRecording = false;

              }else{

                audioStart(tag_timer);

                isRecording = true;

              } // End Of If

           } // End Of AudioToggle()


   // Time Class For Dealing With Media Objects
  class Time{

  // Class Constructor
	constructor(media, id){
		this.Media = media;
		this.paused = false;
		this.id = id;

	} // End Of Constructor

	// Method to log Media Interation
	log(view){

		http.params('GET', `http://localhost/yazz/i/api/react/?context=4&pid=${this.id}`,null);
		http.request(

			  (data) => {

			  	// Try-Catch For Exception Handling
			  	try {
			  		
			  		let reply = JSON.parse(data);

			  		// Check For Errors

			  		 if(reply.error){

			  		 	  // There Are Errors
			  		 	  UserInterface.toast(reply.message);

			  		 }else{

			  		 	  // There Are No Errors
			  		 	  
			  		 	  // Check For Pass
			  		 	  if(reply.pass){

			  		 	  	UserInterface.toast('Already Seen This Media');

			  		 	  }else{

			  		 	  	UserInterface.toast('Loggin Done!'); // For Debugging

			  		 	    view.innerHTML = reply.type == 'audio' ? `${reply.count} listens` : `${reply.count} views`; // What If Its 1 View,
			  		 	  
			  		 	  } // End Of Pass If

			  		 } // End Of Error Check If

			  	} catch(e) {

			  		UserInterface.toast(e);

			  	} // End Of Try-Catch


			  } // End OF Request callback Function

			); // End Of Requests

	} // End of log()

	action(){
    
    if(this.Media.paused){
    	this.Media.play();
    	this.paused = false;
    }else{
    	this.Media.pause();
    	this.paused = true;
    }
	}

	 showTime(time, progress = ""){

	 	       var seconds = 0;
	 	  	 	 var minutes = 0;
	 	  	 	 var slider = 0;
	 	  	 	 
	 	  	 	 time.innerHTML = `0${minutes}:0${seconds}`;

	 	 this.Media.addEventListener('timeupdate',
	 	  () => {

	 	  	// Check If Media Has Ended Playing
	 	  	if(this.Media.ended){

	 	  	 	 seconds = 0;
	 	  	 	 minutes = 0;
	 	  	 	 slider = 0;
	 	  	 	 time.innerHTML = `0${minutes}:0${seconds}`;

	 	  	 }else{

	 	  	 	  // Check For Media Buffering

	 	  	 	  if(Math.floor(this.Media.buffered.end(0)) > Math.floor(this.Media.currentTime)){

	 	  	 	  	// Media Has Buffered Enough! Keep Playing Media
	 	  	 	  	  minutes = Math.floor(this.Media.currentTime / 60); // Get Minutes, Divide By 60s
	 	  	 	  	  seconds = Math.floor(this.Media.currentTime - ( minutes * 60)); // Get Seconds Left, Multiply By 60s

	 	  	 	  	  // Check For Zero

	 	  	 	  	  if(minutes < 10 && seconds < 10 ){

	 	  	 	  	     time.innerHTML = `0${minutes}:0${seconds}`;	 	  	 	  	  	
	 	  	 	  	  }else if(minutes < 10 && seconds >= 10 ){

	 	  	 	  	  	time.innerHTML = `0${minutes}:${seconds}`;

	 	  	 	  	  }else if(minutes >= 10 && seconds < 10 ){

	 	  	 	  	  	time.innerHTML = `${minutes}:0${seconds}`;

	 	  	 	  	  }else if(minutes >= 10 && seconds >= 10){

	 	  	 	  	  	time.innerHTML = `${minutes}:${seconds}`;

	 	  	 	  	  } // Zeroed Ended If

	 	  	 	  	  slider = (this.Media.currentTime / this.Media.duration) * 100;

	 	  	 	  }else if(Math.floor(this.Media.buffered.end(0)) < Math.floor(this.Media.currentTime)){

	 	  	 	  	UserInterface.toast('Media Buffering...');

	 	  	 	  } // Buffered Ended If

	 	  	 } // Time Ended If

	 	  	 if(progress != ""){

	 	  	 	  progress.style.width = `${slider}%`;

	 	  	 }

	 	  }, 
	 	  false);

	 }
   
   wasPaused(){
   	return this.paused;
   }
   // Auto play media
   autoplay(media){
   	  
   	  if(!this.paused){
   	  	var fraction = isMobile ? 0.9 : 0.8;
        	 var x = media.offsetLeft, y = media.offsetTop, w = media.offsetWidth, h = media.offsetHeight, r = x + w, //right
            b = y + h, //bottom
            visibleX, visibleY, visible;

              visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
              visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

              visible = visibleX * visibleY / (w * h);
              if (visible > fraction) {
                media.play();
            } else {
                media.pause();
            }
        }
   	  }
   } // End Of Class Definition
    // Class For Allowing Media Uploading

    class Upload{

    	constructor(sendBtn, audioBtn, context, obj = ""){

    		this.object = obj;
    		this.globalContext = context;
    		this.localContext = null
    		this.SendBtn = sendBtn;
    		this.AudioBtn = audioBtn;
    		this.url = `http://localhost/yazz/i/api/upload/`;
    		this.data = new FormData();
        this.blob = "";

    		// After User Chooses A Media File
    		  select('.media-form').addEventListener('change', (e) => {
    		  	this.localContext = 1;
    		  	    select('.app-input-wrapper').style.height = '400px';
    		  	    select('.rec-tab').style.display = 'none';

    		     }, 
    		    false
    		   ); // End Of EventListiner!

    		  	   this.SendBtn.onclick = () => {

    		  	   	  if(user.isLogged){
    		  	   	  	// Call Get() To fetch variables for send
    		  	         if(this.get()){

                        this.send();

                     }

    		  	         // Call Send Method
    		  	        

    		  	        /* DONT FORGET TO IMPLEMENT AFTER SEND PROTOCOL */

    		  	   	  }else{
    		  	   	  	UserInterface.login(`Login First To Comment On this Post`);
    		  	   	  }
    		    } // End Of SendBtn Onclick
    		  

    		  this.AudioBtn.onclick = () => {
            this.localContext = 2
              if(Context == null && recorder == null){

                audioINIT();

              }
    		  	
    		  	  setTimeout(
                   () => {

                    audioToggle(['.comment-recording-timer', this.AudioBtn],

                      (props, blob) => {

                            //[Media, Audio, MediaBtn, AudioProgress, MediaRight]; The Array In details
                            this.blob = blob;
                            select('.app-input-wrapper').style.height = '200px';
                            select('.media-tab').style.display = 'none';

                            let TimeText = UserInterface.span();
                            TimeText.setAttribute('class', 'app-comment-timer media-text');

                            let time = new Time(props[1],0);

                            time.showTime(TimeText, props[3]);

                            props[2].onclick = () => {

                               time.action();

                            }
                            props[4].appendChild(TimeText);
                            select('.comment-rec-body').appendChild(props[0]);

                            select('.trash-can-tab').style.display = 'inline-block';

                            select('.trash-can-btn').onclick = () => {

                              this.blob = "";

                              select('.app-input-wrapper').style.height = '45px';

                              select('.media-tab').style.display = 'inline-block';

                              select('.comment-rec-body').innerHTML = "";
                              select('.comment-rec-body').style.display = 'none'

                              select('.trash-can-tab').style.display = 'none';

                              select('.comment-recording-timer').innerHTML = "";
                              this.localContext = "";
                            } // End Of Delete Btn
                         } // End Of audioToggle Callback Function
                      ); // End Of Toggle
                 },  // End Of Timeout Anonymous Function
               1000); // End Of Timeout
    		  } // End OF Audio Btn Click
    	} // End Of costructor

    	// Method For Sending Data
    	send(){
    		select('.progress').style.display = 'block';
    		select('.app-input-wrapper').style.height = '50px';
        // select('.app-modal-view').innerHTML = "";
    		 http.params('POST', this.url, this.data);
    		 http.request((response) => {

    		 	select('.rec-tab').style.display = 'inline-block';
    		 	   // Call Clean Method
    		 	   this.clean();

    		 	     try {

    		 	     	let reply = JSON.parse(response);

                if(this.globalContext == 2){

                    select('.app-modal-view').innerHTML = "";
                    select('.app-block-popout-content').removeChild(select('.app-input-wrapper'));
                    CommentArrayList = [];
                    select(`#read-comment-${this.object.postId}`).click();

                }

    		 	     	UserInterface.toast(reply.message);

    		 	     } catch(e) {
    		 	     	
    		 	     	UserInterface.toast(e);

    		 	     } // End Of Try-Catch

    		  },
    		  select('.progress-bar') // Progressbar For Uploading
    		); // End Of Request
    	} // End Of Send()

    	// Method For Getting Data For Input Fields
    	get(){

    		if(select('.app-text-input').value == "" && this.blob == "" && select('.media-form').files[0] == ""){

           UserInterface.toast('Your Comment Seems To Be Empty, Record A Voice Note Or Choose A Media File Then Add Text!');
           return false;

        }else{

            this.data.append('context',this.globalContext);
            this.data.append('text', select('.app-text-input').value);

            if(this.globalContext == 2){ // Commenting On Posts

              this.data.append('p_id',this.object.postId); 

           }

          if(this.localContext == 1){

            this.data.append('media', select('.media-form').files[0]);

          }else if(this.localContext == 2){

            this.data.append('media', this.blob);

          } // End Of If

          return true;
        }

    	} // End Of Get()

    	// Method For Cleaning All Data Fields
    	clean(){

    		select('.app-text-input').value = "";
    		console.log(select('.media-form').files[0]);
        //select('.media-form').files[0] = "";
    		this.blob = "";
    	} // End Of Clean()

    }  // End Of Class

/* Jquery Usage For Animations AND DOM Manipulation   */

