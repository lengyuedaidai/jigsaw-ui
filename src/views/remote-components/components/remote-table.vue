<template>
	<Table :ref="refs" :loading="loading" :columns="columns" :data="tableData" 
	:size="size" :width="width" :height="height" :stripe="stripe" :border="border"
	:show-header="showHeader" :highlight-row="highlightRow" :row-class-name="rowClassName"
	:context="context" :no-data-text="noDataText" :no-filtered-data-text="noFilteredDataText"
	:disabledHover="disabled-hover" :loading="loading"></Table>
</template>
<script>
	import RemoteBase from "../remote-base.vue"
	export default{
		name:'remote-table',
		extends: RemoteBase,
		props:{
			refs:String,
			columns: {
				type: Array,
				default () {
					return [];
				}
			},
			size: {
				validator (value) {
					return oneOf(value, ['small', 'large', 'default']);
				}
			},
			width: {
				type: [Number, String]
			},
			height: {
				type: [Number, String]
			},
			stripe: {
				type: Boolean,
				default: false
			},
			border: {
				type: Boolean,
				default: false
			},
			showHeader: {
				type: Boolean,
				default: true
			},
			highlightRow: {
				type: Boolean,
				default: false
			},
			rowClassName: {
				type: Function,
				default () {
					return '';
				}
			},
			context: {
				type: Object
			},
			noDataText: {
				type: String
			},
			noFilteredDataText: {
				type: String
			},
			disabledHover: {
				type: Boolean
			},
			loading: {
				type: Boolean,
				default: false
			}
		}
	}
	
</script>