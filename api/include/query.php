<?php


   class Query{
   	private $Connection = "";
   	 function __construct(){
   	 	 require_once('C:/xampp/htdocs/kampuscrush/api/include/connect.php');
   	 	  $con = new Connection;
           $this->Connection = $con->__CONX();
   	 }

       public function getConnection(){
         return $this->Connection;
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
   	 	 return (mysqli_query($this->Connection,$sql) ? true : false);
   	 }
       public function lastId($con){

         return mysqli_insert_id($con);

       }
       public function delete($sql){

         return (mysqli_query($this->Connection,$sql) ? true : false); 

       }
   	 #Auxilliary Functions
   	 public function assoc($query){
   	 	 return mysqli_fetch_assoc($query);
   	 }
   }



?>