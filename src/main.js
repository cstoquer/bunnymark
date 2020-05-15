var domUtils = require('pixelbox/domUtils');

var SCREEN_WIDTH  = settings.screen.width;
var SCREEN_HEIGHT = settings.screen.height;

var BUNNY_BATCH_SIZE = 97;
var MAX_SPEED        = 16;
var bunnies          = [];
var nBunnies         = 0;
var currentSprite    = 0;

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
var stats = new Stats();
stats.domElement.className = 'stats';
document.body.appendChild(stats.domElement);

var bunniesCounter = domUtils.createDiv('bunniesCounter', stats.domElement);


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
function Bunny() {
	this.sprite = currentSprite;
	this.x  = (Math.random()) * 20;
	this.y  = (Math.random()) * 20;
	this.sx = (Math.random() - 0.5) * MAX_SPEED;
	this.sy = (Math.random() - 0.5) * MAX_SPEED;
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
function addBunny(count) {
	for (var i = 0; i < count; i++) {
		bunnies.push(new Bunny());
	}
	nBunnies += count;
	bunniesCounter.innerText = 'bunnies: ' + nBunnies;
}

addBunny(2);
paper(1);

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Update is called once per frame
exports.update = function () {
	cls();

	for (var i = 0; i < nBunnies; i++) {
		var bunny = bunnies[i];
		bunny.x += bunny.sx;
		bunny.y += bunny.sy;

		if (bunny.x > SCREEN_WIDTH  && bunny.sx > 0 || bunny.x < -16 && bunny.sx < 0) bunny.sx *= -1;
		if (bunny.y > SCREEN_HEIGHT && bunny.sy > 0 || bunny.y < -16 && bunny.sy < 0) bunny.sy *= -1;

		sprite(bunny.sprite, bunny.x, bunny.y);
	}

	if (btnp.A) currentSprite = (currentSprite + 1) % 5;
	if (btn.A) addBunny(BUNNY_BATCH_SIZE);

	stats.update();
};
