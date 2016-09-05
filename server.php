<?php

/**
 * check if get param is filled
 */
if (isset($_GET['code'])) {
	// open the file with the codes
	$file = fopen('codes.csv', 'r');
	$newResult = '';
	$codeFound = false;
	while(!feof($file)){
		$line = trim(strip_tags(fgets($file)));
		if($line == $_GET['code']){
			$codeFound = true;
		}else{
			$newResult .= $line."\n";
		}
	}
	fclose($file);

	file_put_contents('codes.csv', $newResult);

	if($codeFound == true){
		echo 'VALID';
		die;
	}

}
echo 'INVALID';