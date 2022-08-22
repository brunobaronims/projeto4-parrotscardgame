window.onload = (event) => {
  const cardList = generateCardList();
  const ul = document.querySelector('ul');
  shuffle(cardList);
  setCards(cardList, ul);
};

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

function playAgain() {
  const resposta = prompt("Você gostaria de jogar novamente? Responda 'sim' ou 'não'.");
  if (resposta === 'sim') {
    const ul = document.querySelector('ul');
    const cardList = generateCardList();

    //Reset counter
    document.querySelector('ul').dataset.count = "0";

    // Clear card list
    ul.innerHTML = '';
    shuffle(cardList);
    setCards(cardList, ul);
  } else if (resposta === 'não') {
    return;
  } else {
    return playAgain();
  }
}

function flipCard(event) {
  const card = getClickedCard(event);
  if (card.className != 'flip-card-inner peeked' && card.className != 'flip-card-inner paired' && card.tagName != 'LI') {
    
    // Flipped but not paired
    const unpairedCards = Array.from(document.getElementsByClassName('peeked'));

    // Flipped and paired
    const pairedCards = Array.from(document.getElementsByClassName('paired'));

    // All flipped cards
    const flippedCards = unpairedCards.concat(pairedCards);
    const flippedGifs = unpairedCards.slice();
    flippedGifs.forEach((Card, index) => {
      flippedGifs[index] = Card.innerHTML;
    })

    // Clicked card starts a new pair
    if (flippedCards.length % 2 === 0 && pairedCards.length >= flippedCards.length - 1) {
      card.classList.add('peeked');
      document.querySelector('ul').dataset.count++;
    } else if (pairedCards.length === flippedCards.length - 1) { // Check if player is trying to flip more than 2 cards at once
      
      // Flipped card forms a pair
      if (flippedGifs.includes(card.innerHTML)) {
        let count = document.querySelector('ul').dataset.count;
        count++;
        unpairedCards.forEach((Card, index) => {
          unpairedCards[index].classList.add('paired');
          unpairedCards[index].classList.remove('peeked');
        })
        card.classList.add('paired');

        // All cards have been flipped
        if (Array.from(document.querySelectorAll('li')).length - 2 === pairedCards.length) {
          alert(`Você ganhou em ${count} jogadas!`);
          playAgain();
        }
      } else { // Flipped card does not form a pair

        card.classList.add('peeked');
        setTimeout(() => { card.classList.remove('peeked') }, 1000);
        setTimeout(() => { flippedCards.forEach(Card => { Card.classList.remove('peeked') }) }, 1000);
        document.querySelector('ul').dataset.count++;
      }
    }
  }
}
