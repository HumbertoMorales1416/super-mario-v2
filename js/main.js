import Compositor from './Compositor.js';
import { createBackgroundLayer } from './layers.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprites, loadMarioSprites } from './sprites.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos) {
	return function drawSpriteLayer(context) {
		sprite.draw('idle', context, pos.x, pos.y);
	};
}

Promise.all([
	loadMarioSprites(),
	loadBackgroundSprites(),
	loadLevel('1-1'),
]).then(([marioSprite, backgroundSprites, level]) => {
	const comp = new Compositor();

	const backgroundLayer = createBackgroundLayer(
		level.backgrounds,
		backgroundSprites
	);
	comp.layers.push(backgroundLayer);

	const pos = { x: 64, y: 64 };

	const spriteLayer = createSpriteLayer(marioSprite, pos);
	comp.layers.push(spriteLayer);

	console.log(comp);
	function update() {
		comp.draw(context);
		pos.x += 2;
		pos.y += 2;
		requestAnimationFrame(update);
	}

	update();
});
