function sendMessage() {
    //create the elements
    var p = document.createElement("p");

    //add class to the p element
    p.classList.add('receiverTextBobble');

    //Create a text node, with the input from the user.
    var textInputValue = document.getElementById("textInputID").value;
    var textNode = document.createTextNode(textInputValue);
    
    var isPicture = false;
    if (textInputValue.includes(".jpg")) {
        isPicture = true;
    }
    else if (textInputValue.includes(".png")) {
          isPicture = true;
    }
    else if (textInputValue.includes(".gif")) {
          isPicture = true;
    }
    if (isPicture){
        var img = document.createElement("img");
        img.setAttribute("src", textInputValue);
        img.classList.add('receiverImgBobble');
        document.getElementById("chatListID").appendChild(img);
        
        //TODO: add a new line here. Because right now the img appends the last message
    }
    //Checks if any chars is entered in the input form. If not, do nothing.
    else if (textNode.length >= 1) {
        p.appendChild(textNode);
        document.getElementById("chatListID").appendChild(p);
    }
   


    //Clear the input form.
    textInputID.value = '';
}

// This function checks if Enter is pushed, and sends the message if it is.
function onEnter() {
    $('#textInputID').keypress(function (e) {
        if (e.which === 13) {
            sendMessage();
            scrollToBottom()
            return false;
        }
    });
}
function addContact() {
    var listItem = document.createElement("li");
    var contact = contactInputID.value;

    var contactNode = document.createTextNode(contact);

    if (contactNode.length >= 1) {
        console.log('adding contact' + contactNode.value);
        listItem.appendChild(contactNode);
        document.getElementById('contacts').appendChild(listItem);
    }
    contact = '';
}

//Scrolls the chat window to the latest message.
function scrollToBottom() {
    $(document).ready(function () {
        $('#chatWindow').animate({scrollTop: $(document).height()}, 800);
    });
}