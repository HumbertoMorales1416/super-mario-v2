import Timer from './Timer.js';
import { createMario } from './entities.js';
import { setupKeyboard } from './inputs.js';
import { createCollisionLayer } from './layers.js';
import { loadLevel } from './loaders.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([createMario(), loadLevel('1-1')]).then(([mario, level]) => {
	mario.pos.set(64, 180);

	level.entities.add(mario);

	const input = setupKeyboard(mario);
	input.listenTo(window);

	const timer = new Timer();
	timer.update = function update(deltaTime) {
		level.update(deltaTime);
		level.comp.draw(context);
	};

	timer.start();
});
