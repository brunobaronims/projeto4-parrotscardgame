function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

function promptUser() {
  const cardNumber = prompt('Com quantas cartas quer jogar? (Escolha um número par entre 4 e 14)');
  if (((cardNumber % 2) == 0) && ((cardNumber >= 4) && (cardNumber <= 14))) {
    return cardNumber;
  }
  else {
    return promptUser();
  }
};

function generateCardList() {
  const listTemplate = Array(parseInt(promptUser()) / 2).fill(null);
  const gifList = ['bobross', 'explody', 'fiesta', 'metal', 'revertit', 'triplets', 'unicorn'];
  shuffle(gifList);
  listTemplate.forEach((Name, index) => {
    listTemplate[index] = gifList[index];
  });
  return listTemplate.concat(listTemplate);
};

function setCards(cardList, ul) {
  cardList.forEach((Card, index) => {
    const cardFaces = { front: "../public/images/front.png", back: `../public/images/${cardList[index]}parrot.gif` };
    const li = document.createElement('li');
    li.setAttribute('onclick', 'flipCard(event)');
    const inner = document.createElement('div');
    inner.classList.add('flip-card-inner');
    Object.entries(cardFaces).forEach((Item => {
      const div = document.createElement('div');
      div.classList.add(`flip-card-${Item[0]}`);
      inner.appendChild(Object.assign(div, { innerHTML: `<img src=${Item[1]}></img>` }));
    }));
    li.appendChild(inner);
    ul.appendChild(li);
  })
};

function getClickedCard(event) {
  if (event.target.onclick === null) {
    let li = event.target.parentElement;
    if (Array.from(li.parentElement.classList).length === 0) {
      return li;
    } else {
      return li.parentElement;
    }
  } else {
    return event.target;
  }
}

function flipCard(event) {
  const card = getClickedCard(event);
  if (card.className != 'flip-card-inner flipped' && card.className != 'flip-card-inner paired' && card.tagName != 'LI') {
    console.log(card);
    const uniqueCards = Array.from(document.getElementsByClassName('flipped'));
    const pairedCards = Array.from(document.getElementsByClassName('paired'));
    const flippedCards = uniqueCards.concat(pairedCards);
    const flippedGifs = uniqueCards.slice();
    flippedGifs.forEach((Card, index) => {
      flippedGifs[index] = Card.innerHTML;
    })
    if (flippedCards.length % 2 === 0 && pairedCards.length >= flippedCards.length - 1) {
      card.classList.add('flipped');
    } else if (pairedCards.length === flippedCards.length - 1){
      if (flippedGifs.includes(card.innerHTML)) {
        uniqueCards.forEach((Card, index) => {
          uniqueCards[index].classList.add('paired');
          uniqueCards[index].classList.remove('flipped');
        })
        card.classList.add('paired');
      } else {
        card.classList.add('flipped');
        setTimeout(() => {card.classList.remove('flipped')}, 1000);
        setTimeout(() => {flippedCards.forEach(Card =>{Card.classList.remove('flipped')})}, 1000);
      }
    }
  }
}

window.onload = (event) => {
  const cardList = generateCardList();
  shuffle(cardList);
  const ul = document.querySelector('ul');
  setCards(cardList, ul);
};