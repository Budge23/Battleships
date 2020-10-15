//! Setting the Map
const body = document.querySelector('body')
const maps = document.querySelector('#maps')
const playerMap = document.querySelector('#playermap')
const pcMap = document.querySelector('#pcmap')
const winscreen = document.querySelector('#winscreen')
const textYourTurn = document.querySelector('#yourTurn')
const textPcTurn = document.querySelector('#pcTurn')
const rotateButton = document.querySelector('#rotate')
let horizontal = true
const playerScoreBox = document.querySelector('#playerSunkShips')
const pcScoreBox = document.querySelector('#pcSunkShips')


const playerCarrierText = document.querySelector("#playerCarrier")
const playerBattleshipText = document.querySelector("#playerBattleship")
const playerCruiserText = document.querySelector("#playerCruiser")
const playerSubText = document.querySelector("#playerSub")
const playerTugText = document.querySelector("#PlayerTug")

const pcCarrierText = document.querySelector('#pcCarrier')
const pcBattleshipText = document.querySelector('#pcBattleship')
const pcCruiserText = document.querySelector('#pcCruiser')
const pcSubText = document.querySelector('#pcSub')
const pcTugText = document.querySelector('#pcTug')

let width = 10

function createBoard() {
  width = 10
  const divArray = []

  for (let i = 0; i < width ** 2; i++) {
    divArray.push(i)
  }

  divArray.forEach((cell) => {
    const div = document.createElement('div')
    div.classList.add('mapSquarePc')
    pcMap.appendChild(div)
    div.setAttribute('id', `${cell}`)
    div.setAttribute('data-id', `${cell}`)
  })

  divArray.forEach((cell) => {
    const div = document.createElement('div')
    div.classList.add('mapsquare')
    playerMap.appendChild(div)
    div.setAttribute(`id`, `${cell}`)
    div.setAttribute('data-id', `${cell}`)
  })
  playerCells = document.querySelectorAll('.mapsquare')
  pcCells = document.querySelectorAll('.mapSquarePc')
}

let playerCells = null
let pcCells = null
let playerCellsData = null

//! Creating the profiles and player boats

const userProfile = {
  ships: [],
  lives: 5
}

const pcProfile = {
  ships: [],
  lives: 5
}

class boats {
  constructor(name, length) {
    this.name = name
    this.length = length
    this.lives = length
  }


}

userProfile.ships.push(new boats('Carrier', 5))
userProfile.ships.push(new boats('Battleship', 4))
userProfile.ships.push(new boats('Cruiser', 3))
userProfile.ships.push(new boats('Sub', 2))
userProfile.ships.push(new boats('Tug', 1))


const boatYard = document.querySelector('#boats')
const yard = document.querySelector('#boat-yard')

function createUserShips() {

  const h1 = yard.querySelector('h1')
  h1.innerHTML = 'Welcome to the Dockyard! <br> Place your ships!'
  userProfile.ships.forEach((ship) => {
    boatYard.classList.add('boats')
    const divTop = document.createElement('div')
    divTop.classList.add(`ships`)
    divTop.setAttribute(`draggable`, `true`)
    divTop.setAttribute(`id`, `${ship.name}`)
    boatYard.appendChild(divTop)
    const shipName = document.querySelector(`#${ship.name}`)
    for (let i = 0; i < ship.length; i++) {
      const div = document.createElement('div')
      div.setAttribute('id', `${ship.name}${i}`)
      shipName.appendChild(div)
    }
  })
}



function DragDrop() {
  let selectedShipCurrentId
  let draggedShip
  let draggedShipLength

  const playerShips = Array.from(document.querySelectorAll('.ships'))


  playerShips.forEach(square => square.addEventListener('dragstart', dragStart))
  playerCells.forEach(square => square.addEventListener('dragstart', dragStart))
  playerCells.forEach(square => square.addEventListener('dragover', (e) => {
    e.preventDefault()
  }))
  playerCells.forEach(square => square.addEventListener('dragenter', (e) => {
    e.preventDefault()
  }))
  playerCells.forEach(square => square.addEventListener('dragleave', (e) => {
    e.preventDefault()
  }))
  playerCells.forEach(square => square.addEventListener('drop', dragDrop))
  playerCells.forEach(square => square.addEventListener('dragend', () => {
  }))

  playerCells.forEach(cell => cell.addEventListener('click', () => {
  }))

  playerShips.forEach(ship => ship.addEventListener('mousedown', (e) => {
    selectedShipCurrentId = e.target.id
    selectedShipCurrentId = Number(selectedShipCurrentId.replace(/\D/g, ''))
  }))



  function dragStart() {
    draggedShip = this
    draggedShipLength = this.childNodes.length


  }

  function dragDrop() {
    const shipNameWithLastId = draggedShip.lastChild.id
    const shipClass = shipNameWithLastId.slice(0, -1)
    const targetSquare = Number(this.id)
    const widthCorrection = width * selectedShipCurrentId
    const lengthCorrection = width + selectedShipCurrentId

    if (!horizontal) {
      for (let i = 1; i < draggedShipLength + 1; i++) {
        playerCells[(targetSquare - width) + ((width * i)) - widthCorrection].setAttribute('id', `${shipClass}V`)
        playerCells[(targetSquare - width) + ((width * i)) - widthCorrection].classList.add('taken', 'ships')
      }
    } else {
      for (let i = 1; i < draggedShipLength + 1; i++) {
        playerCells[(targetSquare - selectedShipCurrentId) + ((i - 1))].setAttribute('id', `${shipClass}V`)
        playerCells[(targetSquare - selectedShipCurrentId) + ((i - 1))].classList.add('taken', 'ships')
      }
    }

    boatYard.removeChild(draggedShip)

    if (boatYard.childNodes.length === 0) {
      const yard = document.querySelector('#boat-yard')
      pcCells.forEach(cell => cell.classList.add('mapSquarePc'))
      pcMap.classList.add('pcmap')
      yard.remove()
      textYourTurn.classList.remove('disabledtext')
      playerScoreBox.classList.remove('disabled')
      playerScoreBox.classList.add('playerSunkShips')
      pcScoreBox.classList.remove('disabled')
      pcScoreBox.classList.add('pcSunkShips')
    }
  }

}

// playerCells[(targetSquare + width) + ((width + i)) - lengthCorrection].setAttribute('id', `${shipClass}V`)
//         playerCells[(targetSquare + width) + ((width + i)) - lengthCorrection].classList.add('taken', 'ships')

//! Generating PC ships and positions 

pcProfile.ships.push(new boats('Carrier', 5))
pcProfile.ships.push(new boats('Battleship', 4))
pcProfile.ships.push(new boats('Cruiser', 3))
pcProfile.ships.push(new boats('Sub', 2))
pcProfile.ships.push(new boats('Tug', 1))




function computerStart() {
  pcCells = Array.from(pcCells)
  pcProfile.ships.forEach((ship) => {
    let placed = false
    while (placed === false) {
      const randomAxis = Math.floor(Math.random() * 2)
      let direction = 0
      if (randomAxis === 0) {
        direction = 1
      } else {
        direction = 10
      }
      const randomStart = Math.abs(Math.floor(Math.random() * pcCells.length - (ship.length * direction) - 1))

      const shipArray = []
      for (let i = 0; i < ship.length; i++) {
        shipArray.push(Number(pcCells[(randomStart + (direction * i))].id))
      }

      const dissallowedCells = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99, 1, 2, 3, 4, 5, 6, 7, 8]

      const confirmCell = shipArray.some(r => dissallowedCells.indexOf(r) >= 0)
      const isTaken = shipArray.some(r => isNaN(r))
      if (!isTaken && !confirmCell) {
        for (let i = 0; i < ship.length; i++) {
          pcCells[(randomStart + (direction * i))].setAttribute('id', `${ship.name}V`)
          pcCells[(randomStart + (direction * i))].classList.add('taken')
        }
        placed = true
      } else {
        placed = false
      }
    }
  })
}





// ! Ship health and firing 


let pcCarrierHealth = 5
let pcBattleshipHealth = 4
let pcCruiserHealth = 3
let pcSubHealth = 2
let pcTugHealth = 1
let pcLives = 4

function sunk() {

  if (pcLives === 0) {
    winscreen.classList.remove('disabled')
    winscreen.classList.add('win')
    maps.remove()
    textPcTurn.classList.add('disabledtext')
    textYourTurn.classList.add('disabled')
  } else {
    return pcLives--
  }
}

function hit(cellShip) {
  if (cellShip === 'Carrier') {
    if (pcCarrierHealth === 1) {
      pcCarrierText.classList.add('sunk')
      sunk()
    } else {
      pcCarrierHealth--
    }

  } else if (cellShip === 'Battleship') {
    if (pcBattleshipHealth === 1) {
      pcBattleshipText.classList.add('sunk')
      sunk()
    } else pcBattleshipHealth--


  } else if (cellShip === 'Cruiser') {
    if (pcCruiserHealth === 1) {
      pcCruiserText.classList.add('sunk')
      sunk()
    } else pcCruiserHealth--


  } else if (cellShip === 'Sub') {
    if (pcSubHealth === 1) {
      pcSubText.classList.add('sunk')
      sunk()
    } else
      pcSubHealth -= 1

  } else if (cellShip === 'Tug') {
    if (pcTugHealth === 1) {
      pcTugText.classList.add('sunk')
      sunk()
    } else pcTugHealth--


  }

}

function userClick() {

  pcCells.forEach(cell => cell.addEventListener('click', () => {
    const cellShip = ((cell.id).substr(0, cell.id.length - 1))
    if (cell.classList.contains('taken')) {
      hit(cellShip)
      cell.removeAttribute('id')
      cell.classList.add('hit')

    } else {
      cell.classList.add('miss')
    }
    textYourTurn.classList.add('disabledtext')
    textPcTurn.classList.remove('disabledtext')

    setTimeout(() => {
      computerTurn()
      setTimeout(() => {
        textYourTurn.classList.remove('disabledtext')
        textPcTurn.classList.add('disabledtext')
      }, 500)
    }, 500)
  })
  )
}



// ! PC Firing 

let playerCarrierHealth = 5
let playerBattleshipHealth = 4
let playerCruiserHealth = 3
let playerSubHealth = 2
let playerTugHealth = 1
let playerLives = 4

function playerSunk() {

  if (playerLives === 0) {

    winscreen.classList.remove('disabled')
    winscreen.classList.add('win')
    maps.remove()
    textPcTurn.classList.add('disabledtext')
    textYourTurn.classList.add('disabled')
  } else {
    return playerLives--
  }
}

let PlayerCellShip = null

function playerHit(PlayerCellShip) {



  if (PlayerCellShip === 'Carrier') {
    if (playerCarrierHealth === 1) {
      playerCarrierText.classList.add('sunk')
      playerSunk()
      resetTargeting()
    } else {
      playerCarrierHealth--
    }

  } else if (PlayerCellShip === 'Battleship') {
    if (playerBattleshipHealth === 1) {
      playerBattleshipText.classList.add('sunk')
      playerSunk()
      resetTargeting()
    } else playerBattleshipHealth--


  } else if (PlayerCellShip === 'Cruiser') {
    if (playerCruiserHealth === 1) {
      playerCruiserText.classList.add('sunk')
      playerSunk()
      resetTargeting()
    } else playerCruiserHealth--


  } else if (PlayerCellShip === 'Sub') {
    if (playerSubHealth === 1) {
      playerSubText.classList.add('sunk')
      playerSunk()
      resetTargeting()
    } else
      playerSubHealth -= 1

  } else if (PlayerCellShip === 'Tug') {
    if (playerTugHealth === 1) {
      playerTugText.classList.add('sunk')
      playerSunk()
      resetTargeting()
    } else playerTugHealth--
  }

}

let firstHitValue = null
let lastAttemptValue = null
let directionArray = [-10, -1, 1, 10]
let secondattempt
let thirdattempt

// ! Computer Turn 

function computerTurn() {

  if (firstHitValue === null) {
    let canGo = false
    while (canGo === false) {
      playerCells = Array.from(playerCells)

      const randomCell = Math.floor(Math.random() * playerCells.length)

      const targetCell = playerCells[randomCell]
      let PlayerCellShip = (targetCell.id).substr(0, targetCell.id.length - 1)

      console.log((targetCell.dataset.id))

      if (!targetCell.classList.contains('miss') && !targetCell.classList.contains('hit')) {
        canGo = true
        if (playerCells[randomCell].classList.contains('taken')) {
          playerHit(PlayerCellShip)
          targetCell.removeAttribute(`id`)
          targetCell.classList.remove('ships')
          targetCell.classList.add('hit')
          firstHitValue = parseInt(targetCell.dataset.id)
        } else {
          targetCell.classList.add('miss')
        }
      } else {
        canGo = false
      }

    }
  } else if (firstHitValue !== null && lastAttemptValue === null) {
    if (firstHitValue < 10) {
      directionArray.shift()
      let secondattempt = playerCells[firstHitValue + directionArray[0]]
      if (!secondattempt.classList.contains('miss') && !secondattempt.classList.contains('hit')) {
        if (secondattempt.classList.contains('taken')) {
          PlayerCellShip = (secondattempt.id).substr(0, secondattempt.id.length - 1)
          playerHit(PlayerCellShip)
          secondattempt.removeAttribute(`id`)
          secondattempt.classList.remove('ships')
          secondattempt.classList.add('hit')
          lastAttemptValue = secondattempt.dataset.id
        } else {
          lastAttemptValue = 'missed'
          directionArray.shift()
        }
      } else {
        lastAttemptValue = 'missed'
        directionArray.shift()
      }
    } else if (firstHitValue > 89) {
      directionArray.pop()
      secondattempt = playerCells[firstHitValue + directionArray[0]]
      if (!secondattempt.classList.contains('miss') && !secondattempt.classList.contains('hit')) {
        if (secondattempt.classList.contains('taken')) {
          PlayerCellShip = (secondattempt.id).substr(0, secondattempt.id.length - 1)
          playerHit(PlayerCellShip)
          secondattempt.removeAttribute(`id`)
          secondattempt.classList.remove('ships')
          secondattempt.classList.add('hit')
          lastAttemptValue = parseInt(secondattempt.dataset.id)
        } else {
          lastAttemptValue = 'missed'
          directionArray.shift()
        }
      } else {
        lastAttemptValue = 'missed'
        directionArray.shift()
      }
    } else {
      secondattempt = playerCells[firstHitValue + directionArray[0]]
      if (!secondattempt.classList.contains('miss') && !secondattempt.classList.contains('hit')) {
        if (secondattempt.classList.contains('taken')) {
          PlayerCellShip = (secondattempt.id).substr(0, secondattempt.id.length - 1)
          playerHit(PlayerCellShip)
          secondattempt.removeAttribute(`id`)
          secondattempt.classList.remove('ships')
          secondattempt.classList.add('hit')
          lastAttemptValue = parseInt(secondattempt.dataset.id)
        } else {
          lastAttemptValue = 'missed'
          directionArray.shift()
        }
      } else {
        lastAttemptValue = 'missed'
        directionArray.shift()
      }
    }
  } else if (firstHitValue !== null && lastAttemptValue === 'missed') {
    secondattempt = playerCells[firstHitValue + directionArray[0]]
    if (!secondattempt.classList.contains('miss') && !secondattempt.classList.contains('hit')) {
      if (secondattempt.classList.contains('taken')) {
        PlayerCellShip = (secondattempt.id).substr(0, secondattempt.id.length - 1)
        playerHit(PlayerCellShip)
        secondattempt.removeAttribute(`id`)
        secondattempt.classList.remove('ships')
        secondattempt.classList.add('hit')
        lastAttemptValue = parseInt(secondattempt.dataset.id)
      } else {
        lastAttemptValue = 'missed'
        directionArray.shift()
      }
    } else {
      lastAttemptValue = 'missed'
      directionArray.shift()
    }
  } else if (firstHitValue !== null && !isNaN(lastAttemptValue)) {
    thirdattempt = playerCells[lastAttemptValue + directionArray[0]]
    if (!thirdattempt.classList.contains('miss') && !thirdattempt.classList.contains('hit')) {
      if (thirdattempt.classList.contains('taken')) {
        PlayerCellShip = (thirdattempt.id).substr(0, thirdattempt.id.length - 1)
        playerHit(PlayerCellShip)
        thirdattempt.removeAttribute(`id`)
        thirdattempt.classList.remove('ships')
        thirdattempt.classList.add('hit')
        lastAttemptValue = parseInt(thirdattempt.dataset.id)
      } else {
        lastAttemptValue = 'missed'
        directionArray.shift()
      }
    } else {
      lastAttemptValue = 'missed'
      directionArray.shift()
    }
  }
}


// ! Styling and welcome screen

function horizontalCheck() {
  horizontal = horizontal ? false : true
}

const startButton = document.querySelector('.gamestart')
const introcard = document.querySelector('#introcard')
const resetButton = document.querySelector('.reset')


startButton.addEventListener('click', () => {
  maps.classList.add('maps')
  playerMap.classList.add('playermap')
  rotateButton.classList.remove('disabled')
  createBoard()
  createUserShips()
  DragDrop()
  pcCells.forEach(cell => cell.classList.remove('mapSquarePc'))
  computerStart()
  userClick()
  introcard.remove()
})

resetButton.addEventListener('click', () => {
  location.reload()
})

rotateButton.addEventListener('click', () => {

  const playerShips = Array.from(document.querySelectorAll('#boats div'))
  const boats = document.querySelector('#boats')
  playerShips.forEach(ship => ship.classList.toggle('ships'))
  playerShips.forEach(ship => ship.classList.toggle('shipsH'))
  boats.classList.toggle('boatsH')
  boats.classList.toggle('boats')
  horizontalCheck()

})

function resetTargeting() {
  firstHitValue = null
  lastAttemptValue = null
  directionArray = [-10, -1, 1, 10]
}