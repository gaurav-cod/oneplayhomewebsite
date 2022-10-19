<?php

function send_payload($payload, $query)
{
   $ch = curl_init('https://client-apis.oneplay.in/client/v1/terminate_connections_to_server?'.$query);
   curl_setopt($ch, CURLOPT_POST, true);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
   curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
   curl_setopt($ch, CURLOPT_PROXY, '192.168.60.227:5128');
   curl_setopt($ch, CURLOPT_TIMEOUT, 2);
   $result = curl_exec($ch);
   curl_close($ch);
}

try
{
    if(!empty($_REQUEST["session_id"])) {
        send_payload('', 'session_type=client_token&session_id='.$_REQUEST["session_id"] );
    }

} catch(Exception $e) {}


header('Location: https://www.oneplay.in/dashboard/' . $url, true, 301);

exit();
?>

