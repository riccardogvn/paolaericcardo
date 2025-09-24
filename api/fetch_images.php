<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors',1);

// connessione
$mysqli = new mysqli("31.11.39.165","Sql1808455","Vax05o6r!!","Sql1808455_3");
if($mysqli->connect_errno){
  http_response_code(500);
  echo json_encode(["error"=>"DB: ".$mysqli->connect_error]);
  exit;
}
$mysqli->set_charset("utf8");

// query
$result = $mysqli->query(
  "SELECT username,comment,filename,moment
   FROM gallery 
   ORDER BY RAND()
   LIMIT 100"
);
$images = [];
while($row = $result->fetch_assoc()){
  $images[] = $row;
}

echo json_encode($images);
exit;
