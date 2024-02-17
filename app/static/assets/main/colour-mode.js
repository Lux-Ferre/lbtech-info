if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
	document.documentElement.setAttribute("data-bs-theme", "light")
	const navbar = $(".navbar")
	navbar.removeClass("bg-dark")
	navbar.addClass("bg-light")
}
