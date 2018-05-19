
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

// 这里定义初始值
let state = {
    pp_errors:10
};

const mutations = {
    setErrors(context,data){
        context.pp_errors = data;
    }
};

// 事件触发后的逻辑操作
// 参数为事件函数
const actions = {
    setErrors(add){
    	axios.get('common/errors').then(data => {
    		if(data.status == 200){
        		add.commit('setErrors',data.data)
    		}
        })
    }
};

// 返回改变后的数值
const getters = {
    pp_errors(context){
        return context.pp_errors
    }
};


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})