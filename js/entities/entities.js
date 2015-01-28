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
		/*the camera follows the player*/
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		/*adds the pictures of the character*/
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta) {
		if(me.input.isKeyPressed("right")) {
			/*adds to the position of my x by adding the velocity defined above in*/
			/*setVelocity() and multiplying it by me.timer.tick.*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			/*flips the pictures of the character*/
			this.flipX(true);
		}else if(me.input.isKeyPressed("left")) {
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(false);
		}else{
			this.body.vel.x = 0;
		}

		if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling) {
			this.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}

		if(me.input.isKeyPressed("attack")) {
			if(!this.renderable.isCurrentAnimation("attack")) {
				console.log(!this.renderable.isCurrentAnimation("attack"));
				/*Sets the current animation to attack and once that is over*/
				/*goes back to the idle animation*/
				this.renderable.setCurrentAnimation("attack", "idle");
				/*Makes it so that the next time we start this sequence we begin*/
				/*from the first animation, not whatever we left off when we*/
				/*switched to another animation*/
				this.renderable.setAnimationFrame();
			}
		}
		/*sets the animation 'walk'*/
		else if(this.body.vel.x !== 0) {
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
			}
		}else{
			/*when staying still, it sets the animation 'idle'*/
			this.renderable.setCurrentAnimation("idle");
		}

		if(me.input.isKeyPressed("attack")) {
			if(!this.renderable.isCurrentAnimation("attack")) {
				console.log(!this.renderable.isCurrentAnimation("attack"));
				/*Sets the current animation to attack and once that is over*/
				/*goes back to the idle animation*/
				this.renderable.setCurrentAnimation("attack", "idle");
				/*Makes it so that the next time we start this sequence we begin*/
				/*from the first animation, not whatever we left off when we*/
				/*switched to another animation*/
				this.renderable.setAnimationFrame();
			}
		}

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	}
});

game.PlayerBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
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
		/*stes the health of the tower*/
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "PlayerBaseEntity";

		/*adds the pictures of the tower*/
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		/*sets the first picture of the tower*/
		this.renderable.setCurrentAnimation("idle");
	},

	/*sets what happens when the tower health is at 0*/
	update:function(delta) {
		if(this.health<=0) {
			this.broken = true;
			/*sets the picture of the burning tower when the health is at zero*/
			this.renderable.setCurrentAnimation("broken");
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
		/*stes the health of the tower*/
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";

		/*adds the pictures of the tower*/
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		/*sets the first picture of the tower*/
		this.renderable.setCurrentAnimation("idle");
	},

	/*sets what happens when the tower health is at 0*/
	update:function(delta) {
		if(this.health<=0) {
			this.broken = true;
			/*sets the picture of the burning tower when the health is at zero*/
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);
	
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function() {
		
	}

});