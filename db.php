<?php
$host = "31.11.39.165"; // o IP del server DB su Aruba
$dbname = "Sql1808455_3";
$user = "Sql1808455!!";
$pass = "Vax05o6r!!";

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  die("Connessione fallita: " . $e->getMessage());
}
?>