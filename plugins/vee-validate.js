import Vue from 'vue'
import {ValidationObserver, ValidationProvider, localize, extend} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import {messages} from 'vee-validate/dist/locale/en'

Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)

localize('en')

/* eslint-disable */
Object.keys(rules).forEach((item) => {
  extend(item, {
    ...rules[item],
    message: messages[item]
  })
})
/* eslint-enable */
