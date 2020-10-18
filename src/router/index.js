import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({    
    mode:'history',
    routes: [        
        {
            path:name+'/zen-app/',
            props:true,
            name:'Produto',
            component:() => import('../components/item/Produto')
        },
        {
            path:name+'/zen-app/item/linha-produtos',
            name:'LinhaProduto',
            component:() => import('../components/item/LinhaProduto')
        },
        {
            path:name+'/zen-app/item/grupo-produtos',
            name:'GrupoProduto',
            component:() => import('../components/item/GrupoProduto')
        },
        {
            path:name+'/zen-app/item/veiculos',
            name:'Veiculo',
            component:() => import('../components/item/Veiculo')
        }, 
    ]
})
 export default router