'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	$.get("/project/" + idNumber, addProject);
	console.log("URL is " + "/project/" + idNumber);
}
function addProject(result) {
	console.log(result);
 
	var projectHTML = 
		'<p>' + result['id'] + '</p>' +
		'<img src="' + result['image'] + '" class="detailsImage">' +
		'<p>' + result['title'] + '</p>' +
		'<p><small>' + result['date'] + '</small></p>' +
		'<p>' + result['summary'] + '</p>';

	$("#project" + result['id'] + " .details" ).html(projectHTML);

}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");

	$.get("http://localhost:3000/palette", makeColors);
}

function makeColors(result) {
	var colors = ["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900"];
	var random = Math.floor((Math.random() * 5) + 0);

	$('body').css('background-color', colors[1]);
	$('.thumbnail').css('background-color', colors[random]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[3]);
	$('p').css('color', colors[2]);
	$('.project img').css('opacity', .75);
}
