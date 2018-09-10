//Variable's -------------------------------------------------------

var contactName = "";
var chatArray = [];
var contactList = [];
var activeContact = document.getElementById("activeContact"); // Get the active contact.

// Const -----------------------------------------------------------
const modal = document.getElementById('myModal'); // The modal
const chatList = document.getElementById("chatListID"); // The chat list window

// Debug -----------------------------------------------------------
const DEBUG = true;

// Eventlisteners --------------------------------------------------

// Checks if Enter is pushed, and sends the message if it is.
document.querySelector('#textInputID').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        sendMessage();
        e.preventDefault();
        e.stopPropagation();
    }
});

// Checks if Enter is pushed, and adds a contact to the contactlist.
document.querySelector('#contactInputID').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        addContact();
        e.preventDefault();
        e.stopPropagation();
    }
});

// Functions -----------------------------------------------------------

// This function returns the event or element that the user clicked on.
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

//Opens a modal, where you can choose contacts.
function startNewChat(e) {

    // Check if there is contacts in the list.
    if (contactList.length <= 0) {
        disableButton(e);

        if (DEBUG) {
            console.log("Empty contact list");
        }

        // If there is no contacts in the list, show alert
        swal("No contacts available", "Please add more contacts", "error");

    } else if (contactList.length >= 1) {

        // When the user clicks on the button, open the modal
        modal.style.display = "block";

        //List the contacts
        for (let i = 0; i < contactList.length; i++) {
            const element = contactList[i];
            var p = document.createElement("p");
            p.innerHTML = element.textContent;
            document.getElementById("modal-list").appendChild(p);

            if (DEBUG) {
                console.log("Creating contact p element for: " + p.innerText);
            }
        }

        // Get the <span> element that closes the modal
        var spanEl = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        spanEl.onclick = function () {
            modal.style.display = "none";
            removeChildren("modal-list");
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
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
                        if (DEBUG) {
                            console.log("Clicking on contact number: " + i);
                        }

                        // This function calls on it self when element is clicked.
                        pEl[i].onclick = function () {
                            if (DEBUG) {
                                console.log("Toggle class 'active' on: " + pEl[i].innerHTML);
                            }

                            pEl[i].classList.toggle("active");
                        }();
                    }));

    } else {
        activateButton(e);
    }
}

function sendMesssageToServer(message) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("Message is updated.");
        }
    };
    xhttp.open("POST", "http://localhost:8080/chatServer/api/service/sendMessage?message=");
    xhttp.send(message);
}

//Creates a message, and checks if it is an img, and sends it.
function sendMessage() {

    //Create a text node, with the input from the user.
    var textInputValue = document.getElementById("textInputID").value;
    var textNode = document.createTextNode(textInputValue);
    // Check if input is only space or break line. If not, continue.
    if (/\S/.test(textInputValue)) {
        
        sendMesssageToServer(textInputValue);
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
            if (DEBUG) {
                console.log('adding contact ' + contactNode.textContent);
            }

            listItem.appendChild(contactNode);
            document.getElementById('contacts').appendChild(listItem);

            //Activate the disabled button
            activateButton(document.getElementById("newChatButton"));

            //Eventlistener for clicking on the contacts:
            listItem.addEventListener("click", function e() {
                if (DEBUG) {
                    console.log("clicking on " + listItem.innerHTML)
                }

                contactName = listItem.innerHTML;
                if (DEBUG) {
                    console.log("Contact name is now: " + contactName);
                }

                getContactChat();
            });
        }

        // Removing the input value, so user doesn't have to do it manually.
        contactInputID.value = '';
    } else {
        // If the imput is only space or break line, show alert message and remove input.
        if (DEBUG) {
            console.log("Invalid name");
        }

        contactInputID.value = '';
        swal("Invalid Name", "Please enter a valid name", "error");
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

    // Empty the chat window 
    chatList.innerHTML = ""

    createNewChatWindow(name);


}

function createNewChatWindow(name) {
    // Create a new p element
    var p = document.createElement("p");

    // Add a class to the new p element
    p.classList.add('contactTextBobble');

    // Create a text node
    var textNode = document.createTextNode(name + " joined the chat");

    // Attach the textNode to the p element.
    p.appendChild(textNode);

    // Attach the p element to the div called chatListID
    document.getElementById("chatListID").appendChild(p)
}

// This function is called when the user has chosen one or more contacts from the modal.
// It starts a chat with that/those contact(s).
function startGroupChat(contact) {

    chatList.innerHTML = "";
    activeContact.innerHTML = "";
    var pEl = document.getElementById("modal-list").getElementsByTagName("p");
    if (DEBUG) {
        console.log("Clearing the chat window and listing pEl: " + pEl);
        console.log("Active contact is now: " + activeContact);
    }
    let x = 0;
    // Loop through the p elements, to check if some of them has the class 'active'.
    // If 'active' then add to chat window
    for (let i = 0; i < pEl.length; i++) {
        const element = pEl[i];

        // Checking for class 'active' on each p element
        if (pEl[i].classList.contains("active")) {

            if (DEBUG) {
                console.log("x: " + x);
            }
            ++x;

            if (DEBUG) {
                console.log("x is changed to: " + x);
            }
            createNewChatWindow(element.innerHTML);

            if (DEBUG) {
                console.log("P element: " + element)
                console.log("element.innerHTML: " + element.innerHTML);
            }

            if (x >= 2) {
                document.getElementById("activeContact").innerHTML += ", ";
            }

            // Change the text in the activeContact element to the contact name
            document.getElementById("activeContact").innerHTML += element.innerHTML;


            if (DEBUG) {
                console.log("Active is changed to: " + element.innerHTML);
            }

        }
    }

    modal.style.display = "none";
    removeChildren("modal-list");
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