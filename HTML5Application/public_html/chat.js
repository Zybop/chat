function sendMessage() {
    //create the elements
    var listItem = document.createElement("li");
    var p = document.createElement("p");

    //add class to the p element
    p.classList.add('receiverTextBobble');

    //Create a text node, with the input from the user.
    var textNode = document.createTextNode(textInputID.value);

    //Makes no message if no chars is entered in the input form.
    if (textNode.length >= 1) {
        p.appendChild(textNode);
        document.getElementById("chatListID").appendChild(p);
    }

    //Clear the input form.
    textInputID.value = '';
}

// This function checks if Enter is pushed, and sends the message if it is.
function onEnter() {
    $('#textInputID').keypress(function(e) {
        if (e.which === 13) {
            sendMessage();
            scrollToBottom()
            return false;
        }
    });
}

//Scrolls the chat window to the latest message.
function scrollToBottom() {
    $(document).ready(function() {
        $('#chatWindow').animate({ scrollTop: $(document).height() }, 800);
    });
}