<?php

namespace Routing;

class Route extends Dispatcher
{

	public static function get(array $routes) :void
	{
		foreach ($routes as $regexp => $route) {
			self::$routes[$regexp] = $route;
		}
	}
}
