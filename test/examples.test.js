import { mount } from '@vue/test-utils';
import vueCurrencyDirective from '../dist/index.min';


describe('Test directive', () => {
    it('Output with a "USD" currency by default and for locale configured browser language in case of no arguments passed.', () => {
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

    it('Output with a "EUR" currency when currency:EUR arg is passed', () => {
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

    it('Output with a "EUR" currency and french locale when currency:EUR[fr-FR] arg is passed', () => {
        const amountVal = 43434;
        const expectedVal = '43 434,00 €';
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
        expect(input.element.value).toMatchObject(expectedVal);
    })
})