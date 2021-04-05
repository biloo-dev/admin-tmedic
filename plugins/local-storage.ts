import createPersistedState from 'vuex-persistedstate'
import { Plugin } from '@nuxt/types'

const plugin: Plugin = ({ store }) => {
    createPersistedState({
        key: 'WebyCom',
        paths: [
            
        ]
    })(store)
}

export default plugin
