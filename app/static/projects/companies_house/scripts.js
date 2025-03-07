const inputContainer = document.getElementById("postcode_input_container");
const postcode_input = document.getElementById("postcode_input");

var stored_postcodes = new Set()

var is_clicked = false;

function add_pill(text) {
	if (!text.trim()) return;

	text = text.slice(0, 4)

	const clone = document.getElementById("pill_template").content.cloneNode(true)
	const pill = clone.querySelector(".pill")

	clone.querySelector(".pill_text").innerText = text

	clone.querySelector(".remove").addEventListener("click", () => {
		stored_postcodes.delete(text);
		inputContainer.removeChild(pill)
	})

	inputContainer.insertBefore(pill, postcode_input);

	postcode_input.value = "";

	stored_postcodes.add(text)
}

function get_from_api(){
	const postcodes = [...stored_postcodes].join(",")
	const select = document.getElementById("sic_select")
	const sic = select.options[select.selectedIndex].value
	axios.get(`../api/chouse?sic=${sic}&postcodes=${postcodes}`)
		.then(response => {
			if(response.status === 200){
				const output_field = document.getElementById(`output`)
				output_field.value = ""
				response.data.forEach(company=>{
					output_field.value += `${company}\n`
				})
			} else {
				console.log(response)
			}
			document.getElementById("search_button").querySelector("span").classList.remove("hidden")
			document.getElementById("search_button").querySelector(".throbber").classList.add("hidden")
			is_clicked = false;
		})
		.catch(error => {
			document.getElementById(`output`).value = error.response.data.message;
			document.getElementById("search_button").querySelector("span").classList.remove("hidden")
			document.getElementById("search_button").querySelector(".throbber").classList.add("hidden")
			is_clicked = false;
		})
}

function get_sics(){
	axios.get(`../api/sics`)
		.then(response => {
			const sic_select = document.getElementById("sic_select")
			sic_select.innerHTML = ""
			let options = "<option disabled selected value> -- select an option -- </option>"
			for (const [sic, description] of Object.entries(response.data)) {
				options += `<option value=${sic}>${description}(${sic})</option>`
			}
			sic_select.innerHTML = options;
		})
		.catch(error => {
			console.log(error)
		})
}

postcode_input.addEventListener("keydown", (event) => {
	if (event.key === " " || event.key === "Enter") {
		event.preventDefault();
		add_pill(postcode_input.value);
	}
})

postcode_input.addEventListener("focusout", () => {
	add_pill(postcode_input.value);
})

document.getElementById("sic_search").addEventListener("input", (event) => {
	document.getElementById("sic_select").querySelectorAll("option").forEach((option) => {
		const option_text = option.innerText.toLowerCase();
		if(!option_text.includes(event.target.value.toLowerCase()) && option_text.trim() && !option_text.includes("-- select an option --")) {
			option.classList.add("hidden")
		} else {
			option.classList.remove("hidden")
		}
	})
})

document.getElementById("search_button").addEventListener("click", (event) => {
	if(is_clicked){return;}
	is_clicked = true;
	event.currentTarget.querySelector("span").classList.add("hidden")
	event.currentTarget.querySelector(".throbber").classList.remove("hidden")
	get_from_api()
})

document.addEventListener("DOMContentLoaded", () => {
	get_sics()
})