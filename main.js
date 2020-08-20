export default {
  bind(el, binding, vnode) {
    const targetEl = el.tagName.toLowerCase() !== 'input' ? el.querySelector('input[type="text"]') : el;
    const character_pattern = new RegExp(/[a-zA-z,]/, "g");
    const currencyCB = target => {
      if (character_pattern.test(target.value)) {
        target.value = target.value.replace(character_pattern, '');
      }

      if (target.value) {
        const currency = binding.arg && binding.arg.split('[')[0];
        let locale = binding.arg && binding.arg.split('[')[1];
        locale = locale && locale.replace(']', '')

        return Number(target.value).toLocaleString(locale || navigator.language, {
          style: "currency",
          currency: currency || 'USD'
        });
      }
      return ''
    }

    targetEl.value = currencyCB(binding);
    targetEl.addEventListener("blur", e => {
      e.target.value = currencyCB(e.target);
      vnode.context.$data['formattedValue'] = e.target.value;
    });
    targetEl.addEventListener(
      "focus",
      e => {
        e.target.value = vnode.context.$data[binding.expression]
      }
    );
    targetEl.addEventListener("input", e => {
      if (character_pattern.test(e.target.value)) {
        e.target.value = e.target.value.replace(character_pattern, "");
      }
      vnode.context.$data[binding.expression] = Number(e.target.value);
    });
  }
};
