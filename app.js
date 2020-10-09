// Setting the Map
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
})

divArray.forEach((cell) => {
  const div = document.createElement('div')
  div.classList.add('mapsquare')
  playerMap.appendChild(div)
  div.setAttribute(`id`, `${cell}`)
  div.setAttribute('draggable', 'true')
})

const playerCells = document.querySelectorAll('.mapsquare')
const pcCells = document.querySelectorAll('#pcmap div')


// Creating the profiles and player boats

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

let selectedShipNameWithIndex
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
  console.log(playerCells[50])
}))

playerShips.forEach(ship => ship.addEventListener('mousedown', (e) => {
  selectedShipNameWithIndex = e.target.id
}))



function dragStart() {
  draggedShip = this
  draggedShipLength = this.childNodes.length
  console.log(draggedShip)
}

function dragDrop() {
  const shipNameWithLastId = draggedShip.lastChild.id
  const shipClass = shipNameWithLastId.slice(0, -1)
  const lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
  let shipLastId = lastShipIndex + parseInt(this.id)
  const selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))

  shipLastId = shipLastId - selectedShipIndex

  console.log(selectedShipIndex)

  for (let i=0; i < draggedShipLength; i++) {
    playerCells[parseInt(this.id) - selectedShipIndex + width * i].setAttribute('id', `${shipClass}`)
  }
  boatYard.removeChild(draggedShip)
}

