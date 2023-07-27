<?php

use Routing\Dispatcher;

class Application
{
	public function init(): Application
	{
		require dirname(dirname(__DIR__)) . '/constant.php';
		require CONFIG . '/config.php';
		require CORE_LIBS . '/functions.php';
		require CORE_LIBS . '/AutoLoadClasses.php';

		AutoLoadClasses::load();
		PHPSettings::set();
		new ErrorHandler();
		return $this;
	}

	public function start(): Application
	{
		if (TIMER) Timer::start();

		require ROUTES . '/web.php';
		Dispatcher::routing();
		return $this;
	}

	public function stop(): void
	{
		if (TIMER) echo Timer::finish() . ' сек.';
		die();
	}
}
