<template>
   <div class="contain">
      <div v-if="!isSubmit">
       <h4>影片基本信息</h4>
        <el-form class='formBox' ref="form" :model="form" label-width="80px"  inline>
          <el-form-item label="电影名" required>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="英文名" required>
            <el-input v-model="form.enName"></el-input>
          </el-form-item>
          <el-form-item label="国家地区" required>
            <el-input v-model="form.countries"></el-input>
          </el-form-item>
          <el-form-item label="放映时长" required>
            <el-input v-model="form.time"></el-input>
          </el-form-item>
          <el-form-item label="影片类型">
            <el-input v-model="form.type" placeholder="多种影片类型以逗号隔开"></el-input>
          </el-form-item>
          <el-form-item label="上映时间" required>
                     <el-date-picker
                  @change='dateChange'
                  v-model="form.playDate"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions0">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="年代" required>
            <el-input v-model="form.year" placeholder="如：2017"></el-input>
          </el-form-item>
          <el-form-item label="导演" required>
            <el-input v-model="form.director"></el-input>
          </el-form-item>
          <el-form-item label="演员" required>
            <el-input v-model="form.casts" placeholder="多位演员以逗号隔开"></el-input>
          </el-form-item>
          <el-form-item label="影片评分" required>
            <el-input v-model="form.score"></el-input>
          </el-form-item>
          
          <el-form-item label="电影简介" required>
            <el-input type="textarea" :rows="5" v-model="form.summary"  style="width:400px;"></el-input>
          </el-form-item>
          <br>
          <el-form-item style="margin-left:80px;">
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button @click="cancleBtn">取消</el-button>
          </el-form-item>
        </el-form>
    </div>
    <div v-else class='uploadDiv'>
      <h4>{{addMovie.filmName}}图片信息</h4>
       <div class='poster'>    
       <span class="title">海报:</span>
       <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:3000/upload"
          :show-file-list="false"
          :on-success="moviePoster"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar el-upload">
          <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
        </el-upload>
        <span class="title pics">电影图集:</span>
        <el-upload
            multiple
            class="pics"
          action="http://127.0.0.1:3000/upload"
          list-type="picture-card"
          :on-success="moviePics"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
       </div>
       <div class="photo">
           <span class="title">导演:</span>
           <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:3000/upload"
          :show-file-list="false"
          :on-success="directorUpdate"
          :before-upload="beforeAvatarUpload">
          <img v-if="directorImg" :src="directorUrl" class="director el-upload">
          <i v-else class="el-icon-plus director-uploader-icon el-upload"></i>
        </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <span class="title">演员:</span>
           <el-upload
                multiple
              action="http://127.0.0.1:3000/upload"
              list-type="picture-card"
              :on-success="actorUpdate"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
       </div>
       <el-button type="primary" @click="updatePic" class='uploadBtn'>确认上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
       
   </div>
    
    
</template>

<script>
    import {
        ADD_MOVIE,
        GET_UPDATAMOVIE,
        GET_ADDMOVIE,
        UPDATA_MOVIE,
        ADD_MOVIEPIC,
        GET_ADD_MOVIEPIC
    } from '../store/modules/FilmInformation'
    export default {
        data() {
            return {    
                posterImg: "",
                atlas: [],
                actorImg: [],
                directorImg: '',
                dialogImageUrl: '',
                dialogVisible: false,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                id: '',
                isSubmit: false,
                imageUrl: '',
                form: {
                    date1: '',
                    name: '',
                    enName: '',
                    type: '',
                    time: "",
                    year: '',
                    countries: "",
                    summary: '',
                    casts: '',
                    playDate: '',
                    timing: ''

                }
            }
        },
        async beforeMount() {
            if (location.href.split('/#/')[2]) {
                this.id = location.href.split('/#/')[2];
                await this.$store.dispatch({
                    type: GET_UPDATAMOVIE,
                    id: this.id
                })
                this.form.name = this.updataMovie.filmName;
                this.form.enName = this.updataMovie.englishName;
                this.form.type = (this.updataMovie.type).join(',');
                this.form.countries = this.updataMovie.country;
                this.form.time = this.updataMovie.duration;
                this.form.year = this.updataMovie.time;
                this.form.playDate = this.updataMovie.releaseTime;
                this.form.director = this.updataMovie.director;
                this.form.score = this.updataMovie.score;
                this.form.casts = (this.updataMovie.actor).join(',');
                this.form.summary = this.updataMovie.details;
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            cancleBtn() {
                this.$router.push(`/filmInformation`)
            },
            stars(score) {
                let stars = Math.round(score);
                if (stars % 2 == 0) {
                    return stars / 2 + '0'
                } else {
                    return stars / 2 + '5'
                }
            },
            async onSubmit() {
                if(this.form.name&&this.form.enName&&this.form.type&&this.form.countries&&this.form.director&&this.form.casts&&this.form.summary){
                    let movieInfo = {
                    filmName: this.form.name,
                    englishName: this.form.enName,
                    type: (this.form.type).split(","),
                    country: this.form.countries,
                    duration: this.form.time,
                    time: this.form.year,
                    releaseTime: this.timing,
                    director: this.form.director,
                    score: this.form.score,
                    actor: (this.form.casts).split(","),
                    details: this.form.summary,
                    stars: this.stars(this.form.score)
                }
                if (location.href.split('/#/')[2]) {
                    this.$store.dispatch({
                        type: UPDATA_MOVIE,
                        id: this.id,
                        movieInfo
                    })
                    this.$message({
                        showClose: true,
                        message: `${this.form.name}信息修改成功`,
                        type: 'success'
                    });
                    this.$router.push(`/filmInformation`)
                } else {
                    await this.$store.dispatch({
                        type: ADD_MOVIE,
                        movieInfo
                    })
                    this.isSubmit = true;
                    await this.$store.dispatch({
                        type: GET_ADDMOVIE,
                        movieInfo
                    })
                }
                }else{
                    this.$message.error('请输入完整的电影信息！');
                }


            },
            dateChange(aa) {
                this.timing = aa;

            },
            getData() {

            },
            //海报上传
            moviePoster(response, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.posterImg = response.url;
            },
            //图集上传
//            beforeMoviePic(file,fileList){
//                if (this.fileList.length > 4) {
//                    this.$message({
//                    type: 'error',
//                    message: '最多上传4张图片',
//                    duration: 1000
//                    })
//                    return false
//                    }
//            },
            moviePics(response, file) {
                this.atlas.push(response.url);
            },
            //d导演上传
            directorUpdate(response, file) {
                this.directorUrl = URL.createObjectURL(file.raw);
                this.directorImg = response.url;
            },
            //演员上传
            actorUpdate(response, file) {
                this.actorImg.push(response.url);
            },
            //上传图片信息
            async updatePic() {
                let addMoviePics = {
                    movieId: this.addMovie._id,
                    movieAtlas: this.atlas,
                    actorImg: this.actorImg,
                    directorImg: this.directorImg,
                    posterImg: this.posterImg
                }
                console.log(addMoviePics);
                await this.$store.dispatch({
                    type: ADD_MOVIEPIC,
                    addMoviePics,
                })
                this.$message({
                    showClose: true,
                    message: `${this.addMovie.filmName}电影信息添加完毕`,
                    type: 'success'
                });
                this.$router.push(`/filmInformation`)

            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            }
        },
        mounted() {
            this.getData();
        },
        computed: {
            addMovie() {
                return this.$store.state.FI.addMovie
            },
            updataMovie() {
                return this.$store.state.FI.updataMovie
            }

        }
    }

</script>

<style scoped>
    .formBox .el-input {
        width: 300px;
    }
    
    .poster {
        display: flex
    }
    
    .title {
        width: 100px;
        font-size: 16px;
        font-weight: 600;
        color: #8c939d
    }
    
    .pics {
        margin-right: 40px;
    }
    
    .photo {
        display: flex;
        margin-top: 30px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin-right: 40px;
    }
    
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 160px;
        height: 220px;
        line-height: 220px;
        text-align: center;
    }
    
    .avatar {
        width: 160px;
        height: 220px;
        display: block;
    }
    
    .director-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }
    
    h4 {
        margin-left: 330px;
        color: #20a0ff;
    }
    
    .director {
        width: 148px;
        height: 148px;
        display: block;
    }
    
    .uploadBtn {
        margin: 20px 0 0 350px;
    }
    .contain{
/*        text-align: center*/
    }
</style>
