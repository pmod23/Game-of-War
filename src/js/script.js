class Deck {
  constructor() {
    this.cards = this.createDeck();
  }
  createDeck() {
    let deck = [];
    for (let i = 0; i < 52; i++) {
      deck.push(i + 1);
    }
    return deck;
  }
  shuffleDeck() {
    let array = this.cards;
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.cards = array;
    return this;
  }
  deal(numberOfCards) {
    let dealCards = this.cards.splice(0, numberOfCards);
    return dealCards;
  }
}

class Player {
  constructor(name, playerDeck) {
    this.name = name;
    this.playerDeck = playerDeck;
    this.winningRounds = 0;
  }

  addWinningRounds() {
    this.winningRounds++;
    return this;
  }
  addWinningCards(cards) {
    this.playerDeck.push(...cards);
    return this;
  }
  playCard() {
    return this.playerDeck.pop();
  }
  giveThreeCards() {
    let warTributeCards = this.playerDeck.splice(this.playerDeck.length - 3, 3);
    console.log("war tribute cards", warTributeCards);
    return warTributeCards;
  }
}

class Card {
  constructor(rank, name, value) {
    this.rank = rank;
    this.name = name;
    this.value = value;
  }

  printCard() {}
}

class WarGame {
  constructor(playerOne, playerTwo) {
    this.deck = new Deck().shuffleDeck();
    this.playerOne = new Player(playerOne, this.deck.deal(26));
    this.playerTwo = new Player(playerTwo, this.deck.deal(26));
    console.log(this.playerOne);
  }

  playRound() {
    let playerOneCard = this.playerOne.playCard();
    let playerTwoCard = this.playerTwo.playCard();
    if (playerOneCard % 13 < playerTwoCard % 13) {
      this.giveWinningCards("playerOne", [playerOneCard, playerTwoCard]);
    } else if (playerTwoCard % 13 < playerOneCard % 13) {
      this.giveWinningCards("playerTwo", [playerOneCard, playerTwoCard]);
    } else {
      console.log("cards tied");
      this.prepareForWar();
    }
  }

  giveWinningCards(playerName, winningCards) {
    this[playerName].addWinningCards(winningCards);
    this[playerName].addWinningRounds();
    if (this.playerOne.playerDeck.length === 0) {
      console.log("Player Two is the Winner");
    } else if (this.playerTwo.playerDeck.length === 0) {
      console.log("Player One is the Winner");
    } else {
      this.playRound();
    }
  }
  prepareForWar(playerOne, playerTwo) {
    let burnPile = [];
    let p1Cards = this.playerOne.giveThreeCards();
    let p2Cards = this.playerTwo.giveThreeCards();
    burnPile.push(...p1Cards);
    burnPile.push(...p2Cards);
    console.log(burnPile);
    let p1 = this.playerOne.playCard();
    let p2 = this.playerTwo.playCard();
    if (p1 % 13 < p2 % 13) {
      this.giveWinningCards("playerOne", [
        p1,
        p2,
        ...burnPile,
        playerOne,
        playerTwo,
      ]);
    } else if (p2 % 13 < p1 % 13) {
      this.giveWinningCards("playerTwo", [
        p1,
        p2,
        ...burnPile,
        playerOne,
        playerTwo,
      ]);
    } else {
      this.playRound();
    }
  }
}

let war = new WarGame("Tom", "Computer");

war.playRound();
console.log(war);
