<!-- Componente do Header do App contendo as rotas (links/paths dos itens da aplicação) -->
<template>
  <div id="header">
    <nav class="nav-extended">
    <div class="nav-wrapper navStyle">
      <a href="#" class="brand-logo">Zen () ->  Produtos</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger">
        <i class="material-icons">menu</i>
      </a>      
      <ul id="nav-mobile" class="right hide-on-med-and-down">   
        <li>
          <div style="display:flex;margin-top:5px;"></div>
        </li>  
      </ul>     
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent tab_">
         <li v-for="(route,index) in routes" :key="index" v-bind:class="{ active: routeActive===index } " v-on:click="setIndexRoute(index)" class="nav-item" > 
              <router-link class="nav-link routerLink" :to="route.path">
                <i class="material-icons icon-tab">{{route.icon}}</i>{{route.title}}
              </router-link>
          </li>    
     </ul>
    </div>    
  </nav> 
  </div>
</template>

<script>


export default {
  
  data(){
     return{   
       routes:[],
       routeActive:0
       }
  },

  mounted(){    
  },

  created() {
    this.getRoutes()     
  },

  methods:{   

    /*
    * Ajusta a Rota Ativa da tab evento onclick
    */
    setIndexRoute(key){
      this.routeActive=key
    },
    
    /*
    * Gera as rotas dinamicamente dos itens associados 
    */
    getRoutes(){
        this.routes=[
              { path:'/zen-app', name:'Produto', title:'Produtos', icon:'person'},
              { path:'/zen-app/item/linha-produtos', name:'LinhaProduto', title:'Linha Produtos', icon:'book'},
              { path:'/zen-app/item/grupo-produtos', name:'GrupoProduto', title:'Grupo Produtos', icon:'book'},
              { path:'/zen-app/item/veiculos', name:'Veiculo', title:'Veículos', icon:'book'}             
        ]
        this.setIndexRoute(0)
    }
  }
}
</script>

<style src="../../css_app/Header.css">
</style>
