<?php

namespace vendor\core\libs\Console\Element;
use vendor\core\libs\Console\Filer;

class ResourceElement
{
	private const MODEL_DB = 'DBModel.php';

	private static $name;



	public static function resource($name){
		self::$name = ucfirst($name);
		self::createController();
		self::createModels();
		self::createViews();
		self::createCSSs();
#		self::createJS();
#		self::createRoute();
	}

	private static function createModels(){
		$modelPath = ADMIN . MODELS . '/' .  self::$name;
		if(Filer::createDir($modelPath)){
			self::indexModel();
#			self::createModel();
#			self::storeModel();
#			self::editModel();
#			self::deleteModel();
			self::DBModel();
		}
	}

	private static function createViews(){
		$viewPath = ADMIN . PAGES . '/' . self::$name;
		if(Filer::createDir($viewPath)){
			self::indexView();
			self::createView();
			self::editView();
#			self::deleteView();
			
		}
	}

	private static function createCSSs(){
		$cssPath = ADMIN . PAGES . '/' . self::$name;
		if(is_dir($cssPath)){
			self::indexCSS();
			self::createCSS();
			self::editCSS();
#			self::deleteCSS();
			self::importCSS();
			
		}
	}
	
	private static function createController(){
		$fileName = self::$name . 'Controller.php';
		$fullName = ADMIN . CONTROLLERS . '/' . $fileName;
		$text = '<?php' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'namespace App\\Web\\Admin\\Controllers;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'use App\\Web\\Admin\\Controllers\\AppController;' . PHP_EOL;
		$text .= 'use App\\Web\\Admin\\Models\\' . self::$name . '\\' . self::$name. 'Model;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'class ' . self::$name . 'Controller extends AppController' . PHP_EOL;
		$text .= '{' . PHP_EOL;
		$text .= '	public function index()' . PHP_EOL;
		$text .= '	{' . PHP_EOL;
		$text .= '		$data = ' . self::$name . 'Model::getData();' . PHP_EOL;
		$text .= '		$title = "";' . PHP_EOL;
		$text .= '		$description = "";' . PHP_EOL;
		$text .= '		$keywords = "";' . PHP_EOL;
		$text .= '		$this->setMeta($title, $description, $keywords);' . PHP_EOL;
		$text .= '		$this->setData($data);' . PHP_EOL;
		$text .= '	}' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '	public function create()' . PHP_EOL;
		$text .= '	{' . PHP_EOL;
		$text .= '		' . PHP_EOL;
		$text .= '	}' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '	public function store()' . PHP_EOL;
		$text .= '	{' . PHP_EOL;
		$text .= '		' . PHP_EOL;
		$text .= '	}' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '	public function edit()' . PHP_EOL;
		$text .= '	{' . PHP_EOL;
		$text .= '		' . PHP_EOL;
		$text .= '	}' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '	public function update()' . PHP_EOL;
		$text .= '	{' . PHP_EOL;
		$text .= '		' . PHP_EOL;
		$text .= '	}' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '	public function delete()' . PHP_EOL;
		$text .= '	{' . PHP_EOL;
		$text .= '		' . PHP_EOL;
		$text .= '	}' . PHP_EOL;
		$text .= '}' . PHP_EOL;

		Filer::createFile($fullName, $text);
	}
	
	private static function indexModel(){
		$fileName = 'IndexModel.php';
		$fullName = ADMIN . MODELS . '/' . self::$name . '/' . $fileName;
		$text = '<?php' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'namespace App\\Web\\Admin\\Models\\' . self::$name . '\\IndexModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'use App\\Web\\Admin\\Models\\AppModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'class IndexModel extends AppModel' . PHP_EOL;
		$text .= '{' . PHP_EOL;
		$text .= '	public static function getData()' . PHP_EOL;
		$text .= '	{' . PHP_EOL;
		$text .= '		$dataDB = DBModel::getDataDB();' . PHP_EOL;
		$text .= '	}' . PHP_EOL;
		$text .= '}' . PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function createModel(){
		$fileName = 'CreateModel.php';
		$fullName = ADMIN . MODELS . '/' . self::$name . '/' . $fileName;
		$text = '<?php' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'namespace App\\Web\\Admin\\Models\\' . self::$name . '\\CreateModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'use App\\Web\\Admin\\Models\\AppModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'class CreateModel extends AppModel' . PHP_EOL;
		$text .= '{' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '}' . PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function storeModel(){
		$fileName = 'StoreModel.php';
		$fullName = ADMIN . MODELS . '/' . self::$name . '/' . $fileName;
		$text = '<?php' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'namespace App\\Web\\Admin\\Models\\' . self::$name . '\\StoreModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'use App\\Web\\Admin\\Models\\AppModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'class StoreModel extends AppModel' . PHP_EOL;
		$text .= '{' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '}' . PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function editModel(){
		$fileName = 'EditModel.php';
		$fullName = ADMIN . MODELS . '/' . self::$name . '/' . $fileName;
		$text = '<?php' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'namespace App\\Web\\Admin\\Models\\' . self::$name . '\\EditModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'use App\\Web\\Admin\\Models\\AppModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'class EditModel extends AppModel' . PHP_EOL;
		$text .= '{' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '}' . PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function updateModel(){
		$fileName = 'UpdateModel.php';
		$fullName = ADMIN . MODELS . '/' . self::$name . '/' . $fileName;
		$text = '<?php' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'namespace App\\Web\\Admin\\Models\\' . self::$name . '\\UpdateModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'use App\\Web\\Admin\\Models\\AppModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'class UpdateModel extends AppModel' . PHP_EOL;
		$text .= '{' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '}' . PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function deleteModel(){
		$fileName = 'DeleteModel.php';
		$fullName = ADMIN . MODELS . '/' . self::$name . '/' . $fileName;
		$text = '<?php' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'namespace App\\Web\\Admin\\Models\\' . self::$name . '\\DeleteModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'use App\\Web\\Admin\\Models\\AppModel;' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= 'class DeleteModel extends AppModel' . PHP_EOL;
		$text .= '{' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '}' . PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function DBModel(){
		$fileName = 'DBModel.php';
		$fullName = ADMIN . MODELS . '/' . self::$name . '/' . $fileName;
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

	private static function indexView(){
			$fileName = 'index.php';
			$fullName = ADMIN . PAGES . '/' . self::$name  . '/' . $fileName;
			$text = '<?php $data = $this->getData(); ?>' . PHP_EOL;
			$text .= PHP_EOL;
			$text .= '<div id="'. lcfirst(self::$name) . '-index">' . PHP_EOL;
			$text .= PHP_EOL;
			$text .= '</div>' . PHP_EOL;

			Filer::createFile($fullName, $text);
	}

	private static function createView(){
			$fileName = 'create.php';
			$fullName = ADMIN . PAGES . '/' . self::$name  . '/' . $fileName;
			$text = '<?php $data = $this->getData(); ?>' . PHP_EOL;
			$text .= PHP_EOL;
			$text .= '<div id="'. lcfirst(self::$name) . '-create">' . PHP_EOL;
			$text .= PHP_EOL;
			$text .= '</div>' . PHP_EOL;

			Filer::createFile($fullName, $text);
	}

	private static function editView(){
			$fileName = 'edit.php';
			$fullName = ADMIN . PAGES . '/' . self::$name  . '/' . $fileName;
			$text = '<?php $data = $this->getData(); ?>' . PHP_EOL;
			$text .= PHP_EOL;
			$text .= '<div id="'. lcfirst(self::$name) . '-edit">' . PHP_EOL;
			$text .= PHP_EOL;
			$text .= '</div>' . PHP_EOL;

			Filer::createFile($fullName, $text);
	}


	private static function indexCSS(){
		$fileName = 'index.css';
		$fullName = ADMIN . PAGES . '/' . self::$name . '/' . $fileName;
		$text = '#' . lcfirst(self::$name) . '-index {' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '}' . PHP_EOL;
		$text .= PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function createCSS(){
		$fileName = 'create.css';
		$fullName = ADMIN . PAGES . '/' . self::$name . '/' . $fileName;
		$text = '#' . lcfirst(self::$name) . '-create {' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '}' . PHP_EOL;
		$text .= PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function editCSS(){
		$fileName = 'edit.css';
		$fullName = ADMIN . PAGES . '/' . self::$name . '/' . $fileName;
		$text = '#' . lcfirst(self::$name) . '-edit {' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '}' . PHP_EOL;
		$text .= PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function deleteCSS(){
		$fileName = 'index.css';
		$fullName = ADMIN . PAGES . '/' . self::$name . '/' . $fileName;
		$text = '#' . lcfirst(self::$name) . '-delete {' . PHP_EOL;
		$text .= PHP_EOL;
		$text .= '}' . PHP_EOL;
		$text .= PHP_EOL;

		Filer::createFile($fullName, $text);
	}

	private static function importCSS(){
		$importFile = CSS . '/' . 'import.css';
		$text = PHP_EOL;
		$text .= '		/* ' . self::$name . 'resources style */' . PHP_EOL; 
		$text .= '@import url("../../App/Web/User/Views/Pages/' . self::$name . '/index.css");' . PHP_EOL; 
		$text .= '@import url("../../App/Web/User/Views/Pages/' . self::$name . '/create.css");' . PHP_EOL; 
		$text .= '@import url("../../App/Web/User/Views/Pages/' . self::$name . '/edit.css");' . PHP_EOL; 

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
