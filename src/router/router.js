import HomePage from '@/pages/HomePage.vue'
import PostPage from '@/pages/PostPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import PostSingle from '@/pages/PostSingle.vue'
import PostPageWithStore from '@/pages/PostPageWithStore.vue'
import PostPageCompositionApi from '@/pages/PostPageCompositionApi.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage
    },
    {
        path: '/posts',
        name: 'PostPage',
        component: PostPage
    },
    {
        path: '/posts/:id',
        name: 'PostSingle',
        component: PostSingle
    },
    {
        path: '/store',
        name: 'PostPageWithStore',
        component: PostPageWithStore
    },
    {
        path: '/composition',
        name: 'PostPageCompositionApi',
        component: PostPageCompositionApi
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router