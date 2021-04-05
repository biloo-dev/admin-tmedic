import VueI18n from 'vue-i18n'
import { Context, Plugin } from '@nuxt/types'
import Vue from "vue";
import Swal from "sweetalert2";
import validation from "~/data/validation"; 

Vue.use(require("vue-chartist"));
 
let lineSmooth = Vue.chartist.Interpolation.cardinal({
    tension: 0
});
function make (context: Context) {
    return {
        home () {
            return '/' 
        },  
        logout () { 
            return Swal.fire({
              title: this.t("general.titleAlertLogout"),
              text: this.t("general.textAlertLogout"),
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: this.t("general.yes"),
              cancelButtonText: this.t("general.no")
            }); 
        },
        success(str : string){
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: toast => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              }
            }); 
            Toast.fire({
              icon: "success",
              title: str
            });
        },
        error(){

        },
        delete () { 
            return Swal.fire({
              title: this.t("general.titleAlertDelete"),
              text: this.t("general.textAlertDelete"),
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: this.t("general.yes"),
              cancelButtonText: this.t("general.cancel")
            }); 
        },
        t(slug :string) : string{
            return context.app.i18n.t(slug);
        },
        v : validation, 
        lang (path: string) {
            const locale = context.store.state.locale.current

            if (path[0] !== '/') {
                path = `/${path}`
            }

            if (!context.app.i18n) {
                return path
            }

            const i18n = context.app.i18n as VueI18n.I18nOptions

            if (locale === i18n.fallbackLocale) {
                return path
            }

            return `/${locale}${path}`
        },
        isExternal (path: string): boolean {
            return /^(https?:)?\/\//.test(path)
        },
        anyLink (path: string) {
            return context.$url.isExternal(path) ? path : this.base(context.$url.lang(path))
        }, 
        base (url: string) { 
            if (url && url[0] === '/') {
                if (url.substr(1)) { 
                    return 'http://127.0.0.1:3333/api/getImg'+ context.base + url.substr(1)
                } 
            } 
            return url
        },
        img (url: string) {
            return this.base(url)
        },
        parse(str :string){ 
            let obj = typeof str == "string" ? JSON.parse(str) : str
            return obj[0]
        },
        getName(local : string ,obj : any){ 
            if (obj && local == 'ar') {
                return obj.name_ar
            }else if(obj){
                return obj.name_fr
            } 
            return '' 
        },
        currentSlug(catSlug : any ,params : any){ 
            if (catSlug && params && catSlug.slug == params.slug) {
                return 'active-cat' 
            } 
            return ''
        },
        chartList(){
            return lineSmooth;
        }
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $url: ReturnType<typeof make> & Context
    }
}

declare module '@nuxt/types' {
    interface Context {
        $url: ReturnType<typeof make> & Context
    }
}

const plugin: Plugin = (context, inject) => {
    inject('url', make(context))
}

export default plugin
