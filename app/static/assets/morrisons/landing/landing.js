$("#mylearning_card").on("click", e =>{
    window.location.href = "https://morrisons.kallidus-suite.com/external"
})
$("#verisae_card").on("click", e =>{
    window.location.href = "https://eam.verisae.co.uk/"
})
$("#recs_card").on("click", e =>{
    window.location.href = $("#flask_data").data("recs")
})
$("#guide_card").on("click", e =>{
    $("#password_modal").modal("show")
})

$("#password_input_submit").on("click", e =>{
    const input = $("#password_input")
    const pass = input.val()
    input.val("")

    $("#password_modal").modal("hide")

    if (pass === "2241"){
        window.location.href = "https://tinyurl.com/2241guide"
    } else {
        window.alert("Password incorrect!")
    }
})

$("#barrs_card").on("click", e =>{
    window.location.href = "https://tinyurl.com/4davs5a4"
})