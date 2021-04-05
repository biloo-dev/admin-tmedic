export const EN_LOCALE_ONLY = process.env.EN_LOCALE_ONLY === 'true'
export const IN_BROWSER = typeof window !== 'undefined'
export const IS_DEBUG = process.env.DEBUG === 'true'
export const IS_PROD = process.env.NODE_ENV === 'production'
 
