import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { pl, en } from '../assets/lang'
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'pl', // set locale
    messages: {
        pl,
        en
    }
});

export default i18n;
