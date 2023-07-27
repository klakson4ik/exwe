<?php

class Response
{
   public static function render(array $arrData = []): void
   {
      ob_start();
      View::page($arrData['view_name'], [
         'data' => $arrData['content'],
      ]);
      $page = ob_get_clean();

      View::layout($arrData['layout'], [
         'page' => $page,
         'meta' => $arrData['meta'],
         'assets' => $arrData['assets']
      ]);
   }
}
