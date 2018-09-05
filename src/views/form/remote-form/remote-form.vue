<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="设备名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入设备名称"></Input>
        </Form-item>
        <Form-item label="设备系统" prop="os">
            <RemoteSelect  placeholder="请选择设备系统" v-model='formValidate.os' :table-name="dicTableName" :where="getWhere('系统类型')" text-field="name" value-field="code"></RemoteSelect>
        </Form-item>
		<Form-item label="定位系统" prop="support">
			<RemoteCheckboxGroup  placeholder="请选择定位系统" v-model='formValidate.support' :table-name="dicTableName" :where="getWhere('定位系统')" text-field="name" value-field="code"></RemoteCheckboxGroup>
		</Form-item>
        <Form-item label="备注" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </Form-item>
    </Form>
</template>
<script>
    import AutoTable from '../../remote-components/components/remote-table.vue';
    import RemoteRadioGroup from '../../remote-components/components/remote-radio-group.vue';
    import RemoteCheckboxGroup from '../../remote-components/components/remote-checkbox-group.vue';
    import RemoteSelect from '../../remote-components/components/remote-select.vue';
    export default {
        name: 'api-table',
        components: {
            AutoTable,
            RemoteRadioGroup,
            RemoteCheckboxGroup,
            RemoteSelect
        },
        data() {
            return {
				formValidate: {
					name: '',
					os: '',
					support: [],
					desc: ''
				},
				ruleValidate: {
					name: [{
						required: true,
						message: '设备名不能为空',
						trigger: 'blur'
					}],
					os: [{
							required: true,
							message: '设置系统不能为空',
							trigger: 'change'
						}
					],
					support: [{
							required: true,
							type: 'array',
							min: 1,
							message: '至少选择一个定位系统',
							trigger: 'change'
						}],
					desc: [
						{
							type: 'string',
							max: 200,
							message: '备注不能大于200字',
							trigger: 'blur'
						}
					]
				},
				dicTableName:"DICTIONARY"
            };
        },
        methods: {
            getWhere(domain) {
                return [{
                    logical: "and",
                    field: "domain",
                    operator: "equal",
                    value: domain
                }]
            },
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$Message.success('提交成功!');
					} else {
						this.$Message.error('表单验证失败!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			}
        }
    };
</script>
