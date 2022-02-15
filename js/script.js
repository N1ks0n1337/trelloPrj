'use strict'

const bthCreateList = document.getElementById("bth-create-list"); //элемент с id = bth-create-list
const desk = document.getElementById("desk"); //элемент с id=desk
const inputListName = document.getElementById("list-name"); // ввод текста
var currentCount = 1;
let num = 1;
bthCreateList.addEventListener("click", addList);
inputListName.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        bthCreateList.click();
    }
});

function addList() {
    let list = document.createElement("div"); /*создать тег div*/
    let listName = document.getElementById("list-name").value;
    if (listName == "") {
        listName = "Trello " + num;
        num++;
    }

    list.classList.add("list"); //добавить элемента списка
    let h2 = document.createElement("h2");
    h2.innerHTML = listName;
    list.append(h2);
    let img = document.createElement("img");
    img.setAttribute("width", "30px");
    h2.after(img);

    // создаем крестик 
    let X = document.createElement("p");
    X.classList.add("delete");
    X.innerHTML = "Уничтожить Trello";
    list.append(X);

    // блок добавить карточку
    let addCardButton = document.createElement("div");
    addCardButton.classList.add("list-cards");
    let addCardText = document.createElement("p");
    addCardText.classList.add("add-card");
    addCardText.innerHTML = "+ Добавить Trello";
    addCardButton.append(addCardText);

    list.append(addCardButton);

    // добевление класса для картинки
    img.classList.add("edit-list");

    /*удаление*/
    const btnClearList = document.getElementById("bth-clear-list");
    btnClearList.addEventListener("click", function() {
        desk.innerHTML = "";
        num = 1;
    })
    desk.append(list); //добавить элемент в конец контейнера desk
}

desk.addEventListener("click", e => {
    editList(e);
})

function editList(e) {
    let obj = e.target;
    if (obj.classList.contains("edit-list")) {
        let list = obj.parentNode;
        let h2 = list.firstChild;
    } else if (obj.classList.contains("delete")) {
        obj.parentNode.remove();
    } else if (obj.classList.contains("add-card")) {
        // создали блок карточки
        let textAreaWrapper = document.createElement("div");
        textAreaWrapper.classList.add("card");
        // создали текстАреа для блока карточка
        let textArea = document.createElement("textarea");
        textArea.classList.add("card-text");

        textAreaWrapper.append(textArea);

        // кнопка удаления карточек
        let cardDelete = document.createElement("p");
        cardDelete.classList.add("delete");
        cardDelete.classList.add("delete-card");
        cardDelete.innerHTML = "X";

        textAreaWrapper.append(cardDelete);

        let list = obj.parentNode;
        list.append(textAreaWrapper);
    }
}