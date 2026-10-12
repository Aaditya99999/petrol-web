<?php
/*
 * Contact + newsletter form handler for Hostinger (PHP mail()).
 * Change $to below if enquiries should go to a different inbox.
 */

$to = 'shivambiolumina@gmail.com';
$siteName = 'Shivam Biolumina Pvt Ltd';

header('Content-Type: application/json; charset=utf-8');

function respond($ok, $message, $code = 200) {
    http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $message]);
    exit;
}

function clean($value) {
    $value = trim((string) $value);
    // Strip CR/LF so values cannot inject extra mail headers.
    return str_replace(["\r", "\n", "%0a", "%0d"], ' ', $value);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

// Honeypot: real visitors never see or fill this field.
if (!empty($_POST['website'])) {
    respond(true, 'Thank you!');
}

$type = isset($_POST['form_type']) && $_POST['form_type'] === 'newsletter' ? 'newsletter' : 'contact';
$email = clean($_POST['email'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

$host = preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'localhost');
$host = preg_replace('/[^a-z0-9.\-]/i', '', $host);
$from = 'noreply@' . $host;

if ($type === 'newsletter') {
    $subject = "New newsletter subscriber - $siteName";
    $body = "A new visitor subscribed to the newsletter.\n\nEmail: $email\n";
} else {
    $name = clean($_POST['name'] ?? '');
    $phone = clean($_POST['phone'] ?? '');
    $message = trim((string) ($_POST['message'] ?? ''));

    if ($name === '' || $message === '') {
        respond(false, 'Please fill in all required fields.', 422);
    }
    if (mb_strlen($message) > 5000) {
        respond(false, 'Message is too long.', 422);
    }

    $subject = "New website enquiry from $name";
    $body = "You received a new enquiry from the website contact form.\n\n"
          . "Name: $name\n"
          . "Email: $email\n"
          . "Phone: " . ($phone !== '' ? $phone : '-') . "\n\n"
          . "Message:\n$message\n";
}

$headers = [
    'From: ' . $siteName . ' <' . $from . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

if (mail($to, $encodedSubject, $body, implode("\r\n", $headers), '-f' . $from)) {
    respond(true, $type === 'newsletter' ? 'Thank you for subscribing!' : 'Message sent! We will get back to you soon.');
}

respond(false, 'Sorry, your message could not be sent. Please email or WhatsApp us directly.', 500);
