<?php
header("content-type:application/json; charset:utf-8");
date_default_timezone_set("Asia/Shanghai");
$firstAccess = null;

// json
$rawData = file_get_contents("php://input");
$parameters = json_decode($rawData);

// “统一” 大于 “灵活”
// 一种统一的约定

// 另外还需说明的一点是我使用了jQuery做XMLHttpRequest，post的内容不是传统的html表单形式，而是json数据，所以在服务器端这边，就不能直接用$_REQUEST获取，而是通过读取“php://input”的内容获取。顺便谈谈个人对web api的一个看法：“统一”大于“灵活”，这是我的观点，我确定我的接口的格式是json，使用utf-8编码，于是就一直用下去，调用者不用考虑用XML还是html表单还是别的，开发者也不必多考虑，让这成为一种统一的约定，在团队协助和以后的开发中会很省事。

// $_REQUEST

if($parameters){
    if(isset($parameters->url)){
        // md5
        $currMd5 = md5($parameters->url);
        $handle = fopen("history.txt", "r+");
        if ($handle) {
            while (($line = fgets($handle, 4096)) !== false) {
                if(0===strpos($line, $currMd5)){
                    $firstAccess = trim(substr($line, 33));
                    break;
                }
            }
            if(!$firstAccess){
                $firstAccess = date("Y-m-d H:i");
                fwrite($handle, $currMd5." ".$firstAccess."\r\n");
            }
            fclose($handle);
        }
        else {
            exit(json_encode(array ('error'=>'服务器意外错误.')));
        }
        exit(json_encode(array ('firstAccess'=>$firstAccess)));
    }
}
exit(json_encode(array ('error'=>'请求不正确.')));
?>
