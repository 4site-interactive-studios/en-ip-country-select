window.addEventListener('DOMContentLoaded', function() {
	var opt_in_field = document.querySelector('input[name="supporter.questions.11126"]');
	if(opt_in_field) {
		function is_in_country(callback, country_list) {
			var req = new XMLHttpRequest();

			req.addEventListener('load', function() {
				var loc_idx = this.responseText.indexOf('loc=');
				if(loc_idx !== -1) {
					var country_code = this.responseText.substring(loc_idx+4, loc_idx+6);
					var country_in_list = (country_list.indexOf(country_code) !== -1);
					callback(country_in_list);
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
		var country_list = [
			'AU', // Australia
			'AT', // Austria
			'BE', // Belgium
			'BR', // Brazil
			'BG', // Bulgaria
			'CA', // Canada
			'CL', // Chile
			'CN', // China
			'HR', // Croatia
			'CY', // Republic of Cyprus
			'CZ', // Czech Republic
			'DK', // Denmark
			'EE', // Estonia
			'FI', // Finland
			'FR', // France
			'DE', // Germany
			'GR', // Greece
			'HU', // Hungary
			'IN', // India
			'IE', // Ireland
			'IT', // Italy
			'JP', // Japan
			'LV', // Latvia
			'LT', // Lithuania
			'LU', // Luxembourg
			'MT', // Malta
			'NL', // Netherlands
			'NZ', // New Zealand
			'PL', // Poland
			'PT', // Portugal
			'RO', // Romania
			'SK', // Slovakia
			'SI', // Slovenia
			'ZA', // South Africa
			'KR', // South Korea
			'ES', // Spain
			'SE', // Sweden
			'CH', // Switzerland
			'TH'  // Thailand
		];
		is_in_country(function(result) {
			if(result) {
				//console.log('country is in list; unchecking opt-in field');
				opt_in_field.checked = false;
			} else {
				//console.log('country is not in list; do nothing');
			}
		}, country_list);
	}
});
