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
    const cardFaces = {front: "../public/images/front.png", back: `../public/images/${cardList[index]}parrot.gif`};
    const li = document.createElement('li');
    li.setAttribute('onclick', 'flipCard(event)');
    const inner = document.createElement('div');
    inner.classList.add('flip-card-inner');
    Object.entries(cardFaces).forEach((Item => {
      const div = document.createElement('div');
      div.classList.add(`flip-card-${Item[0]}`);
      inner.appendChild(Object.assign(div, {innerHTML: `<img src=${Item[1]}></img>`}));
    }));
    li.appendChild(inner);
    ul.appendChild(li);
  })
};

function flipCard(event) {
  console.log(event.target);
}

window.onload = (event) => {
  const cardList = generateCardList();
  shuffle(cardList);
  const ul = document.querySelector('ul');
  setCards(cardList, ul);
};