<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$to = "info@thestriveads.com";
$formType = isset($_POST['formType']) ? strip_tags(trim($_POST['formType'])) : 'Website Submission';
$userEmail = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : $to;

$subject = "New Submission: " . $formType;
$htmlContent = "<h2 style='color:#333; font-family:sans-serif;'>New $formType Submission</h2><br/><table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse; font-family:sans-serif;'>";

// Collect all POST fields except formType
foreach ($_POST as $key => $value) {
    if ($key === 'formType') continue;
    // Prettify key name
    $cleanKey = htmlspecialchars(ucfirst(preg_replace('/(?<!^)[A-Z]/', ' $0', $key)));
    $cleanValue = nl2br(htmlspecialchars(trim($value)));
    $htmlContent .= "<tr><td style='background:#f4f4f4;'><strong>{$cleanKey}</strong></td><td>{$cleanValue}</td></tr>";
}
$htmlContent .= "</table><br/><p style='color:#777;font-size:12px;'>Sent automatically from The Strive Ads Website.</p>";

// Define boundary for multipart email
$boundary = md5("sanitized" . time());

// Headers
$headers = "From: noreply@thestriveads.com\r\n"; 
$headers .= "Reply-To: {$userEmail}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

// Multipart body starts here
$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $htmlContent . "\r\n\r\n";

// Handle file attachment natively if exists
if (isset($_FILES['resume']) && $_FILES['resume']['error'] == UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['resume']['tmp_name'];
    $fileName = preg_replace("/[^a-zA-Z0-9\.\-\_]/", "", $_FILES['resume']['name']);
    $fileSize = $_FILES['resume']['size'];
    $fileType = $_FILES['resume']['type'];

    // 5MB limit
    if ($fileSize > 5242880) { 
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "File size exceeds 5MB limit."]);
        exit;
    }

    $fileContent = file_get_contents($fileTmpPath);
    $fileContentEncoded = chunk_split(base64_encode($fileContent));

    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: {$fileType}; name=\"{$fileName}\"\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$fileName}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= $fileContentEncoded . "\r\n\r\n";
}

$body .= "--{$boundary}--";

// Send email natively via server
if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server mail configuration error. Could not send."]);
}
?>
