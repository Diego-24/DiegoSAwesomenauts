game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		/*reaches to the constructor of Entity*/
		this._super(me.Entity, 'init', [x, y, {
			/*chooses the player and sets its size*/
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function() {
				/*sets the rectangle the player can walk into*/
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);

		this.body.setVelocity(5, 20);

		/*adds the pictures of the character*/
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta) {
		if(me.input.isKeyPressed("right")){
			/*adds to the position of my x by adding the velocity defined above in*/
			/*setVelocity() and multiplying it by me.timer.tick.*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			/*flips the pictures of the character*/
			this.flipX(true);
		}else{
			this.body.vel.x = 0;
		}

		/*sets the animation 'walk'*/
		if(this.body.vel.x !== 0) {
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
			}
		}else{
			/*when staying still, it sets the animation 'idle'*/
			this.renderable.setCurrentAnimation("idle");
		}


		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	}
});

game.PlayerBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		/*reaches to the constructor of Entity*/
		this._super(me,Entity, 'init', [x, y, {
			/*chooses the tower and sets the size*/
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				/*sets the rectangle the tower is in*/
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		/*stes the health of the tower*/
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "PlayerBaseEntity";
	},

	/*sets what happens when the tower health is at 0*/
	update:function(delta) {
		if(this.health<=0) {
			this.broken = true;
		}
		this.body.update(delta);
	
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function() {

	}

});

game.EnemyBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		/*reaches to the constructor of Entity*/
		this._super(me,Entity, 'init', [x, y, {
			/*chooses the tower and sets the size*/
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function() {
				/*sets the rectangle the tower is in*/
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		/*stes the health of the tower*/
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";
	},

	/*sets what happens when the tower health is at 0*/
	update:function(delta) {
		if(this.health<=0) {
			this.broken = true;
		}
		this.body.update(delta);
	
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function() {
		
	}

});