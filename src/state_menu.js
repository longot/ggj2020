export default class extends Phaser.State {
  constructor () {
    super()
  }

  init () {}
  create () {

    const bgLayer = this.game.add.group(this.stage, 'Background Layer')
    const uiLayer = this.game.add.group(this.stage, 'UI Layer')
    
    this.background = this.game.make.image(0, 0, 'bgmenu')
    bgLayer.add(this.background)
    this.game.scale.scaleSprite(bgLayer, this.game.width, this.game.height, false)
    bgLayer.alignIn(this.game.camera.view, Phaser.CENTER, 0, 0)
    
    const textGameName = this.game.make.text(350, 50, 'Please repair your mind', {
      font           : 'Arial',
      fontSize       : 80,
      fill           : '#FFFFFF',
      stroke         : '#101010',
      strokeThickness: 4
    })
    uiLayer.add(textGameName)

    const textStartGame = this.game.make.text(200, 200, 'Start repairing', {
      font           : 'Arial',
      fontSize       : 60,
      fill           : '#FFFFFF',
      stroke         : '#101010',
      strokeThickness: 4
    })
    uiLayer.add(textStartGame)
    textStartGame.inputEnabled = true
    textStartGame.events.onInputDown.add( () => {
      console.log('Game Start')
      this.game.state.start('game')
    })

    const textGameStats = this.game.make.text(200, 300, 'Your stats', {
      font           : 'Arial',
      fontSize       : 60,
      fill           : '#FFFFFF',
      stroke         : '#101010',
      strokeThickness: 4
    })
    uiLayer.add(textGameStats)
    textGameStats.inputEnabled = true
    textGameStats.events.onInputDown.add( () => {
      console.log('Game Stats')
    })

    const textAbout = this.game.make.text(200, 400, 'About', {
      font           : 'Arial',
      fontSize       : 60,
      fill           : '#FFFFFF',
      stroke         : '#101010',
      strokeThickness: 4
    })
    uiLayer.add(textAbout)
    textAbout.inputEnabled = true
    textAbout.events.onInputDown.add( () => {
      console.log('About')
    })

  }
}