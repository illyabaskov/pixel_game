<template>
    <div class="cell" v-bind:class="{light: c_color}">
        <div class="link" @click="cellLinkClick"></div>
    </div>
</template>

<script>
    export default {
        name: "Cell",
        props: {
            x_num: Number,
            y_num: Number,
            c_color: Number
        },
        methods: {
            cellLinkClick() {
                this.$store.dispatch('board/cell_click', {x: this.x_num, y: this.y_num});
                this.$store.dispatch('board/check');
            }

        }
    }
</script>

<style lang="scss">
    .link {
        display: block;
        height: 100%;
        width: 100%;
        line-height: 30px;
        color: #fff;
        text-align: center;
    }

</style>