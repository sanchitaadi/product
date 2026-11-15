<?php
/**
 * Reviews API Endpoint
 * Handles fetching approved reviews and submitting new feedback
 */
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/db.php';

$payload = getRequestPayload();
$action = $payload['action'] ?? 'list';

switch ($action) {
    case 'submit':
        $res = submitReview($payload);
        echo json_encode($res, JSON_UNESCAPED_UNICODE);
        break;

    case 'list':
    default:
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
        $reviews = getApprovedReviews($limit);
        echo json_encode([
            'success' => true,
            'reviews' => $reviews,
            'total' => count($reviews)
        ], JSON_UNESCAPED_UNICODE);
        break;
}
exit;
