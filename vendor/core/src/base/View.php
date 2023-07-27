<?php

class View
{
   public static function include(string $template, array $data = []): void
   {
      if ($data) {
         extract($data);
      }
      unset($data);
      include_once INCLUDES .  '/' . $template . '.php';
   }

   public static function partial(string $template, array $data = []): void
   {
      if ($data) {
         extract($data);
      }
      unset($data);
      include PARTIALS .  '/' . $template . '/' .  $template .  '.php';
   }

   public static function common(string $template, array $data = []): void
   {
      if ($data) {
         extract($data);
      }
      unset($data);
      include COMMON .  '/' . $template. '/' .  $template .  '.php';
   }

   public static function any(string $template, array $data = []): void
   {
      if ($data) {
         extract($data);
      }
      unset($data);
      include RES_SRC .  '/' . $template . '.php';
   }

   public static function page(string $template, array $content) :void
   {
      if ($content) {
         extract($content);
      }
      unset($content);
      require_once PAGES .  '/' . $template . '/' .  $template .  '.php';
   }

   public static function layout(string $template, array $data = []): void
   {
      if ($data) {
         extract($data);
      }
      unset($data);
      require_once LAYOUTS .  '/' . $template . '/' .  $template .  '.php';
   }
}
