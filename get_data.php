<?php
// Read data from the JSON file and send it as a JSON response
$fileName = isset($_GET['filename']) ? $_GET['filename'] : 'event_data.json';

if (file_exists($fileName)) {
    $fileContents = file_get_contents($fileName);
    $jsonData = json_decode($fileContents, true);

    // Send the JSON response to the JavaScript
    header('Content-Type: application/json');
    echo json_encode($jsonData);
} else {
    // Handle the case when the file doesn't exist
    echo json_encode(['error' => 'File not found']);
}