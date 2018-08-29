//Variable's

var contactName = "";
var chatArray = [];

//Functions

function sendMessage() {
    //create the elements
    var p = document.createElement("p");

    //add class to the p element
    p.classList.add('receiverTextBobble');

    //Create a text node, with the input from the user.
    var textInputValue = document.getElementById("textInputID").value;
    var textNode = document.createTextNode(textInputValue);

    // check if input is img file
    var isPicture = false;
    if (textInputValue.includes(".jpg")) {
        isPicture = true;
    } else if (textInputValue.includes(".png")) {
        isPicture = true;
    } else if (textInputValue.includes(".gif")) {
        isPicture = true;
    }
    if (isPicture) {
        var img = document.createElement("img");
        img.setAttribute("src", textInputValue);
        img.classList.add('receiverImgBobble');
        document.getElementById("chatListID").appendChild(img);
        img.scrollIntoView(false);

        //TODO: add a new line here. Because right now the img appends the last message
    }
    //Checks if any chars is entered in the input form. If not, do nothing.
    else if (textNode.length >= 1) {
        p.appendChild(textNode);
        document.getElementById("chatListID").appendChild(p);
        p.scrollIntoView(false);
    }



    //Clear the input form.
    textInputID.value = '';
}

// This eventListener checks if Enter is pushed, and sends the message if it is.

document.querySelector('#textInputID').addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        sendMessage()
        e.preventDefault();
        e.stopPropagation();
    }
});

// This eventListener checks if Enter is pushed, and adds a contact to the contactlist.

document.querySelector('#contactInputID').addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        addContact()
        e.preventDefault();
        e.stopPropagation();
    }
});

function addContact() {
    var listItem = document.createElement("li");
    var contact = contactInputID.value;

    var contactNode = document.createTextNode(contact);

    if (contactNode.length >= 1) {
        console.log('adding contact ' + contactNode.textContent);
        listItem.appendChild(contactNode);
        document.getElementById('contacts').appendChild(listItem);

        //Eventlistener for clicking on the contacts:
        listItem.addEventListener("click", function e() {
            console.log("clicking on " + listItem.innerHTML)
            contactName = listItem.innerHTML;
            console.log("Contact name is now: " + contactName);
            getContactChat();
        });
    }
    contactInputID.value = '';
}

function getContactChat() {
    //Get the element
    var activeContact = document.getElementById("activeContact");
    //Get the contact name
    var name = contactName;
    //Change the text in the activeContact element to the contact name
    activeContact.innerHTML = name;

    //Changing the chat bobbles:

    //Get the element and empty it
    var chatList = document.getElementById("chatListID");
    chatList.innerHTML = "";

    //Create a new p element
    var p = document.createElement("p");

    //Add a class to the new p element
    p.classList.add('contactTextBobble');

    //Create a text node
    var textNode = document.createTextNode("Welcome to " + name + "'s " + "chat window");

    p.appendChild(textNode);
    document.getElementById("chatListID").appendChild(p)

}