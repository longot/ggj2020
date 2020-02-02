import Sorter from './sorter'

const LEVEL_DEMO = [
  [81, 11, 10, 12, 13],
  [10, 1, 1, 1, 13],
  [12, 1, 1, 1, 10],
  [11, 1, 13, 2, 13],
  [11, 10, 11, 1, 92]
]

const LEVEL_0 = [
  [81, 11, 10, 12, 13],
  [12, 2, 1, 1, 12],
  [10, 1, 1, 2, 12],
  [12, 2, 1, 2, 13],
  [11, 10, 12, 13, 93]
]

const LEVEL_1 = [
  [80, 2, 2, 2, 13],
  [12, 2, 1, 2, 12],
  [12, 2, 1, 2, 12],
  [12, 2, 12, 2, 13],
  [11, 10, 12, 1, 92]
]

const LEVEL_2 = [
  [81, 12, 10, 12, 13],
  [1, 2, 1, 2, 12],
  [2, 1, 1, 2, 12],
  [1, 2, 12, 2, 13],
  [11, 10, 12, 1, 93]
]

const LEVEL_3 = [
  [80, 2, 2, 2, 13],
  [12, 2, 1, 2, 12],
  [12, 2, 1, 2, 12],
  [12, 2, 1, 2, 12],
  [11, 2, 1, 1, 92]
]

const LEVEL_4 = [
  [81, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 92]
]

const LEVEL_5 = [
  [81,2, 2, 2, 2],
  [2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2],
  [2, 2, 2, 2, 92]
]

const LEVELS = {
  // 0: LEVEL_DEMO,
  0: LEVEL_0,
  1: LEVEL_1,
  2: LEVEL_2,
  3: LEVEL_3,
  4: LEVEL_4,
  5: LEVEL_5,
}

export default class extends Phaser.State {
  constructor () {
    super()
    this.currentLevel = 0
  }

  // init (...args) {
  //   console.log(args)
  //   if (args[0]) {
  //     this.currentLevel = args[0]
  //   }
  // }

  create () {
    const bgLayer = this.game.add.group(this.stage, 'Background Layer')
    const gameLayer = this.game.add.group(this.stage, 'Game Layer')
    const uiLayer = this.game.add.group(this.stage, 'UI Layer')
    
    this.background = this.game.make.image(0, 0, 'bggamesort')
    bgLayer.add(this.background)
    this.game.scale.scaleSprite(bgLayer, this.game.width, this.game.height, false)
    bgLayer.alignIn(this.game.camera.view, Phaser.CENTER, 0, 0)
    
    const textTitle = this.game.make.text(40, 25, 'Repair your think', {
      font           : 'Arial',
      fontSize       : 70,
      fill           : '#FFFFFF',
      stroke         : '#101010',
      strokeThickness: 4
    })
    uiLayer.add(textTitle)

    const closeButton = this.make.image(1460, 40, 'close-button')
    closeButton.anchor.set(0.5)
    closeButton.scale.set(0.25)
    uiLayer.add(closeButton)
    closeButton.inputEnabled = true
    closeButton.events.onInputDown.add( () => {
      this.state.start('menu')
    })

    this.sorterGame = new Sorter(this.game, {
      level: LEVELS[this.currentLevel],
      complexity: this.currentLevel,
      cols: 5,
      rows: 5
    })
    gameLayer.add(this.sorterGame.mainContainer)

    this.game.scale.scaleSprite(this.sorterGame.mainContainer, this.game.width * 0.55, this.game.height * 0.9, true)
    this.sorterGame.mainContainer.centerY = this.game.height / 2
    this.sorterGame.mainContainer.x = this.game.width * 0.5

    this.sorterGame.onWin.addOnce(() => {
      const textWin = this.game.make.text(40, 150, 'You make this!', {
        font           : 'Arial',
        fontSize       : 70,
        fill           : '#FFFFFF',
        stroke         : '#101010',
        strokeThickness: 4
      })
      uiLayer.add(textWin)

      const buttonOk = this.make.image(140, 300, 'button-1')
      buttonOk.anchor.set(0.5)
      buttonOk.scale.set(0.25)
      buttonOk.inputEnabled = true
      buttonOk.events.onInputDown.add(() => {
        this.state.start('game_sorter', true, false, this.currentLevel+1)
      })
      const buttonOkText = this.game.make.text(0, -4, 'Next level', {
        fill    : '#ffffff',
        fontSize: 50
      })
      buttonOkText.anchor.set(0.5)
      buttonOkText.scale.set(2.5)
      buttonOkText.setShadow(0, 3, '#000000', 2)
      buttonOk.addChild(buttonOkText)
      uiLayer.add(buttonOk)

      const buttonReplay = this.make.image(400, 300, 'button-2')
      buttonReplay.anchor.set(0.5)
      buttonReplay.scale.set(0.25)
      buttonReplay.inputEnabled = true
      buttonReplay.events.onInputDown.add(() => {
        this.state.start('game_sorter', true, false, this.currentLevel)
      })
      const buttonReplayText = this.game.make.text(0, -4, 'Replay level', {
        fill    : '#ffffff',
        fontSize: 50
      })
      buttonReplayText.anchor.set(0.5)
      buttonReplayText.scale.set(2.5)
      buttonReplayText.setShadow(0, 3, '#000000', 2)
      buttonReplay.addChild(buttonReplayText)
      uiLayer.add(buttonReplay)
  
    })

  }
}