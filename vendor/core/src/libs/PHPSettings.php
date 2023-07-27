<?php

class PHPSettings
{
	public static function set() :void
	{
		if (PHPINI) die(phpinfo());

		if (DEBUG) {
			ini_set('error_reporting', E_ALL);
			ini_set('display_errors', 1);
			ini_set('display_startup_errors', 1);
		}
	}
}
