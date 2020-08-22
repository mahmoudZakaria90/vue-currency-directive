# Vue-currency-directive
Simple, quick custom directive for handling currency format inside text inputs.

Compatible with Vue 2.x
- <a href="https://jsfiddle.net/Zak90/sxd9j3uL/19/">Demo/Playground</a>
- <a href="#installation">Installation</a>
- <a href="#global-registration">Global registration</a>
- <a href="#local-registration">Local registration</a>
- <a href="#examples">Examples</a>

# Installation
`npm i vue-currency-directive || yarn add vue-currency-directive`

# Usage
- Register in your `data()` 1 main state object e.g. `amount` and inside it 2 main properties `value` and `formatted`.<br />
- You mainly get 2 outputs: one for **the unformatted/original** value and the other for **the formatted value**.

## In DOM/Single-file-component
`<input v-currency:<currency>[<locale>]="<bindingExpression.value>">`

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
      amount: {
        value: '', // naming is not strict 'amount, value, ...etc'
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
<input v-currency="amount.value"> // amount.value = 1232
//Output: $1,232.00
```

Passing currency argument only.  
```
<input v-currency:EUR="amount.value"> // amount.value = 1232
//Output: €1,232.00
```

Passing with locale argument and different currency.  
```
<input v-currency:EGP[ar-EG]="amount.value"> // amount.value = 1232
//Output: ١٬٢٣٢٫٠٠ ج.م.‏ 
```