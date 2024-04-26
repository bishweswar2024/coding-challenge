<template>
  <div>
    <div id="contextMenu" class="menu" v-if="isShowContxetMenu">
      <span> {{ selectedNodeData.key }} </span>
      <p> {{ selectedNodeData.description }} </p>
      <a @click="hideContextMenu();" class="cross">✖</a>
    </div>
    <div id="myDiagramDiv" class="goDiagram"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as go from 'gojs';
import axios from 'axios';

const selectedNodeData = ref({
  key: '',
  description: '',
})
const isShowContxetMenu = ref(0);
const graphData = ref(null);

let myDiagram = '';
async function getGraphData () {
  graphData.value = await axios
    .get('http://localhost:3000/getGraphData');
}
onMounted(async () => {
  await getGraphData();
  const $ = go.GraphObject.make;
  myDiagram = new go.Diagram(
    'myDiagramDiv',
    {
      initialAutoScale: go.AutoScale.UniformToFill,
      layout: $(go.TreeLayout, { comparer: go.LayoutVertex.smartComparer }),
    }
  );
  myDiagram.nodeTemplate = $(go.Node,
    go.Panel.Auto,
    { 
      click: function(e, node) { showContextMenu(node);},
      doubleClick:  function(e, node) { showContextMenu(node); },
    },
    $(go.Shape, 'Rectangle', { fill: 'white' }),
    $(go.TextBlock, { margin: 5 }, new go.Binding('text', 'key'))
  );
  myDiagram.linkTemplate =
      $(go.Link,
        { routing: go.Routing.Orthogonal, layerName: "Background", corner: 5 },
        $(go.Shape, { strokeWidth: 2 },
          new go.ThemeBinding("stroke", "link")
        ));
  myDiagram.model = new go.TreeModel(graphData.value.data);
  function showContextMenu(obj, diagram) {
    selectedNodeData.value.key = obj.data.key;
    selectedNodeData.value.description = obj.data.description;
    isShowContxetMenu.value = 1;
  }
  function hideContextMenu() {
    isShowContxetMenu.value = 0;
  }
});
function hideContextMenu() {
  isShowContxetMenu.value = 0;
  myDiagram.clearSelection();
}
</script>