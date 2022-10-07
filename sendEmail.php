<?php
require_once 'mail.php';
//Configure Json reponse
$response = [
    
    'top_err' => '',
    'top_success' => '',
    'name_err' => '',
    'from_err' => '',
    'to_err' => '',
    'subject_err' => '',
    'message_err' => '',
];


$contentType = isset($_SERVER['CONTENT_TYPE']) ?  trim($_SERVER['CONTENT_TYPE']) : '';

if ($contentType == 'application/json') {
    $content = trim(file_get_contents(('php://input')));

    //convert content into PHP Array
    $decoded = json_decode($content, true);
    if (is_array($decoded)) {

        // Sanitize Input Data
        // foreach ($decoded as $name => $value) {
        //     $decoded[$name] = trim(filter_var($value, FILTER_SANITIZE_EMAIL));
        // }

        //Error checking
        if (!($decoded['nom'])) {
            $response['name_err'] = 'Ce champ est obligatoire';
        }
        if (!($decoded['from'])) {
            $response['from_err'] = 'Ce champ est obligatoire';
        } else if (!filter_var($decoded['from'], FILTER_VALIDATE_EMAIL)) {
            $response['from_err'] = "Merci d'inserer un adresse mail valide";
        }

        if (!($decoded['to'])) {
            $response['to_err'] = 'Ce champ est obligatoire';
        } else if (!filter_var($decoded['to'], FILTER_VALIDATE_EMAIL)) {
            $response['to_err'] = "Merci d'inserer un adresse mail valide";
        }

        if (!($decoded['subject'])) {
            $response['subject_err'] = 'Ce champ est obligatoire';
        }

        //Can't send the email if we already have a response to show
        foreach ($response as $type => $message) {
            if (!empty($response[$type])) {
                exit(json_encode($response));
            }
        }
        //SEND MAIL
        try {

            // Set the expediteur's name
            $email->nom = $decoded['nom'];
            // Set the "From address"
            $email->from($decoded['from']);

            // Set the "From address"
            $email->to($decoded['to']);

            // Set a "subject"
            $email->subject($decoded['subject']);

            // Set the plain-text "Body"
            // $email->html('<p>' . $decoded['message'] . '</p>');

            // Set HTML "Body"
            $email->html('Cette e-card vous a été envoyée par ' . $decoded['nom'] . '<br>E-card:<br><img src="' . $decoded['pic'] . '" width="200" height="200"> <p> </br> <p>L\'artiste vous a également écrit un message:<br>' . $decoded['message'] . '</p>" <br>Vous allez recevoir d\'autres jolies E-Cards<br> Cordialement, </br> Emanuela Rossetti ');
            if (isset($_POST['xmailcopy'])) {
                $email->cc($decoded['from']);
                $email->bcc($decoded['from']);
                $email->addCc($decoded['from']);
            }

            // Add an "Attachment"
            // $email->attachFromPath('/path/to/example.txt');
            //$email->attachFromPath($decoded['pic']);

            // Add an "Image"
            // $email->embed(fopen('/path/to/mailor.jpg', 'r'), 'ecard');
            //$email->embed(fopen('blob:http://localhost/' . $decoded['pic'], 'r'), 'nature');

            //C:\wamp64\www\OLIVIER_JAVASCRIPT\ProjetCanvasAjaxPhPBdd\javascript-canvas-painting\img
            // Send the message
            $mailer->send($email);
        } catch (Exception $e) {

            $response['top_err'] = "Nous sommes désolés, il y a eu un problème avec l'envoie de votre mail";
            exit(json_encode($response));
        }

        //Success response
        $response['top_success'] = 'Votre mail a été envoyé';
        exit(json_encode($response));
    }
}
