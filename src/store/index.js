import Vue from 'vue'
import Vuex from 'vuex'
import m3u from './modules/m3u'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        m3u
    }
});
