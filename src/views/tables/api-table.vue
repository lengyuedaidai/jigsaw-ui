<style lang="less">
	@import '../../styles/common.less';
	@import './components/table.less';
</style>

<template>
	<div>
		<Row>
			<Card>
				<p slot="title">
					<Icon type="images"></Icon>
					将表格数据连同样式一起以图片形式导出
				</p>
				<Row>
					<Col span="18">
					<AutoTable :table-name="'DEVICE'" :columns="columnsList" stripe ref="table2image">
						<ButtonGroup size="small" slot="toolbar">
							<AutoTableButton action-type="insert">新增</AutoTableButton>
							<AutoTableButton action-type="update">编辑</AutoTableButton>
							<AutoTableButton action-type="delete">删除</AutoTableButton>
						</ButtonGroup>
						<AutoForm slot="form" v-model="formValidate">
							<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
								<Form-item label="设备名称" prop="name">
									<Input v-model="formValidate.name" placeholder="请输入设备名称"></Input>
								</Form-item>
								<Form-item label="设备系统" prop="os">
									<RemoteSelect placeholder="请选择设备系统" v-model='formValidate.os' :table-name="dicTableName" :where="where1" text-field="name"
									    value-field="code"></RemoteSelect>
								</Form-item>
								<Form-item label="定位系统" prop="support">
									<RemoteCheckboxGroup placeholder="请选择定位系统" v-model='formValidate.support' :table-name="dicTableName" :where="where2"
									    text-field="name" value-field="code"></RemoteCheckboxGroup>
								</Form-item>
								<Form-item label="备注" prop="desc">
									<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
								</Form-item>
							</Form>
						</AutoForm>
						<AutoTable>
							</Col>
							<Col span="6" class="padding-left-20">
							<div id="showImage" class="margin-bottom-10">
								<span>输入文件名：</span>
								<RemoteRadioGroup v-model='radioData' :table-name="'USER'" text-field="username" value-field="password"></RemoteRadioGroup>
								<RemoteCheckboxGroup v-model='checkboxData' :table-name="'USER'" text-field="username" value-field="password"></RemoteCheckboxGroup>
								<RemoteCheckboxGroup v-model='checkboxData' :table-name="'USER'" text-field="username" value-field="password"></RemoteCheckboxGroup>
								<RemoteSelect v-model='selectData' :table-name="'USER'" text-field="username" value-field="password"></RemoteSelect>
								<RemoteSelect v-model='multSelectData' multiple :table-name="'USER'" text-field="username" value-field="password"></RemoteSelect>

							</div>
							</Col>
				</Row>
			</Card>
		</Row>
	</div>
</template>

<script>
	import AutoTable from './../jigsaw-components/components/auto-table.vue';
	import AutoForm from './../jigsaw-components/components/auto-table-form.vue';
	import AutoTableButton from './../jigsaw-components/components/auto-table-button.vue';


	import RemoteRadioGroup from './../jigsaw-components/components/remote-radio-group.vue';
	import RemoteCheckboxGroup from './../jigsaw-components/components/remote-checkbox-group.vue';
	import RemoteSelect from './../jigsaw-components/components/remote-select.vue';
	export default {
		name: 'api-table',
		components: {
			AutoTable,
			AutoForm,
			AutoTableButton,
			RemoteRadioGroup,
			RemoteCheckboxGroup,
			RemoteSelect
		},
		data() {
			return {
				radioData: 'test',
				checkboxData: ['test'],
				selectData: 'test',
				multSelectData: ['test'],
				columnsList: [{
						type: 'selection',
						align: 'center'
					},
					{
						title: '设备名',
						key: 'name'
					},
					{
						title: '设备名',
						key: 'name'
					},
					{
						title: '系统',
						key: 'os'
					},
					{
						title: '定位',
						key: 'support'
					},
					{
						title: '所属用户',
						key: 'user'
					},
					{
						title: '描述',
						key: 'remark'
					}
				],
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
					}],
					support: [{
						required: true,
						message: '至少选择一个定位系统',
						trigger: 'change'
					}],
					desc: [{
						type: 'string',
						max: 200,
						message: '备注不能大于200字',
						trigger: 'blur'
					}]
				},
				dicTableName: "DICTIONARY",
				where1: [{
					logical: "and",
					field: "domain",
					operator: "equal",
					value: "系统类型"
				}],
				where2: [{
					logical: "and",
					field: "domain",
					operator: "equal",
					value: "定位系统"
				}]
			};
		},
		methods: {
		}
	};
</script>
