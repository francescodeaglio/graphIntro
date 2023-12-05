

function create_cell_adj(numCells, i, column, row, cellSize, directed, weighted, elements, clickable=false, adjContainer, cells){
  const cell = document.createElement('div');
  cell.style.width = `${cellSize}px`;
  cell.style.height = `${cellSize}px`;
  let value;

  if(directed === false){
    // get the symmetric cell to preserve symmetry
    let idx = (row - 1)  * (numCells - 1) + (column - 1)
    let symm = (column - 1) * (numCells - 1) + (row - 1)

    // use the value of the symm if exists, else generate a random one
    if (idx > symm) {
      value = elements[symm].textContent;
    } else {
      if(!weighted){
        value = Math.floor(Math.random() + 0.3);
      }else{
        value = Math.round(Math.random() * 20 -15);
        if (value <0){
          value = 0;
        }
      }

    }

  }else{
    if(!weighted){
      value = Math.floor(Math.random() + 0.3);
    }else{
      value = Math.round(Math.random() * 20 -15);
      if (value <0){
        value = 0;
      }
    }
  }

  cell.className = 'cell';
  cell.i = i;

  cell.textContent = value;

  cell.style.backgroundColor = getColor(value);

  if(clickable){
    cell.addEventListener('click',
        () => changeCellSmall(numCells, cell, elements, cellSize, adjContainer));
  }
  return cell
}


function create_adj(numCells, cellSize, containerName, directed, weighted, elements){
  const gridContainer = document.getElementById(containerName);
  gridContainer.innerHTML = "";

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
      el = create_cell_adj(numCells, i, column, row, cellSize, directed, weighted, elements);
      el.gridIndex = i;
      elements.push(el);
    }

    gridContainer.appendChild(el);
  }

  return elements;
}

function getNodeColors(){
  return [
    {id: 0, label: "A", color: getColorSample(3), font:{color: "white"}},
    {id: 1, label: "B", color: getColorSample(4), font:{color: "white"}},
    {id: 2, label: "C", color: getColorSample(5), font:{color: "white"}},
    {id: 3, label: "D", color: getColorSample(6), font:{color: "white"}},
    {id: 4, label: "E", color: getColorSample(7), font:{color: "white"}},
    {id: 5, label: "F", color: getColorSample(8), font:{color: "white"}},
    {id: 6, label: "G", color: getColorSample(9), font:{color: "white"}},
    {id: 7, label: "H", color: getColorSample(10), font:{color: "white"}},
    {id: 8, label: "I", color: getColorSample(11), font:{color: "white"}},
  ]
}
function visualize_adj(elements, containerName, directed, weighted){

  edges = createEdgesFromCells(elements, directed, weighted);

  nodes = getNodeColors()
  const data = {
    nodes: nodes,
    edges: edges,
  };


  let container = document.getElementById(containerName);
  network = new vis.Network(container, data, options);
}
