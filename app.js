//! Setting the Map

const maps = document.querySelector('#maps')
const playerMap = document.querySelector('#playermap')
const pcMap = document.querySelector('#pcmap')




const width = 10
const divArray = []

for (let i = 0; i < width ** 2; i++) {
  divArray.push(i)
}

divArray.forEach((cell) => {
  const div = document.createElement('div')
  div.classList.add('mapSquarePc')
  pcMap.appendChild(div)
  div.setAttribute('id', `${cell}`)
})

divArray.forEach((cell) => {
  const div = document.createElement('div')
  div.classList.add('mapsquare')
  playerMap.appendChild(div)
  div.setAttribute(`id`, `${cell}`)
})

let playerCells = document.querySelectorAll('.mapsquare')
let pcCells = document.querySelectorAll('.mapSquarePc')


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

  hit() {

  }

  sunk() {

  }
}


userProfile.ships.push(new boats('Carrier', 5))
userProfile.ships.push(new boats('Battleship', 4))
userProfile.ships.push(new boats('Cruiser', 3))
userProfile.ships.push(new boats('Sub', 2))
userProfile.ships.push(new boats('Tug', 1))

const boatYard = document.querySelector('#boats')


function createUserShips() {
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

//! Here!!!! for some reason the button will have ot be called from here????
const startButton = document.querySelector('.gamestart')



console.log(startButton)
startButton.addEventListener('click', () => {
  maps.classList.add('maps')
  playerMap.classList.add('playermap')
  pcMap.classList.add('pcmap')
  playerCells.forEach((cell) => cell.classList.add('mapsquare1'))
  pcCells.forEach((cell) => cell.classList.add('mapSquarePc1'))
  createUserShips()
  dragDrop()

})





function dragDrop() {
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
    const lastShipTarget = Number(shipNameWithLastId.substr(-1))
    const lastIndexPlaced = Number(draggedShipLength + targetSquare)

    const outOfBoundsVerticle = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

    const offLimitsVerticle = outOfBoundsVerticle.splice(0, 10 * lastShipTarget)


    for (let i = 1; i < draggedShipLength + 1; i++) {
      playerCells[(targetSquare - width) + ((width * i)) - widthCorrection].setAttribute('id', `${shipClass}1`)
      playerCells[(targetSquare - width) + ((width * i)) - widthCorrection].classList.add('taken')
    }
    boatYard.removeChild(draggedShip)

  }
}


//! Generating PC ships and positions 

pcProfile.ships.push(new boats('Carrier', 5))
pcProfile.ships.push(new boats('Battleship', 4))
pcProfile.ships.push(new boats('Cruiser', 3))
pcProfile.ships.push(new boats('Sub', 2))
pcProfile.ships.push(new boats('Tug', 1))


pcCells = Array.from(pcCells)

function computerStart() {
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
          pcCells[(randomStart + (direction * i))].setAttribute('id', `${ship.name}`)
          pcCells[(randomStart + (direction * i))].classList.add('taken')
        }
        placed = true
      } else {
        placed = false
      }
    }
  })
}

computerStart()



// ! Ship health and firing 


let pcCarrierHealth = pcProfile.ships[0].lives
let pcBattleshipHealth = pcProfile.ships[1].lives
let pcCruiserHealth = pcProfile.ships[2].lives
let pcSubHealth = pcProfile.ships[3].lives
let pcTugHealth = pcProfile.ships[4].lives
let pcLives = 4

function sunk() {
  console.log(pcLives)
  if (pcLives === 0) {
    console.log('game over')
  } else {
    return pcLives--
  }
}

let cellship = null

function hit(cellShip) {
  if (cellShip === 'Carrier') {
    if (pcCarrierHealth === 1) {
      sunk()
    } else {
      pcCarrierHealth--
    }

  } else if (cellShip === 'Battleship') {
    if (pcBattleshipHealth === 1) {
      sunk()
    } else pcBattleshipHealth--


  } else if (cellShip === 'Cruiser') {
    if (pcCruiserHealth === 1) {
      sunk()
    } else pcCruiserHealth--


  } else if (cellShip === 'Sub') {
    if (pcSubHealth === 1) {
      sunk()
    } else
      pcSubHealth -= 1

  } else if (cellShip === 'Tug') {
    if (pcTugHealth === 1) {
      sunk()
    } else pcTugHealth--


  }

}


pcCells.forEach(cell => cell.addEventListener('click', () => {
  const cellShip = ((cell.id).substr(0, cell.id.length))

  if (cell.classList.contains('taken')) {
    hit(cellShip)
    cell.removeAttribute('id')
    cell.classList.add('hit')

  } else {
    cell.classList.add('miss')
  }


  setTimeout(() => {
    computerTurn()
  }, 500)
})
)


function userFiring(cell) {

}

// ! PC Firing 

let playerCarrierHealth = userProfile.ships[0].lives
let playerBattleshipHealth = userProfile.ships[1].lives
let playerCruiserHealth = userProfile.ships[2].lives
let playerSubHealth = userProfile.ships[3].lives
let playerTugHealth = userProfile.ships[4].lives
let playerLives = 4

function playerSunk() {
  console.log(playerLives)
  if (playerLives === 0) {
    console.log('game over')
  } else {
    return playerLives--
  }
}

let PlayerCellShip = null

function playerHit(PlayerCellShip) {
  if (PlayerCellShip === 'Carrier') {
    if (playerCarrierHealth === 1) {
      playerSunk()
      return (
        computerTurnOne = null,
        computerTurnTwo = null,
        computerTurnThree = null,
        computerTurnFour = null
      )
    } else {
      playerCarrierHealth--
    }

  } else if (PlayerCellShip === 'Battleship') {
    if (playerBattleshipHealth === 1) {
      playerSunk()
      return (
        computerTurnOne = null,
        computerTurnTwo = null,
        computerTurnThree = null,
        computerTurnFour = null
      )
    } else playerBattleshipHealth--


  } else if (PlayerCellShip === 'Cruiser') {
    if (playerCruiserHealth === 1) {
      playerSunk()
      return (
        computerTurnOne = null,
        computerTurnTwo = null,
        computerTurnThree = null,
        computerTurnFour = null
      )
    } else playerCruiserHealth--


  } else if (PlayerCellShip === 'Sub') {
    if (playerSubHealth === 1) {
      playerSunk()
      return (
        computerTurnOne = null,
        computerTurnTwo = null,
        computerTurnThree = null,
        computerTurnFour = null
      )
    } else
      playerSubHealth -= 1

  } else if (PlayerCellShip === 'Tug') {
    if (playerTugHealth === 1) {
      playerSunk()
      return (
        computerTurnOne = null,
        computerTurnTwo = null,
        computerTurnThree = null,
        computerTurnFour = null
      )
    } else playerTugHealth--
  }

}

let computerTurnOne = null
let computerTurnTwo = null
let computerTurnThree = null
let computerTurnFour = null

function resetHits() {

}


// ! Computer Turn 

function computerTurn() {
  let canGo = false
  while (canGo === false) {
    playerCells = Array.from(playerCells)

    const availableCells = playerCells.filter(word => !word.classList.contains('miss', 'hit'))

    const randomCell = Math.floor(Math.random() * availableCells.length)

    const targetCell = playerCells[randomCell]
    let PlayerCellShip = (targetCell.id).substr(0, targetCell.id.length - 1)
    console.log(targetCell)
    if (availableCells.includes(targetCell)) {
      canGo = true
      if (computerTurnOne === null && computerTurnTwo === null) {
        if (playerCells[randomCell].classList.contains('taken')) {
          playerHit(PlayerCellShip)
          targetCell.classList.add('hit')
          targetCell.removeAttribute(`id`)
          computerTurnOne = Number(randomCell)
        } else {
          targetCell.classList.add('miss')
        }
        // } else if (computerTurnOne !== null && computerTurnTwo === null) {


        //   let canGoTwo = false
        //   while (canGoTwo === false) {
        //     const opTwo = [-10, -1, 1, 10]
        //     console.log(opTwo.length)
        //     const randomGoTwo = Math.floor(Math.random() * opTwo.length)
        //     console.log(opTwo[randomGoTwo])
        //     let goTwo = (playerCells[computerTurnOne + opTwo[randomGoTwo]])

        //     if (availableCells.includes(goTwo)) {
        //       canGoTwo = true
        //       if (goTwo.classList.contains('taken')) {

        //         let playerCellShip = (goTwo.id).substr(0, goTwo.length)
        //         playerHit(playerCellShip)
        //         goTwo.classList.add('hit')
        //         goTwo.removeAttribute('id')
        //         let computerTurnTwo = goTwo

        //       } else {
        //         goTwo.classList.add('miss')
        //       }
        //     } else {
        //       canGoTwo = false
        //     }
        //   }
      } else {
        canGo = false
      }

    }
  }
}


// ! Styling and welcome screen

