# Vue-currency-directive
Simple, quick custom directive for handling currency inside text inputs.

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