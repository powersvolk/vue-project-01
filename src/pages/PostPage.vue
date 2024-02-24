<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
          v-model="searchQuery"
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
            v-model="selectedSort"
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
      <!-- <div ref="observer" class="observer"></div> -->
<!--        <div class="page_wrapper">-->
<!--          <div-->
<!--              v-for="pageNumber in totalPages"-->
<!--              :key="pageNumber"-->
<!--              class="page"-->
<!--              :class="{-->
<!--                'current-page': page == pageNumber-->
<!--              }"-->
<!--              @click="changePage(pageNumber)"-->
<!--          >-->
<!--            {{ pageNumber }}-->
<!--          </div>-->
<!--        </div>-->
    </div>
</template>
<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import axios from "axios"
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
export default {
    components: {
      MySelect,
      MyButton,
      MyInput,
      PostForm : PostForm,
      PostList : PostList
    },
    data() {
      return {
        posts : [ ],
        dialogVisible: false,
        isPostLoading:false,
        searchQuery:'',
        selectedSort: '',
        page: 1,
        limit:10,
        totalPages:10,
        sortOptions:[
          {value: 'id', name: 'По ID'},
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По описанию'},
        ]
      }
    },
    methods:{
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
      // changePage(pageNumber) {
      //   this.page = pageNumber
      // },
      async fetchPosts(){
        try{
          this.isPostLoading = true
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/',{
              params:{
                _limit: this.limit,
                _page: this.page,
              }
            })
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = response.data
            this.isPostLoading = false
        }
        catch (e){
          alert('Error')
        }
      },
      async loadMorePosts(){
        try{
          this.page += 1
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts/',{
            params:{
              _limit: this.limit,
              _page: this.page,
            }
          })
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = [...this.posts, ...response.data]
        }
        catch (e){
          alert('Error')
        }
      }
    },
    mounted() {
      this.fetchPosts();
    //   const options = {
    //     rootMargin: "0px",
    //     threshold: 1.0,
    //   };
    //   const callback = (entries) => {
    //     if(entries[0].isIntersecting && this.page < this.totalPages){
    //       this.loadMorePosts()
    //     }
    //   }
    //   const observer = new IntersectionObserver(callback, options);
    //   observer.observe(this.$refs.observer)
    },
    computed:{
      sortedPosts() {
        if (this.selectedSort == 'id') {
          return [...this.posts].sort((post1, post2) => post1[this.selectedSort] - post2[this.selectedSort]);
        } else {
          return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        }
      },
      sortedAndSearchedPosts() {
        return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
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