jQuery.noConflict();

const NAV = $.get('.app-user-info-nav');

const Icons = new AppIcons(({color : '#111'}));

if($.isMobile){

  	$.get('.app-nav').setAttribute('class','nav navbar navbar-fixed-bottom app-nav');

  }

class Requests{

	constructor(dom){

		this.dom = dom;
		this.PostModelList = [];
		this.UserModelList = [];
		this.ExploreList = [];
		this.NotificationList = [];
		this.CommentsList = [];
		this.ChatsList = [];
		this.MessagesList = [];
		this.SavedModelList = [];

	}

	// setPostModelList(array){ this.PostModelList = array; }



	FeedGenerate(args, callback){ // Feed Generator To Show Posts/Comments

		$.req({method : 'GET', url : args.url, form : null, bar : false}, (response) => {

			 callback(response);

		});

	} // End Of Feed Generate

	UserCardBodyGenerate(args){

		$.html(args.view, '');
		$.addLoader({view : args.view});

		$.req({method: 'GET', url : args.url, form : null, bar : false}, (response) => {

			  $.html(args.view, '');

			   if(response.list){

			   	  // For A List Of Users Was Returned From The ServerSide
			   	  this.UserModelList = [];

			   	  response.follow_list.forEach((UserItem, index) => {

			   	  	 this.UserModelList.push(
			   	  	 	new UserModel(UserItem)
			   	  	 );

			   	  	 let CarouselBody = $.create('div', args.bodyWrapper);

			   	  	 CarouselBody.append(UI.UserCard(this.UserModelList[index]));
			   	  	 $.get(args.view).append(CarouselBody);

			   	  }); // End Of ForEach

			   	  args.callback(this.UserModelList);

			   }else{

			   	  $.toast({text : args.message, time : 4000});

			   } // End Of Else

		}); // End Of Request

	} // End Of Suggestions Generate

	Like(PostModel, args){

		args.btn.onclick = () => {

			if(user.user.isLogged){

			  $.req({method : 'GET', url : `http://192.168.43.13/kampuscrush/api/react/?context=1&pid=${PostModel.getPost().id}&type=${args.type}`
, form : null, bar : false}, (response) => {

	           if(!response.error){

	           	//{commentCount, likesCount, isLiked, views}

	           	PostModel.setStats({commentCount : PostModel.getStats().comCount, likesCount : response.count, isLiked : (response.message == 'flamed' ? true : false), views : PostModel.getStats().views});

	           	args.btn.innerHTML = (response.message == 'flamed') ? Icons.heart({color : 'red', width : 28, height : 28}) : Icons.heartEmpty({color : '#111', width : 28, height : 28});

	           	/*args.btn.innerHTML = Icons.heartEmpty({color : (response.message == "flamed") ? "#FFC100" : "#111", width : 24, height : 24});*/

	           	args.likes.innerHTML = `${response.count == 0 ? '&nbsp;' : response.count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
	            args.btn.append(args.likes);

	           }else{

	           	 $.toast({text : response.message, time : 4000});

	           }

		       } // End Of CallBack Function

        ); // End Of Request

		   }else{

			   $.toast({text : `Login To Flame @${PostModel.getBasic().handle}'s Post`, time : 5000});

			   $.isMobile ? $.get('.nav-user-link').click() : () => {};

		  } // End Of Logged Checked

		} // End Of Button Click

	} // End Of Like



	Comment(PostModel, args){

		  // {dataUrl, newUrl, title, back(), forward(), push, view}

		  args.callback();

		  	 this.RequestPushState({
		
		  	 	     dataUrl : args.dataUrl, 
		  	 	     newUrl  : args.newURL,
		  	 	     title   : `Post | @${PostModel.getBasic().handle}`,
		  	 	     push    : true,
		  	 	     loader    : args.view,
		  	 	     forward : (response) => {

		  	 	     	  if(!response.error){

		  	 	     	  	$.removeLoader(args.view);
		  	 	     	  	$.html(args.view, response.page);

		  	 	     	  	$.get('.post-viewport', UI.FullPostBody(PostModel));

		 	     	  	  	$.html('.input-file-icon', Icons.gallery({color : '#111', width : 20, height : 20}));
	                  $.html('.input-record-icon', Icons.mic({color : '#111', width : 20, height : 20}));
	                  $.html('.input-send-icon', Icons.comment({color : '#111', width : 20, height : 20}));



		  	 	     	  	  if($.isMobile){

		  	 	     	  	  	$.get('.app-write-comment-viewport').classList.add('navbar-fixed-bottom');

  	                    $.get('.app-comment-header').setAttribute('class', 'navbar-fixed-top');

		  	 	     	  	  }

		  	 	  const Comment = new Upload();
		  	 	  audioINIT()

		  	 	  if(mAudioRecorder == null){

		  	 	  	  mAudioRecorder = new AudioRecorder();

		  	 	  }

/*==============================================================================================
=
=                  IMPLEMENT AUDIO RECORD MODULE - CLASS
=
=================================================================================================*/

		       $.get('.input-record-icon').onclick = () => {

		            if(mAudioRecorder.getRecordingState()){

		                  /*  USER IS ALREADY RECORDING  */

		                mAudioRecorder.stopRecording({

		                }, (recordings) => {

		                   // For Mobile!!
		                   $.html('.comment-audio-viewport', '');
		                   $.get('.app-write-comment-viewport').style.height = '165px';
             mAudioRecorder.showRecording({view : '.comment-audio-viewport', url : recordings.url});

		                }); // End Of Stop Recording

		            }else{

		                  /* USER IS NOT RECORDING */

		                mAudioRecorder.startRecording({
		                	view : '.comment-audio-viewport',
		                	context : 'outside',
		                	timeView : '.comment-audio-timer',
		                	recorder : mRecorder,
                      audioContext : mAudioContext
		                }, () => {

		                  // Callback For Mobile!!
		                  $.get('.app-write-comment-viewport').style.height = '100px';

		                }); // End Of Start Of Recording

		            } // End Of If

		          } // End Of Click

/*==============================================================================================
=
=                  IMPLEMENT USER COMMENT MODULE - CLASS
=
=================================================================================================*/


				 	     	  	  Comment.send({

										    sendBtn : $.get('.input-send-icon'),
										    cancelBtn : $.get('.mobile-share-control-btn'),
										    gallery : () => {

										      Comment.fileGallery({

										        className : '.media'

										      }, (file) => {

										        $.toast({text : file.fileName, time : 4000});

										      }); /* End Of fileGallery & Callback */

										    } /* End Of Gallery Function, Lets Users Choose Files From Their Devices File System */

										  }, () => {

										     return {

										      context : 2,
										      text : $.value($.isMobile ? '.comment-input-text' : '.compose-box'),
										      url : `http://192.168.43.13/kampuscrush/api/upload/`,
										      type : 'comment',
										      postId : PostModel.getPost().id,
										      progressView : '.mobile-share-foot',


										      sanitize : () => {

										        if($.value($.isMobile ? '.comment-input-text' : '.compose-box') == "" && $.get('.media').files[0] == ""){

										          $.toast({text : `Either Text, Record A Voice Note Or Choose A Media File From ${ $.isMobile ? 'Gallery' : 'Files' }`, time : 4000});

										          return false;
										        } /* End Of If */

										        return true;
										      } /* End Of Sanitize*/

										    } /* End Of Comment Pay Load */

										  }); /* End Of Comment */

		  	 	     	  	  console.log(PostModel.getPost().id);
		  	 	     	  	  this.ViewComments({postId : PostModel.getPost().id});

						      }else{

						      	$.toast({text : 'Loading Full Body Post Failed', time : 4000});

						      } // End Of If

		  	 	     }/* End Of forward() */, 
		  	 	     back : () => {

		  	 	     	    UI.backButton({btn : $.isMobile ? '.app-modal-xs-btn' : '.app-modal-lg-btn'}, () => {

		  	 	     	    	$.get('.app-block-popout').style.display = 'none';
		  	 	     	    	$.html('.app-block-popout-content', '');

		  	 	     	    	history.back();

		  	 	     	    }); // End Of BackButton Impl

		  	 	     } // End Of back()

		  	 	  }); // End Of Push State Request


	} // End Of Comment

	RequestPushState(args){

		$.addLoader({view : args.loader});

		$.req({method : 'GET', url : args.dataUrl, form : null, bar : false}, (response) => {

			   if(args.push){

	      	 history.pushState({title : args.title, url : args.newUrl}, args.title, args.newUrl);

	      	    args.forward(response); // On Changing The State Of The Url

	          } // End Of Checking Push If

			      /*window.onpopstate = (e) => {

			  	  args.back(); // On Going Back To The Past State

			    } // End Of PopState*/

			    args.back();

		}); // End Of Request!

	} // End Of requestBrowserState

	Search(args){

		 let Form = new FormData();
		 Form.append('query', args.data);

		 $.req({method : 'POST', url : args.url, form : Form, bar : false}, (response) => {

		 	   if(response.error){

		 	   	  $.toast({text : `Could Not Perform Search For "${args.data}"`});

		 	   }else{
		 	      
		 	      $.html(args.view, '');

		 	      if(response.list.length > 0){

		 	      	 // Some Search Results Were Returned

		 	      	  this.UserModelList = [];

		 	      	  let ListGroup = $.create('ul', 'list-group');

		 	      	 response.list.forEach((UserItem, index) => {

		 	      	 	// console.log(UserItem);
		 	      	 	  this.UserModelList.push(
		 	      	 	  	 new UserModel(UserItem)
		 	      	 	  	);

		 	      	 	  let ItemGroup = $.create('span', 'item-group list-item');
		 	      	 	  ItemGroup.append(UI.UserRow(this.UserModelList[index], (Media) => {

		 	      	 	    Media.right.append(UI.FollowButton(this.UserModelList[index], (response) => {}));
			              let InfoSpan = $.span({class : 'cardbody-info-span', text : ''});

									 InfoSpan.append($.span({class : 'info-bio app-grey-text', text : `<br/><span class="glyphicon glyphicon-pencil"></span> &nbsp;<span class="cardbody-bio">${this.UserModelList[index].getInfo().bio === null ? '' : UI.RegText(this.UserModelList[index].getInfo().bio.toString().substring(0, 30))}</span>`}));

									 Media.body.append(InfoSpan);

		 	      	 	 })); // End Of Group Append

		 	      	 	  ListGroup.append(ItemGroup);

		 	      	 }); // End Of For Each

		 	      	 $.get(args.view).append(ListGroup);

		 	      }else{

		 	      	$.toast({text : `No Results Found For "${args.data}"`});
		 	      	$.html(args.view, `No Results Found "${args.data}"`);

		 	      } // End Of Results Returned Check

		 	   } // End Of Error Check

		 }); // End Of Request

	}  // End Of Search

	Notifications(){

		$.addLoader({view : '.notifications-viewport'});

		if(!user.user.isLogged){

			$.toast({text : 'Login First With A Registered Account To View Your Notifications', time : 4000});

			$.html('.notifications-viewport', '');

			UI.Banner({view : '.notifications-viewport', text : 'Login First With A Registered Account To View Your Notifications'});

			return;

		}

		$.req({method : 'GET', url : 'http://192.168.43.13/kampuscrush/api/notifs/?context=1', form : null, bar : false}, (response) => {

			  if(response.notifs){

			  	$.html('.notifications-viewport', '');

			  	let ListGroup = $.create('div', 'list-group');

			  	response.notifications.forEach((NotifItem, index) => {

			  		this.NotificationList.push(new NotificationModel(NotifItem));

			  		ListGroup.append(UI.NotifBodyBuilder(this.NotificationList[index]));

			  	});

			  	$.get('.notifications-viewport').append(ListGroup);

			  }else{

			  	$.html('.notifications-viewport', '')

			  	UI.Banner({view : '.notifications-viewport', text : `@${user.model.getBasic().handle} Your Notifications Will Appear Here`});

			  	$.toast({text : 'You Dont Have Notifications At The Moment', time : 4000});

			  }

		}); // End Of Request

	} // End Of Notifications

	ViewComments(args){

		$.html('.comments-viewport', '');
		$.addLoader({view : '.comments-viewport'});

		$.req({method : 'GET', url : `http://192.168.43.13/kampuscrush/api/react/?context=3&pid=${args.postId}`, form : null, bar : false}, (response) => {

			 if(response.count > 0){

			 	  $.html('.comments-viewport', '');

			 	  this.CommentsList = [];

			 	  response.comments.forEach((CommentItem, index) => {
			 	  	
			 	  	this.CommentsList.push(new CommentModel(CommentItem));

			 	  	$.get('.comments-viewport').append(UI.CommentBodyBuilder(this.CommentsList[index]));
			 	  	$.get('.comments-viewport').append($.create('div', 'space-small'));

			 	  });

			 }else{

			 	  $.html('.comments-viewport', '');
			 	  UI.Banner({view : '.comments-viewport', text : 'No Comments, Be The First To Comment'});

			 	  $.toast({text : 'There Are No Comments At The Moment, Comeback After A While', time : 4000});

			 }

		});

	}

	ViewChats(args){

		$.html('.chats-viewport', '');
		$.addLoader({view : '.chats-viewport'});

		$.req({method : 'GET', url : `http://192.168.43.13/kampuscrush/api/messages/?cxt=1&id=${user.model.getBasic().id}`, form : null, bar : false}, (response) => {

			  if(response.error){

			  	 // Error
			  	 $.toast({text : 'Loading Chats Error', time : 4000});

			  }else{

			  	 if(response.list){

			  	 	 let ListGroup = $.create('div', 'list-group');
			  	 	 this.ChatsList = [];
			  	 	 $.html('.chats-viewport', '');

			  	 	 response.chats.forEach((ChatItem, index) => {

			  	 	 	  this.ChatsList.push(new ChatsModel(ChatItem));

			  	 	 	  ListGroup.append(UI.ChatsBuilder(this.ChatsList[index]));

			  	 	 }); // End Of For Each

			  	 	 $.get('.chats-viewport').append(ListGroup);

			  	 }else{

			  	 	 // No Messages
			  	 	 UI.Banner({view : '.chats-viewport', text : `@${user.model.getBasic().handle} Your Chats Will Appear Here, Start A Conversation`});

			  	 	 $.toast({text : 'You Have No Chats Yet!', time : 4000});

			  	 } // End Of List Check

			  } // End Of Error Check

		}); // End Of Request

	} // End Of ViewChats

	ViewMessages(args, callback){

		$.html('.chats-viewport', '');
		$.addLoader({view : '.chats-viewport'});
		$.html('.chats-file-icon', Icons.gallery({color : '#111', width : 20, height : 20}));
	  $.html('.chats-record-icon', Icons.mic({color : '#111', width : 20, height : 20}));
	  $.html('.chats-send-icon', Icons.more({color : '#111', width : 20, height : 20}));

	  jQuery(document).ready(() => {

	  	jQuery('.chats-input-wrapper').show();

	  });

	  if($.isMobile){

	  	$.get('.chats-input-wrapper').setAttribute('class', 'chats-input-wrapper app-input-wrapper navbar-fixed-bottom');
	  	$.get('.chats-input-wrapper').style.borderTop = '1px solid lightgrey';

	  }

		callback();

		$.req({method : 'GET', url : `http://192.168.43.13/kampuscrush/api/messages/?cxt=2&id=${user.model.getBasic().id}&uid=${args.id}`, form : null, bar : false}, (response) => {
			
			$.html('.chats-viewport', '');

			  if(response.chats){

			  	 this.MessagesList = [];
			  	 

			  	 response.messages.forEach((MessageItem, index) => {

			  	 	  this.MessagesList.push(new MessageModel(MessageItem));

			  	 	  $.get('.chats-viewport').append(UI.MessageBodyBuilder(this.MessagesList[index]));
			  	 	  $.get('.chats-viewport').append($.create('div', 'space-small'));

			  	 }); // End Of For Each

			  }else{

			  	UI.Banner({view : '.chats-viewport', text : `@${user.model.getBasic().handle} Slide In @${args.handle}'s DMs ;)`});

			  	$.toast({text : 'Start A New Conversation', time : 4000});

			  } // End Of Checking Messages

		}); // End Of Request

	} // End Of ViewMessages

	MonoMedia(args){

		  if(args.array.length > 0){

		  	$.html('#app-viewport', '');

		  	 for(let i = 0; i < args.array.length; i++){

		  	    if(args.type == args.array[i].getPost().type && args.type != 'all'){

		  	    	 UI.PostBodyBuilder(args.array[i], {comments : false, view : '#app-viewport'});
		  	    	 continue;

		  	    }

		  	    if(args.type == 'all'){

		  	    	 UI.PostBodyBuilder(args.array[i], {comments : false, view : '#app-viewport'});

		  	    }

		  	 } // End Of For Loop

		  }else{

		  	 $.toast({text : 'No Posts', time : 2200});

		  }

	} // End Of MonoMedia

} // End Of Class

/*=============================================================================================

										          	CLASS USERINTERFACE
										          	- USE THIS CLASS TO BUILD THE UI

=============================================================================================*/

class UserInterface{

	constructor(dom){

		this.dom = dom;

	}

	backButton(args, callback){

		  console.log(args.btn);

		  $.get(args.btn).onclick = () => {

		  	callback();

		  } // End Of Click

	} // End Of BackButton

	Banner(args){

		$.get(args.view).append($.create('div', 'space-large'));
		$.get(args.view).append($.center($.span({class : $.isMobile ? 'app-max-text' : 'app-bold-text', text : args.text})));

	}  // End Of Banner

	ScreenOverlay(args, callback){

		  let Layer = $.get('.app-block-popout');
		  let Nav = $.create('div', 'nav-block-content app-header navbar-fixed-top');

		  Layer.style.display = 'block';

		  if(args.nav){

		  	 let TextWrapper = $.create('span', 'header-wrapper');
		  	 let backBtn = $.create('a', 'nav-back-btn');
		  	 backBtn.innerHTML = Icons.back({color : '#111', width : 24, height : 24});
		  	 let Text = $.span({class : 'icon-text app-bold-text', text : `&nbsp;&nbsp;&nbsp;${args.header}`});

		  	 Nav.append(TextWrapper);
		  	 TextWrapper.append(backBtn, Text);

		  	 $.get('.app-block-popout-content').append(Nav);
		  	 $.get('.app-block-popout-content').append($.create('div', 'space-large'));
         $.get('.app-block-popout-content').append($.create('div', 'space-medium'));
         $.addLoader({view : '.app-block-popout-content'});

		  	 this.backButton({btn : '.nav-back-btn'}, () => {

		  	 	  Nav.remove();
		  	 	  Layer.style.display = 'none';
		  	 	  $.html('.app-block-popout-content', '');


		  	 }); // End Of Back Button

		  } // End Of Nav

	} // End Of Screen Overlay

	media(args){

		let Media = $.create('div', `media ${args.class}`);
		let MediaLeft = $.create('div', args.left);
		let MediaRight = $.create('div', args.right);
		let MediaBody = $.create('div', 'media-body');

		if(args.img){

			let Image = $.create('img', 'img-circle media-object');
			Image.src = args.url;
			Image.setAttribute('width', args.width);
			Image.setAttribute('height', args.height);

			MediaLeft.append(Image);

		}

		Media.append(MediaLeft);
		Media.append(MediaBody);
		// Appending Media Right
		if(args.more){

			Media.append(MediaRight);

		}

		return {

			main : Media,
			left : MediaLeft,
			right : MediaRight,
			body : MediaBody,
			image : args.img ? Image : new Image()

		};

	}  // End Of Media

	BlockPost(args, callback){

		R.FeedGenerate({url : args.url}, (response) => {

			 if(response.list){

				 	response.posts.forEach((PostItem, index) => {

				 		  console.log(PostItem);
				 		  R.ExploreList.push(new PostModel(PostItem));

				 	});

				 	callback({array : R.ExploreList});

			 }else{

			 	 // No Explore Content

			 } // End Of If

		}); // End Of Feed Generate

	} // End Of Block Post

	CommentBodyBuilder(CommentModel){

		let Wrapper = $.create('div', 'app-comment-body');

		let Header = this.UserHeader(CommentModel, {width : 35, height : 35, rightPosition : 'media-top'}, (Media) => {}); // End Of Header
		Wrapper.append(Header.main);

		if(CommentModel.getPost().type != 'text'){

			 Wrapper.append(this.BodyBuilder(CommentModel));

		}

		Wrapper.append(this.CommentReaction(CommentModel));

		return Wrapper;

	}

	ChatsBuilder(ChatModel){

		 let ListItem = $.create('a', 'list-group-item');

		 let Header = this.UserHeader(ChatModel, {width : 35, height : 35, rightPosition : 'media-top'}, (Media) => {});

		 Header.body.append($.span({class : '', text : `<br />${ChatModel.getChat().message}`}));

		 ListItem.append(Header.main);

		 ListItem.onclick = () => {

		 	  $.toast({text : `Clicked @${ChatModel.getBasic().handle}'s Message`, time : 4000 });

		 	  R.ViewMessages({id : ChatModel.getBasic().id, handle : ChatModel.getBasic().handle}, () => {

		 	  	  $.html('.chats-header-text', `@${ChatModel.getBasic().handle}`);

		 	  	  this.backButton({btn : '.chats-back-btn' }, () => {

		 	  	  	 $.html('.chats-header-text', `Messages`);

		 	  	  	 jQuery(document).ready(() => {

		 	  	  	    jQuery('.chats-input-wrapper').hide();

		 	  	     });

		 	  	  	 R.ViewChats({});

		 	  	  	 this.backButton({btn : '.chats-back-btn'}, () => {

		 	  	  	 	  $.get('.app-message-dropdown').style.display = 'none';

		 	  	  	 });

		 	  	  });

		 	  });

		 } // End Of Onclick


		 return ListItem;

	}  // End Of ChatsBuilder

	MessageBodyBuilder(MessageModel){

		 let MessageWrapper = $.create('div', MessageModel.getActivity().me ? 'app-right-message app-message' : 'app-left-message app-message');
		 console.log(MessageWrapper);

		 let Header = this.media({left : 'media-left media-bottom', right : `media-right media-bottom`, img : !MessageModel.getActivity().me ? true : false, url : MessageModel.getImgs().profile, width : 30, height : 30, more : true, class : ''});

		 if(MessageModel.getActivity().me){

		 	  Header.right.append(Header.image);
		 	  Header.image.src = MessageModel.getImgs().profile;
		 	  Header.image.setAttribute('width', 30);
		 	  Header.image.setAttribute('height', 30);
		 	  Header.image.setAttribute('class', 'img-circle media-object');
		 	  Header.left.append($.span({class : 'app-grey-text', text : MessageModel.getMessage().time}));

		 }else{

		 	  Header.right.append($.span({class : 'app-grey-text', text : MessageModel.getMessage().time}));

		 }

		 if(MessageModel.getMessage().type != 'text'){

		 	 Header.body.append(this.BodyBuilder(MessageModel));
		 	 Header.body.append($.create('div', 'space-small'));

		 }

		 let MessageBubble = $.create('div', 'app-message-bubble');
		 MessageBubble.append(this.TextBodyBuilder(MessageModel));

		 Header.body.append(MessageBubble);

		 MessageWrapper.append(Header.main);

		 return MessageWrapper;

	} // End Of MessageBodyBuilder

	CommentReaction(CommentModel){

		// R.Like(PostModel, {btn : LikeBtn, likes : LikeCount, type : 'post'});


		let Media = this.media({left : 'media-left media-bottom', right : `media-right media-bottom`, img : false, more : true, class : 'comment-media'});

		let IconBtn = $.create('a', 'comment-like');
	  IconBtn.innerHTML = (CommentModel.getActivity().isLiked ? Icons.heart({color : 'red', width : 18, height : 18}) : Icons.heartEmpty({color : '#111', width : 18, height : 18}));

	  let LikeCount = $.span({class : 'app-grey-text', text : `${CommentModel.getActivity().likeCount == 0 ? '' : CommentModel.getActivity().likeCount + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}`});

	  IconBtn.append(LikeCount);

	  R.Like(CommentModel, {btn : IconBtn, likes : LikeCount, type : 'comment'});

		Media.right.append($.center(IconBtn));
		Media.body.append(this.TextBodyBuilder(CommentModel));
		Media.left.append($.center($.span({class : 'app-grey-text', text : CommentModel.getPost().time})));

		return Media.main;

	}

	NotifBodyBuilder(NotifModel){

		 let ListItem = null;

		 let Head = this.UserHeader(NotifModel, {width : 35, height : 35, rightPosition : 'media-top'}, (Media) => {

		 	  if(NotifModel.getNotif().notifType == 'like'){

		 	  	ListItem = $.create('a', 'list-group-item');

		 	  	Media.body.innerHTML = NotifModel.getNotif().count - 1 <= 0 ? `<span class="app-bold-text">${NotifModel.getBasic().handle}</span> Liked Your Post` : `<span class="app-bold-text">${NotifModel.getBasic().handle}</span> and ${NotifModel.getNotif().count} Others Liked Your Post`;

		 	  	Media.right.innerHTML = Icons.heart({color : 'red', width : 24, height : 24});

		 	  }else if(NotifModel.getNotif().notifType == 'comment'){

		 	  	ListItem = $.create('a', 'list-group-item');

		 	  	Media.body.innerHTML = NotifModel.getNotif().count - 1 == 0 ? `<span class="app-bold-text">${NotifModel.getBasic().handle}</span> Commented On Your Post` : `<span class="app-bold-text">${NotifModel.getBasic().handle}</span> and ${NotifModel.getNotif().count} Others Commented Your Post`;

		 	  	Media.right.innerHTML = Icons.commentAlt({color : '#111', width : 24, height : 24});

		 	  }else if(NotifModel.getNotif().notifType == 'Started Following You' || NotifModel.getNotif().notifType == 'Unfollowed You'){

		 	  	ListItem = $.create('span', 'list-group-item');

		 	  	 Media.body.innerHTML = `<a href="http://192.168.43.13/kampuscrush/usr/${NotifModel.getBasic().handle}" class="app-bold-text">${NotifModel.getBasic().handle}</a> Has ${NotifModel.getNotif().notifType}`;

		 	  	 ListItem.onclick = () => {

		 	  	 }

		 	  	 Media.right.append(this.FollowButton(NotifModel, (response) => {}))

		 	  }else{

		 	  	ListItem = $.create('span', 'list-group-item');

		 	  	Media.body.innerHTML = `<a href="http://192.168.43.13/kampuscrush/usr/${NotifModel.getBasic().handle}" class="app-bold-text">${NotifModel.getBasic().handle}</a> Has ${NotifModel.getNotif().notifType}`;

		 	  	Media.right.innerHTML = Icons.friends({color : '#111', width : 24, height : 24});

		 	  }

		 }); // End Of Header

		 ListItem.append(Head.main);

		 if(NotifModel.getNotif().notifType == 'like' || NotifModel.getNotif().notifType == 'comment'){

		 	   ListItem.onclick = () => {

		 	  		this.getSinglePost({

		 	  		 	url : `http://192.168.43.13/kampuscrush/api/posts/?context=6&u_id=${NotifModel.getNotif().postId}`

		 	  		 }, (post) => {  // post == response

			 	  		 	 if(post.list){

			 	  		 	 	  R.Comment(new PostModel(post.posts[0]), {
			 	  		 	      dataUrl : 'http://192.168.43.13/kampuscrush/api/framework/states/modal.php',
			 	  		 	      newURL : `http://192.168.43.13/kampuscrush/post/?view=${NotifModel.getNotif().postId}`,
			 	  		 	      view : '.app-block-popout-content',
			 	  		 	      callback : () => {

			 	  		 	      	$.get('.app-block-popout').style.display = 'block';

			 	  		 	      } // End Of Call Back

			 	  		      }); // End Of R.Comment

			 	  		 	 }

		 	  		 }); /* End Of getSinglePost */

		 	  	} // End Of Click

		 }

		 return ListItem;

	}

	getSinglePost(args, callback){

		R.FeedGenerate({url : args.url}, (response) => {

			  callback(response);

		}); // End Of Feed Generation

	} // End Of Get Single Post

	BodyBuilder(PostModel, args){

		let Wrapper = null;

		switch (PostModel.getPost().type) {

			case 'image' :
			case 'photo' :

			   Wrapper = this.ImageBodyBuilder(PostModel);

				 break;

			case 'video' :
			
			   Wrapper = this.VideoBodyBuilder(PostModel, args);

			   break;

			case 'audio' :

			   Wrapper = this.AudioBodyBuilder(PostModel);

			   break;

			case 'text' :

			   Wrapper = $.create('a', 'text-anchor');

			   break;
			default:
			   
			   UI.toast({text : 'Body Not Created', time : 3000});

				break;
		} // End Of Switch

		return Wrapper;

	} // End Of BodyBuilder

	ViewPostAnalytics(args){

		args.btn.onclick = () => {

			$.get('.options-back-btn').click();

			this.ScreenOverlay({nav : true, header : args.header}, () => {});

		R.FeedGenerate({url : `http://192.168.43.13/kampuscrush/api/react/${args.url}`}, (user) => {

			$.removeLoader('.app-block-popout-content');

			if(user.list){

				user.users.forEach((UserItem, index) => {

					R.UserModelList.push(new UserModel(UserItem.user_info));

           $.get('.app-block-popout-content').append(this.UserRow(R.UserModelList[index], (Media) => {

               Media.right.append(this.FollowButton(R.UserModelList[index], (response) => {}));

               let InfoSpan = $.span({class : 'cardbody-info-span', text : ''});

               InfoSpan.append($.span({class : 'info-bio app-grey-text', text : `<br/><span class="glyphicon glyphicon-pencil"></span> &nbsp;<span class="cardbody-bio">${R.UserModelList[index].getInfo().bio === null ? '' : UI.RegText(R.UserModelList[index].getInfo().bio.toString().substring(0, 30))}</span>`}));

               Media.body.append(InfoSpan);

          })); // End Of Append

				}); // End Of For Loops

			}else{

				// No Users Reacts

				this.Banner({view : args.view, text : 'No User Accounts To Show'});

			} // End Of List Check

		}); // End Of Feed Generate 


		} // End Of Onclick

	} // End Of View Post Analytics

	Options(args){

		$.get('.app-block-popout-options').style.display = 'block';

		let Wrapper = $.create('div', 'options-pop');

		let ListGroup = $.create('div', 'list-group');
		let ListHeader = $.create('span', 'list-group-item');
		let ListFollow = $.create('a', 'list-group-item');

		ListGroup.append(ListHeader);
		Wrapper.append(ListGroup);

		$.get('.app-block-popout-options').append(Wrapper);

		ListHeader.innerHTML = `<a class="options-back-btn">${Icons.remove({color : '#111', height : 24, width : 24})}</a>&nbsp;<center><span class="app-max-text icon-text">Options Menu</span></center>`;

		  if(user.user.isLogged){

		  	 let ListLike = $.create('a', 'list-group-item');
		  	 ListLike.innerHTML = `<center>${Icons.heart({color : 'red', height : 24, width : 24})}<span class="app-bold-text icon-text"> Who Reacted?</span></center>`;

		  	 let ListComment = $.create('a', 'list-group-item');
		  	 ListComment.innerHTML = `<center>${Icons.commentAlt({color : '#111', width : 24, height : 24})} <span class="app-bold-text icon-text"> Who Commented?</span></center>`

		  	 ListGroup.append(ListLike);
		  	 ListGroup.append(ListComment);

		  	 this.ViewPostAnalytics({btn : ListLike, url : `?context=5&pid=${args.model.getPost().id}`, header : 'View Reacts', view : '.app-block-popout-content'});
		  	 this.ViewPostAnalytics({btn : ListComment, url : `?context=6&pid=${args.model.getPost().id}`, header : 'View Comments', view : '.app-block-popout-content'});


		  	 if(args.model.getActivity().me){

		  	// Delete And Privilled Features Belong To Logged In Users 

			  	 	let ListDelete = $.create('a', 'list-group-item');
				     ListGroup.append(ListDelete);
				     ListDelete.innerHTML = `<center>${Icons.delete({color : 'red', height : 24, width : 24})} <span class="icon-text app-bold-text">Delete</span></center>`;


		  	 }else{

		  	 	  let ListFollow = $.span({class : 'list-group-item', text : ``});
		  	 	  ListFollow.append(this.FollowButton(args.model, (follow) => {}));
		  	 	  ListGroup.append(ListFollow);


		  	 } // End Of Identifying User

		  }else{

		  	let LoginBanner = $.span({class : 'list-group-item app-grey-text', text : '<div class="space-small"></div><center>To Access Post Options, Login With A Registered Account<br/><div class="space-small"></div><a class="btn btn-success form-control options-login-btn">Login</a></center>'});

		  	ListGroup.append(LoginBanner);

		  	$.get('.options-login-btn').onclick = () => {

		  		$.get('.nav-user-link').click();
		  		$.get('.options-back-btn').click();

		  		$.get('.login-email').focus();

		  	} // End Of Click


		  } // End Of If


		// Dont Go Under
   
    this.backButton({btn : '.options-back-btn'}, () => {

    	$.get('.app-block-popout-options').style.display = 'none';
    	$.html('.app-block-popout-options', '');

    }); // End Of Back Button Call

	} // End Of Options

	PostBodyBuilder(PostModel, args){

		let MediaBodyDiv = $.create('div', 'app-media-body');

		let header = this.UserHeader(PostModel, {width : 35, height : 35, rightPosition : 'media-top'}, 
			
			(Media) => {

					let OptionsIcon = $.create('a', 'options-icon btn btn-default');

				  OptionsIcon.append($.span({class : 'glyphicon glyphicon-option-vertical', text : ''}));

				  Media.right.append(OptionsIcon);

			  OptionsIcon.onclick = () => {

			  	this.Options({model : PostModel});

			  } // End Of Click

		}); // End Of Call Back

		let MediaBody = this.BodyBuilder(PostModel, {maxHeight : '550px', minHeight : '200px', maxWidth : '99.9%'});

		

		MediaBodyDiv.append(header.main);

		if(args.comments){

			header.body.append(MediaBody);
			header.body.append(this.TextBodyBuilder(PostModel));

		}else{

			MediaBodyDiv.append(MediaBody);
			MediaBodyDiv.append(this.TextBodyBuilder(PostModel));
			MediaBodyDiv.append(this.React(PostModel));

		}

     $.get(args.view).append(MediaBodyDiv);
     $.get(args.view).append($.create('div', $.isMobile ? 'space-small' : 'space-medium'));

	}  // End Of PostBodyBuilder

	FullPostBody(PostModel){

		let FullWrapper = $.create('div', 'app-full-post-wrapper');

		if($.isMobile){

			$.html('.app-modal-xs-btn', Icons.back({color : '#111', width : 24, height : 24}));
			FullWrapper.append(this.PostBodyBuilder(PostModel, {comments : false, view : '.post-viewport'}));

		}else {
		  
			let header = this.UserHeader(PostModel, {width : 35, height : 35, rightPosition : 'media-top'}, 
				(Media) => {

				let OptionsIcon = $.create('a', 'options-icon btn btn-default');

			  OptionsIcon.append($.span({class : 'glyphicon glyphicon-option-vertical', text : ''}));

			  Media.right.append(OptionsIcon);

			}); // End Of Header

			$.get('.app-post-owner-header').append(header.main);
			$.get('.app-post-owner-header').append(this.TextBodyBuilder(PostModel));
			$.get('.app-post-owner-header').append(this.React(PostModel));

		    switch (PostModel.getPost().type) {

		    	case 'image' :
		    	case 'photo' :
		    		FullWrapper.append(this.ImageBodyBuilder(PostModel));
		    		break;
		    	 case 'video' :
		    	  FullWrapper.append(this.VideoBodyBuilder(PostModel, {maxHeight : '550px', minHeight : '200px', maxWidth : '99.9%'}));
		    	  break;
		    	case 'audio' :
		    	  FullWrapper.append(this.AudioBodyBuilder(PostModel));
		    	  break;
		    	default:

		    	   $.toast({text : 'Loading Post Failed'})

		    		break;
		    }

		    $.get('.post-viewport').append(FullWrapper);

		} // End Of If

	}  // End Of FullPostBody

	UserHeader(Model, args, callback){

		let Media = this.media({left : 'media-left media-top', right : `media-right ${args.rightPosition}`, img : true, url : Model.getImgs().profile, width : args.width, height : args.height, more : true, class : 'media-header'});

		let UserLink = $.create('a', 'app-user-link');

		UserLink.append($.span({class : 'app-bold-text', text : `${Model.getBasic().name}<br/>`}), $.span({class : 'app-grey-text', text : `@${Model.getBasic().handle}`}));

		UserLink.href = Model.getBasic().link;

		Media.body.append(UserLink);

		callback(Media);

		return Media;

	}

	TextBodyBuilder(PostModel){

		let TextWrapper = $.create('div', 'app-post-text-wrapper main-wrapper');
	  let PostText = $.span({class : ' ', text : this.RegText(PostModel.getPost().text)});

	  TextWrapper.append(PostText);

	  return TextWrapper;

	} // End Of TextBodyBuilder

	RegText(text){

	   let handleText = text.replace(/@+([a-zA-Z0-9_]+)/g, (x , y) => {

	      return `<a class='app-tag' href='http://192.168.43.13/kampuscrush/usr/${y}'>${x}</a>`;

	  }); // End Of Handle Replace

	  return handleText.replace(/#+([a-zA-Z0-9_]+)/g, (x, y) => {

	          return `<a class='app-hash' href='http://192.168.43.13/kampuscrush/trending/?tag=${y}'>${x}</a>`;
	       }); // End Of Hash Replace
  	 
  } // End Of RegText
  getWaveSurfer(args){

  	let AppWaveSurfer = WaveSurfer.create({

			container : args.container,
			waveColor : '#00D4FF',
			progressColor : '#5bc0de',
			barWidth: 5,
      barHeight: 10,
      barRadius: 3,
      barGap: 2,
      height: 120,
      interact: false

		}); // End Of Wave Surfer Object Init


		AppWaveSurfer.load(args.url);
		let MediaInteration = new MediaElement();

		AppWaveSurfer.on('ready', () => {

			  MediaInteration.FormatSecs({view : args.time, currentTime : AppWaveSurfer.getDuration()});

		    args.anchor.onclick = () => {

			    AppWaveSurfer.playPause();

			    AppWaveSurfer.on('audioprocess', () => {

			      MediaInteration.FormatSecs({view : args.time, currentTime : AppWaveSurfer.getCurrentTime()});

		        });  // End Of onAudioProcess

		   } // End Of Click

		}); // End Of onReady



  } // End Of Wave Surfer

	AudioBodyBuilder(PostModel){

		let AudWrapper = $.create('div', 'app-audio-body main-wrapper');
		let MediaAnchor = $.create('a', 'media-anchor audio-media-anchor');

		// HAS POTENTIAL TO CAUSE A BUG, DON'T FORGET TO TAKE CARE
		AudWrapper.setAttribute('id', `audio-${PostModel.getPost().id}`);

		MediaAnchor.append(AudWrapper);
		let mediaInfo = this.MediaInfo(PostModel);
		MediaAnchor.append(mediaInfo[0]);

		this.getWaveSurfer({container : AudWrapper, time : mediaInfo[1], url : PostModel.getPost().url, anchor : MediaAnchor});

		return MediaAnchor;

	}

	ImageBodyBuilder(PostModel){

		let ImgWrapper = $.create('div', 'app-image-body main-wrapper');
		let MediaAnchor = $.create('a', 'media-anchor');
		let Img = $.create('img', 'img-square app-media img-responsive');

		Img.src = PostModel.getPost().url;

		ImgWrapper.appendChild(Img);
		MediaAnchor.appendChild(ImgWrapper);

		MediaAnchor.onclick = () => {

			// Implement Media Click

		}

		return MediaAnchor;

	} // End Of ImageBodyBuilder

	VideoBodyBuilder(PostModel, args){

			let Video = $.create('video', 'app-media app-video main-wrapper');
	   	let source = $.create('source', '');
	   	let videoWrapper = $.create('div', 'app-video-body');
	   	let MediaAnchor = $.create('a', '');

	   	source.src = PostModel.getPost().url;
	   	Video.appendChild(source);

	   	if($.isMobile){

	   	}else{

	   		Video.style.maxHeight = args.maxHeight;  // 550px
		   	Video.style.minHeight = args.minHeight; // 200px
		   	Video.style.maxWidth = args.maxWidth; // 99.9%

	   	}

	   	videoWrapper.appendChild(Video);

	   	let mediaInfo = this.MediaInfo(PostModel);

	   	videoWrapper.appendChild(mediaInfo[0]);
	   	
	   	MediaAnchor.appendChild(videoWrapper);


	   	let MediaInteration = new MediaElement();

	   	  MediaAnchor.onclick = () => {

	   	  	MediaInteration.Action({video : Video}).ForVideo({view : mediaInfo[1], video : Video});

	   	  }
	   	  // Auto Play
	   	    if(!$.isMobile){

	   	    	 window.addEventListener('scroll', () => {

	   	    	 	   MediaInteration.AutoPlay({video : Video, view : MediaAnchor});

	   	    	 }, false);

	   	    } // End Of If

	   	return MediaAnchor;

	}

	MediaInfo(PostModel){

		  let MediaInfoBody = $.create('div', 'media-info-body')

  		let TimeText = $.create('div', `app-timer media-app-timer-${PostModel.getPost().id} media-text`)
  		let ViewText = $.create('div', 'app-counter media-text');

  		/*ViewText.textContent = PostModel.getStats().views > 1 || PostModel.getStats().views == 0 ? `${PostModel.getStats().views} views` : `${PostModel.getStats().views} view`;*/

  		MediaInfoBody.appendChild(TimeText, ViewText);

  		return [MediaInfoBody, TimeText, ViewText];
	}

	React(PostModel){

		let ReactSpan = $.create('div', 'app-react-body');
		let LikeBtn = $.create('a', 'app-like-btn');
		let CommentBtn = $.create('a', 'app-comment-btn');

		LikeBtn.innerHTML = PostModel.getStats().isLiked ? Icons.heart({color : 'red', width : 28, height : 28}) : Icons.heartEmpty({color : '#111', width : 28, height : 28});

		/*LikeBtn.innerHTML = Icons.heartEmpty({color : (PostModel.getStats().isLiked) ? '#FFC100' : '#111' , width : 24, height : 24});*/

		let LikeCount = $.span({class : 'app-grey-text icon-text', text : `${PostModel.getStats().likeCount == 0 ? '' : PostModel.getStats().likeCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`});
		LikeBtn.append(LikeCount);

		CommentBtn.innerHTML = Icons.commentAlt({color : '#111', width : 28, height : 28});

		let ComCount = $.span({class : 'app-grey-text icon-text', text : `${PostModel.getStats().comCount == 0 ? '' : PostModel.getStats().comCount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`});

		CommentBtn.append(ComCount);

		 R.Like(PostModel, {btn : LikeBtn, likes : LikeCount, type : 'post'}); // Liking The Actual Post


		CommentBtn.onclick = () => {
		    
		    R.Comment(PostModel, {
		    	 view : '.app-block-popout-content',
		    	 dataUrl : 'http://192.168.43.13/kampuscrush/api/framework/states/modal.php',
		    	 newURL : `http://192.168.43.13/kampuscrush/post/?view=${PostModel.getPost().id}`,
		    	 callback : () => {

		    	 	$.get('.app-block-popout').style.display = 'block';

		    	 }

		    	});  // End Of R. Comment

		  }  // Opening Comments


		ReactSpan.append(LikeBtn);
		ReactSpan.append(CommentBtn);

		return ReactSpan;

	} // End Of Reaction

	CreateGrid(args){

		args.array.forEach((GridItem) => {

    let Wrapper = $.create('div', args.wrapper);

    let Anchor = this.BodyBuilder(GridItem, {maxHeight : '50px', minHeight : '50px', maxWidth : '99.9%'});

    Anchor.onclick = () => {

    	R.Comment(GridItem, {
    		 view : '.app-block-popout-content',
    		 dataUrl : 'http://192.168.43.13/kampuscrush/api/framework/states/modal.php',
    		 newURL : `http://192.168.43.13/kampuscrush/post/?view=${GridItem.getPost().id}`,
    		 callback : () => {

    		 	$.get('.app-block-popout').style.display = 'block';

    		 }

    		});
    	
    } /* End Of Anchor */

    Wrapper.append(Anchor);


    $.get(args.viewport).append(Wrapper);

  		}); // End Of Each

    this.Grid({gridMain : args.viewport, gridItem : `.${args.wrapper}`});


	} /* End Of Create Grid */

	UserSlide(args){

		$.html(args.viewport, '');

		R.UserCardBodyGenerate({url : args.url, bodyWrapper : args.wrapper, view : args.viewport, callback : (array) => {
     	  	  // Initialize Flickity In Here!!
     	  	  var flickity = new Flickity( args.viewport, {
     	  	  	 freeScroll : false,
     	  	  	 contain : true,
               wrapAround : true,
               autoPlay : 4000,
               prevNextButtons : false,
               pageDots : false

          }); // End Of Flickity Initialization

     	   } // End Of Obj Callback

     	}); // End Of CardBody Generate


	} /* End Of UserSlide */

	/*

	  # Used For Showing User Profiles In Follow Suggestions

	  # Used For Showing User Profiles Of People You Follow And Of Those Who  Follow You

	*/

	UserRow(Model, callback){

		let UserRowWrapper = $.create('div', 'user-row-wrapper');

		let Head = this.UserHeader(Model, {width : 50, height : 50, rightPosition : 'media-top'}, (Media) => {

			  callback(Media);

		  }); // Header Function

		UserRowWrapper.append(Head.main);

		return UserRowWrapper;
	}

	UserInfo(Model){

		console.log(Model.getInfo().bio);
		let InfoSpan = $.span({class : 'cardbody-info-span', text : ''});

		InfoSpan.append($.span({class : 'info-bio app-grey-text', text : `<span class="glyphicon glyphicon-map-marker"></span> &nbsp;${Model.getInfo().location == null ? '' : Model.getInfo().location} <br /> <span class="glyphicon glyphicon-calendar"></span> &nbsp;Joined On ${Model.getBasic().date}</br><span class="glyphicon glyphicon-pencil"></span> &nbsp;<span class="cardbody-bio">${Model.getInfo().bio === null ? '' : this.RegText(Model.getInfo().bio.toString().substring(0, 25) + '...')}</span>`}));

		return InfoSpan;

	} // End UserInfo

	UserCard(Model){

		let UserBody = $.create('div', 'app-user-cardbody carousel-cell');
		let UserCover = $.create('div', 'app-usercard-cover');

		UserCover.style.backgroundImage = `url(${Model.getImgs().cover})`;

		let UserMediaWrapper = $.create('div', 'user-media-wrapper');

		let Head = this.UserHeader(Model, {width : 50, height : 50, rightPosition : 'media-top'}, (Media) => {

			 Media.body.append($.create('br', ''), this.UserInfo(Model));

		 }); // Header Function

		UserMediaWrapper.append(Head.main); // Append

		// Follow Button

		let UserMediaStatsBody = $.create('div', 'user-media-stats-wrapper');

		  let ImagesItem = $.span({class : 'media-stat-items image-item', text : ''});

		  ImagesItem.innerHTML = Icons.gallery({color : '#111', width : 24, height : 24});

		    ImagesItem.append($.span({class : 'card-count-text app-bold-text', text : Model.getMedia().images}));

		  let VideosItem = $.span({class : 'media-stat-items video-item', text : ''});
		  VideosItem.innerHTML = Icons.video({color : '#111', width : 24, height : 24});
		    VideosItem.append( $.span({class : 'card-count-text app-bold-text', text : Model.getMedia().videos}));

		    let AudiosItem = $.span({class : 'media-stat-items video-item', text : ''});

		    AudiosItem.innerHTML = Icons.audio({color : '#111', width : 24, height : 24});
		    AudiosItem.append($.span({class : 'card-count-text app-bold-text', text : Model.getMedia().audios}));

		 let ButtonBody = $.create('div', 'follow-button-body container-fluid');

	  if(!Model.getActivity().me){

		   ButtonBody.append(this.FollowButton(Model, (response) => {}));

		}else{

			let Button = $.create('a', 'btn btn-success form-control');
			Button.textContent = 'Go To Profile';
			Button.href = `http://192.168.43.13/kampuscrush/usr/${Model.getBasic().handle}`;
			ButtonBody.append(Button);

		}

		UserMediaWrapper.append(ButtonBody);

		let Center = $.create('center', '');

		Center.append(ImagesItem);
		Center.append(VideosItem);
		Center.append(AudiosItem);
		UserMediaStatsBody.append(Center);

		UserBody.append(UserCover);
		UserCover.append(UserMediaWrapper);

		UserBody.append($.create('div', 'space-large'));
		UserBody.append($.create('div', 'space-large'));
		UserBody.append($.create('div', 'space-large'));
		UserBody.append(UserMediaStatsBody);

		return UserBody;

	} // End Of UserCard

	FollowButton(Model, callback){

		let Button = $.create('button', `${Model.getActivity().following ? 'btn-success' : 'btn-default'} btn form-control`);

		Button.textContent = Model.getActivity().following ? 'Following' : 'Follow';

		Button.onclick = () => {

			 if(user.user.isLogged){

			 	  $.req({method : 'GET', url : `http://192.168.43.13/kampuscrush/api/follow/?context=1&u_id=${Model.getBasic().id}`, form : null, bar : false}, (response) => {

			 	  if(!response.error){

			 	  	 Button.textContent = response.message;

			 	  	 Button.setAttribute('class', response.follow ? 'btn-success btn form-control' : 'btn-default btn form-control');

			 	  	 callback(response);


			 	  }else{

			 	  	 $.toast({text : response.message, time : 4000});

			 	  }

			   }); // End Of Request

			}else{

				$.toast({text : `Login First To Follow @${Model.getBasic().handle}`, time : 5000});

			}

	} // End Of Onclick

		return Button;

	} // End Of Follow Button

	onLoadIcons(args){

		$.html('.app-home-icon', Icons.home({color : '#111', width : $.isMobile ? 30 : 28, height : $.isMobile ? 30 : 28}));
		$.html('.app-message-icon',  Icons.message({color : '#111', width : $.isMobile ? 30 : 28, height : $.isMobile ? 30 : 28}));
		$.html('.app-notification-icon',  Icons.notification({color : '#111', width : $.isMobile ? 30 : 28, height : $.isMobile ? 30 : 28}));

		$.html('.app-modal-lg-btn', Icons.back({color : '#fff', width : 24, height : 24}));

		$.html($.isMobile ? '.app-search-xs' : '.app-search-lg', Icons.search({color : '#111', width : 30, height : 30}));


		if(args.context == 'home'){

			$.html('.share-icon', Icons.upload({color : '#111', width : 24, height : 24}));

			// Suggestion Icons
		  // $.html('.suggest-icon-grid',  Icons.grid({color : '#111', width : 24, height : 24}));
		  // $.html('.refresh-icon', Icons.refresh({color : '#111', width : 24, height : 24}));

		}else if(args.context == 'user'){

			// Add Icons For When You In The User Profile Context

			$.html('.camera-btn', Icons.gallery({color : '#111', width : 34, height : 34}));
			$.html('.video-btn', Icons.video({color : '#111', width : 34, height : 34}));
			$.html('.audio-btn', Icons.audio({color : '#111', width : 34, height : 34}));

			$.html('.grid-btn', Icons.grid({color : '#111', width : 28, height : 28}));
			$.html('.saved-btn', Icons.heart({color : 'red', width : 28, height : 28}));
			$.html('.list-btn', Icons.list({color : '#111', width : 28, height : 28}));

		}
	} // End Of onLoadIcons


	// YOURE FULL OF BUGSSS, DONT FORGET

	Grid(args){

	 let AppMansory = new Masonry(args.gridMain, {

 	    itemSelector : args.gridItem,
 	    columnWidth : args.width,
      horizontalOrder: true,
      gutter : 1,
      stagger: 40

	   });

	 console.log(AppMansory);

	} // End Of Grid

	NavDropDowns(args, callback){

		 let navOpen = false;

		$.get(args.dropdownBtn).onclick = () => {

				$.get(args.dropdown).style.display = navOpen ? 'none' : 'block';
		 	  navOpen = navOpen ? false : true;

		 	  // Set Header As Nav Header!!
		 	  if($.isMobile){

		 	  	$.get(args.header).setAttribute('class', args.headerClass);
		 	  	
		 	  }

		 	  $.html(args.backBtn, $.isMobile ? Icons.back({color : '#111', width : 24, height : 24}) : Icons.remove({color : '#111', width : 24, height : 24}));

		 	  UI.backButton({btn : args.backBtn}, () => {

		 	  	$.get(args.dropdown).style.display = navOpen ? 'none' : 'block';
		 	    navOpen = navOpen ? false : true;

		 	    args.backBtnCall();

		 	  });

		 	  if(navOpen){

		 	  	callback();

		 	  }

		}

	} // End Of NavDropDown

} // End Of Class


class MediaElement{

	constructor(){

	}

	// Show Media Time On Video

	Action(args){

		  args.video.paused ? args.video.play() : args.video.pause();

		  return this;
	}

	ForVideo(args){

		args.video.addEventListener('timeupdate', () => {

			 Math.floor(args.video.buffered.end(0)) > Math.floor(args.video.currentTime) ? this.FormatSecs({view : args.view, currentTime : args.video.currentTime}) : $.toast({text : 'Buffering', time : 2000});

		}); // End Of TimeUpdate

	} // End Of Time For Video

	FormatSecs(args){

		let minutes = Math.floor(args.currentTime / 60); // Get Minutes, Divide By 60s
	  let seconds = Math.floor(args.currentTime - ( minutes * 60)); // Get Seconds Left, Multiply By 60s

	  if(minutes < 10 && seconds < 10 ){

	     args.view.innerHTML = `0${minutes}:0${seconds}`;

	  }else if(minutes < 10 && seconds >= 10 ){

	  	args.view.innerHTML = `0${minutes}:${seconds}`;

	  }else if(minutes >= 10 && seconds < 10 ){

	  	args.view.innerHTML = `${minutes}:0${seconds}`;

	  }else if(minutes >= 10 && seconds >= 10){

	  	args.view.innerHTML = `${minutes}:${seconds}`;

	  } // Zeroed Ended If

	} // End Of formatSecs

	AutoPlay(args){
   	  
   	  if(!args.video.paused){

   	  	var fraction = $.isMobile ? 0.9 : 0.8;

        	 var x = args.video.offsetLeft, y = args.video.offsetTop, w = args.video.offsetWidth, h = args.video.offsetHeight, r = x + w, //right

            b = y + h, //bottom

            visibleX, visibleY, visible;

              visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));

              visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

              visible = visibleX * visibleY / (w * h);

              (visible > fraction) ? args.video.play() : args.video.pause();
              
        } // End Of If

   	  } // End Of AutoPlay

} // End Of MediaElement Class

// Create Class Objects

const R = new Requests(document);
const UI = new UserInterface(document);

function LoadFeed(args){

	$.addLoader({view : '#app-viewport'});

	if(args.extras){

		$.addLoader({view : '.app-suggest'});
		$.addLoader({view : '.home-explore-body'});

	}

	 R.FeedGenerate({url : args.URL}, (resp) => {

	 	  // Implement How Posts Will Show On The Feed

	 	  if(resp.list){ 

	 	  	  // The Feed Is Not Empty

	 	  	  $.html('#app-viewport', '');

	 	  	  args.array = [];

	 	  	  resp.posts.forEach((PostItem, index) => {

	 	  	  	args.array.push(new PostModel(PostItem));

	 	  	  	UI.PostBodyBuilder(args.array[index], {comments : false, view : '#app-viewport'}); // Append Posts On View
	 	  	  
	 	  	  });

	 	  	  args.callback(args.array);

	 	  	  if(args.extras){

	 	    	   if(!$.isMobile){

	 	    	   	  args.peopleYouMayKnow();

	 	    	   	  /*setTimeout(() => {

	 	    	   	  	$.html('.home-explore-body', '');

	 	    	   	  	args.explore();  

	 	    	   	  }, 1500);*/

	 	    	   }

	 	    }

	 	  }else{

	 	  	  $.toast({text : 'No User Posts To Show', time : 5000});

	 	  }

	 }); // End Of ForEach

}  // End Of Feed Load

  /*  APP MAIN ICON FUNCTIONS ON CLICKS  */

  var navShow = true;
  function navShown(){

  	if(navShow){

  		if($.isMobile){

      jQuery(document).ready(() => {

	       NAV.removeAttribute('class');
	       NAV.setAttribute('class', 'app-user-info-nav');
	       jQuery('.app-user-info-nav').hide();
	       navShow = false;

      });

     }

  	}else{

      NAV.removeAttribute('class');
  		NAV.setAttribute('class', $.isMobile ? 'navbar-fixed-top app-user-info-nav' : 'app-user-info-nav');

  		console.log($.get('.app-user-info-nav'));
      jQuery(document).ready(() => {
        
        jQuery('.app-user-info-nav').show();
        navShow = true;

      });

  	}

  }  // End Of Function

window.addEventListener('DOMContentLoaded', () => {

	 $.get($.isMobile ? '.app-search-input-xs' : '.app-search-input').addEventListener('keyup', () => {

		  let inputTextBox = $.get($.isMobile ? '.app-search-input-xs' : '.app-search-input');

		  $.get('.app-search-dropdown').style.display = $.isMobile ? 'none' :'block';

		  $.addLoader({view : $.isMobile ? '.app-search-body' : '.dropdown-view'});

		   // Hide If Input Is Empty
		    if(inputTextBox.value == ""){

		    	$.removeLoader($.isMobile ? '.app-search-body' : '.dropdown-view');

		    	$.get('.app-search-dropdown').style.display = $.isMobile ? 'none' :'none';

		    }else{

		    	  // Show And Manipulate Search Results Here!!
		    	  R.Search({data : inputTextBox.value, url : 'http://192.168.43.13/kampuscrush/api/search/', view : $.isMobile ? '.app-search-body' : '.dropdown-view'});

		    } // End Of If-Else

    }, false); // End Of OnkeyUp

	 // {dropdownBtn, dropdown, header, headerClass, backBtn}

	 	 /* FOR NOTIFICATIONS */

			 UI.NavDropDowns({dropdownBtn : '.app-notification-btn', dropdown : '.app-notification-dropdown', header : '.notification-dropdown-header', headerClass : 'navbar-fixed-top notification-dropdown-header app-header', backBtn : '.notif-back-btn', backBtnCall : () => {
			 	navShown();
			 }}, () => {

			 	 navShown();
			 	 R.Notifications();

			 });

			 /* FOR MESSAGES */

			 UI.NavDropDowns({dropdownBtn : '.app-messages-btn', dropdown : '.app-message-dropdown', header : '.chats-dropdown-header', headerClass : 'navbar-fixed-top chats-dropdown-header app-header', backBtn : '.chats-back-btn', backBtnCall : () => {
			 	navShown();
			 }}, () => {

			 	     jQuery(document).ready(() => {

		 	  	  	 jQuery('.chats-input-wrapper').hide();

		 	  	   });

		 	  	   navShown();

		 	  	   $.html('.chats-header-text', 'Messages');

			 	  if(user.user.isLogged){

			 	  	R.ViewChats({});


			 	  }else{

			 	  	$.toast({text : 'Login With A Registered Account To View Your Chats And Messages', time : 4000});

			 	  }

			 });

			 /* FOR SEARCH */

			 UI.NavDropDowns({dropdownBtn : '.app-search-btn', dropdown : '.app-search-dropdown-xs', header : '.chats-dropdown-header', headerClass : 'navbar-fixed-top chats-dropdown-header app-header', backBtn : '.search-back-btn', backBtnCall : () => {

			 	navShown();

			 	$.html('.app-search-body', '');

			 }}, () => {

			 	  navShown();

			 	  $.html('.app-search-icon-xs', Icons.search({color : '#111', width : 20, height : 20}));

			 	  UI.UserSlide({wrapper : 'main-flick-body', viewport : '.app-search-body', url : 'http://192.168.43.13/kampuscrush/api/follow/?context=4'});

			 });

}, false);

		/* =========================================================================================
		=                      
		                            RECORDING AUDIO FUNCTIONS
		=
		===========================================================================================*/

let mAudioContext, mRecorder, mAudioRecorder = null;

function audioINIT(){
   // Try-Catch For Exception Handling
  try {
    
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    mAudioContext = new AudioContext;
    // Debuggig
      console.log('Context Available');
      console.log('UserMedia' + (navigator.getUserMedia ? 'Available' : 'Not Available'));

  } catch(e) {
    // statements
    console.log(e);
    $.toast({text : e.toString(), time : 4000});

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

  var audio = mAudioContext.createMediaStreamSource(stream);
  mRecorder = new Recorder(audio);
  console.log('Recorder Initialized!');

} // End Of startUserMedia()

/*function clear(){

	mRecorder = null;
	mAudioContext = null;

}*/


class AudioRecorder{

	 constructor(args){

	 	  this.args = null
	 	  this.time = 0; // Max Allowed Voice Note Time
	 	  this.interval = null;
	 	  this.isRecording = false;

	 }
	 getRecorder(){ return this.args.recorder; }
	 getAudioContext(){ return this.args.audioContext; }

	 initAudio(args){

	 	this.args = args;

	 } // End Of init Audio

	 startRecording(args, callback){

	 	this.initAudio(args);

	 	 // Since Context Is Suspended, User Event Has To Resume It
	 	 this.getAudioContext().resume().then(() => {

	 	 	  this.getRecorder() && this.getRecorder().clear(); // Clear The Recorder Before Recording Any New Records
	 	 	  this.getRecorder() && this.getRecorder().record(); // Record Audio
	 	 	  this.setRecordingState(true);
	 	 	  callback();

	 	 	  this.interval = setInterval(() => {

	 	 	  	if(args.context == 'outside'){

	 	 	  		if(this.time == 60){

	 	 	  		  /* Stop Recording */
	 	 	  		  this.stopRecording({view : args.view}, () => {});

	 	 	  	  } // End Of End Of Recording If

	 	 	  	} // End Of Context If

	 	 	  	this.time += 1;
	 	 	  	$.html(args.timeView, this.time < 10 ? `00:0${this.time}` : `00:${this.time}`);

	 	 	  }, 1000); // End Of Interval

	 	 }); // End Of Context Resume!

	 } // End Of Start Recording

	 // {container : AudWrapper, time : mediaInfo[1], url : PostModel.getPost().url, anchor : MediaAnchor}
	 stopRecording(args, callback){

	 	  clearInterval(this.interval); // Stop Time

	 	  this.getRecorder() && this.getRecorder().stop(); // Stop Recording Audio
	 	  this.setRecordingState(false);
	 	  this.time = 0;

	 	  this.getRecorder() && this.getRecorder().exportWAV((audio) => {
	 	  	console.log('Exporting...');
	 	  	 // this.endRecording({view : args.view, url : URL.createObjectURL(audio)});

	 	  	 callback({audioFile : audio, url : URL.createObjectURL(audio)});

	 	  	 this.getRecorder().clear();

	 	  	 // clear(); // Clear WebAudio Vars

	 	  }); // End Of Exporting Wav Audio

	 } // End Of Stop Recording

	 getRecordingState(){ return this.isRecording; }
	 setRecordingState(bool){ this.isRecording = bool; }

	 toggleRecord(args, callback){

	 	  if(this.getRecordingState()){

	 	  	this.stopRecording(args, callback);
	 	  	this.setRecordingState(false);

	 	  }else{

	 	  	this.startRecording(args, callback);
	 	  	this.setRecordingState(true);

	 	  } // End Of If

	 } // End Of Recording

	 showRecording(args){

	 	let Wrapper = $.create('div', 'main-wrapper');
	  let AnchorBtn = $.create('a', 'media-anchor');

	  let MediaInfoBody = $.create('div', 'media-info-body')

		 let TimeText = $.create('div', `app-timer media-app-timer media-text`);

		 MediaInfoBody.append(TimeText);
		 AnchorBtn.append(Wrapper);
		 AnchorBtn.append(MediaInfoBody);

		 $.get(args.view).append(AnchorBtn);

	   UI.getWaveSurfer({container : Wrapper, url : args.url, anchor : AnchorBtn, time : TimeText});
	   console.log('Show Recording');

	 } // End Of End Recording

} // End Of Class


	/* =========================================================================================
	=                      
	                            CLASS FOR UPLOADING & SHARING
	=
	===========================================================================================*/

class Upload{

	constructor(){

		this.file = '';

	}
	upload(args){

		if(args.sanitize()){

			console.log(args);
			 let form = new FormData();
			 form.append('context', args.context);
			 form.append('text', args.text);
			 form.append('media', this.getFile());
			 console.log(this.getFile());
			 switch (args.type) {

			 	case 'post':

			 	  // form.append('id', args.id);

			 		break;
			 	case 'comment' :

			 	  form.append('p_id', args.postId);

			 	  break;
			 	case 'message' :

			 	  form.append('id', args.userOneId);
			 	  form.append('u_id', args.userTwoId);

			 	  break;
			 	default:
			 		return;
			 		break;
			 } /* End Of Switch */

			 console.log(form);

			 $.req({
			 	  method : 'POST',
			 	  url : args.url,
			 	  form : form,
			 	  bar : {
			 	  	need_progress_bar : true,
			 	  	progressCall : (progress) => {

			 	  		this.showBar({

			 	  			barProgress : progress.size,
			 	  			view : args.progressView

			 	  		}); /* End Of Bar Call */

			 	  	} /* End Of Progress Call */
			 	  }, /* End Of Bar Payloads */
			 	}, (response) => {

			 		/* Server Response */
			 		$.toast({text : response.message, time : 4000});

			 } /* End Of Callback */);

		}

	} /* End Of Upload */

	send(args, callback){

	  args.sendBtn.addEventListener(('click'), () => {

	    if(user.user.isLogged){

	    	let uploadPayLoad = callback();

	    	this.upload(uploadPayLoad);

	    }else{

	    	 $.toast({text : 'Login With A Registered Account To Share With Kampuscrush Community', time : 4000});

	    }

	  }, false);

	  args.gallery();

	} /* End Of Send */

	setFile(args){ this.file = args.file; }
	getFile(){ return this.file; }

	fileGallery(args, callback){

		$.get(args.className).addEventListener('change', (event) => {

			callback({fileName : event.target.value.split('\\').pop()});

			this.setFile({file : $.get(args.className).files[0]});

		}, false);

	}
 
	showBar(args){

		let ProgressWrapper = $.create('div', 'progress');
		let ProgressBar = $.create('div', 'progress-bar app-progress-bar');
		ProgressWrapper.append(ProgressBar);

		$.html(args.view, '');
		$.get(args.view).append(ProgressWrapper);

		ProgressBar.style.width = `${args.barProgress}%`;
		// $.html(args.view, ProgressWrapper);

	}  /* End Of Show Bar */

} /* End Of Class*/