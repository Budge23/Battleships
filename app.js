// Setting the Map
const playerMap = document.querySelector('#playermap')
const pcMap = document.querySelector('#pcmap')

const width = 10
const divArray = []

for (let i = 0; i < width ** 2; i++) {
  divArray.push('cell')
}

divArray.forEach((cell) => {
  const div = document.createElement('div')
  div.classList.add('mapsquare')
  pcMap.appendChild(div)
})

divArray.forEach((cell) => {
  const div = document.createElement('div')
  div.classList.add('mapsquare')
  playerMap.appendChild(div)
})

const playerCells = Array.from(document.querySelectorAll('#playermap div'))
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

userProfile.ships.forEach((ship) => {
  const divTop = document.createElement('div')
  divTop.classList.add(`ships`)
  divTop.setAttribute(`draggable`, `true`)
  divTop.setAttribute(`id`, `${ship.name}`)
  boatYard.appendChild(divTop)
  const shipName = document.querySelector(`#${ship.name}`)
  for (let i = 0; i < ship.length; i++) {
    const div = document.createElement('div')
    div.setAttribute('id', `${ship.name}${i + 1}`)
    shipName.appendChild(div)
  }
})

let shipNameWithIndex
let draggedShip
let draggedShipLength

const playerShips = Array.from(document.querySelectorAll('.ships'))


playerCells.forEach(square => square.addEventListener('ondragstart', dragStart))
playerCells.forEach(square => square.addEventListener('dragover', (e) => {
  e.preventDefault
}))
playerCells.forEach(square => square.addEventListener('dragenter', (e) => {
  e.preventDefault
}))
playerCells.forEach(square => square.addEventListener('dragleave', () => {

}))
playerCells.forEach(square => square.addEventListener('drop', dragDrop))
playerCells.forEach(square => square.addEventListener('dragend', () => { }))


playerShips.forEach(ship => ship.addEventListener('mousedown', (e) => {
  shipNameWithIndex = e.target.id
}))

function dragStart() {
  draggedShip = this
  draggedShipLength = this.childNodes.length
  console.log(draggedShip)
}

function dragDrop() {
  let shipNameWithLastId = draggedShip.lastChild.id
  let shipclass = shipNameWithLastId.slice(0, -2)
  let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
  let shipLastId = lastShipIndex + parseInt(this.dataset.id)

  let selectedShipIndex = parseInt(shipNameWithIndex.substr(-1))

  shipLastId = shipLastId - selectedShipIndex

  for (let i = 0; i < draggedShipLength; i++) {
    playerCells[parseInt(this.dataset.id) - selectedShipIndex + width * i].setAttribute('id', `${shipclass}`)
  }

  boatYard.removeChild(draggedShip)

}
