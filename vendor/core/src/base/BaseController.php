<?php

class BaseController
{
   private $data = [];

   public function __construct(array $request)
   {
      $this->data = $request;
      $name = lcfirst($request['route']['controller']);
      $this->data['view_name'] = $name;
      $this->data['assets'] = [
         'style' => $name . '.css',
         'script' => $name . '.js',
      ];
      $this->data['layout'] = LAYOUT_TYPE;
   }

   public function setMeta(string $title = '', string $description = '', string $keywords = '') :void
   {
      $this->data['meta'] =  [
         'title' => $title,
         'description' => $description,
         'keywords' => $keywords
      ];
   }

   protected function setData(array $data) :void
   {
      $this->data['content'] = $data;
   }

   protected function setViewName(string $name) :void
   {
      $this->data['view_name'] = $name;
   }

   protected function setAssets(string $name) :void
   {
      $this->data['assets'] = [
         'style' => $name . '.css',
         'script' => $name . '.js'
      ];
   }

   protected function setStyle(string $name) :void
   {
      $this->data['assets']['style'] = $name . '.css';
   }

   protected function setScript(string $name) :void
   {
      $this->data['assets']['script'] = $name . '.js';
   }

   protected function setLayout(string $name) :void
   {
      $this->data['layout'] = $name;
   }


   protected function getData() :array
   {
      return $this->data;
   }

   public function isAjax() :bool
   {
      return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest';
   }
}
