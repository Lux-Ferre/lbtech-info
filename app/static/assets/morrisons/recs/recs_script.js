class Recs{
	constructor() {
		this.draw_sales = $(".draw_sales")
		this.draw_cancels = $(".draw_cancels")
		this.draw_prizes = $(".draw_prizes")
		this.scratch_prizes = $(".scratch_prizes")
		this.till_prizes = $(".till_prizes")
		this.till_sales = $(".till_sales")
		this.result_slip_sales = $("#result_slip_sales")
		this.result_slip_prizes = $("#result_slip_prizes")
		this.result_till_sales = $("#result_till_sales")
		this.result_till_prizes = $("#result_till_prizes")
		this.result_sales_var = $("#result_sales_var")
		this.result_prizes_var = $("#result_prizes_var")

		this.current_body = 0
	}

	navigate(dir){
		this.current_body = (this.current_body + dir).mod(4)
		for (let i = 0; i < 4; i++) {
			if(i===this.current_body){
				$(`#body_${i}`).removeClass("d-none")
			} else {
				$(`#body_${i}`).addClass("d-none")
			}
		}
	}

	calculate_results(){
		let slip_sales = 0
		this.draw_sales.each((i, e)=>{
			slip_sales += parseInt($(e).val() || 0)
		})
		slip_sales -= parseInt(this.draw_cancels.val() || 0)

		let slip_prizes = 0
		slip_prizes += parseInt(this.draw_prizes.val() || 0)
		slip_prizes += parseInt(this.scratch_prizes.val() || 0)

		let total_till_sales = 0
		this.till_sales.each((i, e)=>{
			total_till_sales += parseInt($(e).val() || 0)
		})

		let total_till_prizes = 0
		this.till_prizes.each((i, e)=>{
			total_till_prizes += parseInt($(e).val() || 0)
		})

		const prize_var = total_till_prizes - slip_prizes
		const sales_var = slip_sales - total_till_sales

		this.result_slip_sales.val(slip_sales)
		this.result_slip_prizes.val(slip_prizes)
		this.result_till_sales.val(total_till_sales)
		this.result_till_prizes.val(total_till_prizes)
		this.result_sales_var.val(sales_var)
		this.result_prizes_var.val(prize_var)
	}

}

Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
}

window.recs = new Recs()

$("#recs_nav_left").on("click", e =>{
	recs.navigate(-1)
})

$("#recs_nav_right").on("click", e =>{
	recs.navigate(1)
})

$("input", $(".input_body")).on("input", e=>{
	recs.calculate_results()
})