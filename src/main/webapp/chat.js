//Variable's

var contactName = "";
var chatArray = [];
var contactList = [];


// Eventlisteners

// Checks if Enter is pushed, and sends the message if it is.
document.querySelector('#textInputID').addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        sendMessage();
        e.preventDefault();
        e.stopPropagation();
    }
});

// Checks if Enter is pushed, and adds a contact to the contactlist.
document.querySelector('#contactInputID').addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        addContact();
        e.preventDefault();
        e.stopPropagation();
    }
});

//Functions

// This function returns the event or element that the user clicked on.
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

//Opens a modal, where you can choose contacts.
function startNewChat(e) {

    if (contactList.length <= 0) {
        disableButton(e);
    } else if (contactList.length >= 1) {
        // Get the modal
        var modal = document.getElementById('myModal');
        activateButton(e);

        // When the user clicks on the button, open the modal
        modal.style.display = "block";

        //List the contacts
        for (let i = 0; i < contactList.length; i++) {
            const element = contactList[i];
            var p = document.createElement("p");
            p.innerHTML = element.textContent;
            document.getElementById("modal-list").appendChild(p);
            console.log("Creating contact p element for: " + p.innerText);
        }

        // Get the <span> element that closes the modal
        var spanEl = document.getElementsByClassName("close")[0];


        // When the user clicks on <span> (x), close the modal
        spanEl.onclick = function() {
            modal.style.display = "none";
            removeChildren("modal-list");
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                removeChildren("modal-list");
            }
        }

        // This adds an eventListener to all the p elements and checks if any p is clicked. 
        // If it is clicked, it toggle's a class on it (Add and remove it).
        const pEl = document.getElementById("modal-list").getElementsByTagName("p");
        Object
            .keys(pEl)
            .map(i => pEl[i].addEventListener('click', function test() {
                console.log("Clicking on contact number: " + i);
                // This function calls on it self when element is clicked.
                pEl[i].onclick = function() {
                    console.log("Toggle class 'active' on: " + pEl[i].innerHTML);
                    pEl[i].classList.toggle("active");
                }();
            }));

    } else {
        // If there is no contacts in the list, show alert
        console.log("Empty contact list");
        alert("No contacts available")
    }
}

//Creates a message, and checks if it is an img, and sends it.
function sendMessage() {

    //Create a text node, with the input from the user.
    var textInputValue = document.getElementById("textInputID").value;
    var textNode = document.createTextNode(textInputValue);
    // Check if input is only space or break line. If not, continue.
    if (/\S/.test(textInputValue)) {

        //create the elements
        var p = document.createElement("p");

        //add class to the p element
        p.classList.add('receiverTextBobble');



        // check if input is img file
        var isPicture = false;
        if (textInputValue.endsWith(".jpg")) {
            isPicture = true;
        } else if (textInputValue.endsWith(".png")) {
            isPicture = true;
        } else if (textInputValue.endsWith(".gif")) {
            isPicture = true;
        } else if (textInputValue.endsWith(".svg")) {
            isPicture = true;
        }

        // If it is a picture it will post it as an img tag.
        if (isPicture) {
            var img = document.createElement("img");
            img.setAttribute("src", textInputValue);
            img.classList.add('receiverImgBobble');
            document.getElementById("chatListID").appendChild(img);
            img.scrollIntoView(false);
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
}

// Function for adding a contact to the contact list and show on the website.
function addContact() {
    var contact = contactInputID.value;

    // Check if input is only space or break line. If not, continue.
    if (/\S/.test(contact)) {

        // Create the list element.
        var listItem = document.createElement("li");

        // Create an text node, and also trim the text if it contains many spaces.
        var contactNode = document.createTextNode(contact.trim());

        // Add the contact to a contact list
        contactList.push(contactNode);

        // Only appends the node if there is 1 or more. Used to prevent empty contacts.
        if (contactNode.length >= 1) {
            console.log('adding contact ' + contactNode.textContent);
            listItem.appendChild(contactNode);
            document.getElementById('contacts').appendChild(listItem);

            //Activate the disabled button
            activateButton(document.getElementById("myBtn"));

            //Eventlistener for clicking on the contacts:
            listItem.addEventListener("click", function e() {
                console.log("clicking on " + listItem.innerHTML)
                contactName = listItem.innerHTML;
                console.log("Contact name is now: " + contactName);
                getContactChat();
            });
        }

        // Removing the input value, so user doesn't have to do it manually.
        contactInputID.value = '';
    } else {
        // If the imput is only space or break line, show alert message and remove input.
        console.log("Invalid name");
        contactInputID.value = '';
        alert("Invalid Name");
    }

}

// Function for switching the chat window to current contact.
function getContactChat() {

    // Get the element
    var activeContact = document.getElementById("activeContact");
    // Get the contact name
    var name = contactName;
    // Change the text in the activeContact element to the contact name
    activeContact.innerHTML = name;

    // Changing the chat bobbles:

    // Get the element and empty it
    var chatList = document.getElementById("chatListID");
    chatList.innerHTML = "";

    // Create a new p element
    var p = document.createElement("p");

    // Add a class to the new p element
    p.classList.add('contactTextBobble');

    // Create a text node
    var textNode = document.createTextNode("Welcome to " + name + "'s " + "chat window");

    p.appendChild(textNode);
    document.getElementById("chatListID").appendChild(p)

}

// Function for removing all the list items in the modal
function removeChildren(elementByID) {
    var element = document.getElementById(elementByID);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Button functions
function disableButton(button) {
    button[button.getAttribute('disabled') ? 'removeAttribute' : 'setAttribute']('disabled', '')
    button.classList.add("disabledButton");
}

function activateButton(button) {
    button.removeAttribute('disabled');
    button.classList.remove("disabledButton");
}