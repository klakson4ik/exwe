<?php
require_once '../vendor/core/src/libs/Application.php';
$application = new Application();
$application->init()->start()->stop();
