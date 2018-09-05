<!--<template>
	<MainTable :ref='tableRefs' :table-name='tableName' :where='where' :order='order' :columns-list='columnsList'></MainTable>
</template>-->
<script>
	import MainTable from './components/main-table.vue'
	export default{
		name:'autoTable',
		extends: MainTable,
		/*components:{
			MainTable
		},
		props:{
			tableRefs:String,
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
			columnsList: Array
		}*/
	}
	
</script>