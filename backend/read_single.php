<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');

// Check if the request method is GET
if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use GET."]);
    exit;
}

// Get the ID from the URL
$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Art ID is required"]);
    exit;
}

try {
    // Prepare and execute query to get the art piece
    $stmt = $pdo->prepare("SELECT * FROM art WHERE art_id = :art_id");
    $stmt->bindParam(":art_id", $id);
    $stmt->execute();
    
    // Fetch the record
    $art = $stmt->fetch();
    
    if ($art) {
        // Return JSON response
        echo json_encode($art);
    } else {
        // Art piece not found
        http_response_code(404);
        echo json_encode(["error" => "Art piece not found"]);
    }
} catch(PDOException $e) {
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error fetching art piece: " . $e->getMessage()]);
}
?>
