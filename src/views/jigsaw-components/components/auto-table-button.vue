<template>
	<Button
	:type="type" :shape="shape" :size="size" :loading="loading" :disabled="isDisabled"
	:htmlType="htmlType" :icon="icon" :long="long" @click="handleClick"
	><slot></slot></Button>
</template>
<script>
	import { oneOf } from './utils/assist';

	export default{
		name:'auto-table-button',
		props:{
			actionType: {
				validator (value) {
					return oneOf(value, ['insert', 'update', 'delete']);
				}
			},
			type: {
				validator (value) {
					return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default']);
				}
			},
			shape: {
				validator (value) {
					return oneOf(value, ['circle', 'circle-outline']);
				}
			},
			size: {
				validator (value) {
					return oneOf(value, ['small', 'large', 'default']);
				}
			},
			loading: Boolean,
			disabled: Boolean,
			htmlType: {
				default: 'button',
				validator (value) {
					return oneOf(value, ['button', 'submit', 'reset']);
				}
			},
			icon: String,
			long: {
				type: Boolean,
				default: false
			}
		},
		data() { //自带属性值
			return{
				m_disabled:false
			}
		},
		computed:{
			isDisabled(){
				return this.m_disabled||this.disabled
			}
		},
		methods: {
			handleClick (event) {
				this.$emit('click', event,this.actionType);
			},
			_disable(){
				this.m_disabled = true;
			},
			_enable(){
				this.m_disabled = false;
			}
		},
		mounted() {		
		}
	}
</script>