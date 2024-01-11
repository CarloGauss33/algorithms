<script setup lang="ts">
import { createCanvas, createCircle, connectFigures} from './utils/canvas'
import {onMounted} from 'vue'

const delay = ms => new Promise(res => setTimeout(res, ms));

onMounted(async () => {
  document.addEventListener('DOMContentLoaded', async () => {
    const elem = document.getElementById('canvas');

    const two = createCanvas(elem as HTMLElement);

    const boundingBox = two.renderer.domElement.getBoundingClientRect();
    console.log(boundingBox);

    const circleRadius = 50;

    const nodesInTree = 8;

    const circles = [];
    const lines = [];

    const insertionQueue = [];
    
    const root = createCircle(
      two,
      boundingBox.width / 2,
      100,
      circleRadius
    );

    console.log('root', root);

    circles.push(root);
    insertionQueue.push(root);

    while (insertionQueue.length > 0) {
      if (circles.length > nodesInTree - 1){
        break;
      }

      const currentCircle = insertionQueue.shift();
      console.log('currentCircle', currentCircle);
      const position = currentCircle.translation;

      await delay(700); // Add delay here

      const leftChild = createCircle(
        two,
        position.x - circleRadius * (800 - position.y) / 100,
        position.y + 200,
        circleRadius
      );
      lines.push(connectFigures(two, currentCircle, leftChild));

      await delay(700); // Add delay here

      const rightChild = createCircle(
        two,
        position.x + circleRadius * (800 - position.y) / 100,
        position.y + 200,
        circleRadius
      );
      lines.push(connectFigures(two, currentCircle, rightChild));

      circles.push(leftChild);
      circles.push(rightChild);

      insertionQueue.push(leftChild);
      insertionQueue.push(rightChild);
    
    }

    two.update(); // Update the canvas to reflect the new circles and lines.
  })
}) 
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <div class="bg-blue-800 h-6"></div>
    <div id="canvas" class="min-h-screen flex-grow"></div>
  </div>
</template>
