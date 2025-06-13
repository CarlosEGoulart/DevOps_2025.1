<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

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
    echo json_encode(["error" => "Exhibition name is required"]);
    exit;
}

try {
    // Start transaction
    $pdo->beginTransaction();
    
    // Prepare the SQL statement for exhibition
    $sql = "INSERT INTO exhibition (name, description) 
            VALUES (:name, :description)";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(":name", $data["name"]);
    $stmt->bindParam(":description", $data["description"] ?? null);
    
    // Execute the statement
    $stmt->execute();
    
    // Get the ID of the newly created exhibition
    $exhibitionId = $pdo->lastInsertId();
    
    // If artworks are provided, link them to the exhibition
    if (isset($data["artworks"]) && is_array($data["artworks"]) && count($data["artworks"]) > 0) {
        $artSql = "INSERT INTO exhibition_art (exhibition_id, art_id) VALUES (:exhibition_id, :art_id)";
        $artStmt = $pdo->prepare($artSql);
        
        foreach ($data["artworks"] as $artId) {
            $artStmt->bindParam(":exhibition_id", $exhibitionId);
            $artStmt->bindParam(":art_id", $artId);
            $artStmt->execute();
        }
    }
    
    // Commit transaction
    $pdo->commit();
    
    // Return success response
    echo json_encode([
        "success" => true,
        "message" => "Exhibition created successfully",
        "id" => $exhibitionId
    ]);
    
} catch(PDOException $e) {
    // Rollback transaction on error
    $pdo->rollBack();
    
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error creating exhibition: " . $e->getMessage()]);
}
?>
