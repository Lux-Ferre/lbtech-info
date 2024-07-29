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

	update_table(){
		const pmp_unfiltered = !($("#input_pmp").is(':checked'))
		const size_value = $("#input_size").find(":selected").val()
		const search_value = $("#input_search").val().toLowerCase()
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

			if(!(search_value === "" || this.products[idx].simplified_description.toLowerCase().includes(search_value))){
				visible = false
			}

			if(visible){
				ele.removeClass("d-none")
			} else {
				ele.addClass("d-none")
			}
		})
	}

	create_csv(){
		const headers = []
		$(".form-check-input", $("#save_modal")).each((i, e)=>{
			const ele = $(e)
			if(ele.is(":checked")){
				headers.push(ele.data("col"))
			}
		})

		if(headers.length < 1){return}

		let csv_string = headers.join(",") + "\n"

		$("tr", "#table_body").each((i, e)=>{
			const ele = $(e)
			const idx = $(ele).data("idx")

			const qty = parseInt($(".input_qty", ele).val() || "0")

			if(qty>0){
				const data = []
				headers.forEach(col=>{
					if(col==="qty"){
						data.push(qty)
					} else {
						data.push(barrs.products[idx][col])
					}
				})

				csv_string += (data.join(",") + "\n")
			}
		})

		let file = new File([csv_string], "order.csv", { type: "text/csv;charset=utf-8" })
		saveAs(file)
	}
}

window.barrs = new Barrs()

$("#input_pmp").on("input", e=>{
	barrs.update_table()
})

$("#input_size").on("input", e=>{
	barrs.update_table()
})

$("#input_search").on("input", e=>{
	barrs.update_table()
})

$("#input_save").on("click", e=>{
	$("#save_modal").modal("show")
})

$("#save_save").on("click", e=>{
	barrs.create_csv()
})

$("#table_body").on('input', '.input_qty', e=>{
	const qty = parseInt($(e.target).val())
	const idx = $(e.target).parent().parent().data("idx")
	barrs.products[idx].qty = qty
	barrs.order_size = 0
	Object.values(barrs.products).forEach(product=>{
		barrs.order_size += product.qty
	})
});