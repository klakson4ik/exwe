<head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
    <title><?= $meta['title'] ?? '' ?></title>
    <meta name="viewport" content="width=device-width">
    <meta name="format-detection" content="telephone=no">

    <script type="text/javascript" src="<?= $assets['script'] ?>"></script>

    <link rel="stylesheet" type="text/css" href="<?= $assets['style'] ?>" media="all">

    <?= View::include('favicon') ?>

    <meta name="description" content="<?= $meta['description'] ?? '' ?>">
    <meta name="keywords" content="<?= $meta['keywords'] ?? '' ?>">

    <link rel="canonical" href="<?= Url::getFull() ?>">
    <?= View::include('og', [
        'meta' => $meta,
    ]) ?>

    <!-- <meta name="csrf_token" content="{{ csrf_token() }}"> -->
</head>