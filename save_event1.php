<?php
function saveEventData() {
    // Retrieve JSON data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Define the file name
    $fileName = 'event_data.json';

    // Read existing data from the file
    $existingData = [];

    if (file_exists($fileName)) {
        $fileContents = file_get_contents($fileName);
        $existingData = json_decode($fileContents, true);

        if (!is_array($existingData)) {
            $existingData = []; // Initialize as an empty array if invalid JSON
        }
    }

    $existingData[] = $data;

    // Write the updated data back to the file
    file_put_contents($fileName, json_encode($existingData, JSON_PRETTY_PRINT));
}

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sample usage, you should replace these values with the actual data you want to save
    $eventNumber = $_POST['eventNumber'];
    $time = $_POST['time'];
    $message = $_POST['message'];

    // Save event data
    saveEventData($eventNumber, $time, $message);
} else {
    echo json_encode(array('success' => false, 'error' => 'Invalid request method'));
}
