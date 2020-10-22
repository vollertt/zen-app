
<!-- Componente associado ao Modal de Cadastro de Novo Produto e integrado com o item Produto da aplicação-->
<template>
  <div id="cadastroDialog">
    <div id="cadastroProduto" class="modal">
       <div class="modal-content cadastro">
               <Loading :disabled.sync="disable" :isModal_="true"></Loading>           
               <h5>{{title}}</h5> 
               <ul>
                  <li v-for="(erro,index) of errors" :key="index">
                    <span class='erro'>{{erro}}</span> 
                  </li>
               </ul>
               <form  @submit.prevent="salvar"> 
               <div>
                    <select required v-on:change="getLinhaProdutos()" v-model="selectedGrupo" id="grupo_produto_cadastro" name="grupo_produto_cadastro">
                            <option value="0" selected="selected">Grupo Produto</option>
                            <option v-for="(grupo,index) in grupo_produto" 
                                :key="index" 
                                :value="grupo.id_grupo_produto">{{ grupo.ds_grupo_produto}}</option>
                    </select> 
               </div> 
               <div > 
                   <select required v-if="selectedGrupo!=='0'" v-on:change="getVeiculos()" v-model="selectedLinha" id="linha_produto_cadastro" name="linha_produto_cadastro">
                        <option value="0" selected="selected">Linha Produto</option>
                        <option v-for="(linha,index) in linha_produto" 
                                :key="index" 
                                :value="linha.id_linha_produto">{{ linha.ds_linha_produto}}</option>
                    </select>   
               </div>
               <div > 
                   <select  v-model="selectedVeiculo" id="veiculo_cadastro" name="veiculo_cadastro">
                        <option :value="{}" selected="selected">Veículo</option>
                        <option v-for="(auto,index) in veiculo" 
                                :key="index" 
                                :value="auto">{{ auto.marca_veiculo.ds_marca}} : {{ auto.ds_veiculo}}</option>
                    </select>   
               </div>
               <div>
                    <label class="fieldLabel">Peso Líquido:</label>
                    <input id="peso_liquido" minlength="0.01" required type="number" step="0.01" v-model="peso_liquido">
               </div>
               <div>
                    <label class="fieldLabel">Peso Bruto:</label>
                    <input id="peso_bruto" minlength="0.01" required type="number" step="0.01" v-model="peso_bruto">
               </div>
               <div>
                    <label class="fieldLabel">Código:</label>
                    <input id="código" required minlength="1" type="number" step="1" v-model="codigo">
               </div>  
                <div class="row">
                       <div class="col s3">
                            <button v-bind:disabled="disable === true" class="btn-small">
                                Salvar<i class="material-icons left">save</i></button>
                        </div>
                        <div class="col s3">
                            <button v-bind:disabled="disable === true"  type="button" v-on:click="cancel()" class="btn-small">
                                    Cancelar<i class="material-icons left">cancel</i>                        
                            </button>
                        </div>
                </div>
             </form>
        </div>   
    </div>  
   </div> 
</template>

<script>
import M from 'materialize-css'
import Produtos from '@/services/produtos'
import Loading from '@/components/utils/Loading'

export default{      
    components: {Loading},
    data (){
      return{
        title:'Cadastro de Produto',
        errors: [],
        disable:false,
        linha_produto:[],
        grupo_produto:[],
        veiculo:[],
        selectedGrupo:'0',
        selectedLinha:'0',
        selectedVeiculo:{},
        codigo:null,
        peso_liquido:null,
        peso_bruto:null
    }
  },

  created () {
      
  },
  
  mounted(){
     this.getGrupoProdutos()
     this.getVeiculos()
  },
    
  methods: {  

          isNumberValid(val){ 
             var regexp = /(?=[^\0])(?=^([0-9]+){0,1}(\.[0-9]{1,2}){0,1}$)/
             return regexp.test(val)
          },

          validaCadastro: function () {
            this.errors = []
              if (this.selectedGrupo==='0') {
                this.errors.push('Grupo Produto é obrigatório');
              }        
              if (this.selectedLinha==='0') {
                this.errors.push('Linha Produto é obrigatório');
              }         
              if (this.peso_liquido===undefined || this.peso_liquido===null || this.peso_liquido==='') {
                this.errors.push('Peso Líquido é obrigatório');
              }    
              if (this.peso_bruto===undefined || this.peso_bruto===null || this.peso_bruto==='') {
                this.errors.push('Peso Bruto é obrigatório');
              }  
              if ((this.peso_bruto!==undefined && this.peso_bruto!==null && this.peso_bruto!=='') &&
                  (this.peso_liquido!==undefined && this.peso_liquido!==null && this.peso_liquido!=='')){
                    if (parseFloat(this.peso_bruto)<=parseFloat(this.peso_liquido)){
                        this.errors.push('Peso Bruto deve ser maior que o líquido');
                    }else{                      
                      if(this.isNumberValid(this.peso_bruto)===false){
                         this.errors.push('Peso Bruto deve ter máximo duas casas decimais');
                      }
                      if(this.isNumberValid(this.peso_liquido)===false){
                         this.errors.push('Peso Líquido deve ter máximo duas casas decimais');
                      }
                    }
              }
              if (this.codigo===undefined || this.codigo===null || this.codigo==='') {
                    this.errors.push('Código Produto é obrigatório');
              }   
              return this.errors;
          }, 

          callMessage(txt,tp){            
              M.toast({html: txt, displayLength:2000, classes: 'toast'+tp})
          },

          async getGrupoProdutos(){
              console.log('grupo produtos get')
              this.disable=true;
               await Produtos.getGrupoProdutos().then(resposta => {
                   resposta
                   this.grupo_produto = resposta.data
                   this.disable=false;
               }).catch((error) => {  
                 this.disable=false;
                 this.callMessage(''+error,'error')              
               })      
          },

          async getLinhaProdutos(){
              console.log('linha produtos get')
              this.disable=true;
               await Produtos.getLinhaProdutos(this.selectedGrupo).then(resposta => {
                   resposta
                   this.linha_produto = resposta.data
                   this.disable=false;
               }).catch((error) => {  
                 this.disable=false;
                 this.callMessage(''+error,'error')         
               })                         
          },

          async getVeiculos(){
              console.log('veiculos get')
              this.disable=true;
              await Produtos.getVeiculos(this.selectedLinha).then(resposta => {
                   resposta
                   this.veiculo = resposta.data
                   this.disable=false;
               }).catch((error) => {  
                 this.disable=false;
                 this.callMessage(''+error,'error')                
               })  
          },

          cancel(){
               this.$emit("emitEdit",false)
          },

          async salvar(){     
              console.log(this.selectedVeiculo)    

              this.validaCadastro()

              if(this.errors.length===0){
                   var produto={grupo_produto:{},veiculo:{},linha_produto:{}}
                   if(Object.keys(this.selectedVeiculo).length > 0){
                       produto.veiculo.id_veiculo=this.selectedVeiculo.id_veiculo
                   }else{
                        produto.veiculo.id_veiculo=null
                   }
                   produto.grupo_produto.id_grupo_produto=this.selectedGrupo
                   produto.linha_produto.id_linha_produto=this.selectedLinha
                   produto.peso_bruto=this.peso_bruto
                   produto.peso_liquido=this.peso_liquido
                   produto.cd_item=this.codigo
                   await Produtos.salvarProduto(produto).then(resposta => {
                       resposta
                       this.$emit("emitEdit",true)
                       this.callMessage('Salvo com sucesso!','info')
                   }).catch((error) => {  
                       this.callMessage(''+error,'error')               
                   }) 
                   this.disable=false 
              }

            },
  }

}
</script>

<style>
.erro{
    font-size:1.2em;color:red;padding:5px;
}

#cadastroDialog{
    background: #dadcdc8c;
    width: 100%;
    height: 100%;    
    position:fixed;
    left:0;
    top:0px;
}
#cadastroProduto {
    display: inline-block !important;
    background: #fff;
    width: 50%;
    height:auto;
    max-height: 85%;
    border: 3px solid var(--colorHeader);
    margin: 0 auto;
    border-radius: 15px;
    margin-top: 15px;
    overflow-y:auto;
}
@media screen and (max-width: 900px) {
  #cadastroProduto{
    width:80%;
  }
}
@media screen and (max-width: 600px) {
  #cadastroProduto {
    width:80%;
  }
}
</style>