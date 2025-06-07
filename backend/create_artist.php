<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use POST."]);
    exit;
}

// Get the posted data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (!isset($data["name"]) || empty($data["name"])) {
    http_response_code(400);
    echo json_encode(["error" => "Name is required"]);
    exit;
}

try {
    // Prepare the SQL statement
    $sql = "INSERT INTO artist (name, bio, year, instagram) 
            VALUES (:name, :bio, :year, :instagram)";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(":name", $data["name"]);
    $stmt->bindParam(":bio", $data["bio"] ?? null);
    $stmt->bindParam(":year", $data["year"] ?? null);
    $stmt->bindParam(":instagram", $data["instagram"] ?? null);
    
    // Execute the statement
    $stmt->execute();
    
    // Get the ID of the newly created record
    $newId = $pdo->lastInsertId();
    
    // Return success response
    echo json_encode([
        "success" => true,
        "message" => "Artist created successfully",
        "id" => $newId
    ]);
    
} catch(PDOException $e) {
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error creating artist: " . $e->getMessage()]);
}
?>
