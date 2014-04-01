(function() {
'use strict';

function Layer(pxpx) {
	this.pxpx = pxpx;

	this.type = 'hat';

	for (var i=+(this.data=[]); i<32; this.data[i++] = new Array(32));
}

Layer.types = [
	'hat',
	'hair',
	'glasses',
	'jacket',
	'shirt',
	'skin',
];

PixelPixel.Layer = Layer;

})();
