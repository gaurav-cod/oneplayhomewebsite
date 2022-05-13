<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<?php
$cURLConnection = curl_init();

$game_id    = "1";
$resolution = "1920x1080";

if(!empty($_GET["game_id"])) {
    $game_id = $_GET["game_id"];   
}

if(!empty($_GET["resolution"])) {
    $resolution = $_GET["resolution"];   
}


curl_setopt($cURLConnection, CURLOPT_URL, 'https://svrdev.oneplay.in/application_services/frontend/start/game/'.$game_id."?resoulution=".$resolution);
curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);
curl_setopt($cURLConnection, CURLOPT_PROXY, '192.168.60.227:5128');
curl_setopt($cURLConnection, CURLOPT_VERBOSE, false);  
curl_setopt($cURLConnection, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($cURLConnection, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($cURLConnection, CURLOPT_POST, 1);

$data = curl_exec($cURLConnection);
curl_close($cURLConnection);


$data = json_decode($data, true);

if(isset($data["data"]["session_signature"])) {
    echo '<script>$(document).ready(function() { window.location="oneplay:key?'.$data["data"]["session_signature"].'"; })</script>';
    echo '<a href="app?payload='.$data["data"]["session_signature"].'">click here to launch if it does not auto-launch </script>';
}

?>
