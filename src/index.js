import './sass/main.scss';
import { refs } from './js/refs';
import fetchCountries from './js/fetchCountries';
import countries from './templates/countries.hbs';
import countryList from './templates/countryNames.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, success, error } from '@pnotify/core';

const debounce = require('lodash.debounce');
refs.input.addEventListener('input', debounce(inputCountry, 500));

function inputCountry() {
  console.log('я ввела что то');
}

fetchCountries('usa');

// error({
//   text: 'Too many matches found. Please enter a more specific query!',
// });
// alert({
//   text: 'Please enter a more specific query!',
// });
// success({
//   text: 'Congratulations! You found the country.',
// });
