let DOMReady = function(callback) {
	document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

DOMReady(function() {
  // DOM ready!
  const country_field = document.querySelector('select#en__field_supporter_country'); // Find the Engaging Networks select dropdown country field
  const country_field_options = country_field.querySelectorAll("option"); // Check that the select dropdown country field has options

  if(country_field.options) {
		  let req = new XMLHttpRequest();
		  req.addEventListener('load', function() {
			  let loc_idx = this.responseText.indexOf('loc=');
			  if(loc_idx !== -1) {
				  let country_code = this.responseText.substring(loc_idx+4, loc_idx+6);

				  // If a country code is returned, proceed
				  if(country_code){

					// Checks a the select drodown country field for the presence of the returned country code
					country_field_options.forEach( o => {
						if( o.value === country_code) {
							country_field.value = country_code;
							console.log("Country field was populated based on IP address with: ", country_code)
						} else {
							console.log("Country field was NOT populated based on IP address because the value returned is not present in the country select dropdown: ", country_code)
						}
					});
				  }
			  } else {
				  callback(false);
			  }
		  });
		  req.addEventListener('error', function() {
			  callback(false);
		  });
		  req.addEventListener('abort', function() {
			  callback(false);
		  });
		  req.open('GET', 'https://www.cloudflare.com/cdn-cgi/trace');
		  req.send();
  }
});