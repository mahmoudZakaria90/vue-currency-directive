import { mount } from '@vue/test-utils';
import vueCurrencyDirective from '../dist/index.min';


describe('Test directive', () => {
    it('Output with a "USD" currency by default and for locale configured browser language in case of no arguments passed.', () => {
        const receivedVal = 3244;
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
        input.setValue(receivedVal);
        input.trigger('blur');
        expect(input.element.value).toEqual(expectedVal);
    })

    it('Output with a "EUR" currency when currency:EUR arg is passed', () => {
        const receivedVal = 100234;
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
        input.setValue(receivedVal);
        input.trigger('blur');
        expect(input.element.value).toEqual(expectedVal);
    })

    it('Output with a "EGP" currency and arabic locale when currency:EUR[ar-EG] arg is passed', () => {
        const receivedVal = 554342;
        const expectedVal = '٥٥٤٬٣٤٢٫٠٠ ج.م.';
        const Component = {
            template: `<input v-currency:EGP[ar-EG]="amount.value">`,
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
        input.setValue(receivedVal);
        input.trigger('blur');
        expect(input.element.value).toEqual(expectedVal);
    })
})