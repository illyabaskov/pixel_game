<template>
    <div id="app">

        <h1>Pixel Game</h1>

        <div class="complete_game" v-if="game_complete">
            <div class="cont_wrapper">
            <h2>Well Done!</h2>
                <a href="#" class="close" @click.stop.prevent="closePopup">Close</a>
            </div>
        </div>

        <div class="form_new_game">
            <label>
                x:
                <input type="number" name="n_x" v-model="dimension" min="0" max="15">
            </label>
            <label>
                y:
                <input type="number" name="n_y" v-model="dimension" min="0" max="15">
            </label>
            <button @click="startNewGame">Start new game</button>
        </div>

        <hr>

        <div v-if="generate_process">
            <div v-if="game_started">
                <div v-if="dimension>0 || board_dimension>0">
                    generate process...
                </div>
                <div v-else>
                    dimension must be greater than zero
                </div>
            </div>
            <div v-else>
                <div v-if="dimension>0">
                    so lets start
                </div>
                <div v-else>
                    choose board dimension
                </div>
            </div>
        </div>
        <div v-else>
            <Board v-if="board_dimension>0" />
        </div>

        <hr>

    </div>
</template>

<script>
    import Board from "./Board.vue";
    import Cell from "./Cell.vue";
    export default {
        name: 'PixelGame',
        components: {
            Board,
            Cell
        },
        data () {
            return {
                dimension: 0,
            }
        },
        computed: {
            color_start() {
                return this.$store.getters['board/color_start']
            },
            generate_process() {
                return this.$store.getters['board/generate_process']
            },
            game_started() {
                return this.$store.getters['board/game_started']
            },
            board_dimension() {
                return this.$store.getters['board/dimension']
            },
            game_complete() {
                return this.$store.getters['board/game_complete']
            }
        },
        methods: {
            startNewGame() {
                this.$store.dispatch('board/generate_cells', parseInt(this.dimension));

            },
            onLoadStartColor() {
                this.$store.dispatch('board/generate_start_color');
            },
            closePopup() {
                console.log('!!');
                this.$store.commit('board/completeGame', false);
            }
        },
        mounted() {
            this.onLoadStartColor();
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        position: relative;
    }
    h1, h2 {
        font-weight: normal;
    }
    a {
        color: #42b983;
    }

    input[type=number] {
        font-size: 18px;
        width: 40px;
        text-align: center;
        color: #42b983;
        border: 2px solid #999;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }
    label {
        font-size: 18px;
        color: #777;
        display: inline-block;
        margin: 0 10px;
    }
    button {
        font-size: 18px;
        text-align: center;
        color: #333;
        border: 2px solid #999;
        background: #eee;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }

    .start_color {
        display: block;
        margin: 10px auto;
        width: 90px;
        height: 30px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        background: black;
        color: #fff;
        &.light {
            background: #42b983;
        }
    }

    .board {
        display: flex;
        flex-direction: column;
        .row {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            .cell {
                display: block;
                width: 30px;
                height: 30px;
                border: 2px solid #999;
                -webkit-border-radius: 3px;
                -moz-border-radius: 3px;
                border-radius: 3px;
                background: black;
                margin: 2px;
                &.light {
                    background: #42b983;
                }
            }
        }
    }
    .complete_game {
        position: absolute;
        display: flex;
        left: 50%;
        top: 50%;
        margin: -75px 0 0 -150px;
        width: 300px;
        height: 150px;
        background: #fff;
        border: 2px solid #eee;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        box-shadow: 2px 2px 10px #000;
        text-align: center;
        justify-content: center;
        align-items: center;
        .cont_wrapper {
            h2 {
                display: block;
                margin: 0;
                text-align: center;
            }
            .close {
                display: block;
                text-decoration: none;
                border: 1px solid #42b983;
                margin: 20px 0 0 0;
                padding: 0 10px;
                -webkit-border-radius: 12px;
                -moz-border-radius: 12px;
                border-radius: 12px;
            }
        }
    }
</style>
