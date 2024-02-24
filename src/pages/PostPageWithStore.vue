<template>
    <div>
        <h1>Страница Store</h1>
        <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск...."
        v-focus
        />
        <div class="app_btns">
          <my-button
              @click="showDialog"
          >
            Создать пост
          </my-button>
          <my-select
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
            :options="sortOptions"
          />
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form
                @create="createPost"
            >
            </post-form>
        </my-dialog>

        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostLoading"
        >
        </post-list>
        <div
            v-else
        >
          Загрузка постов
        </div>
        <div v-intersection="loadMorePosts" class="observer"></div>

    </div>
</template>
<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
    components: {
        MySelect,
        MyButton,
        PostForm : PostForm,
        PostList : PostList,
        MyInput : MyInput
    },
    data() {
      return {
        dialogVisible: false,
      }
    },
    methods:{
        ...mapMutations({
            setPage: "post/setPage",
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            fetchPosts: "post/fetchPosts",
            loadMorePosts: "post/loadMorePosts"
        }),
      createPost(post) {
          this.posts.push(post)
          this.dialogVisible = false
      },
      removePost(post) {
          this.posts = this.posts.filter(p => p.id !== post.id)
      },
      showDialog(){
          this.dialogVisible = true
      },
      
    },
    mounted() {
      this.fetchPosts();
    },
    computed:{
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        }),
     },
    watch:{
      // page(){
      //   this.fetchPosts()
      // }
    }
}
</script>
<style>
 
  .app_btns{
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
  .search{
    width:100%;
    height: 50px;
    padding: 0 15px;
    margin: 15px 0 0;
  }
    .page_wrapper{
      display: flex;
      justify-content: center;
      margin: 15px 0 0;
    }
    .page{
      border:1px solid black;
      padding: 10px;
      margin: 0 3px;
      cursor: pointer;
      transition: 0.3s ease;
      &:hover{
        background: green;
        color:#fff;
      }
    }
    .current-page{
      background: green;
      color:#fff;
    }
    .observer{
      height: 30px;
      background: green;
    }
</style>