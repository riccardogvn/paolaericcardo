<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors',1);

// connessione
$mysqli = new mysqli("31.11.39.165","Sql1808455","Vax05o6r!!","Sql1808455_3");
if($mysqli->connect_errno){
  http_response_code(500);
  echo json_encode(["success"=>false,"error"=>"DB: ".$mysqli->connect_error]);
  exit;
}
$mysqli->set_charset("utf8");

// prendo i campi
$username = trim($_POST['username'] ?? '');
$comment  = trim($_POST['comment']  ?? '');
$moment   = trim($_POST['moment']   ?? '');
$files    = $_FILES['images']      ?? null;

// validazione
if(!$username || !$comment || !$moment || !$files){
  echo json_encode(["success"=>false,"error"=>"Dati mancanti"]);
  exit;
}

$allowed = ['image/jpeg','image/png','image/gif'];
$res = ["success"=>true];

// loop sui file
foreach($files['tmp_name'] as $i => $tmp){
  if($files['error'][$i] !== UPLOAD_ERR_OK){
    $res=["success"=>false,"error"=>"Errore file #{$i}"];
    break;
  }
  $mime = mime_content_type($tmp);
  if(!in_array($mime,$allowed)){
    $res=["success"=>false,"error"=>"Formato non valido #{$i}"];
    break;
  }
  // sposta
  $ext = strtolower(pathinfo($files['name'][$i],PATHINFO_EXTENSION));
  $fn  = uniqid("img_",true).".".$ext;
  $dst = __DIR__."/../uploads/".$fn;
  if(!move_uploaded_file($tmp,$dst)){
    $res=["success"=>false,"error"=>"Salvataggio fallito #{$i}"];
    break;
  }
  // inserimento DB
  $stmt = $mysqli->prepare(
    "INSERT INTO gallery (username,comment,filename,moment)
     VALUES (?,?,?,?)"
  );
  $stmt->bind_param("ssss",$username,$comment,$fn,$moment);
  if(!$stmt->execute()){
    @unlink($dst);
    $res=["success"=>false,"error"=>"DB: ".$stmt->error];
    break;
  }
}

echo json_encode($res);
exit;
