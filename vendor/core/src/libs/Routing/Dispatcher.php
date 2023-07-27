<?php

namespace Routing;

class Dispatcher
{
	private const CONTROLLERS = 'Controllers\\';
	protected static $routes = [];
	private static $route = [];
	private static $request = [];
	private static $uri = '';

	public static function routing(): void
	{
		if (isset($_SERVER['REQUEST_URI']))
			self::$uri = rtrim($_SERVER['REQUEST_URI'], '/');
		else {
			throw new \Exception("не существует \$_SERVER['REQUEST_URI']", 404);
		}
		if (self::selectRoute()) {
			$controller =  self::CONTROLLERS . self::$route['controller'] . 'Controller';
		} else
			throw new \Exception('Введенный адрес ' . self::$uri . ' не существует', 404);
		if (class_exists($controller))
			$action = self::$route['action'];
		else
			throw new \Exception("Контроллер {$controller} не существует", 404);
		if (method_exists($controller, $action)) {
			$controllerClass = new $controller(self::$request);
			$controllerClass->$action();
		} else
			throw new \Exception("Метод  {$controller::$action} не существует", 404);
	}

	private static function selectRoute(): bool
	{
		$arrUrl = explode('?', self::$uri);
		foreach (self::$routes as $pattern => $value) {
			if (preg_match("#^{$pattern}$#i", $arrUrl[0], $matches)) {
				$arrValues = explode('.', $value);
				if (count($arrValues) < 2) {
					self::$route = [
						'controller' => ucfirst($arrValues[0]),
						'action' => 'index'
					];
				} else {
					self::$route = [
						'controller' => ucfirst($arrValues[0]),
						'action' => $arrValues[1]
					];
				}
				self::$request = [
					'route' => self::$route,
					'params' => $matches,
				];
				return true;
			}
		}
		return false;
	}
}
