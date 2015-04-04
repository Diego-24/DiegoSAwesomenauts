game.IArrowShot = me.Entity.extend({
	init: function(x, y, settings, facing) {
		this.setSuper(x, y);
		this.setAttributes();
		this.type = "iArrow";
		this.facing = facing;
		
		this.addAnimation();

	},	

	setSuper: function(x, y) {
		/*reaches to the constructor of Entity*/
		this._super(me.Entity, 'init', [x, y, {
			/*chooses the creep and sets its size*/
			image: "iArrow",
			width: 48,
			height: 48,
			spritewidth: "48",
			spriteheight: "48",
			getShape: function() {
				/*sets the rectangle the player can walk into*/
				return (new me.Rect(0, 0, 48, 48)).toPolygon();
			}
		}]);
	},

	setAttributes: function() {
		this.alwaysUpdate = true;
		this.body.setVelocity(8, 0);	
		this.attack = game.data.ability3*3;
	},

	addAnimation: function() {

	},

	update: function(delta) {
		if(this.facing === "left"){
			this.body.vel.x-= this.body.accel.x * me.timer.tick;
		}else{
			this.body.vel.x+= this.body.accel.x * me.timer.tick;
		}

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	collideHandler: function(response) {
		if(response.b.type==='EnemyBase' || response.b.type==='EnemyCreep') {
			response.b.loseHealth(this.attack);
			me.game.world.removeChild(this);
		}
	}
});