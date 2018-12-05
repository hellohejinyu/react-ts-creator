import nattyFetch from 'natty-fetch'

const context = nattyFetch.context({
  urlPrefix: 'https://yesno.wtf/',
  withCredentials: false,
  fit (response: any) {
    if (response.answer) {
      return {
        content: response,
        success: true
      }
    }
    return {
      error: {
        code: 'error',
        message: 'error'
      },
      success: false
    }
  }
})

context.create({
  'yes.no': {
    url: 'api'
  }
})

export default context.api
