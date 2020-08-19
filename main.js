export default {
  bind(el, binding, vnode) {
    const character_pattern = new RegExp(/\D+/, "g");
    const currencyCB = target => {
      if (character_pattern.test(target.value)) {
        target.value = target.value.replace(character_pattern, '');
      }
    
      const currency = binding.arg && binding.arg.split('[')[0];
      let locale = binding.arg && binding.arg.split('[')[1];
      locale = locale && locale.replace(']', '')
      
      return target.value &&
      Number(target.value).toLocaleString(locale || navigator.language, {
        style: "currency",
        currency: currency || 'USD'
      });
      
    }

    el.value = currencyCB(binding);
    el.addEventListener("blur", e => (e.target.value = currencyCB(e.target)));
    el.addEventListener(
      "focus",
      e =>
        (e.target.value =
          e.target.value && Number(e.target.value.replace(/[^\d.]/g, "")))
    );
    el.addEventListener("input", e => {
      if (character_pattern.test(e.target.value)) {
        e.target.value = e.target.value.replace(character_pattern, "");
      }
      vnode.context.$data[binding.expression] = e.target.value;
    });
  }
};
