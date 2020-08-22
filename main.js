export default {
  bind(el, binding, vnode) {
    const targetEl = el.tagName.toLowerCase() !== 'input' ? el.querySelector('input[type="text"]') : el;
    const character_pattern = new RegExp(/[a-zA-z,\W]/, "g");
    const [parentObj, valProp] = binding.expression.split('.');
    const mainData = vnode.context.$data[parentObj]

    const currencyCB = target => {
      if (character_pattern.test(target.value)) {
        target.value = target.value.replace(character_pattern, '');
      }

      const targetValToNum = Number(target.value);

      if (target.value && targetValToNum !== 0) {
        const currency = binding.arg && binding.arg.split('[')[0];
        let locale = binding.arg && binding.arg.split('[')[1];
        locale = locale && locale.replace(']', '')

        return targetValToNum.toLocaleString(locale || navigator.language, {
          style: "currency",
          currency: currency || 'USD'
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
  }
};
