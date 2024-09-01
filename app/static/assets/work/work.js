const info_bar = $('#info_bar')
const parent_container = $('#work_background')

parent_container.on('scroll', e => {
	// Calculate the scroll position of the page as a percentage
	const ele = $(e.currentTarget)
	const scroll_percentage = Math.floor(ele.scrollTop() / ele.prop('scrollHeight') * 100) / 100
	console.log(scroll_percentage)

	// Set the scroll position of the inner div based on this percentage
	info_bar.scrollTop(scroll_percentage * info_bar.prop('scrollHeight'))
	console.log(info_bar.scrollTop())
})