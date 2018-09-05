<template>
	<Modal v-model="isShow" :loading="isLoading" title="文件上传" :maskClosable="false"  @on-ok="handleSave">
		<slot></slot>
	</Modal>
</template>
<script>
	import Emitter from '../mixins/emitter.js';
	import { deepCopy,findComponentsDownward } from './utils/assist';
	export default{
		mixins:[Emitter],
		name:'auto-table-form',
		form:null,
		props:{
			editData: {
				type: Object, //类型，包括：String,Number,Boolean,Object,Function,Array
				default () {
					return {};
				}
			}
		},
		model: {
			prop: 'editData',
			event: 'on-selection-change'
		},
		data() { //自带属性值
			return {
				isShow: false,//是否弹窗,
				isLoading:true,
				actionType:null
			};
		},
		methods: {
			initForm:function(){
				let forms = findComponentsDownward(this,"iForm");
				if(forms.length){
					this.form = forms[0];
				}
			},
			open:function(data,actionType){
				if(data){
					this.changeEditData(data)
				}
				this.actionType = actionType;
				this.isShow = true;
			},
			close:function(){
				this.isShow = false;
			},
			changeLoading:function(){
				this.isLoading = false;
				setTimeout(()=>{
					this.isLoading = true;
				},100)
	
			},
			changeEditData:function(newData){
				this.$emit('on-selection-change', newData);
			},
			handleSave:function(){
				if(this.form&&this.form.validate){
					this.form.validate((val)=>{
						if(val){
							this.$emit("on-form-save",this.editData,this.actionType)
						}else{
							this.changeLoading();
						}
					})
				}else{
					this.$emit("on-form-save",this.editData,this.actionType)
				}
				
			}
		},
		mounted() {
			this.initForm();
		},
		watch:{
			isShow(val){
				if(!val){
					if(this.form&&this.form.resetFields){
						this.form.resetFields();
					}
				}
			}
		}
	}
	
</script>