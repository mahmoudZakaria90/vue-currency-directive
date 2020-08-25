# Vue-currency-directive
Simple, quick custom directive for handling currency format inside text inputs.

[![Build Status](https://travis-ci.org/mahmoudZakaria90/vue-currency-directive.svg?branch=master)](https://travis-ci.com/mahmoudZakaria90/vue-currency-directive)
[![Version](https://img.shields.io/npm/v/vue-currency-directive.svg)](https://www.npmjs.com/package/vue-currency-directive)
[![Downloads](https://img.shields.io/npm/dm/vue-currency-directive.svg)](https://npmcharts.com/compare/vue-currency-directive)
[![License](https://img.shields.io/npm/l/vue-currency-directive.svg?)](https://www.npmjs.com/package/vue-currency-directive)

Compatible with Vue 2.x
- <a href="https://jsfiddle.net/Zak90/sxd9j3uL/39/" target="_blank">Demo/Playground</a>
- <a href="#installation">Installation</a>
- <a href="#global-registration">Global registration</a>
- <a href="#local-registration">Local registration</a>
- <a href="#examples">Examples</a>

# Installation
`npm i vue-currency-directive || yarn add vue-currency-directive`

# Usage
- Register in your `data()` a main state object e.g. `amount` and inside it 2 main properties `value` and `formatted`.<br />
- You mainly get 2 outputs: one for **the unformatted/original** value and the other for **the formatted value**.

## In DOM/Single-file-component
`<input v-currency:<currency?>[<locale?>]="<bindingExpression>">`

For example:
```
<template>
  <input v-currency="amount.value">
  <input v-currency="foo.value">
  <input v-currency="bar.value">
</template>

<script>
...
export default {
  data(){
    return {
      amount: { // naming is not strict 'amount, foo, bar, ...etc'
        value: '', 
        formatted: ''
      }, 

      foo: {
        value: '',
        formatted: ''
      },

      bar: {
        value: '',
        formatted: ''
      }
    }
  }
}
...
<script>
```
## With a Component/controlled input
```
const CurrencyInput = {
  template: '<input />',
}

// In DOM/Single-file-component
<CurrencyInput v-currency="amount.value">
```
**Note**: in case you are using a multiple or a group of different inputs with different types and you are not sure that the currency input is going to be indexed as the first item then you could pass a class name `.v-currency-input` other than that if it's going to be the only or the first input in the group then you don't have to.<br><br>

## Global registration
```
import Vue from 'vue';
import vueCurrencyDirective from 'vue-currency-directive';

Vue.directive('currency', vueCurrencyDirective);
```

## Local registration
```
<script>
import vueCurrencyDirective from 'vue-currency-directive';
export default {
  ...
  data(){
    amount: {
      value: '', 
      formatted: ''
    }, 
  },
  directives: {
    currency: vueCurrencyDirective
  },
  ...
}
</script>
```

## Examples
Passing no arguments will reflect to "USD" currency by default and for locale it will use the configured browser language.  
```
<input v-currency="amount.value"> // amount.value = 3244
//Output: $3,244.00
```

Passing currency argument only without locale.  
```
<input v-currency:EUR="amount.value"> // amount.value = 100234
//Output: €100,234.00
```

Passing with locale argument and different currency.  
```
<input v-currency:EGP[ar-EG]="amount.value"> // amount.value = 554342
//Output: ٥٥٤٬٣٤٢٫٠٠ ج.م.‏ 
```