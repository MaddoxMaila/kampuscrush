<?php

  $content = array('page' => '

    <div class="row" style="backgroundcolor:#fff;">
       <div class="col-lg-7 post-viewport-wrapper-lg">

         <div class="app-comment-header visible-xs" style="background-color:#fff;height:45px;border-bottom: 0.03em solid lightgrey;">
           <div class="space-small visible-xs"></div>
           <div class="space-small visible-xs"></div>
           &nbsp;&nbsp;<a class="app-modal-xs-btn"></a>
           &nbsp;&nbsp;<span class="app-bold-text" style="position:relative;top:-5px">Full Post</span>

         </div>

         <div class="space-large visible-xs"></div>
         <br class="visible-xs" />


         <div class="post-viewport"></div>

       </div>
       <div class="col-lg-5 comments-viewport-main">
        <div class="app-comment-header-fixed">
         <div class="visible-lg app-post-owner-header"></div>
         <div class="app-write-comment-viewport">

       <div class="comment-audio-viewport">
          <span class="comment-audio-timer"></span>
       </div>

         <div class="app-input-wrapper">

           <form class="form-group">
   
           <div class="input-group input-group-md">
              
              <span class="input-group-addon">
                <label for="media">
                  <span class="input-file-icon"></span>
                </label>
              </span>

              <a class="input-group-addon input-record-icon">
                
              </a>

              <textarea type="text" class="comment-input-text" placeholder="Reply"></textarea>

              <a class="input-group-addon input-send-icon">
                 
              </a>
           </div>

        </form>

         </div>

       </div>
       <div class="space-small"></div>
         <div class="comments-view-header" style="background-color: #fff;">
           <div class="" style="border: 0.03em solid lightgrey;padding: 1%;">

              <center>
                 <span class="app-bold-text">Comments</span>
              </center>

           </div>
           <div class="space-small"></div>
         </div>
       </div>
         <div class="space-small"></div>
         <div class="visible-lg space-large"></div>
         <div class="visible-lg space-large"></div>
         <div class="visible-lg space-large"></div>
         <div class="visible-lg space-large"></div>
         <div class="visible-lg space-large"></div>
         <div class="visible-lg space-large"></div>
         <div class="visible-lg space-large"></div>
         <div class="visible-lg space-small"></div>
         <div class="comments-viewport"></div>


       </div>
       <div class="visible-xs space-large"></div>
       <div class="visible-xs space-large"></div>
       

    </div>

    ', "error" => false);

   echo json_encode($content);


?>