<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');

// Check if the request method is PUT
if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use PUT."]);
    exit;
}

// Get the ID from the URL
$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Art ID is required"]);
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
    $sql = "UPDATE art 
            SET title = :title, 
                description = :description, 
                year = :year, 
                url_image = :url_image, 
                artist_name = :artist_name 
            WHERE art_id = :art_id";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(":title", $data["title"]);
    $stmt->bindParam(":description", $data["description"] ?? null);
    $stmt->bindParam(":year", $data["year"] ?? null);
    $stmt->bindParam(":url_image", $data["url_image"] ?? null);
    $stmt->bindParam(":artist_name", $data["artist_name"] ?? null);
    $stmt->bindParam(":art_id", $id);
    
    // Execute the statement
    $stmt->execute();
    
    // Check if any row was affected
    if ($stmt->rowCount() > 0) {
        // Return success response
        echo json_encode([
            "success" => true,
            "message" => "Art piece updated successfully"
        ]);
    } else {
        // No rows affected, art piece not found
        http_response_code(404);
        echo json_encode(["error" => "Art piece not found"]);
    }
    
} catch(PDOException $e) {
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error updating art piece: " . $e->getMessage()]);
}
?>
