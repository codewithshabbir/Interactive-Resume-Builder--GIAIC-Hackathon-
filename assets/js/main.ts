const showMore = document.getElementById('showMore') as HTMLButtonElement;
const showFullForm = document.getElementById('showFullForm') as HTMLElement;
const submitButton = document.getElementById('submitButton') as HTMLInputElement;

showMore.addEventListener('click', ()=>{
    if(showMore.value.toLowerCase() === "show more"){
        showFullForm.style.display = "block";
        showMore.style.display = "none";
        submitButton.removeAttribute('disabled');
    }
})