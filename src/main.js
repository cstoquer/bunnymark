var domUtils = require('pixelbox/domUtils');

var SCREEN_WIDTH  = settings.screen.width;
var SCREEN_HEIGHT = settings.screen.height;

var BUNNY_BATCH_SIZE = 1000;
var MAX_SPEED = 4;
var bunnies = [];

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
var stats = new Stats();
stats.domElement.className = 'stats';
document.body.appendChild(stats.domElement);

var bunniesCounter = domUtils.createDiv('bunniesCounter', stats.domElement);


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
function Bunny() {
	this.x  = (Math.random()) * SCREEN_WIDTH;
	this.y  = (Math.random()) * SCREEN_HEIGHT;
	this.sx = (Math.random() - 0.5) * MAX_SPEED;
	this.sy = (Math.random() - 0.5) * MAX_SPEED;
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
function addBunny(count) {
	for (var i = 0; i < count; i++) {
		bunnies.push(new Bunny());
	}
	bunniesCounter.innerText = 'bunnies: ' + bunnies.length;
}

addBunny(BUNNY_BATCH_SIZE);

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Update is called once per frame
exports.update = function () {
	cls();

	for (var i = 0; i < bunnies.length; i++) {
		var bunny = bunnies[i];
		bunny.x += bunny.sx;
		bunny.y += bunny.sy;

		if (bunny.x > SCREEN_WIDTH  && bunny.sx > 0 || bunny.x < 0 && bunny.sx < 0) bunny.sx *= -1;
		if (bunny.y > SCREEN_HEIGHT && bunny.sy > 0 || bunny.y < 0 && bunny.sy < 0) bunny.sy *= -1;

		draw(assets.bunny, bunny.x, bunny.y);
	}


	if (btn.A) {
		addBunny(BUNNY_BATCH_SIZE);
		console.log(bunnies.length);
	}

	stats.update();
};
