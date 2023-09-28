//Modern browsers support ES5 modules with import/export as normal
import { getElementByIdOrFail } from "./utils.js";
import { characters } from "./characters.js";
// import { antiHeroes } from "./antiheroes.js";

const myButton = getElementByIdOrFail("myButton1");
const focusedCharacterPara = getElementByIdOrFail("focusedCharacterPara");
const myList = getElementByIdOrFail("charactersUL");
const showAllButton = getElementByIdOrFail("showAllButton");



myButton.addEventListener("click", () => {
    const searchTerm = prompt("input search term");
    renderFilteredCharacters(searchTerm);
});

showAllButton.addEventListener("click", () => {
    renderAllCharacters();
});


function renderFilteredCharacters(searchTerm) {
    myList.innerHTML = "";

    const filteredCharacters = filterCharacters(searchTerm);

    for (const character of filteredCharacters) {
        myList.appendChild(character);
    }
};

function renderAllCharacters() {
    myList.innerHTML = "";

    const allCharacters = makeLiElementsForCharacters();

    for (const character of allCharacters) {
        myList.appendChild(character);
    }
}

function filterCharacters(searchTerm) {
    return characters.filter((character) => {
        const nameMatch = character.name.toLowerCase().includes(searchTerm.toLowerCase());
        const bookMatch = character.book.toLowerCase().includes(searchTerm.toLowerCase());

        // Include the character in the filtered list if either the name or book matches
        return nameMatch || bookMatch;
    }).map((character) => {
        // Create and return an li element for each matching character
        const element = document.createElement("li");
        element.innerHTML = character.name + " from " + character.book;
        
        element.addEventListener("click", () => {
            alert(character.powers.join(", "));
        });
        element.addEventListener("mouseover", () => {
            focusedCharacterPara.innerText =
                character.name + ": " + character.powers.join(", ");
        });

        return element;
    });
}


function makeLiElementsForCharacters() {
    return characters.map((character) => {
        //Not yet attached to any point in the DOM tree
        const element = document.createElement("li");
        element.innerHTML = character.name + " from " + character.book;

        element.addEventListener("click", () => {
            alert(character.powers.join(", "));
        });
        element.addEventListener("mouseover", () => {
            focusedCharacterPara.innerText =
                character.name + ": " + character.powers.join(", ");
        });



        return element;
    });
}
const characterLiElements = makeLiElementsForCharacters();

for (const li of characterLiElements) {
    myList.appendChild(li);
}
