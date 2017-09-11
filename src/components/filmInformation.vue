<template>
    <div>
      <div>
          <router-link to="/addFilmInformation">
              <el-button icon="plus" >添加电影</el-button>
          </router-link>
          <el-input class='searchInput' placeholder="请输入电影名" v-model="searchMovie">
                <el-button slot="append" icon="search" @click="searchMovieBtn"></el-button>
          </el-input>
      </div>    
        <el-table
    :data="movieList"
    border
    style="width: 100%"
    @cell-mouse-enter="pein">
    <el-table-column
      prop="filmName"
      label="电影名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="englishName"
      label="英文名"
      width="170">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="90">
    </el-table-column>
    <el-table-column
      prop="duration"
      label="时长"
      width="90">
    </el-table-column>
    <el-table-column
      prop="time"
      label="年代"
      width="85">
    </el-table-column>
    <el-table-column
      prop="releaseTime"
      label="上映日期"
      width="150">
    </el-table-column>
     <el-table-column
      prop="score"
      label="评分"
      width="90">
    </el-table-column>
    <el-table-column
      prop="director"
      label="导演"
      width="90">
    </el-table-column>
    <el-table-column
      prop="actor"
      label="演员"
      width="152">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template scope="scope">
            <el-button @click="updataMovie"  type="text" size="small">更新</el-button>
        <el-button type="text" size="small" @click="removeMovie">删除</el-button>
      </template>

</el-table-column>
</el-table>
<div class="block">
    <el-pagination layout="prev, pager, next" :page-size=4 :total="movieNum" @current-change="pageChange">
    </el-pagination>
</div>
</div>
</template>

<script>
    import {
        GET_MOVIE_LIST,
        GET_SEARCHMOVIE,
        GET_ADDMOVIE,
        REMOVE_MOVIE
    } from '../store/modules/FilmInformation'
    export default {
        data() {
            return {
                searchMovie: '',
                optionId: ''
            }
        },
        methods: {
            //获取所操作电影的ID
            pein(row) {
                this.optionId = row._id;

            },
            //更新电影信息
            updataMovie(e) {
                this.$router.push(`/addFilmInformation/#/${this.optionId}`)
            },
            //移除电影
            async removeMovie() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch({
                        type: REMOVE_MOVIE,
                        id: this.optionId
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getMovieList()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                this.getMovieList()
            },
            //搜索电影
            searchMovieBtn() {
                if (this.searchMovie) {
                    this.$store.dispatch({
                        type: GET_SEARCHMOVIE,
                        filmName: this.searchMovie
                    })
                } else {
                    this.$store.dispatch({
                        type: GET_MOVIE_LIST
                    })
                }
            },
            //获取电影数据
            async getMovieList() {
                await this.$store.dispatch({
                    type: GET_MOVIE_LIST
                })
            },
            pageChange(page) {
                this.$store.dispatch({
                    type: GET_MOVIE_LIST,
                    page
                })
            }
        },
        mounted() {
            this.getMovieList()
        },
        computed: {
            movieList() {
                return this.$store.state.FI.movieList
            },
            movieNum() {
                return this.$store.state.FI.movieNum
            },

        }
    }

</script>

<style scoped>
    .block {
        margin-top: 20px;
        text-align: center;
    }
    
    .searchInput {
        width: 300px;
    }

</style>
