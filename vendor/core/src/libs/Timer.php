<?php

class Timer
{
    /**
     * @var float время начала выполнения скрипта
     */
    private static $start = .0;
	 private const NUMBER_OF_DECIMAL_PLACES = 6;

    /**
     * Начало выполнения
     */
    static function start() :void
    {
        self::$start = microtime(true);
    }

    /**
     * Разница между текущей меткой времени и меткой self::$start
     * @return float
     */
    static function finish() :float
    {
        return round(microtime(true) - self::$start, self::NUMBER_OF_DECIMAL_PLACES);
    }
}
