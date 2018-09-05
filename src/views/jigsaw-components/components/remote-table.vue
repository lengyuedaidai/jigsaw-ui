<template>
	<Table :ref="refs"  :columns="columns" :data="tableData" 
	:size="size" :width="width" :height="height" :stripe="stripe" :border="border"
	:show-header="showHeader" :highlight-row="highlightRow" :row-class-name="rowClassName"
	:context="context" :no-data-text="noDataText" :no-filtered-data-text="noFilteredDataText"
	:disabled-hover="disabledHover" :loading="loading"></Table>
</template>
<script>
	import RemoteBase from "../remote-base.vue"
	export default{
		name:'remote-table',
		extends: RemoteBase,
		props:{
			refs:{
				type: String,
				default () {
					return "_table";
				}
			},
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
			}
		},
		data() { //自带属性值
			return {
				events:["on-current-change","on-row-click","on-row-dblclick",
				"on-select","on-select-cancel","on-selection-change","on-expand",
				"on-select-all","on-filter-change"]
			};
		},
		methods: {
			_bindEvent:function(){
				let table = this.$refs[this.$props.refs];
				let _this = this;
				this.events.forEach(event=>{
					table.$on(event,function(){
						_this.$emit(event, ...arguments);
					})
				})
			}
		},
		mounted() {
			this._bindEvent();
		},
	}
	
</script>