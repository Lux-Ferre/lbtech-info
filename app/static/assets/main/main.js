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
