
let letters = "ABCDEFGHILMNOPQRSTUVZ"

function createUnUn(smallCellSize, numCells){
  c1 = create_adj(numCells, smallCellSize, "unun", false, false, []);
  visualize_adj(c1, "ununG", false, false);
}

function createUnWei(smallCellSize, numCells) {
  c2 = create_adj(numCells, smallCellSize, "unwei", false, true, []);
  visualize_adj(c2, "unweiG", false, true);
}

function createDirUn(smallCellSize, numCells) {
  c3 = create_adj(numCells, smallCellSize, "dirun", true, false, []);
  visualize_adj(c3, "dirunG", true, false);
}

function createDirWei(smallCellSize, numCells) {
  c4 = create_adj(numCells, smallCellSize, "dirwei", true, true, []);
  visualize_adj(c4, "dirweiG", true, true);
}


document.addEventListener('DOMContentLoaded', () => {

    let numCells = 10;
    let cellSize = 400 / numCells;
    let smallCellSize = 0.8 * cellSize;

  createPlayableMatrix(smallCellSize, numCells);
  visualize_adj(cx, "playableG", false, false);
  document.getElementById("ununB").addEventListener("click", ()=>createUnUn(smallCellSize, numCells) )
  createUnUn(smallCellSize, numCells)
  document.getElementById("unweiB").addEventListener("click", ()=>createUnWei(smallCellSize, numCells) )
  createUnWei(smallCellSize, numCells);
  document.getElementById("dirunB").addEventListener("click", ()=>createDirUn(smallCellSize, numCells) )
  createDirUn(smallCellSize, numCells);
  document.getElementById("dirweiB").addEventListener("click", ()=>createDirWei(smallCellSize, numCells) )
  createDirWei(smallCellSize, numCells);

  let cells = [];
  let gridContainer = create_grid(numCells, cellSize, "grid", cells, "adjList");
  create_list(numCells, cellSize, cells, "adjList");
  resetGraphs(cells);


  let cellsSmall = [];
  create_small_grid(smallCellSize, "gridSmall", cellsSmall, "adjListSmall", 7);
  create_list(numCells, smallCellSize, cellsSmall, "adjListSmall");


  visualizeDFS(cellsSmall);


});

function visualizeGraphLabeled(visitDataDFSAll, containerName) {

  let dfs_edges = visitDataDFSAll["edgesDFS"];
  let e_g = []

  let visitedEdges = visitDataDFSAll["visitedEdgesDFS"];

  let edgeColors = {
    "Forward": "blue", "Tree": "red", "Backward": "green",
    "Cross": "orange"
  }
  for(let i = 0; i<dfs_edges.length; i++){
    let e = {};
    Object.assign(e, dfs_edges[i]);
    e["label"] = e["l"];

    e["color"] = edgeColors[e["l"]];
    e_g.push(e);
  }

  visualizeGraph(visitDataDFSAll["nodesDFS"], e_g, containerName)


}

function visualizeDFS(cells){

  resetForest();
  let visitDataDFSAll = {};
  visitDataDFSAll = resetDFS(0, cells, false, true, "DFSWide", 6);
  visualizeGraph(visitDataDFSAll["nodesDFS"], visitDataDFSAll["edgesDFS"], "DFSWide");


  createArray("arraySt", 7, 42);
  createArray("arrayEn", 7, 42);
  createArray("arrayStVal", 7, 42, true);
  createArray("arrayEnVal", 7, 42, true);


  var old_element = document.getElementById("buttonDFSWide");
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);
  new_element.addEventListener("click",
          d => updateArrayAndGraph(visitDataDFSAll));

  visualizeGraphLabeled(visitDataDFSAll, "DFSWideLabeling");

}

  function updateArrayAndGraph(visitDataDFSAll){

    console.log(currentIndexDFS_all["DFSWide"], visitDataDFSAll["startTimes"], )

    if(visitDataDFSAll["startTimes"].includes(currentIndexDFS_all["DFSWide"])){
      growForest(visitDataDFSAll["visitedNodesDFS"][currentIndexDFS_all["DFSWide"]], visitDataDFSAll["visitedEdgesDFS"][currentIndexDFS_all["DFSWide"]]);
      fillArray("arrayStVal", visitDataDFSAll["startTimes"], currentIndexDFS_all["DFSWide"]);
      nextNodeDFS(visitDataDFSAll, "DFSWide");

    }
    else{
      fillArray("arrayEnVal", visitDataDFSAll["endTimes"], currentIndexDFS_all["DFSWide"]);
      currentIndexDFS_all["DFSWide"]++;
    }
}


function nextNodeBoth(visitDataDFS, visitDataBFS) {
  nextNodeDFS(visitDataDFS, "mynetworkDFS");
  nextNodeBFS(visitDataBFS);
}
function resetGraphs(cells){
  let visitDataBFS = resetBFS(0, cells);
  let visitDataDFS = resetDFS(0, cells, false, false,  "mynetworkDFS");

  el = document.getElementById("buttonBFS");
  recreateNode(el).addEventListener("click", d => nextNodeBFS(visitDataBFS));

  el = document.getElementById("buttonDFS");
  recreateNode(el).addEventListener("click", d => nextNodeDFS(visitDataDFS, "mynetworkDFS"));

  el = document.getElementById("buttonBOTH");
  recreateNode(el).addEventListener("click", d => nextNodeBoth(visitDataDFS, visitDataBFS));

  visualizeGraph(visitDataDFS["nodesDFS"], visitDataDFS["edgesDFS"], "mynetworkDFS");
  visualizeGraph(visitDataBFS["nodesBFS"], visitDataBFS["edgesBFS"], "mynetworkBFS");
}


function recreateNode(el) {
  var newEl = el.cloneNode(false);
  while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
  el.parentNode.replaceChild(newEl, el);
  return newEl;
}







