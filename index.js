/*

Exécuter: npn install url
          npm install express
*/

var http = require('http');
var url = require('url');
var fs = require('fs');

function randomBetweenInclused(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function getRandomPeople(response, parsedUrl) {
	var qtyToGenerate = parsedUrl.query.count >= 1 ? parsedUrl.query.count : 1;
	
	var firstNamesMale = ["Luc", "Paul", "Jean", "Yves"];
	var firstNamesFemale = ["Marie", "Clochette", "Elise", "Naomi"];
	var lastNames = ["Dupont", "Litter", "Rottard", "Cuendet"];
	var responseContents = [];

	for (var i = 0; i < qtyToGenerate; i++) {
		
		var male = Math.random() > 0.5;
		var firstNameArray = male ? firstNamesMale : firstNamesFemale;
		var firstName = firstNameArray[randomBetweenInclused(0, firstNameArray.length - 1)];
		var lastName = lastNames[randomBetweenInclused(0, lastNames.length - 1)];
		
		responseContents.push({'firstname': firstName, 'lastname': lastName, 'sex': male ? 'male' : 'female'});
	}

	response.writeHead(200, {'Content-Type': 'text/plain' });
	response.end(JSON.stringify(responseContents));
}

function getRooms(response) {
	response.writeHead(200, {'Content-Type': 'text/plain' });
	response.end("Insert rooms here:<br />Room: A38, 50<br />Room: B22, 40<br />Room: C18, 200");
}

function readStaticFile(response, path, mime) {
	fs.readFile("static" + path, function (err, content) {
		if (err) {
			throw err; 
		}  
	
		response.writeHeader(200, {"Content-Type": mime});  
		response.write(content);  
		response.end();  
	});
}


http.createServer(function (request, response) {
	
	var parsedUrl = url.parse(request.url, true);
	var requestedPage = parsedUrl.pathname;
	
	console.log(requestedPage);
	
	switch (requestedPage) {
		case '/people':
			getRandomPeople(response, parsedUrl);
		break;
		case '/rooms':
			getRooms(response);
		break;
		case '/index.html':
			readStaticFile(response, requestedPage, "text/html");
		break;
		case '/js/custom/main.js':
			readStaticFile(response, requestedPage, "application/javascript");
		break;
		default:
		break;
    }
	
}).listen((process.env.PORT || 5000));

