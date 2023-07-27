<?php

namespace vendor\core\libs\Console\Element;
use vendor\core\libs\Console\Filer;

class NewElement
{
	private const MODEL_DB = 'DBModel.php';

	private static $name;
	private static $nameAction;

	public static function new($name, $nameAction = 'index'){
		self::$name = ucfirst($name);
		self::$nameAction = lcfirst($nameAction);
		self::createController();
		self::createModels();
		self::createView();
		self::createCSS();
#		self::createJS();
		self::createRoute();
	}
	
	private static function createController(){
		$fileName = self::$name . 'Controller.php';
		$fullName = USER . CONTROLLERS . '/' . $fileName;
		$text = '<?php' . PHP_EOL;
		$text .= '' . PHP_EOL;
		$text .= 'namespace App\\Web\\User\\Controllers;' . PHP_EOL;
		$text .= '' . PHP_EOL;
		$text .= 'use App\\Web\\User\\Controllers\\AppController;' . PHP_EOL;
		$text .= 'use App\\Web\\User\\Models\\' . self::$name . '\\' . self::$name. 'Model;' . PHP_EOL;
		$text .= '' . PHP_EOL;
		$text .= 'class ' . self::$name . 'Controller extends AppController' . PHP_EOL;
		$text .= '{' . PHP_EOL;
		$text .= '	public function ' . self::$nameAction . '()' . PHP_EOL;
		$text .= '	{' . PHP_EOL;
		$text .= '		$data = ' . self::$name . 'Model::getData();' . PHP_EOL;
		$text .= '		$title = "";' . PHP_EOL;
		$text .= '		$description = "";' . PHP_EOL;
		$text .= '		$keywords = "";' . PHP_EOL;
		$text .= '		$this->setMeta($title, $description, $keywords);' . PHP_EOL;
		$text .= '		$this->setData($data);' . PHP_EOL;
		$text .= '	}' . PHP_EOL;
		$text .= '}' . PHP_EOL;

		Filer::createFile($fullName, $text);
	}
	
	private static function createModels(){
		$modelPath = USER . MODELS . '/' .  self::$name;
		if(Filer::createDir($modelPath)){
			self::mainModel();
			self::DBModel();
		}
	}
	
	private static function mainModel(){
		$fileName = self::$name . 'Model.php';
		$fullName = USER . MODELS . '/' . self::$name . '/' . $fileName;
		$text = '<?php' . PHP_EOL;
		$text .= '' . PHP_EOL;
		$text .= 'namespace App\\Web\\User\\Models\\' . self::$name . ';' . PHP_EOL;
		$text .= '' . PHP_EOL;
		$text .= 'use App\\Web\\User\\Models\\AppModel;' . PHP_EOL;
		$text .= '' . PHP_EOL;
		$text .= 'class ' . self::$name . 'Model extends AppModel' . PHP_EOL;
		$text .= '{' . PHP_EOL;
		$text .= '	public static function getData()' . PHP_EOL;
		$text .= '	{' . PHP_EOL;
		$text .= '		$dataDB = DBModel::getDataDB();' . PHP_EOL;
		$text .= '	}' . PHP_EOL;
		$text .= '}' . PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function DBModel(){
		$fileName = 'DBModel.php';
		$fullName = USER . MODELS . '/' . self::$name . '/' . $fileName;
		$text = '<?php' . PHP_EOL;
		$text .= '' . PHP_EOL;
		$text .= 'namespace App\\Web\\User\\Models\\' . self::$name . ';'. PHP_EOL;
		$text .= '' . PHP_EOL;
		$text .= 'use App\\Web\\User\\Models\\AppModel;' . PHP_EOL;
		$text .= 'use vendor\\core\\libs\\DB;' . PHP_EOL;
		$text .= '' . PHP_EOL;
		$text .= 'class DBModel extends AppModel' . PHP_EOL;
		$text .= '{' . PHP_EOL;
		$text .= '	public static function getDataDB()' . PHP_EOL;
		$text .= '	{' . PHP_EOL;
		$text .= '		$db = DB::connector();' . PHP_EOL;
		$text .= '		$sql = ("SELECT * FROM ``");' . PHP_EOL;
		$text .= '		$stmt = $db->prepare($sql);' . PHP_EOL;
		$text .= '		$stmt->execute();' . PHP_EOL;
		$text .= '		$result = $stmt->fetchAll();' . PHP_EOL;
		$text .= '	}' . PHP_EOL;
		$text .= '}' . PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function createView(){
		$viewPath = USER . PAGES . '/' . self::$name;
		if(Filer::createDir($viewPath)){
			$fileName = self::$nameAction . '.php';
			$fullName = $viewPath . '/' . $fileName;
			$text = '<?php $data = $this->getData(); ?>' . PHP_EOL;
			$text .= '' . PHP_EOL;
			$text .= '<div id="'. lcfirst(self::$name) . '">' . PHP_EOL;
			$text .= '' . PHP_EOL;
			$text .= '</div>' . PHP_EOL;

			Filer::createFile($fullName, $text);
		}
	}

	private static function createCSS(){
		$fileName = self::$nameAction . '.css';
		$fullName = USER . PAGES . '/' . self::$name . '/' . $fileName;
		$text = '#' . lcfirst(self::$name) . '{' . PHP_EOL;
		$text .= '' . PHP_EOL;
		$text .= '}' . PHP_EOL;
		$text .= '' . PHP_EOL;

		Filer::createFile($fullName, $text);

		$importFile = CSS . '/' . 'import.css';
		$text = '' . PHP_EOL;
		$text .= '		/* ' . self::$nameAction . ' style */' . PHP_EOL; 
		$text .= '@import url("../../App/Web/User/Views/Pages/' . self::$name . '/' . lcfirst(self::$nameAction) . '.css");' . PHP_EOL; 

		Filer::fileAppend($importFile, $text);

	}

	private static function createJS(){
		$name = lcfirst(self::$name);
		$JSPath = JS_SCRIPT . '/' .  $name;
		if(Filer::createDir($JSPath)){
			$fileName = $name . '.js';
			$fullName = $JSPath . '/' . $fileName;
		#	$text = '#' . $name . '{' . PHP_EOL;
		#	$text .= '	' . PHP_EOL;
		#	$text .= '}' . PHP_EOL;
		#	$text .= '' . PHP_EOL;
			$text = 'ddd';

			Filer::createFile($fullName, $text);
		}
	}

	private static function createRoute(){
		$fullName = ROUTES . '/' . 'user.php';
		$text = '' . PHP_EOL;
		$text .= 'Router::user("/' . lcfirst(self::$name) . '/' . self::$nameAction . '", "' . lcfirst(self::$name) . '.' . self::$nameAction . '");';

		Filer::fileAppend($fullName, $text);
	}
}
