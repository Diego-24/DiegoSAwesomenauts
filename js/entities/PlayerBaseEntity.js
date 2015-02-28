game.PlayerBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		this.setSuper(x, y);
		this.setAttributes();
		this.type = "PlayerBase";

		this.addAnimation();
		
		/*sets the first picture of the tower*/
		this.renderable.setCurrentAnimation("idle");
	},

	setSuper:function(x, y) {
		/*reaches to the constructor of Entity*/
		this._super(me.Entity, 'init', [x, y, {
			/*chooses the tower and sets the size*/
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				/*sets the rectangle the tower is in*/
				return (new me.Rect(0, 0, 100, 65)).toPolygon();
			}
		}]);
	},

	setAttributes: function() {
		/*states the health of the tower*/
		this.broken = false;
		this.health = game.data.playerBaseHealth;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
	},

	addAnimation: function() {
		/*adds the pictures of the tower*/
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
	},

	/*sets what happens when the tower health is at 0*/
	update:function(delta) {
		this.dead = this.checkIfDestroyed();
		
		this.body.update(delta);
	
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	checkIfDestroyed: function() {
		if(this.health<=0) {
			this.broken = true;
			/*sets the picture of the burning tower when the health is at zero*/
			this.renderable.setCurrentAnimation("broken");
		}
	},

	loseHealth: function(damage) {
		this.health = this.health - damage;
	},

	onCollision: function() {

	}

});