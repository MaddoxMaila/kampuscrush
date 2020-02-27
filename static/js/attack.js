/*
   
   Javascript Frame To Make Coding In Javascript Easier

*/

  
  // Class To Handle All Network Connections
  class Http {

    // Define Class Constructor
    __constructor(){

      this.xhr = null;
      this.form = null;
      this.url = null;
      this.method = null;

    } // End OF Constructor


    // Method For Setting Class Variables
    set(method, url, form){

      this.method = method;
      this.url = url;
      this.form = form;
      this.xhr = new XMLHttpRequest();

      return this;
    } // End Of Set

    progressbar(args){
      console.log(args);
      var progress = 0;
      this.xhr.upload.onprogress = (e) => {

        var done = e.position || e.loaded, total = e.totalSize || e.total;

        progress = (Math.floor(done / total * 1000) / 10 );

        args.progressCall({size : progress});
          
      } // End Of Arrow Function

    } // End Of ProgressBar

    // Method For Sending The Actual Request, Accepts A Callback Function And A Tag For Progress Bar
    request(callback, args){

      var self = this;

      // Handle Error That May Arise
       try {
         
         self.xhr.onreadystatechange = () => {

            if(self.xhr.readyState == 4 && self.xhr.status == 200){

               callback(self.xhr.responseText);

            } // End Of If

         } // End Of Arrow Function
         console.log(args);
         if(args.need_progress_bar){

           self.progressbar(args);

         }

         self.xhr.open(self.method, self.url, true);
         self.xhr.send(self.form);

       } catch(e) {

         // statements
         console.log(e);

       } // End OF Try-Catch

    } // End Of Request Method

  } // End Of Class

  // Class To Easily Access And Create HTML Tags With Added Attributes In Javascript

  class Element{

    // Class Constructor
    constructor(dom){

      this.dom = dom;

      this.isMobile = (screen.width > 699) ? false : true;

    } // End Of Constructor

    // For Getting An Element
    get(identifiier){

      return document.querySelector(identifiier);

    } // End Of get()

    // For Getting Elements Of The Same Identifier
    gets(identifier){

       return document.querySelectorAll(identifier);

    } // End Of gets()

    // Gets Value Of A Field
    value(identifier){

       return this.get(identifier).value;

    } // End Of val()

    val(identifier, value){

      this.get(identifier).value = value;

    }


    span(args){

      let span = this.create('span', args.class);

      span.innerHTML = args.text;

      return span;

    }

    center(obj){
      
      let center = this.create('center', '');

      center.append(obj);

      return center;
    }

    // For Writing Inside HTML tags
    html(identifier, content){
         
       this.get(identifier).innerHTML = content;

    } // End Of html()

    removeLoader(){

      this.get('.req-loader').remove();

    }

    addLoader(args){
      let wrapper = this.create('div', 'req-loader');
      let center = this.create('center', 'load-center');
      let Loader = this.create('div', 'app-loader');

      center.appendChild(Loader);
      wrapper.append(center);

      this.get(args.view).append(wrapper);

    } // End Of Loader



    req(args, callback){

      HTTP.set(args.method, args.url, args.form).request((response) => {

        try {
            
            callback(JSON.parse(response));

        } catch(e) {
           
           this.toast({text : e.toString(), time : 4000});
           console.log(e);

        }

      }, args.bar);

    }

    toast(args){

      this.get('.toast-text').textContent = args.text;
      this.get('.app-toast').style.display = 'block';

      // Clear The Toast After 3000ms, 1000ms = 1s
      setTimeout(

        () => {

         this.get('.app-toast').style.display = 'none';
        
      }, 
      args.time);

    } // End of toast()

    // For Creating Element And Its Class
    create(name, classes){

       let Tag = document.createElement(name);

       Tag.setAttribute('class', classes);

       return Tag;

    } // End Of element()

  } // End Of Class


  const HTTP = new Http();
  // const DOM = new Element(document);
  const $ = new Element(document);