let clickedPlayable = false;
let lastCellPlayable = false;

function createPlayableMatrix(smallCellSize, numCells) {
    cx = create_adj_playable(numCells, smallCellSize, "playable", false, false, []);
    for (let i = 0; i < cx.length; i++) {
        cx[i].addEventListener("click", () => updateCellAndGraph(numCells, cx[i], cx));
    }
}

function create_adj_playable(numCells, cellSize, containerName, directed, weighted, elements){
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


function updateCellAndGraph(numCells, cell, cells) {

    const gridContainer = document.getElementById("playable");

    if(clickedPlayable && lastCellPlayable === cell){
        clickedPlayable = false;
        lastCellPlayable = false;
        restoreColorsPlayable(gridContainer);
        visualize_adj(cells, "playableG", false);

    }else {
        clickedPlayable = true;
        lastCellPlayable = cell;
        selectCellPlayable(numCells, cell, gridContainer);
        visualizeAdjSelectedPlayable(numCells, cells, "playableG", cell);
    }
}

function selectCellPlayable(numCells, cell, gridContainer){
    from = cell.gridIndex % numCells;
    to = Math.floor(cell.gridIndex / numCells);
    for(let i=0; i<gridContainer.children.length; i++) {

        let e = gridContainer.children[i];
        if (e.gridIndex === cell.gridIndex) {
            e.style.backgroundColor = "rgb(9,179,231)"
        } else if (e.className === "cell") {
            e.style.backgroundColor = "rgba(136,136,134,0.5)"
        }

        if (e.className === "sample" && e.sampleIndex === from && i < numCells) {
            e.style.backgroundColor = getColorSample(from + 2)
            e.style.color = "white"
        } else if (e.className === "sample" && e.sampleIndex === to && i >= numCells) {
            e.style.backgroundColor = getColorSample(to + 2)
            e.style.color = "white"
        } else if (e.className === "sample") {
            e.style.backgroundColor = "rgba(252,252,252,0.88)"
            e.style.color = "black"
        }

    }
}

function restoreColorsPlayable(gridContainer){

    for(let i=0; i<gridContainer.children.length; i++) {

        let e = gridContainer.children[i];

        if(e.className === "cell"){
            e.style.backgroundColor = getColor(e.textContent);
        }else if(e.className === "sample" && e.sampleIndex > 0){
            e.style.backgroundColor = getColorSample(e.sampleIndex + 2)
            e.style.color = "white"
        }

    }
}

function visualizeAdjSelectedPlayable(numCells, elements, containerName, cell) {
    from = cell.gridIndex % numCells;
    to = Math.floor(cell.gridIndex / numCells);

    edges = createEdgesFromCells(elements, false, false);


    for(let i=0;i<edges.length;i++){
        if(edges[i]["from"] === from - 1 && edges[i]["to"] === to - 1){
            edges[i]["color"]="rgb(0,0,0)"
        }
        else if(edges[i]["to"] === from - 1 && edges[i]["from"] === to - 1){
            edges[i]["color"]="rgb(0,0,0)"
        }
        else{
        }


    }

    nodes = getNodeColors()
    const data = {
        nodes: nodes,
        edges: edges,
    };

    let container = document.getElementById(containerName);
    network = new vis.Network(container, data, options);
}
