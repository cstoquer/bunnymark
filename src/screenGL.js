var domUtils = require('pixelbox/domUtils');

var INT16_SIZE = 2;
//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// replace 2d canvas for a webGL canvas

var SCREEN_WIDTH  = settings.screen.width;
var SCREEN_HEIGHT = settings.screen.height;
var PIXEL_WIDTH   = settings.screen.pixelSize.width  || settings.screen.pixelSize[0];
var PIXEL_HEIGHT  = settings.screen.pixelSize.height || settings.screen.pixelSize[1];

domUtils.removeDom($screen.canvas);
var canvas = domUtils.createDom('canvas');
canvas.width  = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
canvas.style.width  = SCREEN_WIDTH  * PIXEL_WIDTH  + 'px';
canvas.style.height = SCREEN_HEIGHT * PIXEL_HEIGHT + 'px';

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// init webGL

var gl = canvas.getContext('webgl', { antialias: false });
gl.viewport(0, 0, canvas.width, canvas.height);
gl.disable(gl.BLEND);
gl.disable(gl.DEPTH_TEST);
gl.depthMask(false);

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
var DUMMY_PROGRAM = null; // TODO

function createTexture(image) {
	if (image._glTexture) return image._glTexture;

	texture = gl.createTexture();

	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_ALIGNMENT, true);

	// upload the texture to the GPU
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST); // NEAREST, LINEAR, LINEAR_MIPMAP_LINEAR, NEAREST_MIPMAP_NEAREST, NEAREST_MIPMAP_LINEAR, LINEAR_MIPMAP_NEAREST
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // CLAMP_TO_EDGE, REPEAT, MIRRORED_REPEAT
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	image._glTexture = texture;

	return texture;
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
window.gl = gl;

function GlScreen() {
	this.gl = gl;
	this.program = DUMMY_PROGRAM;
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
GlScreen.prototype.useProgram = function (program) {
	// don't call if it same program as previous draw call
	if (this.program === program) return program;

	if (this.program !== null) {
		// switch attributes
		var currentAttributes = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
		var newAttributes     = gl.getProgramParameter(program,      gl.ACTIVE_ATTRIBUTES);
		if (newAttributes > currentAttributes) {
			for (var i = currentAttributes; i < newAttributes; i++) {
				gl.enableVertexAttribArray(i);
			}
		} else if (newAttributes < currentAttributes) {
			for (var i = newAttributes; i < currentAttributes; i++) {
				gl.disableVertexAttribArray(i);
			}
		}
	}

	// switch program
	this.program = program;
	gl.useProgram(program);

	return program;
};

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
GlScreen.prototype.bindTexture = function (image, unit) {
	var texture = createTexture(image);
	gl.activeTexture(gl.TEXTURE0 + unit);
	gl.bindTexture(gl.TEXTURE_2D, texture);
};

module.exports = window.$screen = new GlScreen();
