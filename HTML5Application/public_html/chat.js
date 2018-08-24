function message() {
    var listItem = document.createElement("li");
    var p = document.createElement("p");

    p.classList.add('text-left', 'border', 'border-light', 'textBobble');
    listItem.style.cssFloat = "left";

    var textNode = document.createTextNode(textInputID.value);

    //This makes no message if no chars is entered.
    if (textNode.length >= 1) {
        p.appendChild(textNode);
        document.getElementById("chatListID").appendChild(p);
    }

    textInputID.value = '';
}

function onEnter() {
    $('#textInputID').keypress(function(e) {
        if (e.which === 13) {
            message();
            return false;
        }
    });
}

/* function scrollToBottom() {
    $(document).ready(function() {
        $('body,html').animate({ scrollTop: $(document).height() }, 800);
    });
} */