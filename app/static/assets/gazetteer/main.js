class MapHandler {
	constructor() {
		this.colour_mode()
		this.map = this.set_map()
		this.get_country_list()

		this.get_user_location()

		this.add_easy_buttons()
		this.create_listeners()
	}

	colour_mode() {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
			document.documentElement.setAttribute("data-bs-theme", "light")
		}
	}

	remove_preloader() {
		const preloader = $('#preloader')
		if (preloader.length) {
			preloader.delay(1000).fadeOut('slow', function () {
				$(this).remove();
			});
		}
	}

	get_user_location() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				$.ajax({
					url: `/api/get_iso_from_coords?lat=${position.coords.latitude}&long=${position.coords.longitude}`,
					type: 'GET',
					dataType: 'json',
					success: data => {
						$("#country_select").val(data.iso_a2)
						this.on_country_selected(data.iso_a2)
					},
					error: function (jqXHR, textStatus, errorThrown) {
						console.log(errorThrown)
					}
				})
			}, error => {
				this.on_country_selected("AF")
			})
		} else {
			this.on_country_selected("AF")
		}
	}

	set_map() {
		this.streets_layer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
				attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
			}
		)

		this.satellite_layer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
				attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
			}
		)

		this.basemaps = {
			"Streets": this.streets_layer,
			"Satellite": this.satellite_layer
		}

		this.cities = L.markerClusterGroup()
		this.airports = L.markerClusterGroup()
		this.hospitals = L.markerClusterGroup()

		this.overlays = {
			Cities: this.cities,
			Airports: this.airports,
			Hospitals: this.hospitals
		}

		const map = L.map('map', {
			layers: [this.streets_layer]
		}).setView([51.505, -0.09], 13);

		this.layer_control = L.control.layers(this.basemaps, this.overlays).addTo(map)

		this.cities.addTo(map)
		this.airports.addTo(map)
		this.hospitals.addTo(map)

		return map
	}

	add_easy_buttons() {
		L.easyButton('fa-info fa-xl', function (btn, map) {
			$("#facts_modal").modal("show");
		}).addTo(this.map)
		L.easyButton('fa-brands fa-wikipedia-w fa-xl', function (btn, map) {
			$("#wiki_modal").modal("show");
		}).addTo(this.map)
		L.easyButton('fa-newspaper fa-xl', function (btn, map) {
			$("#news_modal").modal("show");
		}).addTo(this.map)
		L.easyButton('fa-solid fa-cloud fa-xl', function (btn, map) {
			$("#weather_modal").modal("show");
		}).addTo(this.map)
		L.easyButton('fa-solid fa-money-bill-transfer fa-xl', function (btn, map) {
			$("#currency_modal").modal("show");
		}).addTo(this.map)
	}

	get_country_list() {
		$.ajax({
			url: `/api/country_list`,
			type: 'GET',
			dataType: 'json',
			data: {},
			success: this.populate_country_select,
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown)
			}
		});
	}

	populate_country_select(data) {
		const template = $("#country_option_template")
		data.forEach(country => {
			const flag_offset = 0x1F1E6
			const ascii_offset = 0x41
			const first_char = country["iso_a2"].charCodeAt(0) - ascii_offset + flag_offset
			const second_char = country["iso_a2"].charCodeAt(1) - ascii_offset + flag_offset
			const flag = String.fromCodePoint(first_char) + String.fromCodePoint(second_char)

			let new_option_clone = template.prop("content").cloneNode(true)
			let new_option = $("option", new_option_clone)
			new_option.val(country["iso_a2"])
			new_option.text(`${country["name"]} ${flag}`)
			new_option.attr("data-iso3", country["iso_a3"])

			$("#country_select").append(new_option_clone)
		})
	}

	draw_boundary(geojson) {
		const boundary_style = {
			fillColor: 'green',
			weight: 2,
			opacity: 0.7,
			color: 'white',  //Outline color
			fillOpacity: 0.3
		}
		if (this.countryLayer) {
			this.countryLayer.remove()
		}
		this.countryLayer = L.geoJSON(geojson, {style: boundary_style}).addTo(this.map)
		this.map.fitBounds(this.countryLayer.getBounds())
	}

	get_country_data(iso_a2) {
		$.ajax({
			url: `/api/data?iso_a2=${iso_a2}`,
			type: 'GET',
			dataType: 'json',
			success: (data) => {
				this.draw_boundary(data.geojson)
				this.create_city_markers(data.cities)
				this.create_airport_markers(data.airports)
				this.create_hospital_markers(data.hospitals)
				this.populate_currencies(data.currency.rates, data.currency.currency_code)
				this.populate_news(data.news)
				this.populate_weather(data.weather)
				this.populate_wiki(data.wiki, data.general.name)
				this.populate_facts(data.general, data.currency.currency_name)
				this.remove_preloader()
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown)
			}
		})
	}

	create_city_markers(cities) {
		this.cities.clearLayers()
		const icon = L.ExtraMarkers.icon({
			icon: 'fa-city',
			markerColor: 'green-dark',
			shape: 'square',
			prefix: 'fa'
		})

		for (const [name, data] of Object.entries(cities)) {
			const markerOptions = {
				icon: icon,
				title: name,
				population: parseInt(data.population).toLocaleString(),
				lat: data.lat,
				long: data.lng
			}
			const new_marker = L.marker([data.lat, data.lng], markerOptions)
				.bindTooltip(`${name}: ${parseInt(data.population).toLocaleString()}`, {direction: "top", sticky: true})
				.addTo(this.cities)
		}
	}

	create_airport_markers(airports) {
		this.airports.clearLayers()
		const icon = L.ExtraMarkers.icon({
			icon: 'fa-plane-departure',
			markerColor: 'blue-dark',
			shape: 'penta',
			prefix: 'fa'
		})

		for (const [name, data] of Object.entries(airports)) {
			const markerOptions = {
				icon: icon,
				title: name,
				lat: data.lat,
				long: data.lng
			}
			const new_marker = L.marker([data.lat, data.lng], markerOptions)
				.bindTooltip(name, {direction: "top", sticky: true})
				.addTo(this.airports)
		}
	}

	create_hospital_markers(hospitals) {
		this.hospitals.clearLayers()
		const icon = L.ExtraMarkers.icon({
			icon: 'fa-hospital',
			markerColor: 'red',
			shape: 'circle',
			prefix: 'fa-solid'
		})

		for (const [name, data] of Object.entries(hospitals)) {
			const markerOptions = {
				icon: icon,
				title: name,
				lat: data.lat,
				long: data.lng
			}
			const new_marker = L.marker([data.lat, data.lng], markerOptions)
				.bindTooltip(name, {direction: "top", sticky: true})
				.addTo(this.hospitals)
		}
	}

	populate_currencies(currencies, local) {
		const template = $("#currency_option_template")
		currencies.forEach(currency => {
			const name = `${currency.name} (${currency.code})`

			let new_option_clone = template.prop("content").cloneNode(true)
			let new_option = $("option", new_option_clone)
			new_option.val(currency.code)
			new_option.attr("data-rate", currency.rate)
			new_option.text(name)

			$("#rate_select").append(new_option_clone)
		})
		$("#rate_select").val(local)
	}

	populate_news(articles) {
		const body = $("#news_modal_body")
		body.empty()
		const template = $("#news_article_template")
		articles.forEach(article => {
			let new_article_clone = template.prop("content").cloneNode(true)
			$("img", new_article_clone).attr("src", article.image)
			let anchor = $("a", new_article_clone)
			anchor.attr("href", article.url)
			anchor.text(article.title)

			$("p", new_article_clone).text(article.source)

			body.append(new_article_clone)
		})
	}

	populate_weather(weather) {
		if($.isEmptyObject(weather)){return}
		const forecasts = weather.forecast
		for (let i = 0; i < forecasts.length; i++) {
			const weather_box = $(`#weather_box_${i}`)
			$(".weather_icon", weather_box).attr("src", forecasts[i].condition)
			$(".max_temp", weather_box).text(Math.round(forecasts[i].max_temp))
			$(".min_temp", weather_box).text(Math.round(forecasts[i].min_temp))
		}
		$("#weather_date").text(dateFns.format(new Date(forecasts[2].date), 'EEE, do'))
		const alerts = weather.alerts
		const alert_box = $("#weather_alerts")
		alert_box.empty()
		if (alerts.length > 0) {
			alert_box.removeClass("d-none")
			const template = $("#weather_alert_template")
			alerts.forEach(alert => {
				let new_alert_clone = template.prop("content").cloneNode(true)
				$("p", new_alert_clone).text(alert)
				alert_box.append(new_alert_clone)
			})
		} else {
			alert_box.addClass("d-none")
		}
	}

	populate_wiki(wiki, name){
		$("#wiki_title").text(name)
		$("#wiki_extract").text(wiki.extract)
		$("#wiki_link").attr("href", wiki.url)
	}

	populate_facts(data, curr_name){
		let languages = ""
		if (data.languages.length > 1){
			const display_names = new Intl.DisplayNames(['en'], { type: 'language' })
			const lang_list = []
			data.languages.split(",").forEach(lang=>{
				lang_list.push(display_names.of(lang))
			})
			languages = lang_list.join("; ")
		}


		$("#modal_capital").text(data.capital)
		$("#modal_continent").text(data.continent)
		$("#modal_currency").text(`${curr_name} (${data.currency_code})`)
		$("#modal_population").text(parseInt(data.population).toLocaleString())
		$("#modal_area").text(parseFloat(data.area).toLocaleString())
		$("#modal_languages").text(languages)
		$("#modal_iso2").text(data.iso_a2)
		$("#modal_iso_3").text(data.iso_a3)
	}

	calculate_currency() {
		const rate = parseFloat($("#rate_select").find(":selected").attr("data-rate"))
		const result = parseFloat($("#from_amount").val()) * rate
		$("#to_amount").val(result.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}))
	}

	on_country_selected(iso_a2) {
		this.get_country_data(iso_a2)
	}

	create_listeners() {
		$("#country_select").on("input", e => {
			const ele = $(e.target)
			this.on_country_selected(ele.val())
		})
		$("#rate_select, #from_amount").on("input", this.calculate_currency)
		const currency_modal = $("#currency_modal")
		currency_modal.on("show.bs.modal", this.calculate_currency)
		currency_modal.on("hidden.bs.modal", e => {
			$("#from_amount").val(1)
		})
	}
}

window.map = new MapHandler()