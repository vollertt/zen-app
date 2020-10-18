<!-- Componente de Loading -->
<template>
  <div v-if="disabled === true" class='parentLoad'>
    <div v-if="className==='' && disabled === true" class="no-modal">
      <div class='childLoad'>
        <div class="radial">
          <div class="circle left rotate"><span :style="`border: 10px solid ${color}`"></span></div>
          <div class="circle right rotate"><span :style="`border: 10px solid ${color}`"></span></div>
        </div>
      </div> 
    </div>
    <div :class="className" v-if="className==='modalLoading' && disabled === true" >
        <div class="radial">
          <div class="circle left rotate"><span :style="`border: 10px solid ${color}`"></span></div>
          <div class="circle right rotate"><span :style="`border: 10px solid ${color}`"></span></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
     disabled:{
       type:Boolean,
       required: true
     },
     isModal_:{
       type:Boolean,
       default:true
     }
  },   
  watch : {     
     isModal_: {
          handler: function (){ 
              this.className= this.isModal_ === true  || this.isModal_ === null ? 'modalLoading' : ''
          }    
        }
  },
  data: function () {
    return {           
      className: this.isModal_ === true || this.isModal_ === null || this.isModal_ === undefined  ? 'modalLoading' : '',
      color:'#666666'
    }
  },
  created(){

  },
  mounted(){
  },

  methods: {    
  }
  
}
</script>


<style scoped>
/* loading animation css, Font: https://medium.com/creative-technology-concepts-code/circular-loading-bar-using-css-only-a847650582ef */

.parentLoad{
  height:100% !important;
  width:100% !important;
}
.childLoad{
  width:100%;
  height:100%;
  background:rgba(0, 0, 0, .10);
  
}
.no-modal{
    height:100%;
    width:100%;
    position:absolute;
    right:0;
    top:0;
    vertical-align:middle;
    z-index:9999;
 } 
.modalLoading {
    width: 100%;
    height: 100%;
    display: initial !important;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
    overflow: hidden;
    outline: 0;
    padding: 0;
    margin: auto;
    background:rgba(0, 0, 0, .10);
    max-height: 100%;
 } 
.radial{
  top: calc(50% - 0px);
    position: relative;
    width: 100px;
    height: 100px;
    padding: 10px;
    text-align: cener;
    margin: 0 auto;
    transform: translate(-50%, -50%);
    top: calc(50%+50px);
    left: 50px;
}
.circle.left {
    position: absolute;
    clip: rect(0, 100px, 100px, 50px);
}
.circle.right {
    position: absolute;
    clip: rect(0px, 50px, 100px, 0px);
}
.circle span {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    position: absolute;
    opacity: 0.75;
}
.circle.left span {
    clip: rect(0px, 50px, 100px, 0px);
    -webkit-animation: rotate-left 2s infinite linear;
}
.circle.right span {
    clip: rect(0, 100px, 100px, 50px);
    -webkit-animation: rotate-right 2s infinite linear;
}
@-webkit-keyframes rotate-left {
    0% { -webkit-transform: rotate(0deg); }
    50% { -webkit-transform: rotate(180deg); }
    100% { -webkit-transform: rotate(180deg); }
}
@-webkit-keyframes rotate-right {
    0% { -webkit-transform: rotate(0deg); }
    50% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(180deg); }
}
</style>