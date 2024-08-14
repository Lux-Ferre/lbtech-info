class Drawing{
    constructor() {
		this.create_canvas()
        this.canvas = $("#drawing_canvas")
		this.brush_size_slider = $("#brush_size")
		this.colour_pick_container = $("#brush_colour_container")
        this.ctx = this.canvas[0].getContext('2d')

		this.ctx.strokeStyle = "black"
		this.ctx.lineWidth = 5
		this.ctx.lineCap = "round"

		this.drawing = false

		this.basic_pallet = [
		  "#000000",
		  "#FFFFFF",
		  "#FF0000",
		  "#00FF00",
		  "#0000FF",
		  "#FFFF00",
		  "#00FFFF",
		  "#FF00FF",
		  "#FFA500",
		  "#800080"
		]

		this.add_listeners()
		this.populate_colour_picker()
    }

	create_canvas(){
		const vw = $(window).width()
		const vh = $(window).height()

		let dim = vw * 0.98

		if(dim > vh * 0.8){
			dim = vh * 0.8
		}

		$("#canvas_container").append($(`<canvas height=${dim} width=${dim} id="drawing_canvas"></canvas>`))
	}

	add_listeners(){
		this.canvas.on("mousedown touchstart", e=>{
			this.drawing = true
			this.ctx.beginPath()
			const bcr = e.target.getBoundingClientRect()
			const x = e.offsetX ?? e.targetTouches[0].clientX - bcr.x
			const y = e.offsetY ?? e.targetTouches[0].clientY - bcr.y
			this.ctx.moveTo(x, y)
			this.draw(e)
		})

		this.canvas.on("mouseup touchend touchcancel", e=>{
			this.drawing = false
		})

		this.canvas.on("contextmenu", e=>{
			e.preventDefault()
		})

		this.canvas.on("mousemove touchmove", e=>{
			this.draw(e)
		})

		this.brush_size_slider.on("input", e=>{
			const ele = $(e.target)
			this.ctx.lineWidth = ele.val()
		})

		this.colour_pick_container.on("click", e=>{
			if(e.target){
				const ele = $(e.target)
				if(ele.hasClass("colour_picker")){
					window.drawing.ctx.strokeStyle = ele.data("colour")
				}
			}
		})
	}

	draw(e){
		if (this.drawing) {
			const bcr = e.target.getBoundingClientRect()
			const x = e.offsetX ?? e.targetTouches[0].clientX - bcr.x
			const y = e.offsetY ?? e.targetTouches[0].clientY - bcr.y
			this.ctx.lineTo(x, y)
			this.ctx.stroke()
		}
	}

	populate_colour_picker(){
		this.basic_pallet.forEach(colour=>{
			let circle = $(`<div class="col-auto"><div class="colour_picker" data-colour="${colour}" style="background-color: ${colour}"></div></div>`)
			this.colour_pick_container.append(circle)
		})
	}
}

$(window).on("load", e=>{
	window.drawing = new Drawing()
})


