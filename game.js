const mainObj = {
    elements: {
        sky: {
            name: 'sky',
            numCode: 0,
            editableByTool: null,
            possibleAddElement: true,
        },
        cloud: {
            name: 'cloud',
            numCode: 1,
            editableByTool: null,
            possibleAddElement: true,
        },
        ground: {
            name: 'ground',
            numCode: 2,
            editableByTool: 'shovel',
            possibleAddElement: false,
        },
        grass: {
            name: 'grass',
            numCode: 3,
            editableByTool: 'axe',
            possibleAddElement: false,
        },
        wood: {
            name: 'wood',
            numCode: 4,
            editableByTool: 'axe',
            possibleAddElement: false,
        },
        stone: {
            name: 'stone',
            numCode: 5,
            editableByTool: 'pickaxe',
            possibleAddElement: false,
        },
        ground_grass: {
            name: 'ground_grass',
            numCode: 6,
            editableByTool: 'shovel',
            possibleAddElement: false,
        }
    },
    tools: ['pickaxe', 'axe', 'shovel'],
    getNameByNumCode: function (num) {
        const arrValues = Object.values(this.elements);
        const index = arrValues.findIndex(obj => obj.numCode === num);
        return index !== -1 ? arrValues[index].name : -1;
    },
    getEditableByToolByName: function (name) {
        const arrValues = Object.values(this.elements);
        const index = arrValues.findIndex(obj => obj.name === name);
        return index !== -1 ? arrValues[index].editableByTool : -1;
    },
    getPossibleAddElementByName: function (name) {
        const arrValues = Object.values(this.elements);
        const index = arrValues.findIndex(obj => obj.name === name);
        return index !== -1 ? arrValues[index].possibleAddElement : -1;
    },
    getNumCodeByName: function (name) {
        const arrValues = Object.values(this.elements);
        const index = arrValues.findIndex(obj => obj.name === name);
        return index !== -1 ? arrValues[index].numCode : -1;
    },
};

const mainMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 3, 3, 3, 3, 3, 3, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 5, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 5, 5, 0, 0],
    [0, 0, 5, 5, 5, 5, 5, 0, 0, 4, 4, 0, 0, 0, 0, 0, 5, 5, 0, 0],
    [6, 6, 6, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

const varObj = {
    starBtn: document.querySelector('.start'),
    boxesCollection: document.querySelectorAll('.box'),
    resetGameBtn: document.querySelector('.reset-game'),
    toolsCollection: document.querySelectorAll('.tool'),
    allAttributeDataSelect: function(){
        return document.querySelectorAll('[data-select]');
    },
    bank: document.querySelector('.bank'),
    inBankCollection: function () {
        return document.querySelectorAll('.in-bank')
    },
    gameContainer: document.querySelector('.game-container')
}

function resetGame() {
    resetSelections();
    removeAllFromBank();
    for (let i = 0; i < mainMatrix.length; i++) {
        for (let j = 0; j < mainMatrix[i].length; j++) {
            const courantBoxNum = varObj.boxesCollection[i * mainMatrix.length + j];
            courantBoxNum.setAttribute('class', `box ${mainObj.getNameByNumCode(mainMatrix[i][j])}`);

            eventListenerForBoxes(courantBoxNum);
        }
    }
}
resetGame();


function resetSelections() {
    for (let tool of varObj.toolsCollection) {
        tool.setAttribute('data-select', 'false');
    }
    for (let element of varObj.inBankCollection()) {
        element.setAttribute('data-select', 'false');
    }
}

function removeAllFromBank() {
    for (let element of varObj.inBankCollection()) {
        element.remove();
    }
}

function getTypeElementByElement(element) {
    const classElement = element.getAttribute('class');
    if (classElement.includes('ground_grass')) {
        return 'ground_grass';
    } else if (classElement.includes('ground')) {
        return 'ground';
    } else if (classElement.includes('grass')) {
        return 'grass';
    } else if (classElement.includes('wood')) {
        return 'wood';
    } else if (classElement.includes('stone')) {
        return 'stone';
    } else if (classElement.includes('pickaxe')) {
        return 'pickaxe';
    } else if (classElement.includes('axe')) {
        return 'axe';
    } else if (classElement.includes('shovel')) {
        return 'shovel';
    } else {
        return 0;
    }
}

function findSelection() {
    for (element of varObj.allAttributeDataSelect()) {
        if (element.getAttribute('data-select') === 'true') {
            return getTypeElementByElement(element);
        }
    }
}


// start game:
varObj.starBtn.addEventListener('click', event => {
    const welcomePage = event.target.parentElement;
    welcomePage.setAttribute('data-display', 'false');
    varObj.gameContainer.setAttribute('data-display', 'true');
});

// reset game:
varObj.resetGameBtn.addEventListener('click', event => {
    resetGame();
});


for (let tool of varObj.toolsCollection) {
    tool.addEventListener('click', event => {
        const set = event.target.getAttribute('data-select') === 'true' ? false : true;
        resetSelections();
        event.target.setAttribute('data-select', set);
    });
}

function eventListenerForInBank(element) {
    element.addEventListener('click', event => {
        const set = event.target.getAttribute('data-select') === 'true' ? false : true;
        resetSelections();
        event.target.setAttribute('data-select', set);
    });
}


function eventListenerForBoxes(box) {
    box.addEventListener('click', event => {
        const typeBox = getTypeElementByElement(event.target);
        const courantSelect = findSelection();
        if (courantSelect === mainObj.getEditableByToolByName(typeBox)) {
            box.setAttribute('class', 'box sky');
            const newForBank = document.createElement('div');
            newForBank.setAttribute('class', `box ${typeBox} in-bank`);
            newForBank.setAttribute('data-select', 'false');
            varObj.bank.appendChild(newForBank);
            eventListenerForInBank(newForBank);
        } else if (mainObj.getPossibleAddElementByName(typeBox) && mainObj.getNumCodeByName(courantSelect) > 1) {
            box.setAttribute('class', `box ${courantSelect}`);
            for (element of varObj.allAttributeDataSelect()) {
                if (element.getAttribute('data-select') === 'true') {
                    element.remove();
                }
            }
        }
    });

    box.addEventListener('mouseover', event => {
        const typeBox = getTypeElementByElement(event.target);
        const courantSelect = findSelection();
        if (courantSelect === mainObj.getEditableByToolByName(typeBox)) {
            event.target.setAttribute('data-editableByTool', 'true');
        }
    });

    box.addEventListener('mouseout', event => {
        event.target.removeAttribute('data-editableByTool');
    });
}