(function() {
'use strict';

function PixelPixel() {
	var self = this;

	this._event = {};

	this.layer = 0;
	this.layers = [];
	this.addLayer();

	this.pen = 'black';

	this.ui = document.createElement('div');

	this.pallet = new PixelPixel.Pallet(this);
	this.ui.appendChild(this.pallet.ui);

	this.canvas = document.createElement('canvas');
	this.ui.appendChild(this.canvas);

	this.ctx = this.canvas.getContext('2d');
	this.ctx.webkitImageSmoothingEnabled = false;

	this.canvas.width =
	this.canvas.height = Math.floor(Math.min(screen.width, screen.height) / 32) * 32;

	this.canvas.oncontextmenu = function contextmenu(event) {
		if (!event.shiftKey) {
			event.preventDefault();
			return false;
		}
	};

	var drawing = false;
	var color = 'black';
	this.canvas.onmousedown = function mousedown(event) {
		drawing = true;
		color = event.button == 0 ? self.pen : undefined;
		this.onmousemove(event);
	};

	this.canvas.onmouseup = function mouseup() {
		drawing = false;
	};

	this.canvas.onmousemove = function mousemove(event) {
		if (!drawing)
			return;

		var x = Math.floor(event.offsetX / self.canvas.clientWidth * 32);
		var y = Math.floor(event.offsetY / self.canvas.clientHeight * 32);

		self.layers[self.layer].data[y][x] = color;

		self.draw();
		self.drawGrid();
	};

	(window.onresize = function resize() {
		var size = Math.min(window.innerWidth, window.innerHeight);
		self.canvas.width =
		self.canvas.height = size;
		self.draw();
		self.drawGrid();
	})();
}

PixelPixel.prototype.on = function(event, callback) {
	if (!Object.hasOwnProperty.call(this._event, event))
		this._event[event] = [];

	this._event[event].push(callback);
};

PixelPixel.prototype.emit = function trigger(event, data) {
	if (!Object.hasOwnProperty.call(this._event, event))
		throw new Error('Unknown event ' + event);

	this._event[event].forEach(function(callback) {
		callback(data);
	});
};

PixelPixel.prototype.addLayer = function addLayer() {
	this.layers.push(new PixelPixel.Layer(this));
};

PixelPixel.prototype.selectLayer = function selectLayer(n) {
	this.selectedLayer = n;
};

PixelPixel.prototype.draw = function draw() {
	var px = this.canvas.width / 32;

	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// render layers
	for (var i=0; i<this.layers.length; i++) {
		for (var y=0; y<32; y++) {
			for (var x=0; x<32; x++) {
				this.ctx.fillStyle = this.layers[i].data[y][x] || 'transparent';
				this.ctx.fillRect(
					Math.floor(x * px), Math.floor(y * px),
					Math.ceil(px), Math.ceil(px)
				);
			}
		}
	}
};

PixelPixel.prototype.drawGrid = function drawGrid() {
	var px = this.canvas.width / 32;

	this.ctx.strokeStyle = '#eee';
	this.ctx.strokeWidth = 1;
	this.ctx.beginPath();

	for (var y=1; y<32; y++) {
		this.ctx.moveTo(0, Math.floor(y * px) + 0.5);
		this.ctx.lineTo(this.canvas.width, Math.floor(y * px) + 0.5);
	}

	for (var x=1; x<32; x++) {
		this.ctx.moveTo(Math.floor(x * px) + 0.5, 0);
		this.ctx.lineTo(Math.floor(x * px) + 0.5, this.canvas.height);
	}

	this.ctx.stroke();
	this.ctx.closePath();
};

window.PixelPixel = PixelPixel;

window.onload = function() {
	window.pxpx = new PixelPixel();
	document.body.appendChild(window.pxpx.ui);
};

})();
