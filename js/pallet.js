(function() {
'use strict';

function Pallet(pxpx) {
	var self = this;

	this.pxpx = pxpx;

	this.ui = document.createElement('div');
	this.ui.className = 'pallet';

	this.pen = document.createElement('div');
	this.ui.appendChild(this.pen);
	this.pen.className = 'pen';

	pxpx.on('penchange', function() {
		self.pen.style.background = self.pxpx.pen;
	});

	pxpx.emit('penchange');

	pxpx.on('layerchange', function() {
		// show new pallet
	});
}

PixelPixel.Pallet = Pallet;

})();
