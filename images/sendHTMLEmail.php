<?php 
    //change this to your email. 
    $to = "richardl@mercerbell.com.au";
    $from = "richardlama@gmail.com";
    $subject = "Hello! This is HTML email";

    //begin of HTML message 
    $message ="
<html> 
  <body> 
    <p style=\"text-align:center;height:100px;background-color:#abc;border:1px solid #456;border-radius:3px;padding:10px;\">
        <b>I am receiving HTML email</b>
        <br/><br/><br/><a style=\"text-decoration:none;color:#246;\" href=\"www.example.com\">example</a>
    </p>
    <br/><br/>Now you Can send HTML Email
  </body>
</html>";
   //end of message 
    $headers  = "From: $from\r\n"; 
    $headers .= "Content-type: text/html\r\n";

    //options to send to cc+bcc 
    //$headers .= "Cc: [email]maa@p-i-s.cXom[/email]"; 
    //$headers .= "Bcc: [email]email@maaking.cXom[/email]"; 

    // now lets send the email. 
    mail($to, $subject, $message, $headers); 

    echo "Message has been sent....!"; 
?>