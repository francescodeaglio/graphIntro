function BFS(node, nodesBFS, edgesBFS){

  let toVisit = [node]
  let visitedNodesBFS = [node];
  let visitedEdgesBFS = [""];

  while(toVisit.length > 0){
    node = toVisit.shift();


    for(let i=0; i<edgesBFS.length; i++){
      if(edgesBFS[i]["from"] === node && ! visitedNodesBFS.includes(edgesBFS[i]["to"])){
        visitedEdgesBFS.push(edgesBFS[i])
        visitedNodesBFS.push(edgesBFS[i]["to"]);
        toVisit.push(edgesBFS[i]["to"])
      }
      if(edgesBFS[i]["to"] === node && ! visitedNodesBFS.includes(edgesBFS[i]["from"])){
        visitedEdgesBFS.push(edgesBFS[i])
        visitedNodesBFS.push(edgesBFS[i]["from"]);
        toVisit.push(edgesBFS[i]["from"])
      }
    }
  }

  return {
    "visitedNodesBFS": visitedNodesBFS,
    "visitedEdgesBFS": visitedEdgesBFS,
    "nodesBFS": nodesBFS,
    "edgesBFS": edgesBFS,
  }

}


function resetBFS(node, cells){
  currentIndexBFS = 0;
  let nodesBFS = resetNodeColors();
  let edgesBFS = createEdgesFromCells(cells, false, false);
  return BFS(node, nodesBFS, edgesBFS);

}

let currentIndexBFS = 0;

function nextNodeBFS(visitData)
{
  let visitedEdgesBFS = visitData["visitedEdgesBFS"];
  let visitedNodesBFS = visitData["visitedNodesBFS"];
  let nodesBFS = visitData["nodesBFS"];
  let edgesBFS = visitData["edgesBFS"];

  if(currentIndexBFS>=visitedNodesBFS.length){
    return
  }

  let node = visitedNodesBFS[currentIndexBFS];
  let edge = visitedEdgesBFS[currentIndexBFS];
  updateEdges(node, edge, nodesBFS, edgesBFS);

  showGraph(nodesBFS, edgesBFS, "mynetworkBFS");

  currentIndexBFS++;
}
