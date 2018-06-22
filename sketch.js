let r, g, b;
let database;

function pickColor()
{
	r = floor(random(256));
	g = floor(random(256));
	b = floor(random(256));
	background(r, g, b);
}

function setup() {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBblCJZd2Q408bq3m5IZqjgdBxSx5I283c",
		authDomain: "color-classification-93ad6.firebaseapp.com",
		databaseURL: "https://color-classification-93ad6.firebaseio.com",
		projectId: "color-classification-93ad6",
		storageBucket: "",
		messagingSenderId: "199496551839"
	};
	firebase.initializeApp(config);
	database = firebase.database();

	createCanvas(200, 200);

	pickColor();
	//color-classification-93ad6

	let buttons = [];
	buttons.push(createButton('red-ish'));
	buttons.push(createButton('orange-ish'));
	buttons.push(createButton('yellow-ish'));
	buttons.push(createButton('green-ish'));
	buttons.push(createButton('blue-ish'));
	buttons.push(createButton('indigo-ish'));
	buttons.push(createButton('purple-ish'));
	buttons.push(createButton('brown-ish'));
	buttons.push(createButton('pink-ish'));
	buttons.push(createButton('white-ish'));
	buttons.push(createButton('black-ish'));
	buttons.push(createButton('gray-ish'));

	for (let i = 0; i<buttons.length; i++) {
		buttons[i].mousePressed(sendData);
	}
}

// send data to firebase
function sendData() {

	let colorDatabase = database.ref('colors');

	var data = {
		r: r,
		g: g,
		b: b,
		label: this.html()
	}

	console.log("Saving dat...");
	console.log(data);

	let color = colorDatabase.push(data, finished);
	console.log("Firebase generated key: " + color.key);

	// Reload the data for the page
	function finished (err) {
		if (err){
			console.error("oops, something went wrong.");
			console.error(err);
		} else {
			console.log("Data saved successfully");
			pickColor();
		}
	}
	//console.log(this.html());
}
