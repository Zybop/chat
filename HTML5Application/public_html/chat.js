
function message() {
    var text = document.createElement('p');
    text.classList.add('text-left', 'border', 'border-light', 'rounded-right',
            'rounded-left');
    document.getElementById("chatWindow").append(text);
    text.innerHTML = textInputID.value;
    textInputID.value = '';
}

function onEnter() {
    $('#textInputID').keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
            message();
        }
    });
}