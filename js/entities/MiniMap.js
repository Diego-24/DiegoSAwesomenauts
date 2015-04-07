game.MiniMap = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 225,
			height: 127,
			spritewidth: "225",
			spriteheight: "127",
			getShape: function() {
				return (new me.Rect(0, 0, 225, 127)).toPolygon();
			}
		}]);
		this.floating = true;

	}
});