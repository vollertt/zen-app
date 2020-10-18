/* Integra os serviços dos requests/responses com Api zen-api utilizando o Axios  */

import { http } from './config'

function getMessageException(error,title) {
    console.log(error) 
    var msgErro =title+' : '+error 
    if(typeof error !== 'undefined'){
        var status=''
        if( typeof error.response !== 'undefined'){  
            if( typeof error.response.data !== 'undefined'){ 
                if(error.response.data){
                    if(typeof error.response.status !== 'undefined'){
                        status=error.response.status
                    }
                    msgErro= title+' ('+status+') : '+ error.response.data.message +'  '+error.response.data.error
                }
            } 
        }else{
            if(((''+error).indexOf('Network Error')> -1) || ((''+error).indexOf('net::ERR_FAILED')> -1)){
                msgErro= title+' : Erro de conexão internet!'
            }
        }    
    }
    console.log('Error: '+msgErro)   
    return msgErro
}

export default {

    cache: false,      
    
    getProdutos:(size,page,order,direction,grupo,linha) => {
           return http.get('produto-page', {
                params: {
                    size: size,
                    page:page,                
                    order:order,
                    direction:direction,
                    id_grupo_produto:grupo,
                    id_linha_produto:linha
                }
            }).then(function(response) {            
            return response
        }).catch(function(error) {
            throw new Error(getMessageException(error,' lista Produtos'))
        })
    },

    getGrupoProdutos:() => {
        return http.get('grupo-produto', {            
         }).then(function(response) {            
         return response
     }).catch(function(error) {
         throw new Error(getMessageException(error,' lista Grupo Produtos'))
     })
   },

   getLinhaProdutos:(id_grupo_produto) => {
        return http.get('linha-produto', {
            params: {
                id_grupo_produto:  id_grupo_produto
            }
        }).then(function(response) {            
            return response
        }).catch(function(error) {
            throw new Error(getMessageException(error,' lista Linha Produtos'))
        })
    },

    getVeiculos:(selectedLinha) => {
        return http.get('veiculo', {  
            params: {
                id_linha_produto:  selectedLinha
            }          
        }).then(function(response) {            
            return response
        }).catch(function(error) {
            throw new Error(getMessageException(error,' lista Veiculos'))
        })
    },

    removeProduto:(produto) => {
        return http.post('remove-produto', produto, {} ).then(function(response) {            
            return response
        }).catch(function(error) {
            throw new Error(getMessageException(error,' remove Produto '))
        })
    },

    salvarProduto:(produto) => {
        return http.post('novo-produto', produto, {} ).then(function(response) {            
            return response
        }).catch(function(error) {
            throw new Error(getMessageException(error,' salva novo Produto'))
        })
    }  

}