function register() {
	'use strict';
alert("email cant be null");
	// For storing the order total:
	var total;

    // Get references to the form values:
    var email = document.getElementById('email').value;
    var cemail = document.getElementById('cemail').value;

	if (isNaN(email) ||isNaN(cemail)){
		alert("email cant be null");
		
	}
	

	// Return false to prevent submission:
	//return false;

} // End of calculate() function.

// Function called when the window has been loaded.
// Function needs to add an event listener to the form.
function init() {
	'use strict';

    // Add an event listener to the form:
    var theForm = document.getElementById('theForm');
    theForm.onsubmit = register;

} // End of init() function.

// Assign an event listener to the window's load event:
window.onload = init;
