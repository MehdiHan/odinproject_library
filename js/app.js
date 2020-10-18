import { Book } from './Book.js';

// Init a local Storage
let myLibrary = localStorage;

const bookListItems = document.querySelector('.app__booklist__items');
const titleBook = document.getElementById('title');
const authorBook = document.getElementById('author');
const readStatus = document.getElementById('read');
const notReadStatus = document.getElementById('notread');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');

/**
 * Take an object of type Book and create
 * Element li
 * Element div which is our card
 * Elements div for status, infos, buttons displayed on card
 * Too much code in my opinion need to change this in future
 * @param {object} book An object of type Book
 */
const createACard = (book) => {
  const bookListItem = document.createElement('li');
  bookListItem.classList.add('app__booklist__item');

  const bookListCard = document.createElement('div');
  bookListCard.classList.add('app__booklist__card');
  bookListItem.appendChild(bookListCard);

  // card status container
  const bookListCardStatus = document.createElement('div');
  bookListCardStatus.classList.add('app__card__status');
  bookListCard.appendChild(bookListCardStatus);
  // card infos container
  const bookListCardInfos = document.createElement('div');
  bookListCardInfos.classList.add('app__card__infos');
  bookListCard.appendChild(bookListCardInfos);
  // card buttons container
  const cardButtonsContainer = document.createElement('div');
  cardButtonsContainer.classList.add('app__card__buttons');
  bookListCard.appendChild(cardButtonsContainer);

  const cardStatusImage = document.createElement('img');
  cardStatusImage.src = getIcon(book.status);
  bookListCardStatus.appendChild(cardStatusImage);
  const cardStatusText = document.createElement('span');
  cardStatusText.innerText = book.status;
  bookListCardStatus.appendChild(cardStatusText);
  const cardInfosTitle = document.createElement('h2');
  cardInfosTitle.innerText = book.title;
  bookListCardInfos.appendChild(cardInfosTitle);
  const cardInfosAuthor = document.createElement('span');
  cardInfosAuthor.innerText = book.author;
  bookListCardInfos.appendChild(cardInfosAuthor);

  // switch Button
  const switchButton = document.createElement('button');
  switchButton.classList.add('switch__button');
  switchButton.setAttribute('id', 'switchButton');
  switchButton.addEventListener('click', switchStatus);
  cardButtonsContainer.appendChild(switchButton);

  // delete Button
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete__button');
  deleteButton.setAttribute('id', 'deleteButton');
  deleteButton.addEventListener('click', deleteABook);
  cardButtonsContainer.appendChild(deleteButton);

  bookListItems.appendChild(bookListItem);
};

/**
 * Get values of inputs , and create a new Book
 * New Book is give to addABook and createACard functions
 * @param {event} event click event on Add a Book button
 */
const createABook = (event) => {
  const status = readStatus.checked ? readStatus.value : notReadStatus.value;
  const myBook = new Book(titleBook.value, authorBook.value, status);

  addABook(myBook);
  createACard(myBook);
};

/**
 * Take an object of type book and add it to localStorage
 * Title of book as key
 * Book object stringified as value
 * @param {object} book An object of type book
 */
const addABook = (book) => {
  console.log(book);
  myLibrary.setItem(book.title, JSON.stringify(book));
};

/**
 * Take status of book and return the right img url
 * @param {string} status status of book
 * @return {string} url of img
 */
const getIcon = (status) => {
  if (status === 'read') {
    return `/img/icon_read.png`;
  }
  if (status === 'notread') {
    return `/img/icon_notread.png`;
  }
};

/**
 * Clear our localStorage from all the entries
 */
const clearLibrary = () => {
  myLibrary.clear();
  window.location.reload();
};

/**
 * Target a card , take the title
 * Switch status from read to notread or from notread to read
 * Update the value of the key/value pair in our localStorage
 * Refresh the page
 * @param {event} event on click event
 */

const switchStatus = (event) => {
  const infos = event.path[2].childNodes[1];
  const h2 = infos.firstChild;
  const title = h2.textContent;
  const string = myLibrary.getItem(title);
  let updatedString = '';

  if (string.includes('notread')) {
    updatedString = string.replace('notread', 'read');
  } else {
    updatedString = string.replace('read', 'notread');
  }

  myLibrary.setItem(title, updatedString);
  window.location.reload();
};

/**
 * Target a card , take the title
 * Remove the key/value pair from our localStorage
 * Refresh the page
 * @param {event} event on click event
 */
const deleteABook = (event) => {
  const infos = event.path[2].childNodes[1];
  const h2 = infos.firstChild;
  const title = h2.textContent;

  myLibrary.removeItem(title);
  window.location.reload();
};

addButton.addEventListener('click', createABook);
clearButton.addEventListener('click', clearLibrary);

/**
 * On load watch if localStorage is empty, if not
 * Take all the entries
 * Parse the JSON
 * For each create A card with props
 */
window.onload = function () {
  if (myLibrary.length !== 0) {
    for (let i = 0; i < myLibrary.length; i++) {
      const keys = myLibrary.key(i);
      const items = myLibrary.getItem(keys);
      const props = JSON.parse(items);
      createACard(props);
    }
  }
};
