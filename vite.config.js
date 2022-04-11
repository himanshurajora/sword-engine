const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        game1: resolve(__dirname, 'samples/games/FlappyBird/index.html'),
        game2: resolve(__dirname, 'samples/games/Snake/index.html'),
        game3: resolve(__dirname, 'samples/games/SpaceWar/index.html'),
        simulation1: resolve(__dirname, 'samples/simulations/Raining/index.html'),
        simulation2: resolve(__dirname, 'samples/simulations/BeziereCurves/index.html'),
        simulation3: resolve(__dirname, 'samples/simulations/SolorSystem/index.html'),
        dsaSimulation1: resolve(__dirname, 'samples/dsa-simulation/knapsack-DP/index.html'),
        dsaSimulation2: resolve(__dirname, 'samples/dsa-simulation/array-rotation/index.html')
      }
    }
  }
})