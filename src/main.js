var renderer = require('./Renderer');

var BUNNY_BATCH_SIZE = 1000;
var MAX_SPEED = 0.04;
var bunnies = [];

function addBunny(count) {
	for (var i = 0; i < count; i++) {
		bunnies.push({
			x:  (Math.random() - 0.5) * 2,
			y:  (Math.random() - 0.5) * 2,
			sx: (Math.random() - 0.5) * MAX_SPEED,
			sy: (Math.random() - 0.5) * MAX_SPEED,
		});
	}
}

addBunny(BUNNY_BATCH_SIZE);

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Update is called once per frame
exports.update = function () {
	// Clear canvas color as well as the depth buffer.
	gl.clearColor(0.4, 0.4, 0.4, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	for (var i = 0; i < bunnies.length; i++) {
		var bunny = bunnies[i];
		bunny.x += bunny.sx;
		bunny.y += bunny.sy;

		if (bunny.x > 1 && bunny.sx > 0 || bunny.x < -1 && bunny.sx < 0) bunny.sx *= -1;
		if (bunny.y > 1 && bunny.sy > 0 || bunny.y < -1 && bunny.sy < 0) bunny.sy *= -1;
	}

	renderer.tiles(assets.bunny, bunnies);

	if (btnp.A) {
		addBunny(BUNNY_BATCH_SIZE);
		console.log(bunnies.length);
	}
};
