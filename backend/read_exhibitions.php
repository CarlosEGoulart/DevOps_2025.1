<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Prepare and execute query to get all exhibitions
    $stmt = $pdo->prepare("SELECT * FROM exhibition ORDER BY name");
    $stmt->execute();
    
    // Fetch all exhibitions
    $exhibitions = $stmt->fetchAll();
    
    // For each exhibition, get its associated artworks
    foreach ($exhibitions as &$exhibition) {
        $artQuery = $pdo->prepare("
            SELECT a.*, ea.exhibition_art_id 
            FROM art a
            JOIN exhibition_art ea ON a.art_id = ea.art_id
            WHERE ea.exhibition_id = :exhibition_id
        ");
        $artQuery->bindParam(":exhibition_id", $exhibition['exhibition_id']);
        $artQuery->execute();
        $exhibition['artworks'] = $artQuery->fetchAll();
    }
    
    // Return JSON response
    echo json_encode($exhibitions);
} catch(PDOException $e) {
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error fetching exhibitions: " . $e->getMessage()]);
}
?>
