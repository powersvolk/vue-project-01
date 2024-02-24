<template>
    <div class="navbar">
        <h2 @click="$router.push('/')">Vue 3</h2>
        <div class="navbar__btns">
            <my-button
                @click="$router.push('/posts')"
            >
                Записи
            </my-button>
            <my-button 
                style="margin-left: 20px;"
                @click="$router.push('/store')"
            >
                Store
            </my-button>
            <my-button 
                style="margin-left: 20px;"
                @click="$router.push('/composition')"
            >
                Composition API
            </my-button>
            <my-button 
                style="margin-left: 20px;"
                @click="$router.push('/about')"
            >
                О сайте
            </my-button>
        </div>

    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .navbar{
        height: 50px;
        background-color: light-gray;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }
    .navbar__btns{
        margin-left:auto;
    }
</style>