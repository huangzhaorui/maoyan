<template>
    <div>
        <div id="box">
            <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content bg-purple">
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="添加影厅" name="1">
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
                                <el-select v-model="roomVal" placeholder="请选择" @change="checkOptions">
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
                                <el-button type="primary" @click="addOn">添加影厅</el-button>
                                <el-button @click="addOff">取消添加</el-button>
                            </div></el-col>
                            </el-row>
                       </div>
                    </el-collapse-item>
               </el-collapse>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
                <el-collapse v-model="activeNames">
                <el-collapse-item title="增加影厅" name="2">
                    <div>
                        <el-row>
                            <el-col :span="24"><div class="grid-content">
                            <el-input v-model="input" placeholder="请输入需增加的影厅名"></el-input>
                            </div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><div class="grid-content">
                            <el-button type="primary" @click="addRoom">增加影厅</el-button>
                                <el-button @click="offRoom">取消增加</el-button>
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
                    <el-table :data="tableData" border style="text-align: center"  @cell-mouse-enter="clickRowBtn">
                    <el-table-column prop="cinemasName" label="影院名" width="250"></el-table-column>
                    <el-table-column prop="roomName" label="影厅名" width="250"></el-table-column>
                    <el-table-column prop="sites" label="座位总数" width="250"></el-table-column>
                    <el-table-column prop="id" label="操作" width="313">
                        <template scope="scope">
                            <el-button type="primary" @click="editBtn">编辑</el-button>
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
                </div></el-col>
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
                checkMsg: '当前没有要添加的影厅',
                cinemaId: '',
                roomVal: '',
                type: '',
                checkId: '',
                searchType: [{
                    value: 'cinemaNames',
                    label: '影院'
                }, {
                    value: 'roomName',
                    label: '影厅'
                }],
                activeNames: ['1','2','3']
            }
        },
        mounted() {
            this.getCinema();
            this.getData();
        },
        methods: {
            async getCinema() {
                await this.$store.dispatch({
                    type: 'A_GETCINEMA'
                })
            },
            async getData() {
                await this.$store.dispatch({
                    type: 'A_GETDATA'
                })
            },
            checkOptions() {
                if (this.cinemaId != "" && this.roomVal != "") {
                    this.checkMsg = `是否添加　'${this.roomVal}'`;
                    return;
                }
                this.roomVal = "";
                this.cinemaId = "";
            },
            addOn() {
                this.$store.dispatch({
                    type: 'A_ADDROOM',
                    data: {
                        id: this.cinemaId,
                        name: this.roomVal
                    }
                })
                this.roomVal = "";
                this.cinemaId = "";
                this.checkMsg = '当前没有要添加的影厅';
                this.getData();
            },
            addOff() {
                this.roomVal = "";
                this.cinemaId = "";
                this.checkMsg = '当前没有要添加的影厅';
            },
            addRoom() {
                this.$store.commit({
                    type: 'M_ADDROOM',
                    data: this.input
                })
                this.input = "";
            },
            offRoom() {
                this.input = "";
            },
            getPage(page) {
                this.$store.dispatch({
                    type: 'A_PAGING',
                    page
                })
                this.getData();
            },
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
            refreshBtn() {
                this.getData();
            },
            clickRowBtn(e) {
                this.checkId = e.id;
            },
            editBtn() {
                console.log(this.checkId);
            },
            async deleteBtn() {
                await this.$store.dispatch({
                    type: 'A_DELETE',
                    id: this.checkId
                })
                this.getData();
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
        min-height: 36px;
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
</style>
