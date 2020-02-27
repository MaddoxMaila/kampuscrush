window.addEventListener('DOMContentLoaded', () => {

  jQuery.noConflict();
    
  //Loads Feed And All Related Content For The Home Screen
  UI.onLoadIcons({context : 'home'});

	 LoadFeed({
     URL : '../api/posts/?context=1',
     array : R.PostModelList,
     callback : (arrayModel) => {},
     extras : true, 
     peopleYouMayKnow : () => {

      UI.UserSlide({wrapper : 'main-flick-body', viewport : '.app-suggest', url : '../api/follow/?context=4'});

   }/* End Of People You May Know Function */ ,
   
   explore : () => {

      UI.BlockPost({url : `../api/posts/?context=5`}, (explore) => {

          UI.CreateGrid({array : explore.array, wrapper : 'app-block-post-explore', viewport : '.home-explore-body'});

      }); // End Of Explore

   } /* End Of Explore, Explore Shows Trending Content*/

 }); // End Of Load Function

   /*  FOR SHARING */
      UI.NavDropDowns({dropdownBtn : '.share-btn', dropdown : '.app-mobile-share', header : '.mobile-share-header', headerClass : 'app-header mobile-share-header navbar-fixed-top', backBtn : '.mobile-share-back-btn', backBtnCall : () => {

          navShown();

       }}, () => {

          navShown();


          jQuery(document).ready(() => {



          });

          $.html('.mobile-share-back-btn', Icons.back({color : '#111', width : 24, height : 24}));
          $.html('.toggle-record-btn', Icons.mic({color : '#111', width : 302, height : 302}));
          $.html('.app-choose-file', Icons.wallpaper({color : '#111', width :302, height : 302}));

            audioINIT(); // Initialize WebAudio
            
             if(mAudioRecorder == null){

                mAudioRecorder = new AudioRecorder();

                /*setTimeout(() => {
                  console.log(mRecorder);

                  mAudioRecorder.initAudio({
                    recorder : mRecorder,
                    audioContext : mAudioContext
                  });

                }, 1000);*/

             }  // NULL CHECK

          $.get($.isMobile ? '.toggle-record-btn' : '.rec-btn-lg').onclick = () => {

            if(mAudioRecorder.getRecordingState()){

                  /*  USER IS ALREADY RECORDING  */

                // 1. Should Stop Recording
                // 2. Toggle Icon To Red To Show Recording Ended
                // 3. Set Recording State To False
                console.log('Recording Stopped!');

                mAudioRecorder.setRecordingState(false);

                mAudioRecorder.stopRecording({}, $.isMobile ? (recordings) => {

                   // For Mobile!!

                  $.html('.mobile-share-foot', '');
                  mAudioRecorder.showRecording({view : '.mobile-share-foot', url : recordings.url});

                  Share.setFile({file : recordings.audioFile});

                } : (recordings) => {

                   // For Desktop!!

                   Share.setFile({file : recordings.audio});

                }); // End Of Stop Recording

            }else{

                  /* USER IS NOT RECORDING */

                // 1. Should Start Recording
                // 2. Toggle Icon To Show Recording Is In Progress
                // 3. Set Recording State To True

                mAudioRecorder.setRecordingState(true);

                console.log('Recording Started');

                mAudioRecorder.startRecording({
                  view : '.mobile-share-foot',
                  context : 'outside', 
                  timeView : '.mobile-share-timer',
                  recorder : mRecorder,
                  audioContext : mAudioContext
                }, 
                $.isMobile ? () => {

                  // Callback For Mobile!!

                  $.html('.mobile-share-foot', '');

                  let icon = 'red';
                  let interval = setInterval(() => {

                     if(icon == 'red'){

                        $.html('.toggle-record-btn', Icons.mic({color : '#111',width : 302, height : 302}));
                        icon = 'black'

                      }else{

                        $.html('.toggle-record-btn', Icons.micFill({color : 'red',width : 302, height : 302}));
                        icon = 'red';

                      } // End Of If

                      if(!mAudioRecorder.getRecordingState()){
                        clearTimeout(interval);
                      }

                  }, 1000); // End Of Interval

                } : () => {

                    // Callback For Desktop!!

                    $.toast({text : 'Started Recording...Speakkk', time : 3000});

                }); // End Of Start Of Recording

            } // End Of If

          } // End Of Click

       }); // End Of Nav Dropdown UI


  /* =========================================================================================
  =                      
                              IMPLEMENT USER UPLOAD BUTTONS
  =
  ===========================================================================================*/
  const Share = new Upload();

  Share.send({

    sendBtn : $.get($.isMobile ? '.mobile-share-control-btn' : '.compose-btn'),
    cancelBtn : $.get('.mobile-share-control-btn'),
    gallery : () => {

      Share.fileGallery({

        className : '.media'

      }, (file) => {

        $.toast({text : file.fileName, time : 4000});

      }); /* End Of fileGallery & Callback */

    } /* End Of Gallery Function, Lets Users Choose Files From Their Devices File System */

  }, () => {

     return {

      context : 1,
      text : $.value($.isMobile ? '.upload-text' : '.compose-box'),
      url : `../api/upload/`,
      type : 'post',
      progressView : '.mobile-share-foot',


      sanitize : () => {

        if($.value($.isMobile ? '.upload-text' : '.compose-box') == "" && $.get('.media').files[0] == ""){

          $.toast({text : `Either Text, Record A Voice Note Or Choose A Media File From ${ $.isMobile ? 'Gallery' : 'Files' }`, time : 4000});

          return false;
        } /* End Of If */

        return true;
      } /* End Of Sanitize*/

    } /* End Of Upload Pay Load */

  }); /* End Of Share */

}); // End Of Event!