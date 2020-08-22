import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';

export default {
  input: __dirname + '/main.js',
  output: [
    {
      file: 'dist/index.min.js',
      format: 'es',
    },
    {
      file: 'dist/demo.min.js',
      format: 'umd',
      name: 'vueCurrencyDirective'
    },
  ],

  plugins: [
    terser(),
    cleaner({
      targets: [
        './dist/'
      ]
    })
  ]
};