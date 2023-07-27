<?php

class ErrorHandler
{
   public function __construct()
   {
      set_exception_handler([$this, 'exceptionHandler']);
   }

   public function exceptionHandler($e): void
   {
      $this->logErrors($e->getMessage(), $e->getFile(), $e->getLine());
      $this->displayError('Исключение', $e->getMessage(), $e->getFile(), $e->getLine(), $e->getCode());
   }

   private function logErrors($message = '', $file = '', $line = ''): void
   {
      if (LOG) {
         error_log("[" . date('Y-m-d H:i:s') . "] Текст ошибки: {$message} |
      файл: {$file} | Строка: {$line} \n==================\n", 3, ROOT . '/tmp/logs/errors.log');
      }
   }


   private function displayError($errno, $errstr, $errfile, $errline, $response = 404): void
   {
      http_response_code($response);
      if ($response == 404 && !DEBUG) {
         require PUBLIC_PATH . '/errors/404.php';
         die;
      }
      if (DEBUG)
         require PUBLIC_PATH . '/errors/dev.php';
      else
         require PUBLIC_PATH . '/errors/prod.php';
   }
}
