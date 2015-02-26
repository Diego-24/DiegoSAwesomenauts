game.EnemyCreep = me.Entity.extend({
	init: function(x, y, settings) {
		this.setSuper();
		this.setEnemyTimers();
		this.setAttributes();
		this.type = "EnemyCreep";
		
		this.addAnimation();
		
		this.renderable.setCurrentAnimation("walk");

	},	

	setSuper: function() {
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
	},

	setEnemyTimers: function() {
		/*keeps track of when our creep last attacked anything*/
		this.lastAttacking = new Date().getTime();
		/*keeps track of the last time our creep hit anything*/
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
	},

	setAttributes: function() {
		/*gives it a health*/
		this.health = game.data.enemyCreepHealth;
		this.alwaysUpdate = true;
		/*this.attacking lets us know if the enemy is currently attacking*/
		this.attacking = false;
		this.body.setVelocity(3, 20);	
	},

	addAnimation: function() {
		/*adds the pictures of the creep*/
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
	},

	loseHealth: function(damage) {
		this.health = this.health - damage;
	},

	/*makes the creep move*/
	update: function(delta) {
		
		this.now = new Date().getTime();

		this.dead = checkIfDead();

		this.body.vel.x-= this.body.accel.x * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);
	
		/*makes the creeps jump*/
		if(!this.body.jumping && !this.body.falling) {
			this.jump();
		}

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	checkIfDead: function() {
		if(this.health <= 0) {
			me.game.world.removeChild(this);
		}
	},

	jump: function() {
		this.body.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
	},

	collideHandler: function(response) {
		if(response.b.type==='PlayerBase') {
			this.attacking=true;
			//this.lastAttacking=this.now;
			this.body.vel.x = 0;
			/*keeps moving the creep to the right to maintain its position*/
			this.pos.x = this.pos.x + 1;
			/*checks that it has been at least 1 second since this creep hit a base*/
			if((this.now-this.lastHit >= 1000)) {
				/*updates the lastHit timer*/
				this.lastHit = this.now;
				/*makes the player call its loseHealth function and it a*/
				/*damage of 1*/
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		/*stops the creep from moving when collided against the player*/
		}else if (response.b.type==='PlayerEntity') {
			var xdif = this.pos.x - response.b.pos.x;

			this.attacking=true;
			
			
			
			if(xdif>0) {
				/*keeps moving the creep to the right to maintain its position*/
				this.pos.x = this.pos.x + 1;
				//this.lastAttacking=this.now;
				this.body.vel.x = 0;
			}
			/*checks that it has been at least 1 second since this creep hit something*/
			if((this.now-this.lastHit >= 1000) && xdif>0) {
				/*updates the lastHit timer*/
				this.lastHit = this.now;
				/*makes the player call its loseHealth function and it a*/
				/*damage of 1*/
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		}
	}

});