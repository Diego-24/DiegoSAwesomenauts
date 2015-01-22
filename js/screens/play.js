game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		/*loads level01*/
		me.levelDirector.loadLevel("level01");

		/*adds the player by pulling from pool*/
		var player = me.pool.pull("player", 0, 420, {});
		/*adds player to the game*/
		me.game.world.addChild(player, 5);

		/*binds the right key so when pressed it moves right*/
		me.input.bindKey(me.input.KEY.RIGHT, "right");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
