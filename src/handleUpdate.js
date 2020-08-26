export default (target, valProp) => {
    return target[valProp].toLocaleString(target['locale'] || navigator.language, {
        style: "currency",
        currency: target['currency'] || 'USD'
    });
}