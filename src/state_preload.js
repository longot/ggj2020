export default class extends Phaser.State {
  constructor() {
    super()
  }

  init() {
    this.game.stage.disableVisibilityChange = true

    this.resources = [
      {
        type: 'image',
        key : 'bgmenu',
        url : 'https://live.staticflickr.com/5832/30442178063_5fd5cac59e_b.jpg'
      }, {
        type: 'image',
        key : 'bggamesort',
        url : 'https://live.staticflickr.com/3091/2610606989_31e9d0844d_z.jpg'
      }, {
        type: 'image',
        key : 'close-button',
        url : require('Assets/images/close-button.png')
      }, {
        type: 'image',
        key : 'cell',
        url : require('Assets/images/cell.png')
      }, {
        type: 'image',
        key : 'Line-1',
        url : require('Assets/images/lines/1.png')
      }, {
        type: 'image',
        key : 'Line-2',
        url : require('Assets/images/lines/2.png')
      }, {
        type: 'image',
        key : 'Line-3',
        url : require('Assets/images/lines/3.png')
      }, {
        type: 'image',
        key : 'Line-start',
        url : require('Assets/images/lines/start.png')
      }, {
        type: 'image',
        key : 'Line-finish',
        url : require('Assets/images/lines/finish.png')
      }, {
        type: 'image',
        key : 'button-1',
        url : require('Assets/images/button-1.png')
      }, {
        type: 'image',
        key : 'button-2',
        url : require('Assets/images/button-2.png')
      }, {
        type: 'image',
        key : 'sparkle_1',
        url : require('Assets/images/sparkle/sparkle_1.png')
      }, {
        type: 'image',
        key : 'sparkle_2',
        url : require('Assets/images/sparkle/sparkle_2.png')
      }, {
        type: 'image',
        key : 'sparkle_3',
        url : require('Assets/images/sparkle/sparkle_3.png')
      },
    ]
    this.logo = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'phaserlogo')
    this.logo.anchor.setTo(0.5, 0.5)
  }

  preload() {
    this.load.crossOrigin = 'Anonymous'

    this.resources.forEach(resource => {
      switch (resource.type) {
        case 'atlas':
          this.load.atlas(resource.key, resource.url, null, resource.json)
          break
        case 'image':
          this.load.image(resource.key, resource.url)
          break
        default:
          break
      }
    })
  }

  create() {
    // const hidelogo = this.game.add.tween(this.logo).to({alpha: 0}, 250).start()
    // hidelogo.onComplete.addOnce( () => {
      this.state.start('menu')
    // })
  }
}
