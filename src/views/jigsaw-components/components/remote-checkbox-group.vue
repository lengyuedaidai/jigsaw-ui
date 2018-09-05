<template>
   <CheckboxGroup v-model="currentValue" :type="type" :size="size" @on-change="handleChange">
        <Checkbox v-for="item in tableData" :label="item[valueField]">{{item[textField]}}</Checkbox>
    </CheckboxGroup>
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
		name:'remote-checkbox-group',
		extends: RemoteBase,
		props:{
			refs:String,
			valueToString:{
				type:Boolean,
				default () {
					return true;
					}
			},
			value: {
				type: [Array,String],
				coerce:function(val){
					if((typeof val == 'string') && val.constructor == String){
						return val.split(",")
					}
				},
				default () {
					return [];
				}
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
			size: {
				validator (value) {
					return oneOf(value, ['small', 'large', 'default']);
				}
			},
			type: {
				validator (value) {
					return oneOf(value, ['button']);
				}
			}
		},
		data() {
			return {
				currentValue: this.value
			}
		},
		methods: {
			handleChange(value) {
				this.currentValue = value;
	debugger;
				if(this.valueToString){
					this.$emit('input', value.join(","));
					this.$emit('on-change', value.join(","));
				}else{
					this.$emit('input', value);
					this.$emit('on-change', value);
				}
				

			}
		},
		model: {
			prop: 'value',
			event: 'on-change'
		},
		watch: {
			value () {
			if((typeof this.value == 'string') && this.value.constructor == String){
						this.currentValue = this.value?this.value.split(","):[]
					}else{
						this.currentValue = this.value
					}
			}
		}
	}
	
</script>