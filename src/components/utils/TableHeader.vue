<!-- Componente Header do Datable contendo campos, evento de sort e integracao com o produto de Datatable para os respectivos Sorts com a Api -->
<template>
         <thead>
              <tr>
                <th :style="`width:${colSize[indexReg]}vw`" v-for="(col,indexReg) of colName" :key="indexReg">
                    <a :class="sort===colKey[indexReg]?'active':''" href=# v-on:click="sort_(colKey[indexReg])">
                      {{col}}<i v-if="sort===colKey[indexReg]" class="material-icons">{{getIcon()}}</i>
                   </a>
                </th>
                 <th>Remove</th>
              </tr>
           </thead>
</template>


<script>

export default {
    props: {
      colName_:{
        type:Array
      },
      colSize_:{
        type:Array
      },
      colKey_:{
        type:Array
      },
      loadId_:{
          type:Number
      }
    },
    watch : {
        colName_: {
          handler: function (){ 
              this.colName=this.colName_ 
          }          
        }, 
        colSize_: {
          handler: function (){ 
              this.colSize=this.colSize_ 
          }          
        },        
        colKey_: {
          handler: function (){ 
              this.colKey=this.colKey_ 
          }         
        },
        loadId_: {
          handler: function (){ 
              if(this.loadId_!==undefined){
                this.loadId=this.loadId_ 
              }  
          }            
        }
    },

    data(){
      return{ 
        colkey:[],
        colName:[],
        colSize:[],
        paginate_:0,
        loadId:0,
        dir:'ASC',
        sort:'',
        indexPage:0
      }
    },

     methods:{     
        sort_(id){
            if(this.sort!==id){
               this.sort=id
            }else{
                this.dir= this.dir==='ASC'? 'DESC':'ASC'
            }
                this.$emit("emitSort",[this.sort,this.dir])
        },
        getIcon(){
            return this.dir==='DESC'?'arrow_drop_up':'arrow_drop_down'
        }
     }
}
</script>