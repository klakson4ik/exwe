<?php

class AutoLoadClasses
{
	public static function load(): void
	{
		$loadMap = self::getLoadMap();
		spl_autoload_register(function ($class) use ($loadMap) {
			foreach ($loadMap as $path) {
				$file =  ROOT . '/' . $path . '/' . str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
				if (file_exists($file))
					require_once $file;
			}
		});
	}

	private static function getLoadMap() :array
	{
		$loadMapCore = require_once CORE . '/autoload.php';
		$loadMap = require_once CONFIG . '/autoload.php';
		if (is_array($loadMap) && $loadMap) {
			return array_merge($loadMapCore, $loadMap);
		}
		return $loadMapCore;
	}
}
