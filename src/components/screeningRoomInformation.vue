<template>
    <div>
        <div id="box">
            <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content bg-purple">
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="增加影厅" name="1">
                        <div>
                            <el-row>
                                <el-col :span="24"><div class="grid-content">
                                <el-select v-model="cinemaId" placeholder="请选择">
                                    <el-option
                                      v-for="item in cinemaData"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.id"></el-option>
                                </el-select>
                                <el-select v-model="roomVal" placeholder="请选择">
                                    <el-option
                                      v-for="item in roomData"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"></el-option>
                                </el-select>
                                </div></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24"><div class="grid-content">
                                <el-button type="primary" @click="addOn">增加影厅</el-button>
                                <el-button @click="addOff">取消增加</el-button>
                            </div></el-col>
                            </el-row>
                       </div>
                    </el-collapse-item>
               </el-collapse>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
                <el-collapse v-model="activeNames">
                <el-collapse-item title="添加添厅" name="2">
                    <div>
                        <el-row>
                            <el-col :span="24"><div class="grid-content">
                            <el-input v-model="input" placeholder="请输入需添加的影厅名"></el-input>
                            </div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><div class="grid-content">
                            <el-button type="primary" @click="addRoom">添加影厅</el-button>
                                <el-button @click="offRoom">取消添加</el-button>
                            </div></el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
                </el-collapse>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
                <el-collapse v-model="activeNames">
                <el-collapse-item title="搜索影厅" name="3">
                    <div>
                        <el-row>
                            <el-col :span="24"><div class="grid-content">
                            <el-select v-model="type" placeholder="请选择">
                                <el-option
                                  v-for="item in searchType"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"></el-option>
                            </el-select>
                            <el-input v-model="search" placeholder="请输入需搜索的内容"></el-input>
                        </div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><div class="grid-content">
                                <el-button type="primary" @click="searchBtn">搜索</el-button>
                                <el-button @click="refreshBtn">刷新</el-button>
                            </div></el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
                </el-collapse>
            </div></el-col>
            </el-row>
            <el-row>
                <el-col :span="24"><div class="grid-content">
                    <el-table :data="tableData" border style="text-align: center"  @cell-mouse-enter="clickRowBtn"  @expand="blockBtn" width="1000">
                    <el-table-column type="expand" width="50">
                    <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" style="text-align: center">
                    <el-row :gutter="20">
                        <el-col :span="2"><div class="grid-content">
                            <el-tag type="primary">设置座位信息</el-tag>
                        </div></el-col>
                        <el-col :span="7"><div class="grid-content">
                            <el-form-item label="座位行数：">
                           <el-input v-model="row" class="siteMsg"></el-input>
                        </el-form-item>
                        </div></el-col>
                        <el-col :span="7"><div class="grid-content">
                            <el-form-item label="座位号数：">
                           <el-input v-model="num" class="siteMsg"></el-input>
                        </el-form-item>
                        </div></el-col>
                        <el-col :span="7"><div class="grid-content">
                            <el-form-item label="是否已售：">
                           <el-input v-model="siteState" class="siteMsg" @blur="checkSiteMsg"></el-input>
                        </el-form-item>
                        </div></el-col>
                    </el-row>
                    </el-form>
                    </template>
                    </el-table-column>
                    <el-table-column prop="cinemasName" label="影院名" width="250"></el-table-column>
                    <el-table-column prop="roomName" label="影厅名" width="250"></el-table-column>
                    <el-table-column prop="sites" label="座位总数" width="200"></el-table-column>
                    <el-table-column prop="id" label="操作">
                        <template scope="scope">
                            <el-button type="primary" @click="save">保存</el-button>
                            <el-button @click="deleteBtn">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content paging">
                <div class="block">
                    <el-pagination layout="prev, pager, next" :total="maxPage" @current-change="getPage"></el-pagination>
                </div>
                </div>
            </el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                input: '',
                search: '',
                cinemaId: '',
                roomVal: '',
                type: '',
                checkId: '',
                row: '',
                num: '',
                errorText: '',
                siteState: '',
                searchType: [{
                    value: 'cinemaNames',
                    label: '影院'
                }, {
                    value: 'roomName',
                    label: '影厅'
                }],
                activeNames: ['1', '2', '3']
            }
        },
        mounted() {
            this.getCinema();
            this.getData();
        },
        methods: {
            //获取已有影院
            async getCinema() {
                await this.$store.dispatch({
                    type: 'A_GETCINEMA'
                })
            },
            //获取影厅信息
            async getData() {
                await this.$store.dispatch({
                    type: 'A_GETDATA'
                })
            },
            //增加影厅
            async addOn() {
                if (this.roomVal != "" && this.cinemaId != "") {
                    await this.$store.dispatch({
                        type: 'A_ADDROOM',
                        data: {
                            id: this.cinemaId,
                            name: this.roomVal
                        }
                    })
                    this.roomVal = "";
                    this.cinemaId = "";
                    this.openSuccess('影厅增加成功！');
                    this.getData();
                } else {
                    this.openError('影厅添加失败！')
                }
            },
            //取消增加
            addOff() {
                this.roomVal = "";
                this.cinemaId = "";
            },
            //添加影厅
            addRoom() {
                this.$store.commit({
                    type: 'M_ADDROOM',
                    data: this.input
                })
                this.input = "";
                this.openSuccess('影厅添加成功！');
            },
            //取消添加
            offRoom() {
                this.input = "";
            },
            //获取当前页的影厅信息
            getPage(page) {
                this.$store.dispatch({
                    type: 'A_PAGING',
                    page
                })
                this.getData();
            },
            //点击搜索
            searchBtn() {
                this.$store.dispatch({
                    type: 'A_SEARCH',
                    data: {
                        value: this.search,
                        type: this.type
                    }
                })
                this.search = "";
            },
            //点击刷新
            refreshBtn() {
                this.getData();
            },
            //获取当前行的信息
            clickRowBtn(e) {
                this.checkId = e.id;
            },
            //打开扩展行时清空输入
            blockBtn(row) {
                this.row = '';
                this.num = '';
                this.siteState = '';
            },
            //删除选中行信息
            async deleteBtn() {
                await this.$store.dispatch({
                    type: 'A_DELETE',
                    id: this.checkId
                })
                this.getData();
            },
            //保存当前行的座位信息
            async save() {
                if (/^[1-9]{1}$/.test(this.row) && /^[1-9]{1}$/.test(this.num) && this.siteState != '') {
                    await this.$store.dispatch({
                        type: 'A_SAVESITE',
                        data: {
                            id: this.checkId,
                            row: this.row,
                            num: this.num,
                            siteState: this.siteState
                        }
                    })
                    this.getData();
                    this.openSuccess('座位信息修改成功');
                } else {
                    this.row = '';
                    this.num = '';
                    this.siteState = '';
                    this.openError('座位信息输入不完整，请重新输入！');
                }
            },
            //对输入的座位状态值判断
            checkSiteMsg() {
                if (this.siteState != "是" && this.siteState != "否") {
                    this.openError("只能输入'是'或'否'！");
                    this.siteState == '';
                }
            },
            //成功的消息提示
            openSuccess(text) {
                this.$message({
                    message: text,
                    type: 'success'
                });
            },
            //失败的消息提示
            openError(text) {
                this.$message.error(text);
            }
        },
        computed: {
            tableData() {
                return this.$store.state.SRI.tableData;
            },
            cinemaData() {
                return this.$store.state.SRI.cinemaData;
            },
            roomData() {
                return this.$store.state.SRI.roomData;
            },
            maxPage() {
                return this.$store.state.SRI.maxPage;
            }
        }
    }

</script>

<style scoped>
    #box {
        padding: 20px;
    }

    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        text-align: center;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .el-input {
        width: 180px;
    }

    .el-button {
        margin: 0;
    }

    .paging {
        text-align: center;
    }

    .el-table-column {
        text-align: center;
    }

    .el-select {
        width: 100px;
    }

    .demo-table-expand {
        height: 10px;
    }

    .siteMsg {
        width: 120px;
    }

</style>
