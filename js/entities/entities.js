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

		this.body.setVelocity(3, 10);
		/*keeps track of which direction your character is going*/
		this.facing = "right";
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime(); /*haven't used this*/
		/*the camera follows the player*/
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		/*adds the pictures of the character*/
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234], 80);

		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta) {
		this.now = new Date().getTime();
		if(me.input.isKeyPressed("right")) {
			/*adds to the position of my x by adding the velocity defined above in*/
			/*setVelocity() and multiplying it by me.timer.tick.*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			/*flips the pictures of the character*/
			this.flipX(true);
		/*does everything as the 'right' if statement except it's doing it for 'left'*/
		}else if(me.input.isKeyPressed("left")) {
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.facing = "left";
			this.flipX(false);
		}else{
			this.body.vel.x = 0;
		}
		/*allows you to jump by pressing up but not when you're falling or already jumping*/
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
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
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
			}
		}else if(!this.renderable.isCurrentAnimation("attack")) {
			/*when staying still, it sets the animation 'idle'*/
			this.renderable.setCurrentAnimation("idle");
		}

		/*tells it to check the collision*/
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	/*sets the collision between the tower and the player so you can't go through*/
	collideHandler: function(response) {
		if(response.b.type==='EnemyBaseEntity') {
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
			
			/*stops player from going through from above*/
			if(ydif<-40 && xdif< 70 && xdif>-35) {
				this.body.falling = false;
				this.body.vel.y = -1;
			/*stops player from going through from the right*/
			}else if(xdif>-35 && this.facing==='right' && (xdif<0)) {
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			/*stops player from going through from the left*/
			}else if(xdif<70 && this.facing==='left' && (xdif>0)) {
				this.body.vel.x = 0;
				this.pos.x = this.pos.x +1;

			}
		
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 900) {
				console.log("tower Hit");
				this.lastHit = this.now;
				response.b.loseHealth();
			}
		}
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
		
	},

	loseHealth: function() {
		this.health--;
	}

});

game.EnemyCreep = me.Entity.extend({
		init: function(x, y, settings) {
			/*reaches to the constructor of Entity*/
		this._super(me.Entity, 'init', [x, y, {
			/*chooses the creep and sets its size*/
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function() {
				/*sets the rectangle the player can walk into*/
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);
		/*gives it a health*/
		this.health = 10;
		this.alwaysUpdate = true;

		this.body.setVelocity(3, 20);

		this.type = "EnemyCreep";

		/*adds the pictures of the creep*/
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");

	},	
	/*makes the creep move*/
	update: function(delta) {
		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		this.body.update(delta);
	

		this._super(me.Entity, "update", [delta]);

		return true;
	}
});

/*puts the creep on a timer*/
game.GameManager = Object.extend({
	init: function(x, y, settings) {
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();

		this.alwaysUpdate = true;
	},

	update: function() {
		this.now = new Date().getTime();

		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
		}

		return true;
	}
});