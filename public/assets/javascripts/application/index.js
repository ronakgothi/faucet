$(function() {
	var loader = $(".loading-container");
	$( "#faucetForm" ).submit(function( e ) {
		e.preventDefault();
    	$this = $(this);
		loader.removeClass("hidden");
		var receiver = $("#receiver").val();
    var captcha =  $("#g-recaptcha-response").val();
		$.ajax({
		  	url:"/",
		  	type:"POST",
		  	data: {
		  		receiver: receiver,
          captcha: captcha
		  	}
		}).done(function(data) {
			if (!data.success) {
				loader.addClass("hidden");
				swal(data.error.title, data.error.message, "error");
				return;
			}

			getTxCallBack(data.success.txHash, function() {
				$("#receiver").val('');
				loader.addClass("hidden");
				swal("Success",
				  "15 XDC is successfully transfered to " + receiver +" in Tx<br /><a href='http://www.xinfin.info/" + data.success.txHash + "' target='_blank'>" + data.success.txHash + "</a>",
				  "success"
				);
				grecaptcha.reset();
			});
		}).fail(function(err) {
			loader.addClass("hidden");
		});
	});
});
