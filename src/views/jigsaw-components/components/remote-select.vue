<template>
	 <Select v-model="currentValue" @on-change="change"
	 :label="label" :multiple="multiple" :disabled="disabled" :clearable="clearable"
	 :placeholder="placeholder" :filterable="filterable" :filter-method="filterMethod"
	 :loading-text="loadingText" :size="size" :label-in-value="labelInValue" :not-found-text="notFoundText"
	 :placement="placement" :transfer="transfer" :auto-complete="autoComplete" :name="name" element-id="elementId"
	 >
        <Option v-for="item in tableData" :value="item[valueField]" :key="item.value">{{item[textField]}}</Option>
    </Select>
</template>
<script>
	const oneOf=function(value, validList) {
		for (let i = 0; i < validList.length; i++) {
			if (value === validList[i]) {
				return true;
			}
		}
		return false;
	}
	import RemoteBase from "../remote-base.vue"
	export default{
		name:'remote-select',
		extends: RemoteBase,
		props:{
			refs:String,
			value:{
                type: [String, Number],
                default: ''
            },
			textField:{
				type: String, //类型，包括：String,Number,Boolean,Object,Function,Array
				default () {
					return "name";
				}
			},
			valueField:{
				type: String, //类型，包括：String,Number,Boolean,Object,Function,Array
				default () {
					return "value";
				}
			},
			value: {
				type: [String, Number, Array],
				default: ''
			},
			// 使用时，也得设置 value 才行
			label: {
				type: [String, Number, Array],
				default: ''
			},
			multiple: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			clearable: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String
			},
			filterable: {
				type: Boolean,
				default: false
			},
			filterMethod: {
				type: Function
			},
			loadingText: {
				type: String
			},
			size: {
				validator (value) {
					return oneOf(value, ['small', 'large', 'default']);
				}
			},
			labelInValue: {
				type: Boolean,
				default: false
			},
			notFoundText: {
				type: String
			},
			placement: {
				validator (value) {
					return oneOf(value, ['top', 'bottom']);
				},
				default: 'bottom'
			},
			transfer: {
				type: Boolean,
				default: false
			},
			// Use for AutoComplete
			autoComplete: {
				type: Boolean,
				default: false
			},
			name: {
				type: String
			},
			elementId: {
				type: String
			}
		},
		data() {
			return {
				currentValue: this.value
			}
		},
		methods: {
			change(value) {
				this.currentValue = value;
				this.$emit('input', value);
				this.$emit('on-change', value);
			}
		},
		model: {
			prop: 'value',
			event: 'on-change'
		},
		watch: {
			value () {
				if(this.currentValue !== this.value){
					this.currentValue = this.value;
				}
			}
		}
	}
	
</script>