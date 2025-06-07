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
    echo json_encode(["error" => "Artist ID is required"]);
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
    $sql = "UPDATE artist 
            SET name = :name, 
                bio = :bio, 
                year = :year, 
                instagram = :instagram 
            WHERE artist_id = :artist_id";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(":name", $data["name"]);
    $stmt->bindParam(":bio", $data["bio"] ?? null);
    $stmt->bindParam(":year", $data["year"] ?? null);
    $stmt->bindParam(":instagram", $data["instagram"] ?? null);
    $stmt->bindParam(":artist_id", $id);
    
    // Execute the statement
    $stmt->execute();
    
    // Check if any row was affected
    if ($stmt->rowCount() > 0) {
        // Return success response
        echo json_encode([
            "success" => true,
            "message" => "Artist updated successfully"
        ]);
    } else {
        // No rows affected, artist not found
        http_response_code(404);
        echo json_encode(["error" => "Artist not found"]);
    }
    
} catch(PDOException $e) {
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error updating artist: " . $e->getMessage()]);
}
?>
