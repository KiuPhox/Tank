(()=>{"use strict";var e,t={169:(e,t,s)=>{s(260);class i extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(0),this.createLoadingGraphics(),this.load.on("progress",(e=>{this.progressBar.clear(),this.progressBar.fillStyle(8971347,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*e,16)}),this),this.load.on("complete",(()=>{this.progressBar.destroy(),this.loadingBar.destroy()}),this),this.load.pack("preload","./assets/pack.json","preload")}update(){this.scene.start("GameScene")}createLoadingGraphics(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(16777215,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}const a=i;var h;!function(e){e.READY="ready",e.PLAYING="playing",e.PAUSE="pause",e.GAME_OVER="game-over"}(h||(h={}));const r=h;class n{static init(e){this.scene=e,this.emitter=new Phaser.Events.EventEmitter}static updateGameState(e){this.currentState!==e&&(this.previousState=this.currentState,this.currentState=e,this.emitter.emit("state-changed",this.currentState,this.previousState))}static getCurrentState(){return this.currentState}static getPreviousState(){return this.previousState}}n.currentState=r.READY,n.previousState=r.READY;const o=n,c={highScore:0,sound:!0},l=class{static getPlayerData(){try{const e=this.load();if(e)return e}catch(e){console.error("Error retrieving player high score:",e)}return c}static getHighScore(){return this.getPlayerData().highScore}static setHighScore(e){const t=this.getPlayerData();t.highScore=e,this.save(t)}static getSound(){return this.getPlayerData().sound}static setSound(e){const t=this.getPlayerData();t.sound=e,this.save(t)}static save(e){try{const t=JSON.stringify(e);localStorage.setItem("tank-player-data",t)}catch(e){console.error("Error saving player data:",e)}}static load(){try{const e=localStorage.getItem("tank-player-data");if(null!==e)return JSON.parse(e)}catch(e){console.error("Error loading player data:",e)}return null}};var d;class u{static init(){this.curScore=0,this.highScore=l.getHighScore(),this.emitter=new Phaser.Events.EventEmitter}static getScore(){return this.curScore}}d=u,u.updateScore=e=>{d.curScore=e,d.curScore>d.highScore&&(d.highScore=d.curScore,l.setHighScore(d.curScore),d.emitter.emit("high-score-updated",d.highScore)),d.emitter.emit("score-updated",d.curScore)};const p=u;class g{static HexToRRB(e){return Phaser.Display.Color.IntegerToRGB(e)}static RGBtoHex(e){return(e.r<<16)+(e.g<<8)+e.b}static Shade(e,t){return e.r=Math.floor(e.r*(1-t)),e.g=Math.floor(e.g*(1-t)),e.b=Math.floor(e.b*(1-t)),e}}class m{static Float(e,t){return Math.random()*(t-e)+e}static Int(e,t){return Math.floor(Math.random()*(t-e+1)+e)}static Percent(e){return this.Float(0,100)<=e}static Color(e,t){const s=g.HexToRRB(e),i=g.HexToRRB(t),a=Math.random(),h=Phaser.Math.Linear(s.r,i.r,a),r=Phaser.Math.Linear(s.g,i.g,a),n=Phaser.Math.Linear(s.b,i.b,a);return g.RGBtoHex({r:h,g:r,b:n})}static shuffleArray(e){const t=[...e];for(let e=t.length-1;e>0;e--){const s=Math.floor(Math.random()*(e+1));[t[e],t[s]]=[t[s],t[e]]}return t}}const y=class{static init(e){this.scene=e}static playShootSound(e){this.isInsideCameraView(e)&&this.scene.sound.play("shoot",{detune:m.Int(1,200),volume:.8})}static isInsideCameraView(e){const t=new Phaser.Math.Vector2(this.scene.cameras.main.scrollX,this.scene.cameras.main.scrollY);return e.x-t.x<this.scene.scale.width&&e.x-t.x>0&&e.y-t.y<this.scene.scale.height&&e.y-t.y>0}};class S extends Phaser.GameObjects.Container{constructor(e){var t;super(e.scene,e.x,e.y),this.onPointerDown=()=>{this.setScale(.9*this.defaultScale),this.isDown=!0,void 0!==this.pointerDownCallback&&this.pointerDownCallback()},this.onPointerUp=()=>{this.setScale(this.defaultScale),this.isDown&&(this.isDown=!1,void 0!==this.pointerUpCallback&&this.pointerUpCallback())},this.onPointerOver=()=>{this.scene.add.tween({targets:this,scale:1.1*this.defaultScale,duration:100})},this.onPointerOut=()=>{this.scene.add.tween({targets:this,scale:this.defaultScale,duration:100})},e.scene.add.existing(this),this.pointerDownCallback=e.pointerDownCallback,this.pointerUpCallback=e.pointerUpCallback,this.button=e.scene.add.nineslice(0,0,e.texture,e.frame,e.width,e.height,e.leftWidth,e.rightWidth,e.topHeight,e.bottomHeight),this.defaultScale=null!==(t=e.scale)&&void 0!==t?t:1,this.setScale(this.defaultScale),this.isDown=!1,this.button.setInteractive(),this.button.on("pointerdown",this.onPointerDown),this.button.on("pointerup",this.onPointerUp),this.button.on("pointerout",this.onPointerOut),this.button.on("pointerover",this.onPointerOver),this.text=this.scene.add.bitmapText(0,0,"font",e.text,e.size),Phaser.Display.Align.In.Center(this.text,this.button),this.add([this.button,this.text])}}const b=S;class x extends Phaser.GameObjects.Container{constructor(e){super(e.scene,e.x,e.y),e.scene.add.existing(this)}setActive(e){return this.setLogicUpdate(e).setVisible(e)}setLogicUpdate(e){return super.setActive(e),this.getAll().forEach((t=>{t.setActive(e)})),this}}const w=x,v=class extends w{constructor(e){super(e),this.handleScoreUpdated=e=>{this.resultBitmapText.setText([this.resultBitmapText.text.split("\n")[0],"Score: "+e])},this.handleHighScoreUpdated=e=>{this.resultBitmapText.setText(["High Score: "+e,this.resultBitmapText.text.split("\n")[1]])},this.createModal(),this.createNewGameButton(),this.createResultBitmapText(),p.emitter.on("score-updated",this.handleScoreUpdated),p.emitter.on("high-score-updated",this.handleHighScoreUpdated)}createModal(){this.modal=this.scene.add.nineslice(0,0,"purpleMsg",void 0,600,600,50,50,50,50),this.add(this.modal)}createNewGameButton(){this.newGameButton=new b({scene:this.scene,x:0,y:130,width:400,height:120,leftWidth:50,rightWidth:50,topHeight:50,bottomHeight:50,text:"New Game",size:50,texture:"greenBtn",scale:1,pointerUpCallback:()=>{this.scene.scene.start("GameScene")}}),this.add(this.newGameButton)}createResultBitmapText(){this.resultBitmapText=this.scene.add.bitmapText(0,-90,"font",["High score: "+l.getHighScore(),"Score: 0"],50,1).setOrigin(.5,.5).setLineSpacing(28),this.add(this.resultBitmapText)}setActive(e){return e&&super.setActive(e),this.scene.add.tween({targets:this,scale:e?1:0,duration:300,ease:e?"Back.out":"Quad.out",onUpdate:()=>{this.scene.blurFx.strength=1.5*this.scale},onComplete:()=>{e||super.setActive(e)}}),this}};class P extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture),this.rotation=e.rotation,this.initImage(),this.scene.add.existing(this),e.screen.add(this),y.playShootSound(new Phaser.Math.Vector2(e.x,e.y))}initImage(){this.bulletSpeed=1e3,this.setOrigin(.5,.5),this.setDepth(2),this.scene.physics.world.enable(this),this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.bulletSpeed,this.body.velocity)}}const B=P;class f extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.screen=e.screen,this.scene.add.existing(this),this.initImage()}getBullets(){return this.bullets}initImage(){this.health=1,this.lastShoot=0,this.speed=100,this.setDepth(0),this.barrel=this.scene.add.image(0,0,"barrelBlue"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.scene.physics.world.enable(this),this.screen.add([this,this.lifeBar,this.barrel])}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}update(e,t){this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y}updateHealth(){this.health>0&&(this.health-=.05,this.redrawLifebar()),this.health<=0&&(this.destroy(),this.barrel.destroy(),this.lifeBar.destroy())}}const k=f,C=class extends k{constructor(e){super(e)}initImage(){super.initImage(),this.barrel.setTexture("barrelRed"),this.scene.tweens.add({targets:this,props:{y:this.y-200},delay:0,duration:2e3,ease:"Linear",easeParams:null,hold:0,repeat:-1,repeatDelay:0,yoyo:!0})}update(e,t){super.update(e,t),this.active&&this.handleShooting()}handleShooting(){this.scene.time.now>this.lastShoot&&this.bullets.getLength()<10&&(this.bullets.add(new B({scene:this.scene,screen:this.screen,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletRed"})),this.lastShoot=this.scene.time.now+m.Int(400,1e3))}updateHealth(){super.updateHealth(),this.health<=0&&p.updateScore(p.getScore()+1)}},D=class extends k{constructor(e){super(e),this.handlePointerMove=e=>{const t=new Phaser.Math.Vector2(e.x+this.scene.cameras.main.scrollX-this.x,e.y+this.scene.cameras.main.scrollY-this.y).angle();this.barrel.rotation=t+Math.PI/2},this.handlePointerDown=()=>{this.isShootingPointerDown=!0},this.handlePointerUp=()=>{this.isShootingPointerDown=!1},this.isShootingPointerDown=!1,this.scene.input.on("pointermove",this.handlePointerMove),this.scene.input.on("pointerdown",this.handlePointerDown),this.scene.input.on("pointerup",this.handlePointerUp)}initImage(){super.initImage(),this.scene.input.keyboard&&(this.cursors=this.scene.input.keyboard.createCursorKeys(),this.shootingKey=this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))}update(e,t){super.update(e,t),this.active&&(this.handleInput(t),this.handleShooting())}handleInput(e){this.cursors.up.isDown?this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,200,this.body.velocity):this.cursors.down.isDown?this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,-200,this.body.velocity):this.body.setVelocity(0,0),this.cursors.left.isDown?this.rotation-=.005*e:this.cursors.right.isDown&&(this.rotation+=.005*e)}handleShooting(){this.isShootingPointerDown&&this.scene.time.now>this.lastShoot&&(this.scene.cameras.main.shake(20,.005),this.scene.tweens.add({targets:this,props:{alpha:.8},delay:0,duration:5,ease:"Power1",easeParams:null,hold:0,repeat:0,repeatDelay:0,yoyo:!0,paused:!1}),this.bullets.getLength()<10&&(this.bullets.add(new B({scene:this.scene,screen:this.screen,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletBlue"})),this.lastShoot=this.scene.time.now+80))}updateHealth(){super.updateHealth(),this.health<=0&&o.updateGameState(r.GAME_OVER)}destroy(e){this.scene.input.off("pointermove",this.handlePointerMove),this.scene.input.off("pointerdown",this.handlePointerDown),this.scene.input.off("pointerup",this.handlePointerUp),super.destroy(e)}};class A extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture),this.initImage(),this.scene.add.existing(this)}initImage(){this.setOrigin(0,0),this.scene.physics.world.enable(this),this.body.setImmovable(!0)}}const O=A,T=class extends w{constructor(e){super(e),this.bulletHitLayer=(e,t)=>{e.destroy()},this.bulletHitObstacles=(e,t)=>{e.destroy()},this.enemyBulletHitPlayer=(e,t)=>{const s=t;e.destroy(),s.updateHealth()},this.playerBulletHitEnemy=(e,t)=>{const s=t;e.destroy(),s.updateHealth()},this.onGameStateChanged=e=>{e===r.PLAYING?this.scene.cameras.main.startFollow(this.player):e===r.READY&&this.scene.cameras.main.stopFollow().setScroll(0,0)},this.createTileMap(),this.createObstaclesAndEnemies(),this.createColliders(),o.emitter.on("state-changed",this.onGameStateChanged)}createTileMap(){this.map=this.scene.make.tilemap({key:"levelMap"}),this.tileset=this.map.addTilesetImage("tiles"),this.tileset&&(this.layer=this.map.createLayer("tileLayer",this.tileset,0,0),this.layer&&(this.layer.setCollisionByProperty({collide:!0}),this.add(this.layer)))}createObstaclesAndEnemies(){this.obstacles=this.scene.add.group({runChildUpdate:!0}),this.enemies=this.scene.add.group({}),this.convertObjects()}createColliders(){this.layer&&(this.scene.physics.add.collider(this.player,this.layer),this.scene.physics.add.collider(this.player,this.obstacles),this.scene.physics.add.collider(this.player.getBullets(),this.layer,this.bulletHitLayer,void 0,this),this.scene.physics.add.collider(this.player.getBullets(),this.obstacles,this.bulletHitObstacles,void 0,this)),this.enemies.children.each((e=>{const t=e;return this.scene.physics.add.overlap(this.player.getBullets(),t,this.playerBulletHitEnemy,void 0,this),this.scene.physics.add.overlap(t.getBullets(),this.player,this.enemyBulletHitPlayer,void 0),this.scene.physics.add.collider(t.getBullets(),this.obstacles,this.bulletHitObstacles,void 0),this.layer&&this.scene.physics.add.collider(t.getBullets(),this.layer,this.bulletHitLayer,void 0),null}),this)}update(e,t){this.player.update(e,t),this.enemies.children.each((s=>{const i=s;if(i.update(e,t),this.player.active&&i.active){const e=Phaser.Math.Angle.Between(i.body.x,i.body.y,this.player.body.x,this.player.body.y);i.barrel.angle=(e+Math.PI/2)*Phaser.Math.RAD_TO_DEG}return null}),this)}convertObjects(){var e;(null===(e=this.map.getObjectLayer("objects"))||void 0===e?void 0:e.objects).forEach((e=>{if("player"===e.type)this.player=new D({scene:this.scene,screen:this,x:e.x,y:e.y,texture:"tankBlue"});else if("enemy"===e.type){const t=new C({scene:this.scene,screen:this,x:e.x,y:e.y,texture:"tankRed"});this.enemies.add(t)}else{const t=new O({scene:this.scene,screen:this,x:e.x,y:e.y-40,texture:e.type});this.add(t),this.obstacles.add(t)}}))}},U=class extends w{constructor(e){super(e),this.handleScoreUpdated=e=>{this.scoreBitmapText.setText(e.toString())},this.createPauseButton(),this.createScoreBitmapText(),p.emitter.on("score-updated",this.handleScoreUpdated),this.setScrollFactor(0,0)}createPauseButton(){this.pauseButton=new b({scene:this.scene,x:0,y:0,texture:"pauseIcon",scale:1,width:104,height:90,pointerUpCallback:()=>{o.updateGameState(r.PAUSE)}}),Phaser.Display.Align.In.TopRight(this.pauseButton,this.scene.zone,-60,-60),this.add(this.pauseButton)}createScoreBitmapText(){this.scoreBitmapText=this.scene.add.bitmapText(0,0,"font","0",64),Phaser.Display.Align.In.TopCenter(this.scoreBitmapText,this.scene.zone,0,-28),this.add(this.scoreBitmapText)}},H=class extends w{constructor(e){super(e),this.bitmapTexts=[],this.onGameStateChanged=e=>{e===r.READY?this.setActive(!0):this.setActive(!1)},e.scene.input.keyboard&&(this.startKey=e.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.startKey.isDown=!1),this.bitmapTexts.push(e.scene.add.bitmapText(0,0,"font","PRESS S TO PLAY",30)),this.bitmapTexts.push(e.scene.add.bitmapText(0,0,"font","TANK",100)),Phaser.Display.Align.In.Center(this.bitmapTexts[0],this.scene.zone,0,30),Phaser.Display.Align.In.Center(this.bitmapTexts[1],this.scene.zone,0,-30),this.add(this.bitmapTexts),o.emitter.on("state-changed",this.onGameStateChanged)}update(){this.active&&this.startKey.isDown&&o.updateGameState(r.PLAYING)}};class I extends Phaser.GameObjects.Image{constructor(e){var t,s;super(e.scene,e.x,e.y,e.checked?e.textureChecked:e.textureUnchecked),this.onPointerDown=()=>{this.setScale(.9*this.defaultScale),this.isDown=!0,void 0!==this.pointerDownCallback&&this.pointerDownCallback()},this.onPointerUp=()=>{this.setScale(this.defaultScale),this.isDown&&(this.isDown=!1,void 0!==this.pointerUpCallback&&this.pointerUpCallback())},this.onPointerOver=()=>{this.scene.add.tween({targets:this,scale:1.1*this.defaultScale,duration:100})},this.onPointerOut=()=>{this.scene.add.tween({targets:this,scale:this.defaultScale,duration:100})},e.scene.add.existing(this),this.textureChecked=e.textureChecked,this.textureUnchecked=e.textureUnchecked,this.defaultScale=null!==(t=e.scale)&&void 0!==t?t:1,this.setScale(this.defaultScale),this.isDown=!1,this.checked=null!==(s=e.checked)&&void 0!==s&&s,this.pointerDownCallback=e.pointerDownCallback,this.pointerUpCallback=e.pointerUpCallback,this.setInteractive(),this.on("pointerdown",this.onPointerDown),this.on("pointerup",this.onPointerUp),this.on("pointerout",this.onPointerOut),this.on("pointerover",this.onPointerOver)}setChecked(e){this.checked=e,this.setTexture(this.checked?this.textureChecked:this.textureUnchecked)}trigger(){this.setChecked(!this.checked)}}const G=I,M=class extends w{constructor(e){super(e),this.createModal(),this.createContinueButton(),this.createNewGameButton(),this.createSoundCheckbox(),this.add([this.newGameButton,this.soundCheckbox])}createModal(){this.modal=this.scene.add.nineslice(0,0,"purpleMsg",void 0,600,600,50,50,50,50),this.add(this.modal)}createContinueButton(){this.continueButton=new b({scene:this.scene,x:0,y:0,width:400,height:120,leftWidth:50,rightWidth:50,topHeight:50,bottomHeight:50,text:"Continue",size:50,texture:"blueBtn",scale:1,pointerUpCallback:()=>{o.updateGameState(r.PLAYING)}}),this.add(this.continueButton)}createNewGameButton(){this.newGameButton=new b({scene:this.scene,x:0,y:130,width:400,height:120,leftWidth:50,rightWidth:50,topHeight:50,bottomHeight:50,text:"New Game",size:50,texture:"greenBtn",scale:1,pointerUpCallback:()=>{this.scene.scene.start("GameScene")}})}createSoundCheckbox(){this.soundCheckbox=new G({scene:this.scene,x:-100,y:-130,checked:!1,textureChecked:"checkedBox",textureUnchecked:"uncheckedBox",pointerUpCallback:()=>{this.soundCheckbox.trigger(),l.setSound(this.soundCheckbox.checked),this.scene.sound.setMute(!this.soundCheckbox.checked)}}),this.soundCheckbox.setChecked(l.getSound()),this.add(this.scene.add.bitmapText(-50,-130,"font","Sound",50).setOrigin(0,.5))}setActive(e){return e&&super.setActive(e),this.scene.add.tween({targets:this,scale:e?1:0,duration:300,ease:e?"Back.out":"Quad.out",onUpdate:()=>{this.scene.blurFx.strength=1.5*this.scale},onComplete:()=>{e||super.setActive(e)}}),this}};class E extends Phaser.Scene{constructor(){super({key:"GameScene"}),this.onGameStateChanged=e=>{e===r.READY||(e===r.PLAYING?(this.gameScreen.setActive(!0),this.HUDScreen.setActive(!0),this.pauseScreen.setActive(!1),this.gameOverScreen.setActive(!1)):e===r.PAUSE?(this.gameScreen.setLogicUpdate(!1),this.HUDScreen.setActive(!1),this.pauseScreen.setActive(!0)):e===r.GAME_OVER&&(this.gameScreen.setLogicUpdate(!1),this.HUDScreen.setActive(!1),this.gameOverScreen.setActive(!0)))}}init(){o.init(this),y.init(this),p.init(),this.sound.setMute(!l.getSound())}create(){this.createZone(),this.gameScreen=new T({scene:this}).setActive(!1),this.menuScreen=new H({scene:this}),this.HUDScreen=new U({scene:this}).setActive(!1),this.pauseScreen=new M({scene:this}).setVisible(!1).setPosition(this.scale.width/2,this.scale.height/2),this.gameOverScreen=new v({scene:this}).setVisible(!1).setPosition(this.scale.width/2,this.scale.height/2),this.mainCamera=this.cameras.main,this.uiCamera=this.cameras.add(),this.mainCamera.ignore([this.menuScreen,this.HUDScreen,this.pauseScreen,this.gameOverScreen]),this.uiCamera.ignore(this.gameScreen),this.blurFx=this.mainCamera.postFX.addBlur(0,0,0,0),o.emitter.on("state-changed",this.onGameStateChanged)}createZone(){this.zone=this.add.zone(this.scale.width/2,this.scale.height/2,this.scale.width,this.scale.height)}update(e,t){this.gameScreen.update(e,t),this.menuScreen.update()}}const R=E,L={title:"Tank",url:"https://github.com/digitsensitive/phaser3-typescript",version:"2.0",scale:{width:window.innerWidth>window.innerHeight?1200*window.innerWidth/window.innerHeight:1600,height:1200,mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},zoom:.6,type:Phaser.AUTO,parent:"game",scene:[a,R],input:{keyboard:!0},physics:{default:"arcade",arcade:{gravity:{y:0}}},backgroundColor:"#000000",render:{pixelArt:!1,antialias:!0}};class j extends Phaser.Game{constructor(e){super(e)}}window.addEventListener("load",(()=>{new j(L)}))}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var h=s[e]={exports:{}};return t[e].call(h.exports,h,h.exports,i),h.exports}i.m=t,e=[],i.O=(t,s,a,h)=>{if(!s){var r=1/0;for(l=0;l<e.length;l++){for(var[s,a,h]=e[l],n=!0,o=0;o<s.length;o++)(!1&h||r>=h)&&Object.keys(i.O).every((e=>i.O[e](s[o])))?s.splice(o--,1):(n=!1,h<r&&(r=h));if(n){e.splice(l--,1);var c=a();void 0!==c&&(t=c)}}return t}h=h||0;for(var l=e.length;l>0&&e[l-1][2]>h;l--)e[l]=e[l-1];e[l]=[s,a,h]},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var a,h,[r,n,o]=s,c=0;if(r.some((t=>0!==e[t]))){for(a in n)i.o(n,a)&&(i.m[a]=n[a]);if(o)var l=o(i)}for(t&&t(s);c<r.length;c++)h=r[c],i.o(e,h)&&e[h]&&e[h][0](),e[h]=0;return i.O(l)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=i.O(void 0,[216],(()=>i(169)));a=i.O(a)})();