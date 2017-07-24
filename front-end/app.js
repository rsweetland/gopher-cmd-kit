futLogIn(function(FUT) {

	FUT.fetchSettings(function(settings, err) {
		FUT.populateSettingsForm('.settings-form', '.fut-setting', settings);
		$('#memorize-settings').removeClass('hide');
	});

	$('.settings-form').submit(function() {
		FUT.submitSettingsForm(this, '.fut-setting');
		return false;
	});
});