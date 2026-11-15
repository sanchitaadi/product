<?php
/**
 * Contact Message API Endpoint
 * Handles contact form submissions
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$payload = getRequestPayload();
$res = saveContactMessage($payload);
echo json_encode($res, JSON_UNESCAPED_UNICODE);
exit;
