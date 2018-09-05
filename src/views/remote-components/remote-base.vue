<template>
</template>
<script>
    import database from '@/libs/database.js'
    export default {
        props: {
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
        data() {
            return {
                tableData: [],
                loading: false
            }
        },
        computed: {
            fullWhere() {
                return this.where.concat(this.filter);
            }
        },
        model: {
            prop: 'filter',
            event: 'on-clear-filter'
        },
        methods: {
			getData(){
				return this.tableData;
			},
			reload(){
				this.$emit("on-clear-filter",[]);
				this.load();
			},
            load() {
				let param = {
					tableName:this.tableName,
					where:this.fullWhere,
					order:this.order
				}
				this.$emit("on-before-load",param);
                this.loading = true;
                database.select(param.tableName, param.where, param.order).then(data => {
					param.data = data;
					this.$emit("on-success-load",param);
                    this.tableData = param.data;
                    this.loading = false;
					this.$emit("on-after-load",param);
                }).catch(error => {
					param.error = error;
					this.$emit("on-error-load",param);
                    this.tableData = [];
                    this.loading = false;
                    console.error(error);
                });
            }
        },
        created() {
            this.load();
        },
		watch: {
			tableName(newValue, oldValue) {
				this.load();
			},
			where(newValue, oldValue) {
				this.load();
			},
			filter(newValue, oldValue) {
				this.load();
			},
			order(newValue, oldValue) {
				this.load();
			}
		}
    }
</script>
