<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Prepare and execute query to get all art pieces
    $stmt = $pdo->prepare("SELECT * FROM art ORDER BY created_at DESC");
    $stmt->execute();
    
    // Fetch all records
    $arts = $stmt->fetchAll();
    
    // Return JSON response
    echo json_encode($arts);
} catch(PDOException $e) {
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error fetching art pieces: " . $e->getMessage()]);
}
?>
