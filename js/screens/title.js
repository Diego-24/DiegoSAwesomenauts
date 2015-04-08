game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO

		me.audio.playTrack("SaintsRow");
		
		game.data.option1 = new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				/*the settings of the text*/
				this.font = new me.Font("Arial", 60, "gold");		
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			/*Adds the text and sets the coordinates of the text*/
			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
			},

			update: function(dt) {
				return true;
			},

			newGame: function() {
				me.input.releasePointerEvent('pointerdown', game.data.option2);
				me.input.releasePointerEvent('pointerdown', this);
				me.state.change(me.state.NEW);
			}
		}));

			me.game.world.addChild(game.data.option1);

			game.data.option2 = new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				/*the settings of the text*/
				this.font = new me.Font("Arial", 60, "gold");		
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			/*Adds the text and sets the coordinates of the text*/
			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
			},

			update: function(dt) {
				return true;
			},

			newGame: function() {
				me.input.releasePointerEvent('pointerdown', game.data.option1);
				me.input.releasePointerEvent('pointerdown', this);
				me.state.change(me.state.LOAD);
			}
		}));

		me.game.world.addChild(game.data.option2);

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});
