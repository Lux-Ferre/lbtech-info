class Recs{
	getValue(elementName){
		let elementValue = document.getElementById(elementName).value

		if (elementValue === ""){
			elementValue = 0
		} else {
			elementValue = parseFloat(elementValue)
		}
		return elementValue
	}


	calcVals() {
		let slipSaleTotal = 0
		let officeSaleTotal = 0
		let officePrizeTotal = 0

		for (let i = 1; i < 7; i++) {
			const elementId = "slipInput" + i
			const elementValue = this.getValue(elementId)
			slipSaleTotal += elementValue
		}

		const cancels = this.getValue("slipCancels")
		slipSaleTotal -= cancels

		document.getElementById("slipSalesOut").value = slipSaleTotal

		const lottoPrizes = this.getValue("slipLottoPrizes")

		let instantPrizes = this.getValue("slipInstantPrizes")

		const slipPrizeTotal = lottoPrizes + instantPrizes

		document.getElementById("slipPrizeOut").value = slipPrizeTotal

		for (let i = 1; i < 7; i++) {
			const elementId = "officeInput" + i
			const elementValue = this.getValue(elementId)

			officeSaleTotal += elementValue
		}

		document.getElementById("actualSalesOut").value = officeSaleTotal

		for (let i = 1; i < 4; i++) {
			const elementId = "officePrizes" + i
			const elementValue = this.getValue(elementId)

			officePrizeTotal += elementValue
		}

		document.getElementById("actualPrizeOut").value = officePrizeTotal

		const saleVariance = officeSaleTotal - slipSaleTotal
		document.getElementById("saleVariance").value = saleVariance

		const prizeVariance = officePrizeTotal - slipPrizeTotal
		document.getElementById("prizeVariance").value = prizeVariance
	}
}

const recs_functions = new Recs()
