//! Setting the Map
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

const playerCells = document.querySelectorAll('.mapsquare')
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
const allBoatYard = document.querySelector('#boat-yard')


userProfile.ships.forEach((ship) => {
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

playerCells.forEach(cell => cell.addEventListener('click', (e) => {
  console.log(e.target.id)
}))

playerShips.forEach(ship => ship.addEventListener('mousedown', (e) => {
  selectedShipCurrentId = e.target.id
  selectedShipCurrentId = Number(selectedShipCurrentId.replace(/\D/g, ''))
  console.log(selectedShipCurrentId)
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
  }
  boatYard.removeChild(draggedShip)

}



//! Generating PC ships and positions 

pcProfile.ships.push(new boats('Carrier', 5))
pcProfile.ships.push(new boats('Battleship', 4))
pcProfile.ships.push(new boats('Cruiser', 3))
pcProfile.ships.push(new boats('Sub', 2))
pcProfile.ships.push(new boats('Tug', 1))




function computerStart() {
  pcProfile.ships.forEach((ship) => {
    let placed = false
    while (placed === false) {
      pcCells = Array.from(pcCells)
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
      const isTaken = shipArray.some(r => isNaN(r) )
      console.log(shipArray)
      console.log(isTaken)
      if (!isTaken && !confirmCell) {
        for (let i = 0; i < ship.length; i++) {
          pcCells[(randomStart + (direction * i))].setAttribute('id', `${ship.name}1`)
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
