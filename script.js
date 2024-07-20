const gridDisplay = document.querySelector('.js-grid')
const sideBar = document.querySelector('.js-sidebar')
const resetButton = document.querySelector('.js-reset-button')
const eraseButton = document.querySelector('.js-erase-button')
const rainbowModeButton = document.querySelector('.js-rainbow-mode-button')
const fillButton = document.querySelector('.js-fill-button')
const randomizeButton = document.querySelector('.js-randomize-button')
const menuButton = document.querySelector('.js-menu-button')
const closeButton = document.querySelector('.js-close-button')
const rangeInputElement = document.querySelector('.js-range-input')
const colorInputElement = document.querySelector('.js-color-input')
let pixelCount = 16;
let color = '#000000';

const generateGrid = (pixelCount) => {


  let gridHTML = ''

  for (let colsCount = 0; colsCount < pixelCount; colsCount++) {
    gridHTML += `<div class="row js-row"></div>`
  }

  gridDisplay.innerHTML = gridHTML;

  document.querySelectorAll('.js-row')
    .forEach((row) => {
      let rowHTML = ''
      for (let rowsCount = 0; rowsCount < pixelCount; rowsCount++) {
        rowHTML += '<div class="pixel js-pixel"></div>'
      }
      row.innerHTML = rowHTML
    })
  
}

const draw = (color) => {
  const pixels = document.querySelectorAll('.js-pixel')
  let drawing = false;

  pixels.forEach((pixel) => {
    pixel.addEventListener('mousedown', () => {
      drawing = true;
      pixel.style.backgroundColor = color
    })

    pixel.addEventListener('mouseover', () => {
      if (drawing) {
        pixel.style.backgroundColor = color
      }
    }) 
  });

  document.addEventListener('mouseup', () => {
    drawing = false
  })
  
}

const resetBoard = () => {
  const pixels = document.querySelectorAll('.js-pixel')

  resetButton.addEventListener('click', () => {
    pixels.forEach((pixel) => {
      pixel.style.backgroundColor = 'white'
    })
  })
}

const erase = () => {
  eraseButton.addEventListener('click', () => {
    draw('#fff')
  })
}

const showSidebar = () => {
  menuButton.addEventListener('click', () => {
    sideBar.style.display = 'block'
  })
}

const closeSidebar = () => {
  closeButton.addEventListener('click', () => {
    sideBar.style.display = 'none'
  })
}

const randomizeColor = () => {
  randomizeButton.addEventListener('click', () => {
    const red = getRandomValue()
    const green = getRandomValue()
    const blue = getRandomValue()
    
    console.log(red, blue, green)
    draw(`rgb(${red}, ${green}, ${blue})`)
  })
}

const getRandomValue = () => {
  return Math.floor(Math.random() * 255)
}

const rainbowDraw = () => {
  rainbowModeButton.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.js-pixel')
    let drawing = false;
  
    pixels.forEach((pixel) => {
      pixel.addEventListener('mousedown', () => {
        drawing = true;
        pixel.style.backgroundColor = `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`
      })
  
      pixel.addEventListener('mouseover', () => {
        if (drawing) {
          pixel.style.backgroundColor = `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`
        }
      }) 
    });
  
    document.addEventListener('mouseup', () => {
      drawing = false
    })
    
  })
  
}

const fill = (color) => {
  fillButton.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.js-pixel')

    pixels.forEach((pixel) => {
      pixel.style.backgroundColor = color
    })
  })
}

const start = () => {
  rangeInputElement.addEventListener('input', () => {
    pixelCount = rangeInputElement.value
    generateGrid(pixelCount)
    draw(color)
    resetBoard()
    erase()
  })
  
  colorInputElement.addEventListener('input', () => {
    color = colorInputElement.value;
    draw(color)
    fill(color)
  })

  generateGrid(pixelCount)
  draw('#000')
  resetBoard()
  erase()
  randomizeColor()
  showSidebar()
  closeSidebar()
  rainbowDraw()
  fill(color)
}

start()

