(function() {
'use strict';

function Pallet(pxpx) {
	this.pxpx = pxpx;

	this.ui = document.createElement('div');

	pxpx.on('layerchange', function() {
		// show new pallet
	});
}

PixelPixel.Pallet = Pallet;

})();
