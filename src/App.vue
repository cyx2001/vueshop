<template>
  <div id="app">
    <router-view></router-view>
    <image-dialog ref="imageDialog" :max="maxChooseImage"></image-dialog>
    <sku-dialog ref="skuDialog"></sku-dialog>
  </div>
</template>

<script>
import imageDialog from "./components/image/image-dialog.vue"
import skuDialog from "./components/sku/sku-dialog.vue"
export default {
  provide(){
     return {
        app: this
      };
  },
  name: 'app',
  components: {
   imageDialog,
   skuDialog
  },
  	data() {
		return {
			maxChooseImage: 9
		}
	},
   methods:{
     chooseImage(callback,max = 9) {
       this.maxChooseImage = max
       this.$refs.imageDialog.chooseImage(callback)
     },
     chooseSkus( callback){
       this.$refs.skuDialog.chooseSku(callback)
     }
   }
}
</script>

<style>

</style>
