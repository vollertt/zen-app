<template>
  <div id="app">    
    <header class="app-header">
      <Header ref="header"
              @emitRoute="updateRoute">
      </Header>
    </header>    
    <main class="container fixContainer">
      <Loading :disabled.sync="disable" :isModal_="true"></Loading>
      <router-view></router-view>
    </main>     
  </div>
</template>

<script>

import Loading from '@/components/utils/Loading'

import Vue from 'vue/dist/vue.js'
Vue.prototype.$appName = 'App'

/* Component Header with routes and tabs  */
import Header from '@/components/utils/Header'

let wait 
export default {
  
  name: 'App',

  components:{Header,Loading},
  data(){
     return{
       disable:false,
     }
  },
  
  mounted(){   
  }, 

  created() {
  },

  methods:{ 


    /*
    * Route init to push to user after Login ok (emit by Header)
    */
    updateRoute(params){
        var vm =this
        vm.disable=true
          let promise=new Promise((resolve, reject) => {
              let wait = setTimeout(() => {
                    clearTimeout(wait);
                    resolve(vm.$router.push({name:params}))
                    reject(console.log(`Timed out router ${params}`)) 
               }, 300)            
          })
          promise.then(console.log(`App ok router push`)).catch(function(error) {            
                 return new Error('Erro Router push promise '+error)
          }) 
          this.$router.afterEach(() => {
            clearTimeout(wait);
            vm.disable=false
          })
    },      
    
 }
}
</script>

<style src="./css_app/App.css">
</style>
