<?php
$mysqli = new mysqli("31.11.39.165", "Sql1808455", "Vax05o6r!!", "Sql1808455_3");

if ($mysqli->connect_error) {
  http_response_code(500);
  echo "Connessione fallita: " . $mysqli->connect_error;
  exit;
}

$name = $mysqli->real_escape_string($_POST['name']);
$email = $mysqli->real_escape_string($_POST['email']);
$guests = $mysqli->real_escape_string($_POST['guests']);
$message = $mysqli->real_escape_string($_POST['message']);

$sql = "INSERT INTO rsvp (name, email, guests, message) VALUES ('$name', '$email', '$guests', '$message')";

if ($mysqli->query($sql) === TRUE) {
  echo "redirect"; // il tuo JS fa redirect su questo
} 
?>
