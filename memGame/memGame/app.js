function game() {
    flippedCards.length = 0;
    hideCongratulationsPopup();
    resetRating();
    createNewBoard();
    addEventListenersToCards();
    moves = 0;
    matchedCards = [];
    firstCardIsFlipped = false;
    updateMovesLabel();

}

const board = document.getElementById('board');
const cards = [
    {
        id: 'img-1-1',
        img: 'img/auroraBurealis.jpg',
    },
    {
        id: 'img-2-1',
        img: 'img/deer.jpg',
    },
    {
        id: 'img-3-1',
        img: 'img/fox.jpg',
    },
    {
        id: 'img-4-1',
        img: 'img/owl.jpg',
    },
    {
        id: 'img-5-1',
        img: 'img/polarBear.jpg',
    },
    {
        id: 'img-6-1',
        img: 'img/snowFox.jpg',
    },
    {
        id: 'img-7-1',
        img: 'img/tiger.jpg',
    },
    {
        id: 'img-8-1',
        img: 'img/wolf.jpg',
    },
    {
        id: 'img-1-2',
        img: 'img/auroraBurealis.jpg',
    },
    {
        id: 'img-2-2',
        img: 'img/deer.jpg',
    },
    {
        id: 'img-3-2',
        img: 'img/fox.jpg',
    },
    {
        id: 'img-4-2',
        img: 'img/owl.jpg',
    },
    {
        id: 'img-5-2',
        img: 'img/polarBear.jpg',
    },
    {
        id: 'img-6-2',
        img: 'img/snowFox.jpg',
    },
    {
        id: 'img-7-2',
        img: 'img/tiger.jpg',
    },
    {
        id: 'img-8-2',
        img: 'img/wolf.jpg',
    },
];

// stores cards
const flippedCards = [];
// stores all matched cards
let matchedCards = [];

const starOne = document.getElementById('star-one');
const starTwo = document.getElementById('star-two');
const starThree = document.getElementById('star-three');



let moves = 0;


// CLEARS AND CREATE BOARD
function createNewBoard() {
    // clears the board if there is one
    board.innerHTML = '';

    const shuffledBoard = shuffle(cards);

    // creates HTML board structure
    for (let i = 0; i < shuffledBoard.length; i++) {
        const cardContainer = document.createElement('div');
        const singleCard = document.createElement('div');
        const figure = document.createElement('figure');
        const secondFigure = document.createElement('figure');
        const imgNode = document.createElement('img');

        board.appendChild(cardContainer);
        cardContainer.appendChild(singleCard);
        singleCard.appendChild(figure);
        singleCard.setAttribute('id', shuffledBoard[i].id);
        const figureFront = singleCard.insertBefore(secondFigure, figure);

        imgNode.classList.add('winter');
        imgNode.setAttribute('src', shuffledBoard[i].img);
        figure.appendChild(imgNode);

        cardContainer.classList.add('card-container');
        singleCard.classList.add('card');
        figure.classList.add('back');
        figureFront.classList.add('front');
    }
}

// SHUFFLING

function shuffle(array) {
    let currentIndex = cards.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    return cards;
}

// ADDING EVENT LISTENERS

function addEventListenersToCards() {
    const clickedFigures = document.querySelectorAll('.front');
    for (let i = 0; i < clickedFigures.length; i++) {
        clickedFigures[i].addEventListener('click', handleCardClick);

    }


    const modalButton = document.getElementById('modal-btn');
    modalButton.addEventListener('click', game);
}

function ShowAndHide() {
    let x = document.getElementById('hidden');
    if (x.style.display == 'none') {
    x.style.display = 'block';
} else {
    x.style.display = 'none';
}
}
// FLIPPING AND MATCHING CARDS

function handleCardClick(event) {
    const clickedFigure = event.target;
    const parentCard = clickedFigure.parentElement;
    parentCard.classList.add('flipped');
    const figureId = parentCard.getAttribute('id');

    // stores flipped cards id's, max. 2
    flippedCards.push(figureId);
    firstCardIsFlipped = true;

    // temporarily removes event listener
    clickedFigure.removeEventListener('click', handleCardClick);
    setTimeout(function () {
        clickedFigure.addEventListener('click', handleCardClick);
    }, 600);

    if (flippedCards.length === 2) {
        moves = moves + 1;
        updateMovesLabel();
        rateWithStars();

        const figureTwo = flippedCards.pop();
        const figureOne = flippedCards.pop();
        const previousCard = document.querySelector('#' + figureOne);

        if (pairIsMatched(figureOne, figureTwo)) {
            setTimeout(function () {
                // adds style for matched cards
                previousCard.lastChild.classList.add('matched');
                parentCard.lastChild.classList.add('matched');
            }, 600);
            // stores id's if matched cards
            matchedCards.push(figureTwo);

            // passes matching id to function displaying info about cards owner
            checkWinningCondition();
        } else {
            setTimeout(function () {
                // flips not matched cards face down
                previousCard.classList.remove('flipped');
                parentCard.classList.remove('flipped');
            }, 600);
        }
    }
}

// checks if figures id's are equal
function pairIsMatched(figureOne, figureTwo) {
    const figureOneId = figureOne.substr(0, 5);
    const figureTwoId = figureTwo.substr(0, 5);

    if (figureOne === figureTwo) {
        return false;
    }
    if (figureOneId === figureTwoId) {
        return true;
    } else {
        return false;
    }
}

function updateMovesLabel() {
    const displayedMovesNumber = document.getElementById('moves-counter');
    if (moves === 1) {
        displayedMovesNumber.innerHTML = moves + ' move';
    } else {
        displayedMovesNumber.innerHTML = moves + ' moves';
    }
}

// STATS

function rateWithStars() {
    const starOne = document.getElementById('star-one');
    const starTwo = document.getElementById('star-two');
    const starThree = document.getElementById('star-three');

    // changes full star for empty one
    if (moves >= 30) {
        starTwo.innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>';
    } else if (moves >= 20) {
        starThree.innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>';
    }


}
function displayRating() {
    // shows full stars
    const ratingInfo = document.getElementById('rating-info');
    if (moves >= 30) {
        ratingInfo.innerHTML = '<i class="fa fa-star" aria-hidden="true">';
    } else if (moves >= 20) {
        ratingInfo.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i></i><i class="fa fa-star" aria-hidden="true"></i>';
    } else {
        ratingInfo.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>';
    }


}


function checkWinningCondition() {
    if (matchedCards.length === 8) {
        displayRating();
        showCongratulationsPopup();
    }
}

// adds to the score panel only full stars
function resetRating() {
    starOne.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
    starTwo.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
    starThree.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
}

// POPUP

function showCongratulationsPopup() {
    setTimeout(function () {
        const modal = document.getElementById('popup-window');
        modal.style.display = 'block';
    }, 900);
}

function hideCongratulationsPopup() {
    const modal = document.getElementById('popup-window');
    modal.style.display = 'none';
}
game();
