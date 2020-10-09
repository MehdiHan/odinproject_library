const bookListItems = document.querySelector('.app__booklist__items');

function Book(title, author, status) {
  this.title = title;
  this.author = author;
  this.status = status;
}
let library = [
  {
    title: `You don't know js`,
    author: 'Kyle Simpson',
    status: 'Read',
  },
  {
    title: `You don't know js`,
    author: 'Kyle Simpson',
    status: 'Read',
  },
];

const displayBook = (library) => {
  library.forEach((book) => {
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
    cardStatusImage.src = '/img/icon_read.png';
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
  });
};
displayBook(library);
