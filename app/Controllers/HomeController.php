<?php

namespace Controllers;

use Response;

class HomeController extends Controller
{
	public function index()
	{
		$title = 'Test';
		$keywords = 'test page';
		$description = 'hellod frieand';
		$this->setMeta($title, $keywords, $description);
		$this->setData([
			'test' => 'hello',
		]);

		Response::render($this->getData());
	}
}
