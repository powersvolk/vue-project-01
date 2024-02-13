<template>
    <div v-if="posts.length > 0">
        <h3>Список Пользователей</h3>
      <transition-group name="use-list">
        <post-item
            :post="post"
            v-for="post in posts"
            :key="post.id"
            @remove="$emit('remove', post)"
        />
      </transition-group>

    </div>
    <h3 
        v-else 
        style="color: red;"
    >
        Список постов пустой
    </h3>
</template>
<script>
import PostItem from "@/components/PostItem.vue"
export default {
    components:{
        PostItem: PostItem,
    },
    props: {
        posts:{
            type: Array,
            required: true,
        }
    }
}
</script>
<style scoped>
    .use-list-item{
      display: inline-block;
      margin-right: 10px;
    }
    .use-list-enter-active,
    .use-list-leave-active{
      transition: all 0.4s ease;
    }
    .use-list-enter-from,
    .use-list-leave-to{
      opacity: 0;
      transform: translateX(130px);
    }
    .use-list-move{
      transition: transform 0.4s ease;
    }
</style>