<?php
// Get the filename from the query parameters
$filename = isset($_GET['filename']) ? $_GET['filename'] : 'event_data.json';

// Check if the file exists before attempting to clear its contents
if (file_exists($filename)) {
    // Open the file in write mode, truncating the file to zero length (clearing contents)
    $fileHandle = fopen($filename, 'w');

    if ($fileHandle !== false) {
        // Close the file handle
        fclose($fileHandle);
        echo "File contents cleared successfully.";
    } else {
        echo "Error clearing file contents.";
    }
} else {
    echo "File does not exist.";
}