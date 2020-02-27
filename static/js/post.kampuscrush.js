





window.addEventListener('DOMContentLoaded', () => {


	UI.onLoadIcons({context : 'home'});


	if(post.list){

		R.Comment(mPostModel.model, {
	    dataUrl : '../api/framework/states/modal.php',
	    newURL : `../post/?view=${mPostModel.model.getPost().id}`,
	    view : '#app-viewport',
	    callback : () => {
	
	
	
	    } // End Of Call Back
	  }); // End Of R.Comment

	}else{

		// The Post Id Doesn't Exist

} // End Of If


}, false); // End Of DOM Content Loaded Listener