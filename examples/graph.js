let distColors = ["#038f70", "#ff4bac", "#758f03", "#a063d9", "#ffffff"]
const startColor = "#8dc4ff";

let nodes;

let edges;
let network;

// create a network

let options = {
  nodes: {
    size: 30,
    font: {
      size: 20,
    },
    borderWidth: 2,
    shadow: true,
  },
  edges: {
    width: 2,
    shadow: true,
    scaling: {
      customScalingFunction: function (min, max, total, value) {
        return value / total;
      },
      min: 5,
      max: 40,
    },
  },
  layout:{
    randomSeed: 2}
};

function resetNodeColors(nodesLimit){
  return [
    {id: 0, label: "A", color: startColor},
    {id: 1, label: "B", color: startColor},
    {id: 2, label: "C", color: startColor},
    {id: 3, label: "D", color: startColor},
    {id: 4, label: "E", color: startColor},
    {id: 5, label: "F", color: startColor},
    {id: 6, label: "G", color: startColor},
    {id: 7, label: "H", color: startColor},
    {id: 8, label: "I", color: startColor},
  ].slice(0, nodesLimit);
}

function createEdgesFromCells(cells, directed, weighted) {

  let edges = []

  let numNodes = Math.sqrt(cells.length);

  let from;
  let to;

  for (let i = 0; i < cells.length; i++) {

    if (parseInt(cells.at(i).textContent) > 0) {
      to = i % numNodes;
      from = Math.floor(i / numNodes);
      if (directed || from >= to) {
        let w = cells.at(i).textContent;
        let edge;
        if(weighted){
          edge = {from: from, to: to, label: w, color: "#a0eeee", value: w/2 ,
            background: {enabled: false}};
        }else{
          edge = {from: from, to: to, color: "#a0eeee",
            background: {enabled: false}};
        }
        if(directed){
          edge["arrows"] = "to";
        }
        edges.push(edge);

      }
    }
  }

  return edges;
}



function showGraph(nodes, edges, containerName) {
  const data = {
    nodes: nodes,
    edges: edges,
  };
  let container = document.getElementById(containerName);
  network = new vis.Network(container, data, options);
}

function visualizeGraph(nodes, edges, containerName) {

  showGraph(nodes, edges, containerName);
}



