<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');

try {
    // Prepare and execute query to get all artists
    $stmt = $pdo->prepare("SELECT * FROM artist ORDER BY name");
    $stmt->execute();
    
    // Fetch all records
    $artists = $stmt->fetchAll();
    
    // Return JSON response
    echo json_encode($artists);
} catch(PDOException $e) {
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error fetching artists: " . $e->getMessage()]);
}
?>
