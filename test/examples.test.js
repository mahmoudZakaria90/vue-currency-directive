import { mount } from '@vue/test-utils';
import vueCurrencyDirective from '../dist/index.min';


describe('Test directive', () => {
    it('Outputs with a "USD" currency by default and for locale configured browser language in case of no arguments passed.', () => {
        const amountVal = 3244;
        const expectedVal = '$3,244.00';
        const Component = {
            template: `<input v-currency="amount.value">`,
            directives: {
                currency: vueCurrencyDirective
            },
        }
        const wrapper = mount(Component, {
            data() {
                return {
                    amount: {
                        value: '',
                        formatted: ''
                    }
                }
            },
        })
        const input = wrapper.find('input');
        input.trigger('focus');
        input.trigger('input');
        input.setValue(amountVal);
        input.trigger('blur');
        expect(input.element.value).toBe(expectedVal);
    })

    it('Outputs with a "EUR" currency when currency:EUR arg is passed', () => {
        const amountVal = 100234;
        const expectedVal = '€100,234.00';
        const Component = {
            template: `<input v-currency:EUR="amount.value">`,
            directives: {
                currency: vueCurrencyDirective
            },
        }
        const wrapper = mount(Component, {
            data() {
                return {
                    amount: {
                        value: '',
                        formatted: ''
                    }
                }
            },
        })
        const input = wrapper.find('input');
        input.trigger('focus');
        input.trigger('input');
        input.setValue(amountVal);
        input.trigger('blur');
        expect(input.element.value).toBe(expectedVal);
    })

    it('Outputs with a "EUR" currency and french locale when currency:EUR[fr-FR] arg is passed', () => {
        const replacePattern = /\s/g;
        const amountVal = 43434;
        const expectedVal = '43 434,00 €'.replace(replacePattern, '');
        const Component = {
            template: `<input v-currency:EUR[fr-FR]="amount.value">`,
            directives: {
                currency: vueCurrencyDirective
            },
        }
        const wrapper = mount(Component, {
            data() {
                return {
                    amount: {
                        value: '',
                        formatted: ''
                    }
                }
            },
        })
        const input = wrapper.find('input');
        input.trigger('focus');
        input.trigger('input');
        input.setValue(amountVal);
        input.trigger('blur');
        const receivedVal = input.element.value.replace(replacePattern, '')
        expect(receivedVal).toEqual(expectedVal);
    })
})

describe('Dynamic arguments', () => {
    it('Outputs with a dynamic currency/locale based on data()', () => {
        const template = `
                           <div>
                                <input v-currency="amount.value">
                                //Currency selector
                                <select id="currency-select" v-model="amount.currency">
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                                
                                //Locale selector
                                <select id="locale-select" v-model="amount.locale">
                                    <option value="en-US">US</option>
                                    <option value="de-DE">DE</option>
                                    <option value="en-GB">GB</option>
                                </select>
                           </div>
                         `
        const amountVal = 13232;
        const expectedVal = '£13,232.00';
        const Component = {
            template,
            directives: {
                currency: vueCurrencyDirective
            },
        }
        const wrapper = mount(Component, {
            data() {
                return {
                    amount: {
                        value: '',
                        currency: 'USD',
                        locale: 'en-US',
                        formatted: ''
                    }
                }
            },
        })
        const input = wrapper.find('input');
        const currencySelect = wrapper.find('#currency-select');
        const localeSelect = wrapper.find('#locale-select');

        input.setValue(amountVal);

        currencySelect.trigger('focus');
        currencySelect.trigger('change');
        currencySelect.setValue('GBP');

        localeSelect.trigger('focus');
        localeSelect.trigger('change');
        localeSelect.setValue('en-GB');

        expect(input.element.value).toBe(expectedVal);
    })
})