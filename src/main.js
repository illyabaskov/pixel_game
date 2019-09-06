import Vue from 'vue'
import store from './store'
import PixeelGame from './components/PixelGame.vue'

window.onload = function () {
  new Vue({
    el: '#pixel_game',
    store,
    render: h => h(PixeelGame)
  })
};
