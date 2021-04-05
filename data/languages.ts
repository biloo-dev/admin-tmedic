import { ILanguage } from '~/interfaces/language'

const dataLanguages: ILanguage[] = [
    {
        locale: 'fr',
        code: 'FR',
        name: 'Français',
        icon: '/images/languages/fr.png',
        direction: 'ltr',
        messages: require('../locales/fr.json')
    },
    {
        locale: 'en',
        code: 'EN',
        name: 'English',
        icon: '/images/languages/us.png',
        direction: 'ltr',
        messages: require('../locales/en.json')
    }, 
    {
        locale: 'ar',
        code: 'AR',
        name: 'العربية',
        icon: '/images/languages/dz.png',
        direction: 'rtl',
        messages: require('../locales/ar.json')
    }
]

export const defaultLocale = 'fr'

export default dataLanguages
