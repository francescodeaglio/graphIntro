let timerDFS
let currentIndexDFS_all = {};
function DFS(node, visitedNodesDFS, visitedEdgesDFS, nodesDFS, edgesDFS, startTimes, endTimes, directed=false){

  startTimes[node] = timerDFS;
  timerDFS ++;

  visitedNodesDFS.push(node);

  for(let i=0; i<edgesDFS.length; i++){
    if(edgesDFS[i]["from"] === node && ! visitedNodesDFS.includes(edgesDFS[i]["to"])){
      visitedEdgesDFS.push(edgesDFS[i]);
      edgesDFS[i]["l"] = "Tree";
      DFS(edgesDFS[i]["to"], visitedNodesDFS, visitedEdgesDFS, nodesDFS, edgesDFS, startTimes, endTimes, directed);
    }
    else if((!directed) && edgesDFS[i]["to"] === node && ! visitedNodesDFS.includes(edgesDFS[i]["from"])){
      visitedEdgesDFS.push(edgesDFS[i]);
      DFS(edgesDFS[i]["from"], visitedNodesDFS, visitedEdgesDFS, nodesDFS, edgesDFS, startTimes, endTimes, directed);
    }else if(edgesDFS[i]["from"] === node){
      toNode = edgesDFS[i]["to"];
      if(endTimes[toNode] === -1){
        edgesDFS[i]["l"] = "Backward";
      }else{
        if(startTimes[toNode] > startTimes[edgesDFS[i]["from"]]){
          edgesDFS[i]["l"] = "Forward";
        }else{
          edgesDFS[i]["l"] = "Cross";
        }
      }
    }
  }

  visitedEdgesDFS.push("")
  visitedNodesDFS.push("");
  endTimes[node] = timerDFS;
  timerDFS ++;

}


function resetDFS(node, cells, preload = false, directed = false, containerName, nodesLimit){
  currentIndexDFS_all[containerName] = 0;
  let edgesDFS;
  let nodesDFS;
  if (!preload) {
    edgesDFS = createEdgesFromCells(cells, directed, false);
    nodesDFS = resetNodeColors(nodesLimit);
  } else {
    nodesDFS = readNodes();
    edgesDFS = readEdges();
  }

  let visitedNodesDFS = [];
  let visitedEdgesDFS = [];
  timerDFS = 0;

  let startTimes = new Array(nodesDFS.length).fill(-1);
  let endTimes = new Array(nodesDFS.length).fill(-1);

  for(let i=0; i < nodesDFS.length; i++){
    node = nodesDFS[i]["id"];
    if(!visitedNodesDFS.includes(node)){
      visitedEdgesDFS.push("")
      DFS(node, visitedNodesDFS, visitedEdgesDFS, nodesDFS, edgesDFS, startTimes, endTimes, directed);
    }
  }


  return {
    "visitedNodesDFS": visitedNodesDFS,
    "visitedEdgesDFS": visitedEdgesDFS,
    "nodesDFS": nodesDFS,
    "edgesDFS": edgesDFS,
    "startTimes": startTimes,
    "endTimes": endTimes
  }
}


function nextNodeDFS(visitData, containerName)
{
  currentIndexDFS = currentIndexDFS_all[containerName];

  let visitedEdgesDFS = visitData["visitedEdgesDFS"];
  let visitedNodesDFS = visitData["visitedNodesDFS"];
  let nodesDFS = visitData["nodesDFS"];
  let edgesDFS = visitData["edgesDFS"];

  if(currentIndexDFS>=visitedNodesDFS.length){
    return
  }

  let node = visitedNodesDFS[currentIndexDFS];
  let edge = visitedEdgesDFS[currentIndexDFS];
  updateEdges(node, edge, nodesDFS, edgesDFS);
  showGraph(nodesDFS, edgesDFS, containerName);
  currentIndexDFS_all[containerName]++;
}

function updateEdges(node, edge, nodes, edges){

  for(let i=0; i<nodes.length;i++) {
    if(nodes[i]["color"]==="red"){
      nodes[i]["color"] = "rgb(255,118,118)";
    }
  }
  nodes[node]["color"] = "red";


  for(let i=0; i<edges.length;i++){
    if(edges[i]["background"]["enabled"] === true){
      edges[i]["background"] =  {
        enabled: true,
        color: "rgba(255,0,0,0.33)",
      }
    }
    if(edges[i]["from"] === edge["from"] && edges[i]["to"] === edge["to"]){
      edges[i]["background"] =  {
        enabled: true,
        color: "#ff0000",
      }
    }
  }

}
