var showMore = document.getElementById('showMore');
var showFullForm = document.getElementById('showFullForm');
var submitButton = document.getElementById('submitButton');
showMore.addEventListener('click', function () {
    if (showMore.value.toLowerCase() === "show more") {
        showFullForm.style.display = "block";
        showMore.style.display = "none";
        submitButton.removeAttribute('disabled');
    }
});
