import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


const SignIn = ({
    state:{
            isPass:false,
            text:""
        
    },
    mutations:{
        ques(state,obj){
            if(obj.val.length>0){
                state.isPass=true;
            }else{
                state.text="账号、密码错误"
            }
        },
        check1(state){
            state.text=""
        },
        check12(state,obj){
        
            state.isPass=false;
        }
    },
   actions:{
       
   }
})

export default SignIn;