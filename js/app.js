import { Book } from './Book.js';

const bookListItems = document.querySelector('.app__booklist__items');
const titleBook = document.getElementById('title');
const authorBook = document.getElementById('author');
const readStatus = document.getElementById('read');
const notReadStatus = document.getElementById('notread');
const button = document.querySelector('[type=submit]');

let myLibrary = localStorage;

const createACard = (book) => {
  const bookListItem = document.createElement('li');
  bookListItem.classList.add('app__booklist__item');

  const bookListCard = document.createElement('div');
  bookListCard.classList.add('app__booklist__card');
  bookListItem.appendChild(bookListCard);

  const bookListCardStatus = document.createElement('div');
  bookListCardStatus.classList.add('app__card__status');
  bookListCard.appendChild(bookListCardStatus);
  const bookListCardInfos = document.createElement('div');
  bookListCardInfos.classList.add('app__card__infos');
  bookListCard.appendChild(bookListCardInfos);

  const cardStatusImage = document.createElement('img');
  cardStatusImage.src = book.getIcon(book.status);
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

  bookListItems.appendChild(bookListItem);
};

const createABook = () => {
  const status = readStatus.checked ? readStatus.value : notReadStatus.value;
  const myBook = new Book(titleBook.value, authorBook.value, status);

  addABook(myBook);
  createACard(myBook);
};

const addABook = (book) => {
  myLibrary.setItem(book.title, JSON.stringify(book));
};

button.addEventListener('click', function (event) {
  createABook();
});

window.onload = function () {
  if (myLibrary.length !== 0) {
    for (let i = 0; i < myLibrary.length; i++) {
      const keys = myLibrary.key(i);
      const items = myLibrary.getItem(keys);
      const props = JSON.parse(items);
      console.log(props.getIcon(props.status));
    }
  }
};
