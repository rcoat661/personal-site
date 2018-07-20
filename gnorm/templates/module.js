'use strict'

import $ from 'jquery'

export default class <%= name %>{
  constructor($el){
    this.$el = $el
    this.method(this.$el)
  }
  method($element){
    console.log($element)
  }
}
