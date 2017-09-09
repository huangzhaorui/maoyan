<template>
<div>
<!------------------------------------------------搜索-------------------------------------------------------->
  <el-dropdown split-button type="primary" @click="handleClick">
	 选项
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>影院</el-dropdown-item>
    <el-dropdown-item>地址</el-dropdown-item>
    <el-dropdown-item>网址</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
  <el-input
  placeholder="影院搜索"
  icon="search"
  v-model="input2"
  show-header="false"
  :on-icon-click="handleIconClick">
</el-input>
<!------------------------------------------------添加------------------------------------------------------->
 <el-collapse v-model="activeName" accordion>
  <el-collapse-item id="insert" title="添加影院" name="1">

 	<el-form label-width="60px">
  <el-form-item label="影院">
    <el-input v-model="film"></el-input>
  </el-form-item>
  <el-form-item label="热线">
    <el-input v-model="phoneNum"></el-input>
  </el-form-item>
  <el-form-item label="地址">
    <el-input v-model="address1"></el-input>
  </el-form-item>
  <el-form-item label="网址">
    <el-input v-model="internetAdress1"></el-input>
  </el-form-item>
</el-form>
<el-button id="addBtn" @click="filmMsgAdd" type="primary">添加</el-button>

  </el-collapse-item>
</el-collapse>
<!---------------------------------------------影院信息---------------------------------------------------->
 <div id="tableBox" >
  <el-table
    :data="cinemaMsgList"
    border
    style="width: 100%"
	>
	 <el-table-column type="expand">
      <template scope="props">
        <el-form  inline class="demo-table-expand">
          <el-form-item label="影院">
            <el-input v-model="eltCinema" :value="props.row.cinema"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="eltAddress"></el-input>
          </el-form-item>
          <el-form-item label="网址">
            <el-input v-model="eltinterAddress"></el-input>
          </el-form-item>
          <el-form-item label="热线">
            <el-input v-model="eltPhone"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="cinema"
      label="影院"
     >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="热线"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
    <el-table-column
      prop="internetAddress"
      label="网址">
    </el-table-column>
    <el-table-column
      label="操作"
     >
      <template scope="scope">
		  <el-button
          size="small"
		  id="delet"
          @click="handleEdit(scope)">保存修改</el-button>
		  <el-button
          size="small"
          type="danger"
          @click.native.prevent="deleteRow(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!-------------------------------------------翻页--------------------------------------------->
  <div id="pageBtn">
  <div class="block">
  <el-pagination
    layout="prev, pager, next"
    :total="maxPage" @current-change="getPage">
  </el-pagination>
</div>
</div>
</div>
</div>
</template>

<script>
	import {mapState} from "vuex"
	import {mapActions } from "vuex"
	import {ACTION_GET_MSG,ACTION_ELT_MSG,ACTION_SEARCH_MSG,ACTION_ADD_MSG} from "../store/modules/CinemaInformation"
    export default {
       data() {
      return {
		input2: '',
		film:"",
		phoneNum:'',
		address1:'',
		internetAdress1:'',
		eltCinema:'',
		eltAddress:"",	
        eltinterAddress:"",
        eltPhone:"",
		activeName: ''
      }
    },
	mounted(page){
	  this.getPage()
	},
	
    methods: {
		//		翻页
  		async getPage(page){
	  		await this.$store.dispatch({
				type:"ACTION_GET_MSG",
				page
	  		});
 		},
		//		添加影院信息
		async filmMsgAdd(e){
			if(this.film.length==0||this.phoneNum.length==0||this.address1.length==0||this.internetAdress1.length==0){
			this.$message.error("信息录入不完整")
				event.preventDefault()
			}else{
				await this.$store.dispatch({
				type:"ACTION_ADD_MSG",
				message:{
					cinema:this.film,
					phone:this.phoneNum,
					address:this.address1,
					internetAdress:this.internetAdress1
				}
			})
			this.$message.info('信息添加成功');
			this.activeName=''
			this.film=""
			this.phoneNum=""
			this.address1=""
			this.internetAdress1=""
			this.getPage()
			}
			
		},
//		搜索
		async handleIconClick(){
			await this.$store.dispatch({
				type:"ACTION_SEARCH_MSG",
				cinema:this.input2
			})
		},
//		删除
		async deleteRow(scope){
		await this.$store.dispatch({
			type:"ACTION_DEL_MSG",
			_id:scope.row._id
		})
		this.$message.info('删除成功');
		this.getPage()
      },
//		编辑
		async handleEdit(scope){
			console.log(scope)
			if(this.eltCinema.length!=0||this.eltAddress!=0||this.eltinterAddress!=0||this.eltPhone!=0){
				await this.$store.dispatch({
				type:"ACTION_ELT_MSG",
				obj:{
				id:scope.row._id,
				cinema:this.eltCinema? this.eltCinema:scope.row.cinema,
				adress:this.eltAddress? this.eltAddress:scope.row.address,
				eltinterAddress:this.eltinterAddress? this.eltinterAddress:scope.row.interAddress,
				eltPhone:this.eltPhone? this.eltPhone:scope.row.phone
			}
			})
			this.$message.info('编辑成功');
			this.eltCinema=''
			this.eltAddress=''
			this.eltinterAddress=''
			this.eltPhone=''
			this.getPage()
			}
			
			
		},

    },
	
	computed:{
		cinemaMsgList(){
			return this.$store.state.CI.cinemaMsgList
		},
		page(){
			return this.$store.state.CI.page
		},
		maxPage(){
			return this.$store.state.CI.maxPage
		}
		
	}
    }
</script>

<style scoped>
	.el-select{
		position: relative;
	}
	#search{
		position: absolute;
		left:543px;
		top:32px;
/*		z-index:10;*/
	}
	.el-button{
		background-color:#eef1f6;
		border-color: #e2e6e9;
		color:black;
	}
	.el-input{
		width:200px;
	}
	#pageBtn{
		width:400px;
		text-align: center;
		margin:10px auto;	
	}
	.el-table{
		margin-top:1px;
	}
	.el-form-item {
		margin-left: 100px;
	}
	#addBtn{
		margin-left: 40px;
		width:80px;
	}
	#turn{
		margin-left: 50px;
	}
	#insert .el-form-item{
		width:180px;
		margin-right: 80px;
		float: left;
	}
</style>