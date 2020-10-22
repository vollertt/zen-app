<!-- Item contendo o Datatable das requisições com a Api, e funcionalidades de Remove, Sort, Pagination, e Cadastro de Novo Item -->
<template>
  <div>
    <Loading :disabled.sync="disable" :isModal_="true"></Loading>
        <cadastro v-if="hasModal===true" ref="cad" @emitEdit="updateEdit"></cadastro>  
        <confirmDialog  v-if="hasConfirm===true" :loadId_.sync="loadConfirm" 
                        :msg_="msgConfirm" @emitConfirm="updateConfirm">
        </confirmDialog> 
        <br>
           <div class="row">
               <div class="col s2" style="text-align:center;">
                    <div >         
                        <button title="novo Produto" v-on:click="showModal()" data-target="cadastroProduto" class="modal-trigger btn-small btNew">
                            <i class="material-icons">add_box</i>+ 
                        </button> 
                    </div>
               </div>
               <div class="col s2" style="text-align:center;">
                    <h5>Filtros:</h5>
               </div>
               <div class="col s4">
                    <select v-on:change="getLinhaProdutos()" v-model="selectedGrupo" id="grupo_produto" name="grupo_produto">
                            <option value="0" selected="selected">Grupo Produto</option>
                            <option v-for="(grupo,index) in grupo_produto" 
                                :key="index" 
                                :value="grupo.id_grupo_produto">{{ grupo.ds_grupo_produto}}</option>
                    </select> 
               </div> 
               <div class="col s4"> 
                   <select v-on:change="getProdutos(0)" v-model="selectedLinha" id="linha_produto" name="linha_produto">
                        <option value="0" selected="selected">Linha Produto</option>
                        <option v-for="(linha,index) in linha_produto" 
                                :key="index" 
                                :value="linha.id_linha_produto">{{ linha.ds_linha_produto}}</option>
                    </select>   
               </div>
           </div>
           
           <paginate
                  :pageSize_="produtos.pageable.pageSize" 
                  :totalItens_="produtos.totalElements" 
                  :pageActual_="produtos.pageable.pageNumber"
                  :loadPage_.sync="loadPage"
                  msgNot_="Não há registros de produtos cadastrados"
                  @emitPage="updatePage">
           </paginate>
           <div class="responsive-table">       
            <table id="produtos" class="table">
                <tableHeader
                    :colKey_="['ds_linha_produto','ds_grupo_produto','cd_item','ds_veiculo','ds_marca','peso_bruto','peso_liquido','dt_inclusao']" 
                    :colName_="['Linha Produto','Grupo','Código','Veículo','Marca','Peso Bruto','Peso Líquido','Cadastro']" 
                    :colSize_="[25,15,5,12,10,7,7,10]"
                    :data_="produtos.content" 
                    :loadPage_.sync="loadPage"
                    @emitSort="updatePageSort"></tableHeader>
                <tbody>
                    <tr v-for="produto of produtos.content" :key="produto.id_produto">
                        <td>{{produto.linha_produto.ds_linha_produto}}</td>
                        <td>{{produto.linha_produto.grupo_produto.ds_grupo_produto}}</td>
                        <td>{{produto.cd_item}}</td>
                        <td v-if="produto.veiculo!==null && produto.veiculo!==undefined">{{produto.veiculo.ds_veiculo}}</td><td v-else></td>
                        <td v-if="produto.veiculo!==null && produto.veiculo!==undefined && produto.veiculo.marca_veiculo!==null ">{{produto.veiculo.marca_veiculo.ds_marca}}<td v-else></td>
                        <td>{{produto.peso_bruto}}</td>
                        <td>{{produto.peso_liquido}}</td>
                        <td>{{moment(produto.dt_inclusao).format('DD/MM/YYYY HH:mm:ss')}}</td>
                        <td>
                            <button title="remove produto" v-bind:disabled="hasModal === true || hasConfirm===true"  v-on:click="confirm(produto)" class="btn-small btRemove">
                                <i class="material-icons">delete</i>
                            </button>                 
                        </td>
                    </tr>
                </tbody>      
            </table>      
        </div>     
   </div>    
</template>

<script>

import moment from 'moment';
import M from 'materialize-css'
import Produtos from '@/services/produtos'
import Loading from '@/components/utils/Loading'
import paginate from '@/components/utils/Paginate.vue'
import tableHeader from '@/components/utils/TableHeader.vue'
import cadastro from './CadastroProduto.vue'
import confirmDialog from '@/components/utils/ConfirmDialog.vue'

 export default{   
    components: {Loading,paginate,tableHeader,cadastro,confirmDialog},
    data (){
      return{
        moment: moment,
        errors: [],
        isNewCadastro:false,
        hasModal:false,
        disable:false,
        produtos:{pageable:{pageSize:0,pageNumber:0},totalElements:0},
        linha_produto:[],
        grupo_produto:[],
        selectedGrupo:"0",
        selectedLinha:"0",
        nPage:15,
        sort:'ds_linha_produto',
        dir:'ASC',
        loadPage:0,
        hasConfirm:false,
        msgConfirm:'',
        loadConfirm:0
    }
  },

  created () {     
  },
  
  mounted(){
     this.getGrupoProdutos()
     this.getLinhaProdutos()
     this.getProdutos(0,this.sort,this.dir) 
  },
    
  methods: {    

         showModal: function() {  
             this.hasModal=true
             this.errors=[]
             this.disable=false
          },

          closeModal: function() {  
                this.hasModal=false
                this.errors=[]                
                this.disable=false
          },      

          updateEdit(par){
             if(par===true){
                 this.getProdutos(0)
             }
             this.closeModal()
          },           

          updateConfirm(param){
              if(param===true){                  
                 this.removeProduto(this.remove_produto)
              }
              this.hasConfirm=false              
          },

          confirm(produto){             
              this.hasConfirm=true
              this.remove_produto=produto;             
              this.msgConfirm='Remove produto com código:'+ produto.cd_item+ '?' 
              this.loadConfirm=parseInt(Math.random()*100000)
          },

          callMessage(txt,tp){            
              M.toast({html: txt, displayLength:2000, classes: 'toast'+tp})
          },

          async getProdutos(page){
              this.disable=true
               await Produtos.getProdutos(this.nPage,page,this.sort,this.dir,this.selectedGrupo,this.selectedLinha).then(resposta => {
                   resposta                   
                   this.produtos = resposta.data
                   this.disable=false
                   this.loadPage=parseInt(Math.random()*100000)
               }).catch((error) => {  
                 this.disable=false
                  this.callMessage(''+error,'error')
               })                
          },

          async getGrupoProdutos(){
              this.disable=true
               await Produtos.getGrupoProdutos().then(resposta => {
                   resposta
                   this.grupo_produto = resposta.data
                   this.disable=false
               }).catch((error) => {  
                 this.disable=false
                  this.callMessage(''+error,'error')
               })                
          },

          async getLinhaProdutos(){
              this.getProdutos(0)
              this.disable=true
               await Produtos.getLinhaProdutos(this.selectedGrupo).then(resposta => {
                   resposta
                   this.linha_produto = resposta.data
                   this.disable=false
               }).catch((error) => {  
                 this.disable=false
                  this.callMessage(''+error,'error')
               })                
          },

          async removeProduto(produto){
              this.disable=true
              this.removeConfirm=true
              await Produtos.removeProduto(produto).then(resposta => {
                        resposta
                        this.callMessage('Removido com sucesso! Produto cód:' + produto.cd_item,'info')
                        this.getProdutos(0)
                        this.disable=false
                  }).catch((error) => {  
                        this.disable=false
                        this.callMessage(''+error,'error')
                  })                                            
           },

            updatePage(par){
               this.getProdutos(par)
            },

            updatePageSort(par){
                 this.sort=par[0]
                 this.dir=par[1]
                 this.getProdutos(0)
            }
  }

}

</script>


<style>
#produtos{
    width:98%;
}
#produtos td, #produtos th  {
    padding: 2px 2px;
    max-width: 300px;
    text-align: left;
}
#produtos .active {
  background-color:var(--colorHeader)!important;
  color: #333 !important;
  width:100%;
  display:block
}
@media screen and (max-width: 800px) {
  #produtos td, #produtos th{
    font-size:.95rem;
  }
}
@media screen and (max-width: 600px) {
  #produtos  td, #produtos th{
    font-size:.85rem;
  }
}
@media screen and (max-width: 800px) {
    .btRemove, .btNew{
      height: 24px !important;
      line-height: 24px !important;
      font-size: 10px !important;
      width: 30px;
      padding: 0 2px !important;
    }
  }
  @media screen and (max-width: 600px) {
    .btRemove, .btNew{
      height: 18px !important;
      line-height: 18px !important;
      font-size: 10px !important;
      width: 24px;
      padding: 0 2px;
    }
  }
</style>