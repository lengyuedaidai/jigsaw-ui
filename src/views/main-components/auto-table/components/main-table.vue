<template>
	<Table :ref="refs" :loading="loading" :columns="columnsList" :data="tableData" border disabled-hover></Table>
</template>
<script>
	import database from '@/libs/database.js'
	export default{
		name:'mainTable',
		props:{
			refs:String,
			tableName:{
				type: String, //类型，包括：String,Number,Boolean,Object,Function,Array
				required: true
			},
			where:{
				type: Array, //类型，包括：String,Number,Boolean,Object,Function,Array
				default() {
					return [];
				}
			},
			order:String,
			columnsList: Array,
		},
		data(){
			return {
				tableData:[],
				loading:false
			}
		},
		methods:{
			load(){
				this.loading = true;
				database.select(this.tableName,this.where,this.order).then(data=>{
					this.tableData = data;
					this.loading = false;
				}).catch(error=>{
					this.tableData = [];
					this.loading = false;
					console.error(error);
				});
			}
		},
		created(){
			this.load();
		}
	}
	
</script>