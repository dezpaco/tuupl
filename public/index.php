<?php

$ignore = array('/', '/templates');

if ( ! in_array($_SERVER['REQUEST_URI'], $ignore) 
	&& file_exists(__DIR__ . $_SERVER['REQUEST_URI'])) {
	
	return false;
}

require_once __DIR__ . '/../vendor/autoload.php';

$loader = new Twig_Loader_Filesystem(__DIR__ . '/../templates');
$twig = new Twig_Environment($loader);

$routes = array(
	'/' => array('index', array('bodyId' => 'home')),
    '/error' => array('error', array('bodyId' => 'notfound'))
);

$view = $routes[$_SERVER['REQUEST_URI']];

if (is_array($view)) {
	list($view, $data) = $view;
}
else {
	$data = array();
}

if (file_exists(__DIR__ . '/../templates/' . $view . '.html.twig')) {
	echo $twig->render($view . '.html.twig', $data);
	exit;
}
