import handleUpdate from './handleUpdate';

export default {
  bind(el, binding, vnode) {
    const targetEl = el.tagName.toLowerCase() !== 'input' ? el.querySelector('.v-currency-input') || el.querySelector('input[type="text"]') || el.querySelector('input') : el;
    const character_pattern = new RegExp(/[^0-9.]/, "g");
    const [parentObj, valProp] = binding.expression.split('.');
    const mainData = vnode.context.$data[parentObj];

    const currencyCB = target => {
      if (character_pattern.test(target.value)) {
        target.value = target.value.replace(character_pattern, '');
      }

      const targetValToNum = Number(target.value);

      let currency;
      let locale;
      let minimumFractionDigits;
      let maximumFractionDigits;

      if (target.value && targetValToNum !== 0) {
        if (binding.arg) {
          if (!binding.arg.includes('|')) {
            currency = binding.arg
          } else {   
            const split = binding.arg.split('|')
            const arg2 = JSON.parse(split[1].replace('(', '"').replace(')', '"'))
            currency = split[0];
            [minimumFractionDigits, maximumFractionDigits, locale] = arg2;
          }
        } else {
          currency = mainData['currency'];
          locale = mainData['locale'];
          minimumFractionDigits = mainData['minimumFractionDigits'];
          maximumFractionDigits = mainData['maximumFractionDigits'];
        }

        return targetValToNum.toLocaleString(locale || navigator.language, {
          style: currency ? "currency" : undefined,
          currency: currency ? currency : undefined,
          minimumFractionDigits,
          maximumFractionDigits,
        });
      }
      return '';
    }

    targetEl.value = currencyCB(binding);
    mainData['formatted'] = currencyCB(binding);

    targetEl.addEventListener("blur", e => {
      e.target.value = currencyCB(e.target);
      mainData['formatted'] = e.target.value;
    });

    targetEl.addEventListener(
      "focus",
      e => e.target.value = Number(mainData[valProp]) === 0 ? '' : mainData[valProp]
    );

    targetEl.addEventListener("input", e => {
      if (character_pattern.test(e.target.value)) {
        e.target.value = e.target.value.replace(character_pattern, "");
      }
      const unformattedAmount = Number(e.target.value);
      const finalAmount = unformattedAmount === 0 ? '' : unformattedAmount
      mainData[valProp] = finalAmount;
    });
  },
  update(el, binding, vnode) {
    const targetEl = el.tagName.toLowerCase() !== 'input' ? el.querySelector('.v-currency-input') || el.querySelector('input[type="text"]') || el.querySelector('input') : el;
    const [parentObj, valProp] = binding.expression.split('.');
    const mainData = vnode.context.$data[parentObj];

    if (mainData['currency'] || mainData['locale']) {
      if (targetEl.value === mainData['formatted']) {
        targetEl.value = handleUpdate(mainData, valProp)
      }
      mainData['formatted'] = handleUpdate(mainData, valProp);
    }
  }
};
