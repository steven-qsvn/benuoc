<?php
// Get all members from JSON file
$members = json_decode(file_get_contents('data/data.json'))->members;
// Get a random key of the array
$randomKey = rand(0, count($members));
// We update the statistics
$members[$randomKey]->times++;
// And the put updated info into JSON file
//file_put_contents('data/data.json', json_encode(array('members' => $members)));

echo json_encode(array('data' => array(
    'key' => $randomKey,
    'members' => $members[$randomKey]
)));

exit;
