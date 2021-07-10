import './sass/main.scss';
import { refs } from './js/refs';
import API from './js/fetchCountries';
import countryCard from './templates/countries.hbs';
import countryNames from './templates/countryNames.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, success, error } from '@pnotify/core';

const debounce = require('lodash.debounce');
refs.input.addEventListener('input', debounce(inputCountry, 500));

function inputCountry(event) {
  event.preventDefault();
  clearCountryCard();
  const searchQuery = event.target.value.trim();
  if (searchQuery) {
    API.fetchCountries(searchQuery)
      .then(country => {
        console.log(country);
        if (country.length === 1) {
          renderCountry(country, countryCard);
          successRequest();
        } else if (country.length <= 10) {
          renderCountry(country, countryNames);
          moreSpecificQuery();
        } else if (country.length > 10) {
          clearCountryCard();
          tooManyMatches();
        } else if (country.status === 404) {
          notValidName();
        }
        return;
      })
      .catch(err => {
        notValidName();
        console.log(err);
      });
  }
}

function renderCountry(countries, hds) {
  const markup = countries.map(count => hds(count)).join('');
  refs.countryCard.innerHTML = markup;
}
function clearCountryCard() {
  refs.countryCard.innerHTML = '';
}
function tooManyMatches() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2000,
  });
}
function notValidName() {
  error({
    text: 'Something went wrong! Please enter a valid country name!',
    delay: 2000,
  });
}
function moreSpecificQuery() {
  alert({
    text: 'Please enter a more specific query!',
    delay: 2000,
  });
}
function successRequest() {
  success({
    text: 'Congratulations! You found the country.',
    delay: 2000,
  });
}
