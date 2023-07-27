<?php

class Url
{
	public static function getFull()
	{
		return ($_SERVER['HTTPS'] ?? 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	}
}
