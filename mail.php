<?php
require_once './vendor/autoload.php';

const MAILER_DSN = 'smtp://ef94eec01db880:a810db0d4ac4e4@smtp.mailtrap.io:2525?encryption=tls&auth_mode=login';

use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email;



// Create a Transport object
$transport = Transport::fromDsn(MAILER_DSN);

// Create a Mailer object
$mailer = new Mailer($transport);

//Create an Email object
$email = (new Email());

// // Set the "From address"
// $email->from('expediteur@example.test');

// // Set the "From address"
// $email->to('recepient@example.test');

// // Set a "subject"
// $email->subject('Demo message using the Symfony Mailer library.');

// // Set the plain-text "Body"
// $email->text('This is the plain text body of the message.\nThanks,\nAdmin');

// // Set HTML "Body"
// $email->html('This is the HTML version of the message.<br>Example of inline image:<br><img src="cid:nature" width="200" height="200"><br>Thanks,<br>Admin');

// // Add an "Attachment"
// $email->attachFromPath('/path/to/example.txt');

// // Add an "Image"
// $email->embed(fopen('/path/to/mailor.jpg', 'r'), 'nature');

// // Send the message
// $mailer->send($email);
