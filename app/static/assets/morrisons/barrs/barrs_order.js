class Barrs {
    constructor() {
        this.products = {}
        this.order_size = 0

        this.load_products()
    }

    load_products() {
        import("./barrs_details.js").then(mod => {
            this.products = JSON.parse(mod.barrs_details)
            for (const idx of Object.keys(this.products)) {
                this.products[idx].qty = 0
                this.products[idx].price_marked = this.products[idx].price_marked === "TRUE"
            }
            this.populate_table()
        })
    }

    populate_table() {
        const table = $("#table_body")
        const template = $("#row_template")

        for (const [idx, product] of Object.entries(this.products)) {
            let new_row = template.prop("content").cloneNode(true)

            $(".cell_description", new_row).text(product.simplified_description)
            $(".cell_size", new_row).text(product.size)
            $(".cell_pmp", new_row).text(product.price_marked ? "✔️" : "❌")
            $("tr", new_row).attr("data-idx", idx)
            table.append(new_row)
        }
    }

    update_table() {
        const pmp_unfiltered = !($("#input_pmp").is(':checked'))
        const size_value = $("#input_size").find(":selected").val()
        const search_value = $("#input_search").val().toLowerCase()
        $("tr", "#table_body").each((i, e) => {
            let visible = true
            const ele = $(e)
            const idx = $(ele).data("idx")

            if (!(pmp_unfiltered || this.products[idx].price_marked)) {
                visible = false
            }

            if (!(size_value === "any" || size_value === this.products[idx].size)) {
                visible = false
            }

            if (!(search_value === "" || this.products[idx].simplified_description.toLowerCase().includes(search_value))) {
                visible = false
            }

            if (visible) {
                ele.removeClass("d-none")
            } else {
                ele.addClass("d-none")
            }
        })
    }

    create_csv() {
        const headers = []
        $(".form-check-input", $("#save_modal")).each((i, e) => {
            const ele = $(e)
            if (ele.is(":checked")) {
                headers.push(ele.data("col"))
            }
        })

        if (headers.length < 1) {
            return
        }

        let csv_string = headers.join(",") + "\n"

        for (const product of Object.values(barrs.products)) {
            if (product.qty > 0) {
                const data = []
                headers.forEach(col => {
                    data.push(product[col])
                })

                csv_string += (data.join(",") + "\n")
            }
        }

        const filename = `barrs_order_${new Date().toLocaleDateString("de-DE")}.csv`

        let file = new File([csv_string], filename, {type: "text/csv;charset=utf-8"})
        saveAs(file)
    }

    create_pdf() {
        const headers = []
        $(".form-check-input", $("#save_modal")).each((i, e) => {
            const ele = $(e)
            if (ele.is(":checked")) {
                headers.push(ele.data("col"))
            }
        })

        if (headers.length < 1) {
            return
        }

        const {jsPDF} = window.jspdf
        const doc = new jsPDF("landscape")
        doc.text("Barr's Order", 10, 10)

        const table_data = []
        for (const product of Object.values(barrs.products)) {
            if (product.qty > 0) {
                const row_data = [];
                headers.forEach(col => {
                    row_data.push(product[col]);
                });
                table_data.push(row_data);
            }
        }

        doc.autoTable({
            head: [headers],
            body: table_data,
        })

        const filename = `barrs_order_${new Date().toLocaleDateString("de-DE")}.pdf`

        doc.save(filename);
    }
}

window.barrs = new Barrs()

$("#input_pmp").on("input", e => {
    barrs.update_table()
})

$("#input_size").on("input", e => {
    barrs.update_table()
})

$("#input_search").on("input", e => {
    barrs.update_table()
})

$("#input_save").on("click", e => {
    $("#save_order_size").text(`Order size: ${barrs.order_size}`)
    $("#save_modal").modal("show")
})

$("#save_csv").on("click", e => {
    barrs.create_csv()
})

$("#save_pdf").on("click", e => {
    barrs.create_pdf()
})

$("#table_body").on('input', '.input_qty', e => {
    const qty = parseInt($(e.target).val())
    const idx = $(e.target).parent().parent().data("idx")
    barrs.products[idx].qty = qty
    barrs.order_size = 0
    Object.values(barrs.products).forEach(product => {
        barrs.order_size += product.qty
    })
})