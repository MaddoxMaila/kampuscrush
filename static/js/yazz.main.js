          

      
      select('.compose-img').src = user.img_url;
      var FileData = "";
           select('.refresh-btn').onclick = () => {

             select('.suggested-body').innerHTML = "";
             UserInterface.suggestions('.suggested-body');

          } // End Of OnClick

          select('.compose-rec-btn').onclick =  () => {

            // Check If The Microphone Wha Initialized
             if(Context == null && recorder == null){

                // If So Call The Microphone Initialize Function
                audioINIT();
                UserInterface.toast("Microphone Initialized!, Recorder Ready");

             } // End Of If

              // And None The Less Call The Toggle Function To Start And Stop Recording
              // Play & Stop Audio Recording After 1 Second The User Pressed Record Button
              setTimeout(
                () => {

                  audioToggle(['#recording-timer',select('.compose-rec-btn')],

                    (details, blob) => { // details Is An Array Of Objects!

                      FileData = blob;
                      console.log(FileData);

                      //[Media, Audio, MediaBtn, AudioProgress, MediaRight]; The Array In details
                      let TimeText = UserInterface.span();
                      TimeText.setAttribute('class', 'app-timer media-text');

                      let time = new Time(details[1], 0);

                      time.showTime(TimeText, details[3]); // Text For Audio Time Update && Audio Progressbar

                      select('.audio-recorded-body').appendChild(details[0]);

                      details[4].appendChild(TimeText);

                      details[2].onclick = () => {

                         time.action();

                      } // End Play / Pause Button Toggled

                      // Remove Camera Label, Replace With Trash Icon

                      select('.visual-media').style.display = 'none';

                      select('.record-trash').style.display = 'inline-block';

                        // Implement Trash Icon Button Click

                        select('.record-trash').addEventListener('click', 
                            () => {

                              select('.audio-recorded-body').innerHTML = '';

                              select('.during-recording').style.display = 'none';

                              select('.visual-media').style.display = 'inline-block';

                              select('.record-trash').style.display = 'none';

                              select('#recording-timer').innerHTML = '00m : 00s';

                          }, // End Of Anonymous Callback Function

                          false); // End OF Event

                    } // Audio Toggle Callback Function For When The Audio Is Stopped!

                  ); //End Of AudioToggle()

              }, // End Of TimeOut Anonymous Function!
              1000);

          }/* : () => {

            UserInterface.toast("Sharing Voice Notes Via Desktop Or PC Is Disabled, Please Use A Mobile Browser");

          } */// End Of Rec Button Click
          select('.record-icon-btn').onclick = () => {


          } // End Of Button Click
          // The Same Button Will Be Used To Start Recording And Ending Recording
          


          select('.compose-btn').addEventListener('click',

          () => {

              if(user.isLogged){

                let ComposeBox = select('.compose-box');
              let ComposeForm = new FormData();

                if(ComposeBox.value == "" && select('.media-form').value == "" && FileData == ""){

                  UserInterface.toast('Post Body Seems To Be Empty, Write Something Or Choose A Media File');
                  
                  return;

                }else{

                  ComposeForm.append('text', ComposeBox.value);

                  if(select('.media-form').files[0] != ""){

                    ComposeForm.append("media", select('.media-form').files[0]);

                  }else{

                    ComposeForm.append('media',FileData );

                  }
                  
                  ComposeForm.append('context',1);
                  console.log(FileData);
                  http.params('POST', 'http://localhost/yazz/i/api/upload/', ComposeForm);

                  http.request(

                      (data) => {

                          try {
                            
                             let response = JSON.parse(data);

                             if(!response.error){

                                // No Error

                                // Check Of Upload Error
                                if(response.upload){

                                  // There Was An Upload
                                  UserInterface.toast(response.message);

                                  FileData = "";

                                }else{

                                  // No Upload
                                  UserInterface.toast(response.message);
                                
                                } // End Of Upload If

                             }else{

                                // An Error Occured
                                UserInterface.toast(response.message);

                             } // End Of Error If

                          } catch(e) {

                            // statements
                            UserInterface.toast(e);

                          } // End Of Try-Catch

                      }, // End Of CallBack Function

                      select('.progress-bar')

                    ); // End Of Request

                } // End Of If


              }else{

                UserInterface.toast('Login With A Registered Account To Upload');

             } // End Of Login Check

          }
        , false);

          select('.media-form').addEventListener('change',
            (e) => {

               select('.compose-info-show').style.display = 'block';
               let fileName = e.target.value.split('\\').pop();

               select('.file-name').textContent = fileName.toString();

               select('.cancel-btn').onclick = () => {

                select('.media-form').value == "";
                select('.compose-info-show').style.display = 'none';
                //FileData = select('.media-form').files[0];

               }

            },
            false
          );

