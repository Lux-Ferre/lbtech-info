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
			$(".cell_pmp", new_row).text(product.price_marked==="TRUE" ? "✔️":"❌")
			$(".input_qty", new_row).attr("data-idx", idx)
			table.append(new_row)
		}
	}
}

window.barrs = new Barrs()