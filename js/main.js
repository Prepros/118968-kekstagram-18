'use strict';

// Случайное число
var randomVal = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Случайная строка
var randomString = function (lenghtString) {
  if (!lenghtString || lenghtString <= 0) {
    lenghtString = 250;
  }

  var letterEn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var letterRu = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];
  var letterNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  var letterSymb = ['!', '@', '#', '$', '%', '&', '?', '-', '+', '=', '~'];
  var abc = [
    letterEn,
    letterRu,
    letterNum,
    letterSymb
  ];

  var str = '';

  for (var i = 0, j = 0; i < lenghtString; i++, j++) {
    var abcRandom = abc[randomVal(0, abc.length - 1)];
    var letterRandom = abcRandom[randomVal(0, abcRandom.length - 1)];

    if (j === 5) {
      str += ' ';
      j = 0;
    }

    str += String(letterRandom);
  }

  return str;
};

// Генерация ссылки на фотографию
var generateUrl = function (count) {
  if (!count || count < 0) {
    count = 1;
  }

  var urls = [];

  for (var i = 0, j = 1; i < count; i++, j++) {
    urls[i] = 'photos/' + j + '.jpg';
  }

  return urls;
};


// Генерация комментариев
var generateComment = function (count) {
  if (!count || count < 0) {
    count = 1;
  }

  var messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var avatars = [];
  for (var i = 0, j = 1; i < messages.length; i++, j++) {
    avatars[i] = 'img/avatar-' + j + '.svg';
  }

  var names = [
    'Дима',
    'Миша',
    'Катя',
    'Вера',
    'Петр',
    'Ольга',
    'Ринат',
    'Фархат'
  ];

  var comments = [];
  for (i = 0; i < count; i++) {
    var countComment = randomVal(1, messages.length);
    comments[i] = [];

    for (j = 0; j < countComment; j++) {
      comments[i][j] = {
        avatar: avatars[j],
        message: messages[randomVal(0, messages.length - 1)],
        name: names[randomVal(0, names.length - 1)],
      };
    }
  }

  return comments;
};


// Генерация фотографий
var generatePhoto = function (count) {
  if (!count || count < 0) {
    count = 1;
  }

  // Данные
  var url = generateUrl(count);
  var comments = generateComment(count);

  var photos = [];

  for (var i = 0; i < count; i++) {
    var description = randomString(randomVal(25, 100));
    var likes = randomVal(15, 200);

    photos[i] = {
      url: url[i],
      description: description,
      likes: likes,
      comments: comments[i]
    };
  }

  return photos;
};


// Отрисовка миниатюр фотографий
var renderThumbnail = function (photo) {
  var templatePicture = document.querySelector('#picture').content;
  var picture = templatePicture.querySelector('.picture');

  var pictureItem = picture.cloneNode(true);
  var img = pictureItem.querySelector('.picture__img');
  var likes = pictureItem.querySelector('.picture__likes');
  var comments = pictureItem.querySelector('.picture__comments');

  img.src = photo.url;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;

  return pictureItem;
};


// Добавления миниатюр фото
var addThumbnail = function (photos) {
  for (var i = 0; i < photos.length; i++) {
    var pictureItem = renderThumbnail(photos[i]);
    pictures.appendChild(pictureItem);
  }
};


// Отрисовка описания к фотографии
var renderPhoto = function (photo) {
  var img = bigPictures.querySelector('.big-picture__img img');
  var likes = bigPictures.querySelector('.likes-count');
  var commentCount = bigPictures.querySelector('.comments-count');
  var comments = bigPictures.querySelector('.social__comments');
  var description = bigPictures.querySelector('.social__caption');

  img.src = photo.url;
  likes.textContent = photo.likes;
  commentCount.textContent = photo.comments.length;
  description.textContent = photo.description;

  // Добавляем комментарии
  while (comments.firstChild) {
    comments.removeChild(comments.firstChild);
  }

  for (var i = 0; i < photo.comments.length; i++) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');

    var avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = photo.comments[i].avatar;
    avatar.alt = photo.comments[i].name;
    avatar.width = 35;
    avatar.height = 35;
    comment.appendChild(avatar);

    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = photo.comments[i].message;
    comment.appendChild(text);

    comments.appendChild(comment);
  }
};


// Начало программы
var pictures = document.querySelector('.pictures');
var bigPictures = document.querySelector('.big-picture');

bigPictures.classList.remove('hidden');

var photos = generatePhoto(25);
addThumbnail(photos);
renderPhoto(photos[randomVal(0, photos.length - 1)]);

var commentCount = bigPictures.querySelector('.social__comment-count');
var commentsLoader = bigPictures.querySelector('.comments-loader');

commentCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');
