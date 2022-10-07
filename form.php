<?php

include 'index.html';
$_SESSION['post-data'] = $_POST;

$name = strip_tags($_POST['name']);
$email = strip_tags($_POST['email']);
$comment = strip_tags($_POST['comment']);

if ($_POST["submit"]) {



    if (!$_POST['name']) {
        $error = "<br />Merci d'indiquer ton prénom";
    }

    if (!$_POST['email']) {
        $error .= "<br />Merci d'indiquer ton adresse mail";
    }

    if (!$_POST['comment']) {
        $error .= "<br />Merci de rédiger un message";
    }

    if ($_POST['email'] != "" and !filter_var(
        $_POST['email'],
        FILTER_VALIDATE_EMAIL
    )) {
        $error .= "<br />Merci d'inserer un adresse mail valide";
    }

    if ($error) {
        $result = '<div class="alert alert-danger"><strong>Il y a des erreurs dans gton formulaire:</strong>' . $error . '</div>';
    } else {

        if (mail("user@email.com", "Comment from website.com", "Name: " .
            $_POST['name'] . "
                Email: " . $_POST['email'] . "
                Comment: " . $_POST['comment'])) {
            $result = '<div class="alert alert-success"><strong>Merci beaucoup ton e-card a été envoyée avec succes!</strong></div>';

            unset($_SESSION['post-data']['name']);
            unset($_SESSION['post-data']['email']);
            unset($_SESSION['post-data']['comment']);
            session_destroy();
        } else {
            $result = '<div class="alert alert-danger">Nous sommes navrés, ton mail n\' pas pu être envoyé</div>';
        }
    }
}
