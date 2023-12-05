function readNodes(){
    return [
        {id: 0, label: "A", color: getColorSample(2)},
        {id: 1, label: "B", color: getColorSample(3)},
        {id: 2, label: "C", color: getColorSample(4)},
        {id: 3, label: "D", color: getColorSample(5)},
        {id: 4, label: "E", color: getColorSample(6)},
        {id: 5, label: "F", color: getColorSample(7)},
    ];
}

function readEdges(){
    return [
        {from:0, to: 1, arrows: "to", color: "#9a9999", background: {enabled: false}},
        {from:0, to: 3, arrows: "to", color: "#9a9999", background: {enabled: false}},
        {from:0, to: 4, arrows: "to", color: "#9a9999", background: {enabled: false}},
        {from:1, to: 3, arrows: "to", color: "#9a9999", background: {enabled: false}},
        {from:2, to: 5, arrows: "to", color: "#9a9999", background: {enabled: false}},
        {from:2, to: 3, arrows: "to", color: "#9a9999", background: {enabled: false}},
        {from:4, to: 3, arrows: "to", color: "#9a9999", background: {enabled: false}},
        {from:4, to: 1, arrows: "to", color: "#9a9999", background: {enabled: false}},
        {from:5, to: 4, arrows: "to", color: "#9a9999", background: {enabled: false}},
        {from:4, to: 2, arrows: "to", color: "#9a9999", background: {enabled: false}},


    ]
}

function createTextCell(cellSize) {
    const cell = document.createElement('div');
    cell.style.width = `${cellSize-4}px`;
    cell.style.height = `${cellSize-4}px`;
    cell.textContent = "-1";
    cell.className = 'cell';
    cell.style.backgroundColor = "#ffffff";
    cell.style.borderColor = "black"
    cell.style.borderStyle = "solid"
    cell.style.borderWidth = "2px"
    return cell
}

function createArray(containerName, numCells, cellSize, empty=false){
    const gridContainer = document.getElementById(containerName);
    gridContainer.innerHTML = "";
    gridContainer.style.gridTemplateColumns = `repeat(${numCells+1}, ${cellSize}px)`;

    for(let i =0; i<numCells; i++){
        if(empty && i > 0){
            gridContainer.appendChild(createTextCell(cellSize));
        }else{
            gridContainer.appendChild(create_sample(i, cellSize));
        }

    }

}

function fillArray(containerName, values, index){
    const gridContainer = document.getElementById(containerName);


    for(let i=0; i<gridContainer.children.length; i++){
        if(values[i] === index){
            gridContainer.children[i+1].textContent = index;
            gridContainer.children[i+1].style.backgroundColor = "#65fc1a"
        }
    }


}
