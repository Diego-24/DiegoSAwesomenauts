game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */

	 /*loads the tiles*/
	 {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
	 {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
	 /*loads the character*/
	 {name: "player", type:"image", src: "data/img/BootyCheekPoncho.png"},
	 /*loads the tower pictures*/
	 {name: "tower", type:"image", src: "data/img/tower_round.svg.png"},
	 /*loads the pictures of the creep*/
	 {name: "creep1", type:"image", src: "data/img/brainmonster.png"},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */

 	 /*loads the map*/
 	 {name: "level01", type: "tmx", src: "data/map/test.tmx"},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */
	 /*loads the song*/
	 {name: "marley", type: "audio", src: "data/bgm/"},

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
	 /*loads the sound effect*/
	 {name: "jump", type: "audio", src: "data/sfx/"}
];
