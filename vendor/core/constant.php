<?php

define('ROOT', dirname(dirname(__DIR__)));
define('APP', ROOT . '/app');
define('CONTROLLERS', APP . '/Controllers');
define('MODELS', APP . '/Models');
define('CORE', ROOT . '/vendor/core');
define('CORE_SRC', CORE . '/src');
define('CORE_LIBS', CORE_SRC . '/libs');
define('PUBLIC_PATH', ROOT . '/public');
define('CACHE', ROOT . '/tmp/cache');
define('ROUTES', ROOT . '/routes');
define('CONFIG', ROOT . '/config');
define('RES', ROOT . '/resources');
define('RES_SRC', RES . '/src');
define('PARTIALS', RES_SRC . '/partials');
define('PAGES', RES_SRC . '/pages');
define('LAYOUTS', RES_SRC . '/layouts');
define('INCLUDES', RES_SRC . '/includes');
define('COMMON', RES_SRC . '/common');

require_once CONFIG . '/constant.php';