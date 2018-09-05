<template>
	<div>
		<slot name="toolbar"></slot>
		<slot name="form"></slot>
		<RemoteTable highlight-row @on-selection-change="handleSelect"  ref="table" :tableName="tableName" :where="where" :filter="filter" :order="order" 
		:columns="columns" border></RemoteTable>
	</div>
</template>
<script>
	import RemoteTable from "./remote-table.vue"
	import { deepCopy,findComponentsDownward } from './utils/assist';
    import database from '@/libs/database.js'
	export default{
		name:'auto-table',
		components: {
			RemoteTable
		},
		props:{
			//refs:String,
			columns: Array,
			tableName: {
				type: String, //类型，包括：String,Number,Boolean,Object,Function,Array
				required: true
			},
			where: {
				type: Array, //类型，包括：String,Number,Boolean,Object,Function,Array
				default () {
					return [];
				}
			},
			filter: {
				type: Array, //类型，包括：String,Number,Boolean,Object,Function,Array
				default () {
					return [];
				}
			},
			order: String
		},
		data() { //自带属性值
			return {
				selections:[],
				isShow: false,//是否弹窗
				form:null,
				updateButtons:[],
				deleteButtons:[]
			};
		},
		methods: {
			addOpen:function(){
				debugger;
			},
			handleSelect:function(selections){
				this.selections = selections;
			},
			initButtons:function(){
				let buttons =findComponentsDownward(this,"auto-table-button");
				buttons.forEach(button=>{
					if(button.$props.actionType==="update"){
						button._disable();
						this.updateButtons.push(button);
					}
					if(button.$props.actionType==="delete"){
						button._disable();
						this.deleteButtons.push(button);
					}
					button.$on("click",(event,actionType)=>{
						switch(actionType){
							case "insert":
								this.form.open({},actionType);
								break;
							case "update":
								this.form.open(deepCopy(this.selections[0]),actionType);
								break;
							case "delete":
								break;
						}
					})
				})
			},
			initForm:function(){
				let forms = findComponentsDownward(this,"auto-table-form");
				if(forms.length){
					this.form = forms[0];
					this.form.$on("on-form-save",(saveData,actionType)=>{
						this.handleFormSave(saveData,actionType)
					})
				}
			},
			handleFormSave(saveData,actionType){
				let param = {
					tableName:this.tableName,
					data:deepCopy(saveData),
					actionType:actionType,
					cancel:false,
				}
				this.$emit("on-before-save",param);
				if(!param.cancel){
					let savePromise
					switch(actionType){
						case "insert":
							savePromise = database.insert(param.tableName,param.data);
							break;
						case "update":
							savePromise =database.update(param.tableName,param.data)
							break;
					}
					if(savePromise){
						savePromise.then((data)=>{
							let param = {
								reload:true,
								alert:true,
								alertMsg:"保存成功",
								data:data
							}
							this.$emit("on-success-save",param);
							if(param.reload){
								this.$refs.table.load();
							}
							this.form.close();
							if(param.alert){
								this.$Message.success(param.alertMsg);
							}
							this.$emit("on-after-save");
						}).catch(error => {
							let param = {
								alert:true,
								alertMsg:"保存失败",
								error:error
							}
							this.$emit("on-error-save",param);
							this.form.changeLoading()
							if(param.alert){
								this.$Message.success(param.alertMsg);
							}
					});	
					}
				}
			},
			resetBtn(){
				this.updateButtons.forEach(button=>{
					button._disable()
				})
				this.deleteButtons.forEach(button=>{
					button._disable()
				})
			}
		},
		mounted() {
			this.initButtons();
			this.initForm();
			this.$refs.table.$on("on-before-load",()=>{
				this.resetBtn();
			})
		},
		watch: {
			selections (val) {
				if(val&&val.length){
					this.deleteButtons.forEach(button=>{
						button._enable()
					});
					if(val.length==1){
						this.updateButtons.forEach(button=>{
							button._enable()
						})
					}else{
						this.updateButtons.forEach(button=>{
							button._disable()
						})
					}
				}else{
					this.updateButtons.forEach(button=>{
						button._disable()
					})
					this.deleteButtons.forEach(button=>{
						button._disable()
					})
				}
			}
		}
	}
	
</script>