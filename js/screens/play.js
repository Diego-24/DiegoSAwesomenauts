game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		/*loads level01*/
		me.levelDirector.loadLevel("level01");

		this.resetPlayer(0, 420);

		/*adds the player by pulling from pool*/
		var player = me.pool.pull("player", 0, 420, {});
		/*adds player to the game*/
		me.game.world.addChild(player, 5);

		var gamemanager = me.pool.pull("GameManager", 0, 0, {});
		/*adds the gamemanager to the game*/
		me.game.world.addChild(gamemanager, 0);

		/*binds the right key so when pressed the player moves right*/
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		/*binds the left key so when pressed the player moves left*/
		me.input.bindKey(me.input.KEY.LEFT, "left");
		/*binds the up key so when pressed the player jumps*/
		me.input.bindKey(me.input.KEY.UP, "jump");
		/*binds the A key so when pressed the player attacks*/
		me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		/*plays the song in the background when the game starts*/
		me.audio.playTrack("inspector norse");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	resetPlayer: function(x, y){
		game.data.player = me.pool.pull("player", x, y, {});
		me.game.world.addChild(game.data.player, 5);
	}
});
