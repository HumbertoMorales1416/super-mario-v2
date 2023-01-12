import SpriteSheet from './SpriteSheet.js';
import { loadImage, loadLevel } from './loaders.js';

function drawBackground(background, context, sprites) {
	background.ranges.forEach(([x1, x2, y1, y2]) => {
		for (let i = x1; i < x2; i++) {
			for (let j = y1; j < y2; j++) {
				sprites.drawTile(background.tile, context, i, j);
			}
		}
	});
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('./img/tiles.png').then((image) => {
	const sprites = new SpriteSheet(image, 16, 16);
	sprites.define('ground', 0, 0);
	sprites.define('sky', 3, 23);

	loadLevel('1-1').then((level) => {
		level.backgrounds.forEach((background) => {
			drawBackground(background, context, sprites);
		});
	});
});
