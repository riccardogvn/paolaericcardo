<?php
// upload.php (REPLACE EVERYTHING WITH THIS)
header("Content-Type: application/json");

// DEBUG: SHOW ALL ERRORS CLEARLY (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ✅ 1. CONNECT TO DATABASE (your real data!)
$mysqli = new mysqli("31.11.39.165", "Sql1808455", "Vax05o6r!!", "Sql1808455_3");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "DB connection error: " . $mysqli->connect_error]);
    exit;
}
$mysqli->set_charset("utf8");

// ✅ 2. GET INPUT DATA
$username = $_POST['username'] ?? '';
$comment  = $_POST['comment'] ?? '';
$file     = $_FILES['image'] ?? null;

if (trim($username) === '' || trim($comment) === '' || !$file) {
    echo json_encode(["success" => false, "error" => "All fields are required."]);
    exit;
}

if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(["success" => false, "error" => "File upload failed."]);
    exit;
}

// ✅ 3. CHECK MIME TYPE
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime  = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
if (!in_array($mime, $allowedTypes)) {
    echo json_encode(["success" => false, "error" => "Unsupported image format."]);
    exit;
}

// ✅ 4. MOVE FILE
$uploadsDir = __DIR__ . '/../uploads';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0777, true);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$filename = uniqid('img_', true) . '.' . $ext;
$targetPath = $uploadsDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
    echo json_encode(["success" => false, "error" => "Failed to save file."]);
    exit;
}

// ✅ 5. INSERT TO DATABASE
$stmt = $mysqli->prepare("INSERT INTO gallery (username, comment, filename) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $comment, $filename);
if (!$stmt->execute()) {
    unlink($targetPath);
    echo json_encode(["success" => false, "error" => "DB error: " . $stmt->error]);
    exit;
}

echo json_encode(["success" => true]);
exit;
