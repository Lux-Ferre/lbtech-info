class Barrs{
	constructor(){
		this.products = {}

		this.load_products()
	}

	load_products(){
		import("./barrs_details.js").then(mod=>{
			this.products = JSON.parse(mod.barrs_details)
			for (const idx of Object.keys(this.products)){
				this.products[idx].qty = 0
				this.products[idx].price_marked = this.products[idx].price_marked === "TRUE"
			}
			this.populate_table()
		})
	}

	populate_table(){
		const table = $("#table_body")
		const template = $("#row_template")

		for (const [idx, product] of Object.entries(this.products)){
			let new_row = template.prop("content").cloneNode(true)

			$(".cell_description", new_row).text(product.simplified_description)
			$(".cell_size", new_row).text(product.size)
			$(".cell_pmp", new_row).text(product.price_marked ? "✔️":"❌")
			$("tr", new_row).attr("data-idx", idx)
			table.append(new_row)
		}
	}

	update_table_visibility(){
		const pmp_unfiltered = !($("#input_pmp").is(':checked'))
		const size_value = $("#input_size").find(":selected").val()
		$("tr", "#table_body").each((i, e)=>{
			let visible = true
			const ele = $(e)
			const idx = $(ele).data("idx")

			if(!(pmp_unfiltered || this.products[idx].price_marked)){
				visible = false
			}

			if(!(size_value === "any" || size_value === this.products[idx].size)){
				visible = false
			}

			if(visible){
				ele.removeClass("d-none")
			} else {
				ele.addClass("d-none")
			}
		})
	}
}

window.barrs = new Barrs()

$("#input_pmp").on("input", e=>{
	barrs.update_table_visibility()
})

$("#input_size").on("input", e=>{
	barrs.update_table_visibility()
})