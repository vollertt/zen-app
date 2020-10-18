<!-- Componente do item de paginacao do Datable -->
<template>
    <div :id="loadPage" style="width:100%;text-align: center;" v-if="loadPage!==undefined && loadPage>0">
        Página: {{pageActual+1}} de {{Math.ceil((totalItens/pageSize))}} [{{pageActual*pageSize+1}} a {{(pageActual+1)*pageSize}} de {{totalItens}} registros]
        <ul class="pagination">
           <li v-if="paginate_-pageSize>=0">
              <a href="#!" v-on:click="paginate(-1)"><i class="material-icons">chevron_left</i></a>
           </li>
           <li :id="`pag${reg}`" v-for="(reg,indexReg) of Math.floor(totalItens/pageSize)+1<pageSize? Math.ceil(totalItens/pageSize) +1 : pageSize" :key="indexReg" :class="(reg+(paginate_)-1)===indexPage ? 'active' : ''">
               <a href="#!" v-if="reg+paginate_<=Math.ceil(totalItens/pageSize)" v-on:click="page(indexReg)">{{reg+paginate_}}</a>
           </li>
           <li v-if="paginate_+pageSize<Math.floor(totalItens/pageSize)+1">
               <a href="#!" v-on:click="paginate(1)"><i class="material-icons">chevron_right</i></a>
           </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: {
      totalItens_:{
        type:Number
      },
      pageSize_:{
        type:Number
      },
      pageActual_:{
        type:Number
      },
      loadPage_:{
          type:Number
      }
    },
    watch : {
        totalItens_: {
          handler: function (){ 
              this.totalItens=this.totalItens_ 
          }
        }, 
        pageActual_: {
          handler: function (){ 
              this.pageActual=this.pageActual_
          }
        },        
        loadPage_: {
          handler: function (){ 
              this.loadPage=this.loadPage_ 
          }
        },
        pageSize_: {
          handler: function (){ 
              if(this.pageSize_!==undefined){
                this.pageSize=this.pageSize_ 
              } 
          }            
        }
    },

    data(){
      return{ 
        pageSize:0,        
        pageActual:0, 
        totalItens:0,
        paginate_:0,
        loadPage:0,
        //nPage:15,
        indexPage:0
      }
    },


     methods:{     
         page(p){
             this.indexPage=p
             this.$emit("emitPage",p)
         },

         paginate(ct){                  
                var n_= ct>0?this.pageSize:-this.pageSize
                var maxPage=Math.floor(this.totalItens/this.pageSize)+1
                if(this.paginate_+n_<maxPage && this.paginate_ + n_>=0){                
                    this.paginate_= this.paginate_+n_ <0 ? 0 : this.paginate_+n_ > maxPage ? maxPage : this.paginate_+n_
                }
                this.loadPage= parseInt(Math.random()*10000)
                return this.$vnodeloadPage
            }
            
     }
}

</script>