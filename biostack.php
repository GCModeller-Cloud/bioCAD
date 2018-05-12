<?php

include "./mod/dotnet/package.php";
include "./common.php";

Imports("Microsoft.VisualBasic.Strings");
Imports("php.Utils");

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new biostack(), "./html/Application/");

/**
 * 数据分析模块的用户界面
*/
class biostack {

    public function index() {

    }

    public function log2FC() {

    }

    public function volcano() {
        
    }

    public function iTraq() {
        $vars           = Common::getUserInfo();
		$vars["title"]  = "iTraq data";		
		
		View::Show("./html/Application/proteomics/iTraq.html", $vars);
    }
}

?>