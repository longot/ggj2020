export default class extends Phaser.State {
  constructor() {
    super()
  }

  init() {
    this.game.stage.disableVisibilityChange = true

    this.resources = [{
      type: 'image',
      key: 'phaserlogo',
      url: require('Assets/images/phaser.png')
    }, ]
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
    this.state.start('preload')
  }
}