<?php
/*creates today's date*/
$date = new DateTime("today");
/*creates today"s time*/
$time = new DateTime('America/Los_Angeles');
/*echos the date and time*/
echo $date->format("M/D" . " " . "d/Y") . " at " . $time->format("h:i");
?>