<?php

class DB
{
	const DB_OPT = [
		\PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
		\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
		\PDO::ATTR_EMULATE_PREPARES   => false,
	];

	public static function connector() : \PDO
	{
		require CONFIG . '/config.php';

		$dbDsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . CHARSET;

		try {
			return  new \PDO($dbDsn, DB_LOGIN, DB_PASSWORD, self::DB_OPT);
		} catch (\PDOException $e) {
			$e->getMessage();
		}
	}
}
