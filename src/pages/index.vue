<template>
<!--首页-->
    <div class="index">
        <!--顶栏-->
        <Header></Header>
        <!--顶部的tabs及列表内容-->
        <PrintRoute class="comment"></PrintRoute>
    </div>
</template>

<script>
    import Header from '../components/header.vue'
    import PrintRoute from '../components/printRoute.vue'
    export default {
        components: {
            Header,
            PrintRoute
        }
    }
</script>

<style scope>
   .index{
     margin: 0;
     width: 100%;
   }
   .comment{
     width: 100%;
   }
</style>