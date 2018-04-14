function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
}


function onDeviceReady() {
	navigator.notification.beep(2);
	deviceInfo();
}

function deviceInfo() {

	info =  'Device Model   : '    + device.model + '<br>' + 
			'Device Name    : '     + device.name + '<br>' + 
			'Device Cordova : '  + device.cordova + '<br>' + 
			'Device Platform: ' + device.platform + '<br>' + 
			'Device UUID    : '     + device.uuid + '<br>' + 
			'Device Version : '  + device.version + '<br>';

	document.getElementById("deviceDetails").innerHTML = info;	
}


// funkcja zapisująca dane do bazy firebase.

function addNewWord() {

	$( "#slowopl" ).html("");
	$( "#slowoen" ).html("");
  firebase.database().ref('wordlists/' + $('#selectlist').val()).push({
	polish: $('#textarea1').val(),
	english:  $('#textarea2').val(),
  });
  showWordsList()
}
			
var wordsOutput = '';	// zmienna stworzona by pozniej przypisac do niej output z bazy
			

function showWordsList() {
	
	$( "#slowopl" ).html("");
	$( "#slowoen" ).html("");
		
	var ref = firebase.database().ref();

	ref.on("value", function(snapshot) {
	 // console.log(snapshot.val());
	}, function (error) {
	   console.log("Error: " + error.code);
	});	
	
	var refWordlists = firebase.database().ref('wordlists');

	/*
	refWordlists.on("value", function(snapshot) {
	   console.log(snapshot.val());
	}, function (error) {
	   console.log("Error: " + error.code);
	});
	*/
	
	var refWordlistsList = refWordlists.child('Ludzie');

	/*
	refWordlistsList.on("value", function(snapshot) {
	   console.log(snapshot.val());
	}, function (error) {
	   console.log("Error: " + error.code);
	});
	*/
	
	var refWordlistsList = refWordlists.child('Ludzie');
	
	
	refWordlistsList.on("child_added", function(snapshot) {
		wordsOutput = snapshot.val().slowopl;
	  // console.log(snapshot.val().slowopl);
		
	}, function (error) {
	   console.log("Error: " + error.code);
	});
	
	
	refWordlists.on('value', function(snap){
	//console.log(JSON.stringify(snap.val(), null, 4));
	//document.getElementById("words").innerHTML = "<pre>" + JSON.stringify(snap.val(), null, 4) + "</pre>";
	})
	
	/*
	refWordlists.child('Ludzie').on('child_added', function(snap){
	console.log(JSON.stringify(snap.val(), null, 4));
	document.getElementById("slowopl").innerHTML = "<pre>" + JSON.stringify(snap.val(), null, 4) + "</pre>";
	})
	*/
	
	refWordlists.child('Ludzie').on('value', function(snap){
			
		snap.forEach(function(childSnapshot) {
			var snapshot = childSnapshot.val();
		console.log(snapshot.english);
		console.log(snapshot.polish);

			
		$( "#slowopl" ).append(snapshot.polish + " - PL <br>");
		$( "#slowoen" ).append(snapshot.english +  " - EN <br>");
		
		
		})
		
		
		
	})
	
	
	
}




