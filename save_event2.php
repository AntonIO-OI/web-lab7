<?php
function saveEventData() {
    // Retrieve JSON data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Define the file name
    $fileName = 'localStorage_data.json';
    file_put_contents($fileName, json_encode($data, JSON_PRETTY_PRINT));
}

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    saveEventData();
} else {
    echo json_encode(array('success' => false, 'error' => 'Invalid request method'));
}