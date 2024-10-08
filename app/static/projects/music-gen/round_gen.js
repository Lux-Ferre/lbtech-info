class MusicRoundManager{
	constructor(){
		this.b64_encoded_image = `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pv8A4Fx/4187UUeyXcPrUux9E/8ACT+H/wDoO6b/AOBcf+NH/CT+H/8AoO6b/wCBcf8AjXztRR7JdxfWpdj6J/4Sfw//ANB3Tf8AwLj/AMaP+En8P/8AQd03/wAC4/8AGvnaij2S7j+tS7H0T/wk/h//AKDum/8AgXH/AI0f8JP4f/6Dum/+Bcf+NfO1FHsl3D63LsfRX/CT+H/+g7pv/gXH/jR/wk/h/wD6Dum/+Bcf+NfOtFHsl3D63LsfRX/CT+H/APoO6b/4Fx/40f8ACT+H/wDoO6b/AOBcf+NfOtFHsl3D63LsfRX/AAk/h/8A6Dum/wDgXH/jR/wk/h//AKDum/8AgXH/AI1860UeyQfW5dj6L/4Sfw//ANB3Tf8AwLj/AMaP+En8P/8AQd03/wAC4/8AGvnSij2S7h9bl2CiiitjjCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/Z`
		this.parsed_tracks = []
		this.track_container = $("#trackContainer")
		this.track_template = $("#trackTemplate")
	}

	async get_client_id(){
		const endpoint = `/projects/sqmusic/clientid`

		const ajaxOpts = {
			method: "GET",
			url: endpoint,
			headers: {
			},
			json: true,
			success: function (response){
				return response
			}
		}

		return $.ajax(ajaxOpts)
	}

	get_code_verifier(){
		let verifier = localStorage.getItem("code_verifier")
		if(verifier){
			window.round_manager.code_verifier = verifier
		} else {
			window.round_manager.generate_code_verifier()
		}
	}

	generate_code_verifier(){
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		const values = crypto.getRandomValues(new Uint8Array(69))
		const code_verifier =  values.reduce((acc, x) => acc + possible[x % possible.length], "")
		window.round_manager.code_verifier = code_verifier
		localStorage.setItem("code_verifier", code_verifier)
	}

	async generate_code_challenge(){
		window.round_manager.get_code_verifier()
		const verifier = window.round_manager.code_verifier
		const encoder = new TextEncoder()
		const data = encoder.encode(verifier)
		const sha256 = await window.crypto.subtle.digest("SHA-256", data)

		window.round_manager.code_challenge = btoa(String.fromCharCode(...new Uint8Array(sha256)))
			.replace(/=/g, '')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
	}

	goto_login(){
		const client_id = window.round_manager.client_id
		const redirect_uri = `${window.location.origin}/projects/sqmusic`
		const code_challenge = window.round_manager.code_challenge

		const scope = "playlist-read-private playlist-read-collaborative"
		const auth_url = new URL("https://accounts.spotify.com/authorize")

		const params =  {
			response_type: "code",
			client_id: client_id,
			scope,
			code_challenge_method: "S256",
			code_challenge: code_challenge,
			redirect_uri: redirect_uri,
		}

		auth_url.search = new URLSearchParams(params).toString();
		window.location.href = auth_url.toString();
	}

	get_token(){
		const endpoint = `https://accounts.spotify.com/api/token`
		const redirect_uri = `${window.location.origin}/projects/sqmusic`
		const client_id = window.round_manager.client_id
		const code_verifier = window.round_manager.code_verifier
		const code = window.round_manager.auth_code

		const ajaxOpts = {
			method: "POST",
			url: endpoint,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				grant_type: 'authorization_code',
				client_id,
				code,
				redirect_uri,
				code_verifier
			},
			json: true,
			success: function (response){
				window.round_manager.save_token(response)
				console.log(response)
			}
		}

		$.ajax(ajaxOpts)
	}

	save_token(raw_token_data){
		const expires_in = raw_token_data.expires_in - 5 // Sets expiry 5 seconds earlier to account for possible latencies.
		const expiry = new Date(new Date().getTime()+(expires_in*1000));
		const token_data = {
			token: raw_token_data.access_token,
			scope: raw_token_data.scope,
			expiry: expiry,
			refresh_token: raw_token_data.refresh_token
		}
		localStorage.setItem("token_data", JSON.stringify(token_data))
		window.round_manager.token_data = token_data
		$("#login_button").addClass("disabled")
		$("#load_button").removeClass("disabled")
	}

	verify_token_data(token_data){
		if(Date.parse(token_data.expiry) < Date.now()){
			console.log("Token expired.")
			window.round_manager.refresh_token(token_data)
		} else {
			console.log("Token valid.")
			window.round_manager.token_data = token_data
			$("#login_button").addClass("disabled")
			$("#load_button").removeClass("disabled")
		}
	}

	refresh_token(token_data){
		const endpoint = `https://accounts.spotify.com/api/token`
		const client_id = window.round_manager.client_id
		const refresh_token = token_data.refresh_token

		const ajaxOpts = {
			method: "POST",
			url: endpoint,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				grant_type: 'refresh_token',
				client_id,
				refresh_token
			},
			json: true,
			success: function (response){
				window.round_manager.save_token(response)
				console.log(response)
			}
		}

		$.ajax(ajaxOpts)
	}

	populate_html_with_defaults(){
		$("#title_input").val("SQ Music Round ${date}")
		$("#question_input").val("MUSIC ROUND #${track.position} - Tap on the first letter of the ${question_type}")
		$("#answer_input").val("${artist} with ${track}")
		$("#points_input").val(10)
		$("#wide_input").prop("checked", true)
	}

	get_playlist_id(playlist_url){
		return playlist_url.split("/").pop().split("?")[0]
	}

	get_playlist(){
		const playlist_url = $("#playlist_input").val()
		const playlist_id = this.get_playlist_id(playlist_url)

		const endpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`

		const ajaxOpts = {
			method: "GET",
			url: endpoint,
			headers: {
				'Authorization': 'Bearer ' + this.token_data.token
			},
			json: true,
			success: function (response){
				window.round_manager.raw_playlist = response.items
				window.round_manager.parse_tracks(response.items)
				window.round_manager.randomize_target(window.round_manager.parsed_tracks)
				window.round_manager.populate_track_list()
				$("#download_button").removeClass("disabled")
			}
		}

		$.ajax(ajaxOpts)
	}

	get_thumbnail_url(track){
		const images = track.album.images
		let url = ""
		images.forEach(image=>{
			if(image.height===64){
				url = image.url
			}
		})
		return url
	}

	handle_article_words(answer){
		const split_answer = answer.split(" ")
		if (split_answer[0].toLowerCase() in ["the", "a", "an"]){
			const article = split_answer.shift()
			return split_answer.join(" ") + `, ${article}`
		} else {
			return answer
		}
	}

	is_valid_as_answer(answer){
		if (answer.length > 0) {
			const firstChar = answer.charAt(0);
			return /^[a-zA-Z]/.test(firstChar);
		} else {
			return false;
		}
	}

	parse_tracks(track_list){
		window.round_manager.parsed_tracks.length = 0	// Empties previously loaded track list
		let position = 1
		track_list.forEach(track=>{
			const track_obj = track.track
			const parsed_track = {
				position: 0,
				artists: [],
				title: "",
				display: "",
				valid_title: false,
				thumbnail_url: "",
			}

			track_obj.artists.forEach(artist=>{
				const name = this.handle_article_words(artist.name)
				const is_valid = this.is_valid_as_answer(name)
				parsed_track.artists.push(
					{
						name: name,
						display: artist.name,
						is_valid: is_valid,
					}
				)
			})

			const track_title = this.handle_article_words(track_obj.name)
			parsed_track.position = position
			parsed_track.title = track_title
			parsed_track.display = track_obj.name
			parsed_track.valid_title = this.is_valid_as_answer(track_title)
			parsed_track.thumbnail_url = this.get_thumbnail_url(track_obj)

			window.round_manager.parsed_tracks.push(parsed_track)
			position ++
		})
	}

	populate_track_list(){
		this.track_container.empty()
		this.parsed_tracks.forEach(track=>{
			const clone = this.track_template.prop("content").cloneNode(true)

			$(".trackTitle", $(clone)).text(track.display)

			track.artists.forEach(artist=>{
				const elementString = `<option value="${artist.name}">${artist.display}</option>`
				$(".artistList", $(clone)).append($.parseHTML(elementString))
			})
			$(".artistList:first-child", $(clone)).attr("selected", "")

			$(".trackImg", $(clone)).attr("src", track.thumbnail_url)

			this.track_container.append(clone)
		})
	}

	randomize_target(track_list){
		track_list.forEach(track=>{
			const artist_name = track.artists[0].name
			const valid_artist = track.artists[0].is_valid

			const track_name = track.title
			const valid_track = track.valid_title

			if (!valid_artist && !valid_track){
				throw new Error(`Invalid track: ${track_name} by ${artist_name}`)
			}

			let question_target = ["song", "artist"][Math.floor(Math.random()*2)]

			if(question_target==="artist" && !valid_artist){
				console.log(`Artist ${artist_name} invalid, switching target to song: ${track_name}.`)
				question_target = "song"
			} else if(question_target==="song" && !valid_track){
				console.log(`Song ${track_name} invalid, switching target to artist: ${artist_name}.`)
				question_target = "artist"
			}

			track.target = question_target
		})
	}

	create_download(xml_string){
		const date = new Date(Date.now()).toLocaleDateString().replaceAll("/", "")
		const zipped = fflate.zipSync({
				"sq_round.sqq": fflate.strToU8(xml_string)
			}, {
				level: 6,
			});
		const blob = new Blob([zipped], {type: "application/zip"});
		saveAs(blob, `sqq_round${date}.zip`);
	}

	generate_xml(){
		const date = new Date(Date.now()).toLocaleDateString().replaceAll("/", " ")
		const xml_doc = document.implementation.createDocument("", "", null)
		const round_element = xml_doc.createElement("round")
		const game_element = xml_doc.createElement("game")
		game_element.appendChild(xml_doc.createTextNode("Quizsentials"))
		const title_element = xml_doc.createElement("title")
		title_element.appendChild(xml_doc.createTextNode(`SQ Music Round ${date}`))
		const points_element = xml_doc.createElement("points_per_question")
		points_element.appendChild(xml_doc.createTextNode("10"))
		const wide_element = xml_doc.createElement("go_wide")
		wide_element.appendChild(xml_doc.createTextNode("true"))
		const speed_element = xml_doc.createElement("speed_bonus")
		speed_element.appendChild(xml_doc.createTextNode("true"))

		const settingsElements = [game_element, title_element, points_element, wide_element, speed_element]
		settingsElements.forEach(setting=>{
			round_element.appendChild(setting)
		})
		const questions_element = xml_doc.createElement("questions")
		this.parsed_tracks.forEach(track=>{
			const artist_name = track.artists[0].name
			const artist_display = track.artists[0].display
			const track_name = track.title
			const track_display = track.display

			if(track.target==="artist"){
				track.q = `MUSIC ROUND #${track.position} - Tap on the first letter of the ARTIST name`
				track.s = artist_name.charAt(0).toUpperCase()
				track.l = `${artist_display} with ${track_display}`
			}

			if(track.target==="song"){
				track.q = `MUSIC ROUND #${track.position} - Tap on the first letter of the SONG TITLE`
				track.s = track_name.charAt(0).toUpperCase()
				track.l = `"${track_display}" by ${artist_display}`
			}

			const question_element = xml_doc.createElement("question")
			const view_element = xml_doc.createElement("user_view")
			view_element.appendChild(xml_doc.createTextNode("letters"))
			const q_element = xml_doc.createElement("q")
			q_element.appendChild(xml_doc.createTextNode(track.q))
			const s_element = xml_doc.createElement("short_answer")
			s_element.appendChild(xml_doc.createTextNode(track.s))
			const l_element = xml_doc.createElement("long_answer")
			l_element.appendChild(xml_doc.createTextNode(track.l))
			const picture_element = xml_doc.createElement("picture")
			picture_element.appendChild(xml_doc.createTextNode(window.round_manager.b64_encoded_image))
			const id_element = xml_doc.createElement("id")
			id_element.appendChild(xml_doc.createTextNode(track.position))

			const question_data = [view_element, q_element, s_element, l_element, picture_element, id_element]

			question_data.forEach(datum=>{
				question_element.appendChild(datum)
			})
			questions_element.appendChild(question_element)
		})
		round_element.appendChild(questions_element)
		xml_doc.appendChild(round_element)

		const xml_string = new XMLSerializer().serializeToString(xml_doc)

		this.create_download(xml_string)
	}
}

$(window).on('load', async function () {
	window.round_manager = new MusicRoundManager()
	window.round_manager.populate_html_with_defaults()

	const client_id = await window.round_manager.get_client_id()

	window.round_manager.client_id = client_id.client_id
	window.round_manager.generate_code_challenge().then()

	const url_params = new URLSearchParams(window.location.search)
	const token_data = JSON.parse(localStorage.getItem("token_data"))

	if (url_params.has("code")){
		window.round_manager.auth_code = url_params.get("code")
		if(token_data){
			window.round_manager.verify_token_data(token_data)
		} else {
			window.round_manager.get_token()
		}
	} else {
		if(token_data){
			window.round_manager.verify_token_data(token_data)
		}
	}

});

$("#login_button").on("click", function (){
	window.round_manager.goto_login()
})

$("#load_button").on("click", function (){
	window.round_manager.get_playlist()
})

$("#download_button").on("click", function (){
	window.round_manager.generate_xml()
})