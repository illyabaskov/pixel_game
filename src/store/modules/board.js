import Vue from 'vue';

export default  {
    namespaced: true,
    state: {
        color_start: 0,
        dimension : 0,
        cells: [],
        generate_process: true,
        game_process_status: false,
        game_started: false,
        game_complete: false
    },
    getters: {
        dimension: state => state.dimension,
        color_start: state => state.color_start,
        cells: state => state.cells,
        generate_process: state => state.generate_process,
        game_started: state => state.game_started,
        game_complete: state => state.game_complete,
    },
    actions: {
        generate_cells: ({commit, dispatch, state}, dimension) => {
            let cells = new Array(dimension).fill(state.color_start).map(x => new Array(dimension).fill(state.color_start));
            commit('newDimension', dimension);
            commit('newGeneratedCells', cells);
            commit('newGameStart', true);
            for (let i=0; i<state.dimension/2; i++) {
                for (let k=0; k<state.dimension/2; k++) {
                    dispatch('cell_click', {x: Math.floor(Math.random() * Math.floor(state.dimension-1)), y: Math.floor(Math.random() * Math.floor(state.dimension-1))});
                }
            }
            commit('newGenerateProcessStatus');
        },
        generate_start_color: ({commit, state}) => {
            let start_color = Math.floor(Math.random() * Math.floor(2));
            commit('newGeneratedStartColor', start_color);
        },
        cell_click: ({commit, state}, cell) => {
            commit('newCellValue', cell);
            if (cell.y>0) {
                commit('newCellValue', {x:cell.x, y:cell.y-1});
            }
            if (cell.y<state.dimension-1) {
                commit('newCellValue', {x:cell.x, y:cell.y+1});
            }
            if (cell.x>0) {
                commit('newCellValue', {x:cell.x-1, y:cell.y});
            }
            if (cell.x<state.dimension-1) {
                commit('newCellValue', {x:cell.x+1, y:cell.y});
            }
        },
        check: ({commit, state}) => {
            const allEqual = arr => arr.every( v => v === state.cells[0][0] );
            let complete = state.cells.map( a => allEqual(a)).every((val, i, arr) => val === true);
            if (complete) {
                commit('completeGame', true);
            }
        }
    },
    mutations: {
        newDimension(state, value) {
            state.dimension = parseInt(value);
        },
        newGeneratedCells(state, value) {
            state.cells = value;
        },
        newGeneratedStartColor(state, value) {
            state.color_start = value;
        },
        newCellValue(state, cell) {
            Vue.set(state.cells[cell.x], cell.y, Math.abs(state.cells[cell.x][cell.y]-1));
        },
        newGameStart(state, value) {
            state.game_started = value;
        },
        newGenerateProcessStatus(state) {
            state.generate_process = state.dimension <= 0;
        },
        completeGame(state, value) {
            state.game_complete = value;
        }
    }
}