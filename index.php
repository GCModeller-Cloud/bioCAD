<?php

# home page

include "./mod/dotnet/package.php";
include "./html/view_common.php";
include "./user_info.php";

dotnet::AutoLoad("./etc/config.php");
dotnet::HandleRequest(new app());

class app {

	/**
	 * 在这里的所有的页面都不需要进行身份验证 
	 * 
	 */

	public function index() {
		$vars          = userInfo::getUserInfo();
		$vars["title"] = "bioCAD cloud platform";
		view::Display($vars);
	}

	public function apps() {
		$vars          = userInfo::getUserInfo();
		$vars["title"] = "bioCAD Applications";
		view::Display($vars);
	}

	public function downloads() {
		$vars          = userInfo::getUserInfo();
		$vars["title"] = "Download GCModeller";
		view::Display($vars);
	}

	public function about() {
		$vars          = userInfo::getUserInfo();
		$vars["title"] = "About bioCAD";
		view::Display($vars);
	}

	public function search() {
		$term = $_GET["q"];
		$result = "";

		if (!$term) {
			$result = "No term provided!";
		} else {
			$result = $this->searchInternal($term);
		}

		$vars          = userInfo::getUserInfo();
		$vars["title"] = "Search Result";
		$vars["result"] = $result;
		view::Display($vars);
	}

	/*
	 * 根据所给定的词条返回在整个网站内的通用的搜索结果
	 */
	private function searchInternal($term) {
		$result_list = "";
		$display_container = "./html/search_result.html";
		
		return view::Load(
			$display_container, 
			array(
					"list" => $result_list, 
					"term" => $term
		));
	}
}

?>