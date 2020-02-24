<?php
   class Connection{
       private $_AT_LOCALHOST_USER='user';
       private $_USER_PASSWORD='userr_passs';
       private $_DATABASE='campus_crush';
       private $_AT_ADDRESS='localhost';
       public function __CONX(){
        $_CONXX=new mysqli($this->_AT_ADDRESS,$this->_AT_LOCALHOST_USER,$this->_USER_PASSWORD,$this->_DATABASE);
          if($_CONXX){
           return $_CONXX;
          }else{
            die("Unable To Connect");
          }
       }
   };
  $_CNX=new Connection;

   //$connx = new Connection;
   //$cnx = $connx->__CONX(); mysqli_query($connx->__CONX(),"")