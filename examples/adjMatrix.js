
function getColor(value) {
  // Adjust this function based on how you want to map values to colors
  const hue = (2 - value) * 150; // Adjusting hue for color variation
  return `hsl(${hue}, 60%, 80%)`;
}

function getColorSample(value) {
  // Adjust this function based on how you want to map values to colors
  const hue = (2 - value) * 30; // Adjusting hue for color variation
  return `hsl(${hue}, 20%, 50%)`;
}

function changeCell(numCells, cell, cells, cellSize, adjContainer) {
  let newVal = (parseInt(cell.textContent)+1)%2
  cell.textContent = newVal
  changeCellColor(numCells, cell, newVal, cells);

  if(adjContainer==="adjList"){
    resetGraphs(cells);
  }else if(adjContainer==="adjSmall"){
    visualizeDFS(cells);
  }
  create_list(numCells, cellSize, cells, adjContainer);
}
function updateSymmetricCell(numCells, cell, value, color, cells){
  let idx = cell.i;
  let row = idx % numCells;
  let column = Math.floor(idx / numCells);
  let symmetric_cell = cells[(row - 1) * (numCells - 1) + (column - 1)]
  symmetric_cell.style.backgroundColor = color;
  symmetric_cell.textContent = value;
}

function changeCellColor(numCells, cell, value, cells) {
  const color = getColor(value);
  cell.style.backgroundColor = color;
  updateSymmetricCell(numCells, cell, value, color, cells);
  resetDFS(0, edges);
}

function create_cell(numCells, i, column, row, cellSize, cells, adjContainer){
  const cell = document.createElement('div');
  cell.style.width = `${cellSize}px`;
  cell.style.height = `${cellSize}px`;
  let value;

  // get the symmetric cell to preserve symmetry
  let idx = (row - 1)  * (numCells - 1) + (column - 1)
  let symm = (column - 1) * (numCells - 1) + (row - 1)

  // use the value of the symm if exists, else generate a random one
  if (idx > symm) {
    value = cells[symm].textContent;
  } else {
    value = Math.floor(Math.random() + 0.3);
  }

  cell.className = 'cell';
  cell.i = i;

  cell.textContent = value;

  cell.style.backgroundColor = getColor(value);
  cell.addEventListener('click',
      () => changeCell(numCells, cell, cells, cellSize, adjContainer));

  return cell
}

function create_sample(value, cellSize) {
  const sample = document.createElement('div');
  sample.className = 'sample';
  sample.style.width = `${cellSize-4}px`;
  sample.style.height = `${cellSize-4}px`;
  sample.sampleIndex = value;

  if (value === 0){
    return sample;
  }

  sample.textContent = `${letters.at(value - 1)}`;

  sample.style.backgroundColor = getColorSample(value+2)
  sample.style.color = "white";
  sample.style.borderColor = "black"
  sample.style.borderStyle = "solid"
  sample.style.borderWidth = "2px"

  return sample
}

function create_grid(numCells, cellSize, containerName, cells, adjContainer){


  const gridContainer = document.getElementById(containerName);

  gridContainer.style.gridTemplateColumns = `repeat(${numCells}, ${cellSize}px)`;
  let el;

  for (let i = 0; i < numCells * numCells; i++) {
    let column = i % numCells;
    let row = Math.floor(i / numCells);
    if (column === 0) {
      el = create_sample(row);
    } else if (row === 0) {
      el = create_sample(column, cellSize);
    } else {
      el = create_cell(numCells, i, column, row, cellSize, cells, adjContainer);
      cells.push(el)
    }

    gridContainer.appendChild(el);
  }
  return gridContainer;
}
