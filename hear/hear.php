
<?php

//ログファイルの指定
define('DEBUG','../debug.txt');

//リクエストの取得
$input=file_get_contents('php://input');

//ログファイルの出力
file_put_contents(DEBUG.$input);

?>

