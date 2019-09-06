<template>
    <div class="board">
        <Row v-for="(row, index) in cells" v-bind:key="index" :x_num="index" />
    </div>
</template>

<script>
    import Row from "./Row.vue";
    export default {
        name: "Board",
        components: {
            Row
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