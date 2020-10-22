<template>
  <div id="confirmDialog">
    <div id="confirm" class="modal">
       <div :id="loadId" class="modal-content cadastro">
              <div class="row">
                  <div class="col s12">
                      <span class="headerConfirm center">{{msg}}</span>
                  </div>
              </div>   
              <div class="row">
                  <div class="col s3 m1"/>
                  <div class="col s3 m5 center" >
                      <button v-on:click="confirm(true)" class="btn-small">
                            Confirma<i class="material-icons left">save</i></button>
                   </div>
                   <div class="col s3 m5 center">
                      <button value="true" v-on:click="confirm(false)" class="btn-small">
                            Cancelar<i class="material-icons left">cancel</i>                        
                     </button>
                   </div>
               </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    props: {
      msg_:{
        type:String
      },
      loadId_:{
        type:Number
      }
    },
    watch : {
        msg_: {
          handler: function (){ 
              console.log(this.msg_)
              this.msg=this.msg_ 
          }          
        },
        loadId_: {
          handler: function (){ 
              console.log(this.loadId_)
              if(this.loadId_!==undefined){
                this.loadId=this.loadId_ 
              }  
          }            
        }
    },
    data(){
      return{ 
        msg:this.msg_,
        loadId:this.loadId_
      }
    },
     methods:{ 
         confirm(ok){
           this.$emit("emitConfirm",ok)
         }
     }
}
</script>

<style>
#confirmDialog{
    background: #dadcdc8c;
    width: 100%;
    height: 100%;    
    position:fixed;
    left:0;
    top:0px;
}
#confirm {
    display: inline-block !important;
    background: #fff;    
    height: auto;
    border: 2px solid var(--colorHeader);
    margin: 0 auto;
    border-radius: 15px;
    margin-top: 15px;
    overflow-y:auto;
    margin-top:50px;    
    max-height:90% !important;
    width:40%;
    z-index:9999;
}
#confirmDialog .headerConfirm{
    width:100%;
    height:2rem;
    font-size: 1.5rem;
    background-color:f58237;
    display:block;
}
#confirmDialog .center{
   margin:0 auto;
   text-align:center;;
}
@media screen and (max-width: 900px) {
  #confirm{
    width:80%;
  }
}
@media screen and (max-width: 600px) {
  #confirm {
    width:80%;
  }
}
</style>