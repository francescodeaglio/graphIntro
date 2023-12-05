function create_placeholder(cellSize) {
  const cell = document.createElement('div');
  cell.style.width = `${cellSize}px`;
  cell.style.height = `${cellSize}px`;

  cell.className = 'cell';
  cell.style.backgroundColor = "#ffffff";
  return cell
}

function create_arrow(cellSize) {
  const cell = document.createElement('div');
  cell.style.width = `${cellSize}px`;
  cell.style.height = `${cellSize}px`;

  cell.className = 'cell';
  cell.textContent = "→"

  cell.style.backgroundColor = "#ffffff";
  return cell
}

function createRow(numCells, gridContainer, edges, row, cellSize) {

  // idx
  gridContainer.appendChild(create_sample(row+1));
  gridContainer.appendChild(create_arrow(cellSize));
  for (let i = 0; i < numCells - 1; i++) {

    if(i < edges.length){
      el = create_cell_list(edges[i], cellSize);
    } else{
      el = create_placeholder(cellSize)
    }

    gridContainer.appendChild(el);
  }
}

function create_cell_list(value, cellSize) {
  const cell = document.createElement('div');
  cell.style.width = `${cellSize}px`;
  cell.style.height = `${cellSize}px`;
  cell.className = 'cell';
  cell.textContent = letters[value];
  cell.style.backgroundColor = getColor(value+3);
  return cell
}
function create_list(numCells, cellSize, cells, containerName){
  const gridContainer = document.getElementById(containerName);
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${numCells+1}, ${cellSize}px)`;
  let prevRow = 0;
  let edges = []
  let numNodes = Math.sqrt(cells.length);

  for (let i = 0; i < cells.length; i++) {
    from = i % numNodes;
    to = Math.floor(i / numNodes);
    if(to>prevRow){
      createRow(numCells, gridContainer, edges, prevRow,  cellSize);
      prevRow = to;
      edges = [];
    }
    if (cells.at(i).textContent === "1") {
      edges.push(from);
    }
  }

  createRow(numCells, gridContainer, edges, prevRow, cellSize);
}

