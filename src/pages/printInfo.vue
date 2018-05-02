 <template>
<!--首页-->
    <div class="index">
        <!--顶栏-->
        <Header></Header>
        <!--顶部的tabs及列表内容-->
        <printNote class="comment"></printNote>
    </div>
</template>

<script>
    import Header from '../components/header.vue'
    import printNote from '../components/printNote.vue'
    export default {
        components: {
            Header,
            printNote
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