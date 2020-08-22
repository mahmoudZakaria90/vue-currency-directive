import { mount } from '@vue/test-utils';
import vueCurrencyDirective from '../dist/index.min';


describe('Test directive', () => {
    it('Pass no arguments which will reflect to "USD" currency by default and for locale it will use the configured browser language.', () => {
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
})