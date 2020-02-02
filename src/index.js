import BootState          from './state_boot'
import PreloadState       from './state_preload'
import MenuState          from './state_menu'
import GameSorterState    from './state_game_sorter'


var game = new Phaser.Game({
  width: 1500,
  height: 730,
  renderer: Phaser.AUTO,
  alignH: true,
  alignV: true,
  enableDebug: true,
  antialias: true
})

game.state.add('boot', new BootState(), true)
game.state.add('preload', new PreloadState())
game.state.add('menu', new MenuState())
game.state.add('game_sorter', new GameSorterState())
