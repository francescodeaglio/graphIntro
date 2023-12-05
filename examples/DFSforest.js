
let nodesForest = [];
let edgesForest = [];

function resetForest(){
    nodesForest = [];
    edgesForest = [];
    showGraph(nodesForest, edgesForest, "TreeDFS");
}

function growForest(newNode, newEdge){

    nodesForest.push(
        {id: newNode, label: letters[newNode], color: "red"},
    )

    if(newEdge !== ""){
        let e = {}
        Object.assign(e, newEdge)
        e["background"] =  {
            enabled: true,
            color: "red",
        }

        edgesForest.push(e)
    }
    showGraph(nodesForest, edgesForest, "TreeDFS");
}



function create_small_grid(cellSize, containerName, cells, adjContainer, num_cells){


    const gridContainer = document.getElementById(containerName);

    gridContainer.style.gridTemplateColumns = `repeat(${num_cells}, ${cellSize}px)`;
    let el;

    for (let i = 0; i < num_cells * num_cells; i++) {
        let column = i % num_cells;
        let row = Math.floor(i / num_cells);
        if (column === 0) {
            el = create_sample(row);
        } else if (row === 0) {
            el = create_sample(column, cellSize);
        } else {
            el = create_cell_adj(num_cells, i, column, row, cellSize, true, false, cells, true, adjContainer, cells);
            cells.push(el)
        }

        gridContainer.appendChild(el);
    }
    return gridContainer;
}

function changeCellSmall(numCells, cell, cells, cellSize, adjContainer) {
    let newVal = (parseInt(cell.textContent)+1)%2
    cell.textContent = newVal
    cell.style.backgroundColor = getColor(newVal);

    create_list(numCells, cellSize, cells, adjContainer);
    visualizeDFS(cells);

}
