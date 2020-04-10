import vue from 'vue'
import vueRouter from 'vue-router'
const Recommend = () => import("../components/recommend")
const Singer = () => import("../components/Singer")
const Rank = () => import("../components/rank")
const Detail = () => import("../components/Detail")
const Search = () => import("../components/search")
vue.use(vueRouter)

const routes = [
    {
        path:"/",
        redirect:"/recommend"
    },
    {
        path:"/recommend",
        component:Recommend
    },
    {
        path:"/Singer",
        component:Singer,
        children:[
            {
                path:":Fsinger_mid",
                component:Detail
            }
        ]
    },
    {
        path:"/Rank",
        component:Rank
    },
    {
        path:"/Search",
        component:Search
    },
]

let router = new vueRouter({
    routes
})

export default router