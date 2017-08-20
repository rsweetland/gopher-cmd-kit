function onAuthSuccess() {
	$('#setup-complete').removeClass('hide');
	$('#command-settings').hide();
}

gopherLogIn(function(gopher) {});