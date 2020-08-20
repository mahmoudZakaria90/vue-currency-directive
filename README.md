# Vue-currency-directive
Simple, quick custom directive for handling currency format inside text inputs.

Compatible with Vue 2.x
- <a href="#installation">Installation</a>
- <a href="#global-registration">Global registration</a>
- <a href="#local-registration">Local registration</a>
- <a href="#examples">Examples</a>

# Installation
`npm i vue-currency-directive || yarn add vue-currency-directive`

# Usage
You mainly get 2 outputs: unformatted/original value and the formatted value.<br />
Register in your `data()` 2 main state inputs  one for the original value e.g. `amount` and the other for formatted value e.g. `amountFormatted`.<br /><br />
**Note** that the `amountFormatted` is prefixed by `amount` and goes as well the same for any other bounded expressions for example:
```
<template>
  <input v-currency="amount">
  <input v-currency="foo">
  <input v-currency="bar">
</template>

<script>
...
export default {
  data(){
    return {
      amount: '', // naming is not strict 'amount, value, ...etc'
      amountFormatted: '' // is prefixed by binding.expression,

      foo: '',
      fooFormatted: '',

      bar: '',
      barFormatted: ''
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
    return {
      amount: '',
      amountFormatted: ''
    }
  },
  directives: {
    currency: vueCurrencyDirective
  },
  ...
}
</script>
```

## In DOM/Single-file-component
`<input v-currency:<currency>[<locale>]="<bindingExpression>">`

## Examples
Passing no arguments will reflect to "USD" currency by default and for locale it will use the configured browser language.  
```
<input v-currency="'1232'">
//Output: $1,232.00
```

Passing currency argument only.  
```
<input v-currency:EUR="'1232'">
//Output: €1,232.00
```

Passing with locale argument and different currency.  
```
<input v-currency:EGP[ar-EG]="'1232'">
//Output: ١٬٢٣٢٫٠٠ ج.م.‏ 
```