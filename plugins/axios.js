import qs from 'qs'

export default function({app, redirect}) {
  app.$axios.onRequest((config) => {
    config.headers.common['Accept-Language'] = 'en-us'
    config.paramsSerializer = (params) => {
      return qs.stringify(params, {
        encode: false,
        encodeValuesOnly: true,
        arrayFormat: 'comma'
      })
    }
  })
  app.$axios.onError((err) => {
    const code = parseInt(err.response && err.response.status)
    if ([401, 403].includes(code)) {
      if (app.$auth.loggedIn) {
        app.$auth.logout()

        redirect('/')
      }
    }
    return Promise.reject(err)
  })
}
