var $screen = require('./screenGL');
var shaders = require('./shaders');


var ITEM_SIZE      = 2;
var BATCH_MAX_SIZE = 32768;
var FLOAT32_SIZE   = 4;

function Renderer() {
	this.program      = shaders.tilepoint;
	this.vertex       = new Float32Array(BATCH_MAX_SIZE * ITEM_SIZE);
	this.vertexBuffer = gl.createBuffer();

	$screen.useProgram(this.program);
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Renderer.prototype.tiles = function (image, positions) {
	var length     = positions.length;
	var batchCount = Math.ceil(length / BATCH_MAX_SIZE);
	var offset     = 0;

	for (var b = 0; b < batchCount; b++) {
		// fetch data to vertex buffer
		var count = Math.min(BATCH_MAX_SIZE, length - offset);

		for (var i = 0; i < count; i++) {
			this.vertex[i * 2]     = positions[offset + i].x;
			this.vertex[i * 2 + 1] = positions[offset + i].y;
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.vertex, gl.STATIC_DRAW);

		// upload vertex buffer
		var location = gl.getAttribLocation(this.program, 'a_coordinates');
		gl.enableVertexAttribArray(location);
		gl.vertexAttribPointer(location, ITEM_SIZE, gl.FLOAT, false, FLOAT32_SIZE * ITEM_SIZE, 0);

		// bind textures
		$screen.bindTexture(image, 0);
		var textureLocation = gl.getUniformLocation(this.program, 'u_texture');
		gl.uniform1i(textureLocation, 0);

		// draw call
		gl.drawArrays(gl.POINTS, 0, count);

		// prepare next batch
		offset += BATCH_MAX_SIZE;
	}
};

module.exports = new Renderer();
