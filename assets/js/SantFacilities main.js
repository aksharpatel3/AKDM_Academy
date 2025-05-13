/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

async function getID() {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var id = 0;
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == "id") 
        {
            id = sParameterName[1];
        }
    }

	console.log(id);
    fetch(`https://tinyurl.com/RBVSantashram?web=T&id=${id}`, {
		// mode: 'no-cors'
	})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setDataValues(data);
            return 0;
        })
        .catch(error => {
            console.error('Error:', error);
    });
}

function setDataValues(data) {
    let name = document.getElementById("name");
	let accommodations = document.getElementById("accommodations");
	let wifi = document.getElementById("wifi");
	let dhotiyaImage = document.getElementById("dhotiyaImage");
	let dhotiyaText = document.getElementById("dhotiyaText");
    console.log(data["name"]);
    name.innerHTML = `Jay Swaminarayan<br>Pujya ${data["name"]}`;

	if (data["trailer"] == "Sant Ashram") {
		accommodations.innerHTML = `Sant Ashram<br>Room: ${data["room"]}<br>${data["arrival"]} to ${data["departure"]}`;
	} else {
		accommodations.innerHTML = `${data["trailer"]}<br>Room: ${data["room"]}<br>${data["arrival"]} to ${data["departure"]}`;
	}
	wifi.innerHTML = `SSID: Akshardham<br>Username: ${data["akdm_wifi_user"]}<br>Password: ${data["akdm_wifi_password"]}`;

	if (!(data["dhotiya"] === "")) {
		dhotiyaText.innerHTML = `Please hang your dhotiya in ${data["dhotiya"]}<br>Please see the below map on how to get there from your room`;
		if(data["dhotiya"] === "Inside Room") {
			dhotiyaText.innerHTML = `Please hang your dhotiya inside your room.`;
		} else if (data["dhotiya"] === "Phase 4") {
			dhotiyaText.innerHTML = `Please place your unwashed dhotiya outside in the basket. You will receive them folded by the end of the day.`;
		}
		
		let imageName = `${data["room"]}-${data["dhotiya"]}`;
		console.log(imageName);
		dhotiyaImage.src = `images/dhotiyaMaps/${imageName}.png`;
	}

	window.setTimeout(function() {
		$('body').removeClass('is-preload');
	}, 100);
}

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', async function() {
			getID();
			// window.setTimeout(function() {
			// 	$('body').removeClass('is-preload');
			// }, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);
