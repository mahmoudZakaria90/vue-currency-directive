# Vue-currency-directive
Simple, quick custom directive for handling currency inside text inputs.

Compatible with Vue 2.x
- <a href="#installation">Installation</a>
- <a href="#global-registration">Global registration</a>
- <a href="#local-registration">Local registration</a>
- <a href="#examples">Examples</a>

# Installation
`npm i vue-currency-directive`  
Or  
`yarn add vue-currency-directive`

# Usage

## Global registration
```
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
      amount: ''
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
`<input v-currency:<currency>[<locale>]="amount">`

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

Passing with locale argument.  
```
<input v-currency:EUR[de-DE]="'1232'">
//Output: 1,232.00 €
```

## Upcoming
- Supporting Arabic numbers.