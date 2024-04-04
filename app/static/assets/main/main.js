// Function to allow nested dropdowns in navbar without closing parent on click: https://stackoverflow.com/a/66470962/12316625
(function($bs) {
    const CLASS_NAME = 'has-child-dropdown-show';
    $bs.Dropdown.prototype.toggle = function(_orginal) {
        return function() {
			document.querySelectorAll('.' + CLASS_NAME).forEach(function(e) {
				e.classList.remove(CLASS_NAME);
			});
			let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
			for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
				dd.classList.add(CLASS_NAME);
			}
			return _orginal.call(this);
		}
	}($bs.Dropdown.prototype.toggle);

	document.querySelectorAll('.dropdown').forEach(function(dd) {
		dd.addEventListener('hide.bs.dropdown', function(e) {
			if (this.classList.contains(CLASS_NAME)) {
				this.classList.remove(CLASS_NAME);
				e.preventDefault();
			}
			e.stopPropagation(); // do not need pop in multi level mode
		});
	});
})(bootstrap);


// Event listener for home page light switch
$('#homepageLightSwitch').on('change', function() {
	const lightIsOn = $(this).is(':checked')
	const lightsOutBackground = $("#lightsOutBackground")
	const torch = $("#torch")
	const bodyElement = $("body")
	if (lightIsOn){
		bodyElement.css("color", "var(--body-color)")
		lightsOutBackground.addClass("d-none")
		torch.addClass("d-none")
	} else {
		bodyElement.css("color", "white")
		lightsOutBackground.removeClass("d-none")
		torch.removeClass("d-none")
	}
});

// Event listener for home page torch effect
$(document).on("mousemove", event => {
	const torchElement = $("#torch")
	const { clientX, clientY } = event;

	torchElement.css("background", `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 10px, #000000ee 200px)`)
})