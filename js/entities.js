import Entity from './Entity.js';
import { loadMarioSprites } from './sprites.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import Velocity from './traits/Velocity.js';

export function createMario() {
	return loadMarioSprites().then((sprite) => {
		const mario = new Entity();
		mario.size.set(16, 16);

		mario.addTrait(new Go());
		mario.addTrait(new Jump());
		//mario.addTrait(new Velocity());

		mario.draw = function drawMario(context) {
			sprite.draw('idle', context, this.pos.x, this.pos.y);
		};

		return mario;
	});
}
