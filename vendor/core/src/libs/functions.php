<?php

   function vd($arr)
   {
      echo '<pre>' . print_r($arr, true) . '</pre>';
   }

   function dd($arr)
   {
      die('<pre>' . print_r($arr, true) . '</pre>');
   }


   function redirect($http = false)
   {
      if($http)
         $redirect = $http;
      else
         $redirect = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : PATH;
      header("Location: $redirect");
      exit;
   }
