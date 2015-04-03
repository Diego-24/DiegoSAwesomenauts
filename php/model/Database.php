<?php
/*cleaner and more organized code. We use classes so we can create an object*/
class Database {
	private $connection;
	private $host;
	private $username;
	private $password;
	private $database;
	public $error;

	/*Defines the constructors. Constructor is called on an object after it has been made.*/
	public function __construct($host, $username, $password, $database) {
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;

		$this->connection = new mysqli($host, $username, $password);
		/*Checking if there was an error connecting to the database.
		If there is an error the program will die*/
		if ($this->connection->connect_error) {
			die("<p>Error: " . $this->connection->connect_error . "</p>");
		}
		/*Tries to access a database that exists on mySQL server*/
		$exists = $this->connection->select_db($database);

		/*checking if we were able to connect to that database.
		Exclamation point changes it from true to false*/
		if (!$exists) {
			/*Sends a command to make a database*/
			$query = $this->connection->query("CREATE DATABASE $database");

			/*this if statement echos that the database was created*/
			if ($query) {
				echo "<p>Successfully creaated database: " . $database . "</p>";
			}

		}
		/*this else statement is echoing that my database exists*/
		else {
			echo "<p>Database already exists.</p>";

		}
	} 

	/*opens the connection*/
	public function openConnection() {
		$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
		
		/*Checking if there was an error connecting to the database.
		If there is an error the program will die*/
		if ($this->connection->connect_error) {
			die("<p>Error: " . $this->connection->connect_error . "</p>");
		}
	}

	/*statements that can be repeated. closes the connection*/
	public function closeConnection() {
		/*checks if the variable has been set or not
		or if there is something within the variable*/
		if(isset ($this->connection)) {
			$this->connection->close();
		}
	}


	public function query($string) {
		/*executes lines 19-27*/
		$this->openConnection();

		/*stores a query in a variable*/
		$query = $this->connection->query($string);
	
		if(!$query) {
			$this->error = $this->connection->error;
		}

		/*executes lines 30-36*/
		$this->closeConnection();

		return $query;
	}
}