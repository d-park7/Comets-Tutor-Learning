/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
import '../src/assets/css/main.css';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));






//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<homePage />);

// 


// jquery code
// (function ($) {
	

	// var $window = $(window),
	//     $body = $('body');
	    // $nav = $('#nav'); // Used by scrolly, but most likely taking out scrolly

	// Breakpoints.
	// breakpoints({
	// 	xlarge: ['1281px', '1680px'],
	// 	large: ['981px', '1280px'],
	// 	medium: ['737px', '980px'],
	// 	small: [null, '736px']
	// });

	// Play initial animations on page load.
	// $window.on('load', function () {
	// 	window.setTimeout(function () {
	// 		$body.removeClass('is-preload');
	// 	}, 100);
	// });

	// commenting out cause not sure what scrolly does
	// and node doesn't know what this function is
	// UPDATE: It might just be for different scrolling speeds
	// Scrolly.
	// $('#nav a, .scrolly').scrolly({
	// 	speed: 1000,
	// 	offset: function offset() {
	// 		return $nav.height();
	// 	}
	// });
	
// })($);