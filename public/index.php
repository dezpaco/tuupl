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
    '/notfound' => array('notfound', array('bodyId' => 'notfound'))
);

$view = $routes[$_SERVER['REQUEST_URI']];

if (is_array($view)) {
	list($view, $data) = $view;
}
else {
	$data = array();
}

/*
 * Using HTTP_HOST without verifying what you get is not a good
 * idea for a production environment!
 */
$data['url'] = $_SERVER['HTTP_HOST'];

if (file_exists(__DIR__ . '/../templates/' . $view . '.html.twig')) {
	echo $twig->render($view . '.html.twig', $data);
	exit;
}
