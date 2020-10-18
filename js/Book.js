function Book(title, author, status) {
  this.title = title;
  this.author = author;
  this.status = status;
}

Book.prototype.getIcon = (status) => {
  if (status === 'read') {
    return `/img/icon_read.png`;
  }
  if (status === 'notread') {
    return `/img/icon_notread.png`;
  }
};

export { Book };
