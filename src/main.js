var renderer = require('./Renderer');
var domUtils = require('pixelbox/domUtils');

var BUNNY_BATCH_SIZE = 997;
var MAX_SPEED        = 0.04;
var bunnies          = [];
var nBunnies         = 0

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
var stats = new Stats();
stats.domElement.className = 'stats';
document.body.appendChild(stats.domElement);

var bunniesCounter = domUtils.createDiv('bunniesCounter', stats.domElement);

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
function Bunny() {
	this.x  = (Math.random() - 0.5) * 2;
	this.y  = (Math.random() - 0.5) * 2;
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

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Update is called once per frame
exports.update = function () {
	// Clear canvas color as well as the depth buffer.
	gl.clearColor(0.4, 0.4, 0.4, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	for (var i = 0; i < nBunnies; i++) {
		var bunny = bunnies[i];
		bunny.x += bunny.sx;
		bunny.y += bunny.sy;

		if (bunny.x > 1 && bunny.sx > 0 || bunny.x < -1 && bunny.sx < 0) bunny.sx *= -1;
		if (bunny.y > 1 && bunny.sy > 0 || bunny.y < -1 && bunny.sy < 0) bunny.sy *= -1;
	}

	renderer.tiles(assets.bunny, bunnies);

	if (btn.A) addBunny(BUNNY_BATCH_SIZE);

	stats.update();
};
