<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use POST."]);
    exit;
}

// Get the posted data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (!isset($data["title"]) || empty($data["title"])) {
    http_response_code(400);
    echo json_encode(["error" => "Title is required"]);
    exit;
}

try {
    // Prepare the SQL statement
    $sql = "INSERT INTO art (title, description, year, url_image, artist_id) 
            VALUES (:title, :description, :year, :url_image, :artist_id)";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(":title", $data["title"]);
    $stmt->bindParam(":description", $data["description"] ?? null);
    $stmt->bindParam(":year", $data["year"] ?? null);
    $stmt->bindParam(":url_image", $data["url_image"] ?? null);
    $stmt->bindParam(":artist_id", $data["artist_id"] ?? null);
    
    // Execute the statement
    $stmt->execute();
    
    // Get the ID of the newly created record
    $newId = $pdo->lastInsertId();
    
    // Return success response
    echo json_encode([
        "success" => true,
        "message" => "Art piece created successfully",
        "id" => $newId
    ]);
    
} catch(PDOException $e) {
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error creating art piece: " . $e->getMessage()]);
}
?>
