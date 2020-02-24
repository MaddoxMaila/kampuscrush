<?php


   class Query{
   	private $Connection = "";
   	 function __construct(){
   	 	 require_once('C:/xampp/htdocs/kampuscrush/api/include/connect.php');
   	 	  $con = new Connection;
           $this->Connection = $con->__CONX();
   	 }
   	 public function count($sql){
   	 	 return mysqli_fetch_row(mysqli_query($this->Connection,$sql))[0];
   	 }
   	 public function row($sql){
   	 	return mysqli_fetch_assoc(mysqli_query($this->Connection,$sql));
   	 }
   	 public function rows($sql){
   	 	return mysqli_query($this->Connection,$sql);
   	 }
   	 public function insert($sql){
   	 	 if(mysqli_query($this->Connection,$sql)){
   	 	 	 return true;
   	 	 }else{
   	 	 	return false;
   	 	 }
   	 }
       public function delete($sql){
         if(mysqli_query($this->Connection,$sql)){
            return true;
         }else{
            return false;
         }
       }
   	 #Auxilliary Functions
   	 public function assoc($query){
   	 	 return mysqli_fetch_assoc($query);
   	 }
   }



?>