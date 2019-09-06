<template>
    <div class="row">
        <Cell v-for="(c, index) in cells[x_num]" v-bind:key="index" :x_num="x_num" :y_num="index" :c_color="cells[x_num][index]" />
    </div>
</template>

<script>
    import Cell from "./Cell.vue";
    export default {
        name: "Row",
        props: {
            x_num: Number
        },
        components: {
            Cell
        },
        computed: {
            cells() {
                return this.$store.getters['board/cells']
            }
        },
    }
</script>

<style scoped>

</style>