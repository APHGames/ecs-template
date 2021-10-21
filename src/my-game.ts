import * as ECS from '../libs/pixi-ecs';
import * as PIXI from 'pixi.js';

// TODO rename your game
class MyGame {
	engine: ECS.Engine;

	constructor() {
		this.engine = new ECS.Engine();
		let canvas = (document.getElementById('gameCanvas') as HTMLCanvasElement);

		// init the game loop
		this.engine.init(canvas, {
			resizeToScreen: true,
			width: 800,
			height: 600,
			resolution: 1,
			flagsSearchEnabled: false, // searching by flags feature
			statesSearchEnabled: false, // searching by states feature
			tagsSearchEnabled: false, // searching by tags feature
			namesSearchEnabled: true, // searching by names feature
			notifyAttributeChanges: false, // will send message if attributes change
			notifyStateChanges: false, // will send message if states change
			notifyFlagChanges: false, // will send message if flags change
			notifyTagChanges: false, // will send message if tags change
			debugEnabled: false // debugging window
		});

		this.engine.app.loader
			.reset()
			.add('ghost', 'assets/ghost.png') // load your assets here
			.load(() => this.onAssetsLoaded());
	}

	onAssetsLoaded() {
		// init the scene and run your game
		let scene = this.engine.scene;

		// a little hack that generates a loop with 100 runs
		Array(100).fill(0, 0, 100).forEach(() => {
			new ECS.Builder(scene)
				// random position anywhere in the scene
				.localPos(Math.random() * this.engine.app.screen.width, Math.random() * this.engine.app.screen.height)
				.anchor(0.5)
				.scale(0.15)
				.withParent(scene.stage)
				.withComponent(new ECS.FuncComponent('rotation').doOnUpdate((cmp, delta, absolute) => cmp.owner.rotation += 0.001 * delta))
				.asSprite(PIXI.Texture.from('ghost'))
				.build();
		});

		new ECS.Builder(scene)
			.localPos(this.engine.app.screen.width / 2, this.engine.app.screen.height / 2)
			.anchor(0.5)
			.withParent(scene.stage)
			.withComponent(new ECS.FuncComponent('rotation').doOnUpdate((cmp, delta, absolute) => cmp.owner.rotation += 0.001 * delta))
			.asText('Hello World', new PIXI.TextStyle({ fill: '#FF0000', fontSize: 80, fontFamily: 'Courier New' }))
			.build();
	}
}

// this will create a new instance as soon as this file is loaded
export default new MyGame();