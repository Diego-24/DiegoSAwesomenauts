game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
		me.audio.playTrack("Awesomenauts-upgradeTune");
		
		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				/*the settings of the text*/
				this.font = new me.Font("Arial", 60, "gold");		
			},

			/*Adds the text and sets the coordinates of the text*/
			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 55);
				this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION " + game.data.exp.toString(), this.pos.x + 50, this.pos.y + 110);
				this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD " + game.data.exp.toString(), this.pos.x + 50, this.pos.y + 165);
				this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE " + game.data.exp.toString(), this.pos.x + 50, this.pos.y + 220);
				this.font.draw(renderer.getContext(), "F4: INCREASE HEALTH " + game.data.exp.toString(), this.pos.x + 50, this.pos.y + 270);
			}

		})));

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.audio.stopTrack();
	}
});
