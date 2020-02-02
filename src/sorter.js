const CELL_SIZE = {
  width : 100,
  height: 100
}

/*
      1
      |
  4 --+---2
      |
      3
*/

const PATH_PAIR = {
  1: 3,
  2: 4,
  3: 1,
  4: 2
}

const ITEM_TYPES = {
  1: {
    sprite: 'Line-1',
    angle: 0,
    path: [2, 4]
  },
  2: {
    sprite: 'Line-1',
    angle: 90,
    path: [1, 3]
  },
  3: {
    sprite: 'Line-3',
    angle: 0,
    path: [1, 2, 3, 4]
  },
  10: {
    sprite: 'Line-2',
    angle: 0,
    path: [1, 4]
  },
  11: {
    sprite: 'Line-2',
    angle: 90,
    path: [1, 2]
  },
  12: {
    sprite: 'Line-2',
    angle: 180,
    path: [2, 3]
  },
  13: {
    sprite: 'Line-2',
    angle: 270,
    path: [3, 4]
  },
  80: {
    sprite: 'Line-start',
    angle: 0,
    path: [2]
  },
  81: {
    sprite: 'Line-start',
    angle: 90,
    path: [3]
  },
  82: {
    sprite: 'Line-start',
    angle: 180,
    path: [4]
  },
  83: {
    sprite: 'Line-start',
    angle: 270,
    path: [1]
  },
  90: {
    sprite: 'Line-finish',
    angle: 0,
    path: [2]
  },
  91: {
    sprite: 'Line-finish',
    angle: 90,
    path: [3]
  },
  92: {
    sprite: 'Line-finish',
    angle: 180,
    path: [4]
  },
  93: {
    sprite: 'Line-finish',
    angle: 270,
    path: [1]
  }
}

export default class Sorter {
  constructor(game, config) {
    this.game = game
    this.config = config
    this.level = config.level

    this.onTurn = new Phaser.Signal()
    this.onWin = new Phaser.Signal()

    this.boardSize = {
      rows: config.rows,
      cols: config.cols,
      width: config.cols * CELL_SIZE.width,
      height: config.rows * CELL_SIZE.height
    }

    const mainContainer = game.add.group()
    mainContainer.name = 'MainContainer'
    this.mainContainer = mainContainer

    const innerPadding = 5
    const bgRect = game.make.graphics(0, 0)
    bgRect.lineStyle(5, 0x6087bf)
    bgRect.beginFill(0x609fbf)
    bgRect.drawRoundedRect(
      -innerPadding,
      -innerPadding,
      this.boardSize.width + (innerPadding * 2),
      this.boardSize.height + (innerPadding * 2),
      10
    )
    // bgRect.alpha = 0.8
    this.bgRect = bgRect
    this.mainContainer.add(bgRect)

    const cellGroup = game.add.group()
    cellGroup.name = 'cell-group'
    this.cellGroup = cellGroup
    mainContainer.add(cellGroup)

    for (let xAxis = 0; xAxis < this.boardSize.cols; xAxis++) {
      for (let yAxis = 0; yAxis < this.boardSize.rows; yAxis++) {
        const cellSprite = 'cell'
        const coords = {
          x: xAxis * CELL_SIZE.width + 1,
          y: yAxis * CELL_SIZE.height + 1
        }
        const cell = game.add.image(coords.x, coords.y, cellSprite)
        cell.width = CELL_SIZE.width + 1
        cell.height = CELL_SIZE.height + 1
        cell.data.x = xAxis
        cell.data.y = yAxis
        cellGroup.add(cell)
      }
    }

    const itemGroup = game.add.group()
    this.itemGroup = itemGroup
    itemGroup.name = 'Item Group'
    mainContainer.add(itemGroup)


    const items = []
    this.items = items
    this.level.forEach((itemCol, yAxis) => {
      itemCol.forEach((itemNum, xAxis) => {
        const frameName = ITEM_TYPES[itemNum].sprite
        const item = game.add.sprite(
          xAxis * CELL_SIZE.width + CELL_SIZE.width / 2,
          yAxis * CELL_SIZE.height + CELL_SIZE.height / 2,
          frameName
        )
        item.anchor.set(0.5)
        item.angle = ITEM_TYPES[itemNum].angle
        item.data.x = xAxis
        item.data.y = yAxis
        item.data.itemNum = itemNum
        item.data.dirty = true
        item.inputEnabled = true
        item.events.onInputUp.add(this.tapToItem, this)
        // item.events.onInputDown.add(this.selectItem, this)

        itemGroup.add(item)
        items.push(item)
      })
    })

    // console.log(Phaser.Timer.SECOND * 3 / (config.complexity+1), config.complexity)
    this.complexityTimer = this.game.time.events.repeat(Phaser.Timer.SECOND * 3 / (config.complexity+1), 1000, () => {
      const rndItem = Phaser.ArrayUtils.getRandomItem(this.items)
      // console.log(rndItem.data)
      let newNum = 0
      if (rndItem.data.itemNum >= 80 && rndItem.data.itemNum < 90 ) {newNum
        if (Phaser.Utils.chanceRoll(10)) {
          newNum = game.rnd.between(80, 83)
        }
      }
      if (rndItem.data.itemNum >= 90 && rndItem.data.itemNum < 99 ) {
        if (Phaser.Utils.chanceRoll(10)) {
          newNum = game.rnd.between(90, 93)
        }
      }
      if (rndItem.data.itemNum >= 10 && rndItem.data.itemNum < 19 ) {
        newNum = game.rnd.between(10, 13)
      }
      if (rndItem.data.itemNum == 1) newNum = 2
      if (rndItem.data.itemNum == 2) newNum = 1

      if (newNum !== 0) {
        // console.log(newNum)
        rndItem.data.itemNum = newNum
        // rndItem.angle = ITEM_TYPES[newNum].angle
        // rndItem.loadTexture(ITEM_TYPES[newNum].sprite)

        this.allowClick = false
        const itemRotate = this.game.add.tween(rndItem)
            .to({angle: ITEM_TYPES[newNum].angle}, Phaser.Timer.SECOND * 0.25)
            .start()
        itemRotate.onComplete.addOnce(() => {
          this.allowClick = true
        })
      }
    })
    this.complexityTimer.timer.start()

    // console.log(this.complexityTimer)
    this.allowClick = true
  }

  tapToItem(item) {
    if (item.data.itemNum > 49) return
    if (!this.allowClick) return
    this.allowClick = false

    const itemRotate = this.game.add.tween(item)
      .to({angle: item.angle+90}, Phaser.Timer.SECOND * 0.25)
      .start()
    itemRotate.onComplete.addOnce(() => {
      this.allowClick = true
    })

    if (item.data.itemNum == 2) item.data.itemNum = 1
    else if (item.data.itemNum == 1) item.data.itemNum = 2
    if (item.data.itemNum >= 10 && item.data.itemNum < 13) item.data.itemNum++
    else if (item.data.itemNum == 13) item.data.itemNum = 10

    this.detectWin()
  }

  detectWin() {
    const test = []
    for (let xAxis = 0; xAxis < this.boardSize.cols; xAxis++) {
      const newRow = new Array(this.boardSize.rows)
      newRow.fill(0, 0)
      test.push(newRow)
    }
    // console.log(test)
    const MaxSteps = this.boardSize.cols * this.boardSize.rows
    let currentStep = 0

    // console.log(this.items)
    let posX = 0
    let posY = 0
    const startItem = this.getItem(posX, posY)
    let lineEnter = 0
    let lineExit = ITEM_TYPES[startItem.data.itemNum].path[0]

    do {
      // console.group('Detect exit')
      // console.log('lineEnter', lineEnter, 'lineExit', lineExit)
      let newPosX = posX
      let newPosY = posY

      if (lineExit === 1) newPosY -= 1
      if (lineExit === 2) newPosX += 1
      if (lineExit === 3) newPosY += 1
      if (lineExit === 4) newPosX -= 1

      // console.log('newPosX', newPosX, 'newPosY', newPosY)

      if (newPosX == this.boardSize.cols - 1 && newPosY == this.boardSize.rows - 1) {
        console.log('Your Win')
        this.complexityTimer.timer.destroy()
        this.onWin.dispatch()
        console.groupEnd()
        break
      }

      if (newPosX < 0 || newPosX > this.boardSize.cols - 1) {console.groupEnd(); break}
      if (newPosY < 0 || newPosY > this.boardSize.rows - 1) {console.groupEnd(); break}

      const nextItem = this.getItem(newPosX, newPosY)
      if (!nextItem) {console.groupEnd(); break}
      // console.log(nextItem.data)

      const currentItemPath = ITEM_TYPES[nextItem.data.itemNum].path
      // console.log(currentItemPath)
      // console.log(PATH_PAIR[lineExit])
      if (!currentItemPath.includes(PATH_PAIR[lineExit])) {console.groupEnd(); break}

      // const currentPathPair = PATH_PAIR[lineExit]
      // console.log(currentPathPair)
      posX = newPosX
      posY = newPosY

      lineEnter = PATH_PAIR[lineExit]
      lineExit = currentItemPath.filter(p => p != lineEnter)[0]

      // console.log('NEWlineEnter', lineEnter, 'NEWlineExit', lineExit)

      currentStep++
      // console.log('Step', currentStep)
      // console.groupEnd()
    } while (currentStep <= MaxSteps)

  }

  getItem(x, y) {
    return this.items.find(item => item.data.x == x && item.data.y == y)
  }
}
