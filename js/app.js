const bookListItems = document.querySelector('.app__booklist__items');
const titleBook = document.getElementById('title');
const authorBook = document.getElementById('author');
const readStatus = document.getElementById('read');
const notReadStatus = document.getElementById('notread');
const button = document.querySelector('[type=submit]');

function Book(title, author, status) {
  this.title = title;
  this.author = author;
  this.status = status;

  this.getIcon = (status) => {
    if (this.status === 'read') {
      return `/img/icon_read.png`;
    }
    if (this.status === 'notread') {
      return `/img/icon_notread.png`;
    }
  };
}
let library = [];
const createCard = (book) => {
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

const displayBook = (library) => {
  library.forEach((book) => {
    createCard(book);
  });
};
const createBook = (event) => {
  let title = titleBook.value;
  let author = authorBook.value;
  let status = '';
  if (readStatus.checked === true) {
    status += 'read';
  } else {
    status += 'notread';
  }

  const newBook = new Book(title, author, status);
  createCard(newBook);
};
button.addEventListener('click', createBook);
displayBook(library);
