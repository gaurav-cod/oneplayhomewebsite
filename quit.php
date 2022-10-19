<?php

function send_payload($payload)
{
   $ch = curl_init('https://client-apis.oneplay.in/services/v1/terminate_connections_to_server');
   curl_setopt($ch, CURLOPT_POSTFIELDS, $payload );
   curl_setopt($ch, CURLOPT_POST, true);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
   curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
   curl_setopt($ch, CURLOPT_TIMEOUT, 3);
   $result = curl_exec($ch);
   curl_close($ch);
}

try
{
    if(!empty($_REQUEST["session_id"])) {
        send_payload( array('client_token' => $_REQUEST["session_id"]) );
    }

} catch(Exception $e) {}


header('Location: https://www.oneplay.in/dashboard/' . $url, true, 301);

exit();
?>
