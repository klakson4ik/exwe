<html>
<?= View::include('head', [
    'meta' => $meta,
    'assets' => $assets
]) ?>

<body class="b-wrapper">
    <div class="b-wrapper__header">
        <?= View::common('header') ?>
    </div>
    <div class="b-wrapper__content"><?= $page; ?></div>
    <div class="b-wrapper__footer">
        <?= View::common('footer') ?>
    </div>
</body>

</html>