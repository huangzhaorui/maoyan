<template>
    <div class="filmScheduleInformation-container">
      <el-row>
          <div class="grid-content select-row">
<!--           ***************************************选择电影***************************************-->
            <div>
              <label>电影：</label><el-select v-model="moviesValue" placeholder="请选择电影" @change="editMoviesState">
                <el-option
                  v-for="item in FSI.moviesList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
<!--            ***************************************选择影院***************************************-->
            <div>
              <label>影院：</label><el-select v-model="cinemasValue" placeholder="请选择影院" @change="editCinemasState">
                <el-option
                  v-for="item in FSI.cinemasData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
<!--            ***************************************选择影厅***************************************-->
            <div>
              <label>影厅：</label><el-select v-model="hallsValue" placeholder="请选择影厅">
                <el-option
                  v-for="item in FSI.HallsData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
        </div>
      </el-row>
      <el-row>
<!--       ***************************************选择日期和时间***************************************-->
        <div class="grid-content data-row">
          <div class="data-div">
            <label>日期和时间：</label><el-date-picker
              v-model="dateValue"
              :picker-options="pickerOptions0"
              @change="pickTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
<!--          ***************************************选择价格***************************************-->
          <label class="price-label">价格：</label>
          <div style="margin-right:30px">
            <el-input class="price-div" v-model="priceValue" placeholder="请输入价格"></el-input>
          </div>
<!--          ***************************************确认按钮***************************************-->
          <div>
            <el-button class="confirmBtn" @click="clickConfirmBtn" type="primary">确认拍片<i class="el-icon-upload el-icon--right"></i></el-button>
          </div>
        </div>
      </el-row>
<!--      ***************************************电影列表***************************************-->
      <el-row>
          <el-table
            :data="FSI.moviesData"
            border
            style="width: 100%"
            max-height="250">
            <el-table-column
              prop="filmName"
              label="电影名">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="duration"
              label="时长">
            </el-table-column>
            <el-table-column
              prop="actor"
              label="演员">
            </el-table-column>
            <el-table-column
              label="操作">
              <template scope="scope">
                <el-button
                 @click="clickCheckBtn(scope)"
                  type="text"
                  size="small">
                  查看放映情况
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        <div class="pagination-div">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="curPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="FSI.moviesTotal">
          </el-pagination>
        </div>
      </el-row>
<!--      ***************************************拍片列表***************************************-->
      <el-row>
        <el-table
          :data="FSI.checkData"
          style="width: 100%">
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="影院地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="影院电话">
                  <span>{{ props.row.phone_num }}</span>
                </el-form-item>
                <el-form-item label="影院网址">
                  <span>{{ props.row.official_website }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="影院"
            prop="checkCinemaName">
          </el-table-column>
          <el-table-column
            label="影厅"
            prop="checkHallName">
          </el-table-column>
          <el-table-column
            label="放映时间"
            prop="dateValue">
          </el-table-column>
          <el-table-column
            label="价格"
            prop="priceValue">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <el-popover
                ref="seatState"
                placement="left-start"
                width="420"
                trigger="click">
                <div class="seatDiv">
                  <div class="row-div">
                    <div class="row" v-for='(item, index) in FSI.seatData'>{{ index + 1 }}</div>
                  </div>
                  <div>
                    <div v-for="(item, tr) in FSI.seatData">
                      <div @click="seatClick(item.displayName)" class="seat" v-for="(item, td) in item"></div>
                    </div>
                  </div>
                </div>
              </el-popover>
              <el-button
                type="text"
                v-popover:seatState
                @click="clickSeatBtn(scope)"
                size="small">
                查看座位情况
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
</template>

<script>
  /***************************************引入依赖***************************************/
  import { mapState } from 'vuex';
  import { ACTION_GETMOVIESLIST,
           ACTION_GETMOVIESDATA,
           ACTION_GETCINEMASDATA,
           ACTION_GETHALLSDATA,
           ACTION_ADDDATA,
           ACTION_GETCHECKDATA,
           ACTION_GETSEATDATA,
         } from "../store/modules/FilmScheduleInformation";
  
  export default {
    data() {
      return {
        moviesValue: "",
        cinemasValue: "",
        hallsValue: "",
        dateValue: "",
        priceValue: "",
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        movieListData: [],
        cinemaListData: [],
        hallListData: [],
        curPage: 1,
        pageSize: 4
      }
    },
    /***************************************网页打开时render***************************************/
    async beforeMount() {
      await this.$store.dispatch({
        type: ACTION_GETMOVIESLIST
      });
      this.movieListData = this.FSI.moviesList;
      await this.$store.dispatch({
        type: ACTION_GETMOVIESDATA,
        curPage: this.curPage,
        pageSize: this.pageSize
      });
    },
    /***************************************返回数据***************************************/
    computed: {
      ...mapState(["FSI"])
    },
    methods: {
      /***************************************选择电影***************************************/
      async editMoviesState() {
        await this.$store.dispatch({
          type: ACTION_GETCINEMASDATA
        })
        this.cinemaListData = this.FSI.cinemasData;
        this.cinemasValue = "";
        this.hallsValue = "";
        this.dateValue = "";
        this.priceValue = "";
      },
      /***************************************选择影院***************************************/
      async editCinemasState() {
        await this.$store.dispatch({
          type: ACTION_GETHALLSDATA,
          hallsID: this.cinemasValue
        })
        this.hallListData = this.FSI.HallsData;
        this.hallsValue = "";
        this.dateValue = "";
        this.priceValue = "";
      },
      /***************************************选择影厅***************************************/
      async handleCurrentChange(val) {
        await this.$store.dispatch({
          type: ACTION_GETMOVIESDATA,
          curPage: val,
          pageSize: this.pageSize
        })
      },
      /***************************************选择时间***************************************/
      pickTime(e) {
        this.dateValue = e;
      },
      /***************************************点击确认按钮***************************************/
      async clickConfirmBtn() {
        if(this.moviesValue && this.cinemasValue && this.hallsValue && this.dateValue && this.priceValue) {
          let checkMovieName = this.movieListData.filter((item) => {
            return item.value == this.moviesValue;
          })[0].label;
          let checkCinemaName = this.cinemaListData.filter((item) => {
            return item.value == this.cinemasValue;
          })[0].label;
          let checkHallName = this.hallListData.filter((item) => {
            return item.value == this.hallsValue;
          })[0].label;
          await this.$store.dispatch({
            type: ACTION_ADDDATA,
            moviesValue: this.moviesValue,
            cinemasValue: this.cinemasValue,
            hallsValue: this.hallsValue,
            dateValue: this.dateValue,
            priceValue: this.priceValue,
            checkMovieName,
            checkCinemaName,
            checkHallName
          })
          this.moviesValue = "";
          this.cinemasValue = "";
          this.hallsValue = "";
          this.dateValue = "";
          this.priceValue = "";
          this.$message({
            message: '排片成功',
            type: 'success'
          });
        }else {
          this.$notify({
            title: '警告',
            message: '请完善所有内容',
            type: 'warning'
          });
        }
      },
      /***************************************点击查看放映情况***************************************/
      async clickCheckBtn(scope) {
        await this.$store.dispatch({
          type: ACTION_GETCHECKDATA,
          movieID: scope.row.id
        })
      },
      /***************************************点击查看座位情况***************************************/
      async clickSeatBtn(scope) {
        await this.$store.dispatch({
          type: ACTION_GETSEATDATA,
          rowPieceID: scope.row._id
        })
      },
      /***************************************点击返回座位信息***************************************/
      seatClick(flag) {
        this.$message({
          showClose: true,
          message: `这个位置是${flag}`
        });
      }
    }
  }

</script>

<style scoped>
  
  .filmScheduleInformation-container {
    padding: 15px;
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
  }
  
  .select-row {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }
  
  .select-row > div {
    flex-grow: 1;
  }
  
  .data-row {
    display: flex;
    margin-bottom: 15px;
  }
  
  .data-div {
    margin-right: 71px; 
  }
  
  .pagination-div {
    width: 600px;
    margin: auto;
    text-align: center;
  }
  
  .el-pagination {
    margin: 15px 0;
  }
  
  .price-label {
    margin-top: 5px;
  }
  
  .confirmBtn {
    margin-left: 23px;
  }
  
  .seat {
    width: 30px;
    height: 30px;
    background: url(./images/filmScheduleInformation/Screenshot_2016-10-21-17-14-02_05.png);
    background-size: 100% 100%;
    margin: 5px 3px;
    display: inline-block;
  }
  
  .seatDiv {
    display: flex;
  }
  
  .row {
    height: 42px;
    background: #E8E8E8;
    width: 30px;
    line-height: 42px;
    text-align: center;
  }
  
  .row-div {
    margin-right: 15px;
  }

</style>
