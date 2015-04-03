<?php
	require_once(__DIR__ . "/database.php");
	session_start();
	session_regenerate_id(true);

	/*Sets the path that leads to PHPBasics*/
	$path = "/DiegoSAwesomenauts/php/";
	
	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "awesomenauts_db";

	/*checks if it has been set or not*/
	if(!isset($_SESSION["connection"])) {
		/*stores the object mysqli*/
		$connection = new Database($host, $username, $password, $database);
		/*assigns the connection variable to the session variable*/
		$_SESSION["connection"] = $connection;
	}
	