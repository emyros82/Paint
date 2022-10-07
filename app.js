//Declaration of the initial canvas variables

let canvasWidth = 1000;
let canvasHeight = 450; 
let  isDrawing = false;
let  lineWidth = 1;

/**
 * function to initialize the canvas Area 
 */
function initialize() {
    //others variables
    let canvasArea = document.querySelector("#canvas-area");
    canvasArea.width = canvasWidth;
    canvasArea.height = canvasHeight;
    canvasArea.fillStyle = "#fff";


    let ctx = canvasArea.getContext("2d");
    
    let btnClear = document.querySelector("#efface");
    let btnSave = document.querySelector("#enregistre");
    let inputColor = document.querySelector("#color");
    let inputSize = document.querySelector("#taille");
    let picker = document.getElementsByClassName('clrPicker');
    let erase= document.querySelector("#gomme");
    let form = document.querySelector('#form_contact');
    let eCard = document.querySelector('.ecard');
    let closeECard = document.querySelector('.email-form__close');
    let main= document.querySelector("#opacity");
    let resetDataForm = document.querySelector('.email-form__reset');
   

  /**
   * function describing the behaviour of the canvas when the mouse is not active 
   */
    window.onmouseup = function () {
        isDrawing = false;
        ctx.beginPath();
    }


/**
 * function describing the behaviour of canvas when the mouse is active
 * @param {*} e 
 */
    canvasArea.onmousedown = function (e) {
        isDrawing = true;
    }
/**
 * function describing the behaviour of the canvas when the mouse is active and moving: Drawing lines
 * @param {*} e 
 */
canvasArea.onmousemove = function (e) {
        if (isDrawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.lineWidth = lineWidth * 2;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(e.offsetX, e.offsetY, lineWidth, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        }
}

const drawRect = (e) => {
    // if fillColor isn't checked draw a rect with border else draw rect with background
    if(!fillColor.checked) {
        // creating circle according to the mouse pointer
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath(); // creating new path to draw circle
    // getting radius for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
}

const drawTriangle = (e) => {
    ctx.beginPath(); // creating new path to draw circle
    ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
    ctx.closePath(); // closing path of a triangle so the third line draw automatically
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
}
//creation of a palette
    for (let index = 0; index < picker.length; index++) {

picker[index].style.backgroundColor = picker[index].dataset.color;   
  
//palette addEventListener
picker[index].addEventListener("click",(event)=> {
   ctx.fillStyle=picker[index].dataset.color; 
   ctx.strokeStyle=picker[index].dataset.color;  
})  
}

inputColor.onchange = function () {
    ctx.fillStyle = this.value;
    ctx.strokeStyle = this.value;
}

inputSize.onchange = function () {
    lineWidth = this.value;
}

//function onclick to clean the canvas area 
btnClear.onclick = function () {
    ctx.clearRect(0, 0, canvasArea.width, canvasArea.height);
    }



//erase addeventlistener
erase.addEventListener("click",()=>{ 
   ctx.fillStyle='#FFFFFF';
   ctx.strokeStyle='#FFFFFF';
  
})

//save pic canvas with button = link
    btnSave.onclick = function () {
        let img= canvasArea.toBlob(function (blob) {
            let link = document.createElement("a");
            link.download = "draw.png";
            link.href = URL.createObjectURL(blob);
            link.dispatchEvent(new MouseEvent('click'));
           
        }, 'image/png', 1); 

        let dataURL = canvasArea.toDataURL("image/png");
      
//save pic canvas in the localStorage
      window.localStorage;
     localStorage.setItem("eCard", dataURL);
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
/**
 * function to load img Canvas
 */
    function loadImgCanvas() {
        const dataURL = localStorage.getItem("eCard");
        const img = new Image();
    
        img.src = dataURL;
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        };
    }
    

 // open form to send eCard addEventListener
    eCard.addEventListener("click",()=>{
     form.style.display = "block";
     main.style.opacity = "0";
     let pic = document.querySelector("#pic") 
     pic.value=canvasArea.toDataURL("image/png");
     console.log(pic);
})

//close form after send mail addEventListener
closeECard.addEventListener("click", ()=> {
    form.style.display = "none";
    main.style.opacity = "100";
} )

}
window.onload = initialize;


// ********************************************************************************DOM const form 
const emailForm = document.querySelector('.email-form');

function removeAllMessageFromeForm(form){
    form.querySelectorAll('[class*="msg]').forEach(msg => {
        msg.remove();
    });
}


// resetDataForm.addEventListener("click", ()=> {
//     form.reset();
// } )



/**
 * Function for send a mail with ajax 
 * @param {*} e 
 */
emailForm.onsubmit = e =>{
    // Prevent page refresh
    e.preventDefault();
  
    //Dom 
    
    let nameInput = emailForm.querySelector('input[name="nom"]');
    let fromInput = emailForm.querySelector('input[name="from"]');
    let toInput=emailForm.querySelector('input[name="to"]');
    let subjetInput = emailForm.querySelector('input[name="subject"]');
    let messageInput = emailForm.querySelector('textarea[name="message"]');
    let picInput = emailForm.querySelector('input[name="pic"]');
    
    
    //Make POST  request
    fetch(emailForm.action, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        mode: 'same-origin',
        credentials: 'same-origin',
        body: JSON.stringify
({
    nom:nameInput.value,
    from: fromInput.value,
    to: toInput.value,
    subject : subjetInput.value,
    message: messageInput.value,
    pic: picInput.value,
})}).then(json=>json.json())
.then(res =>{
   
    if(res['to_err']){
        toInput.insertAdjacentHTML('beforebegin',`<p class="email-form__err-msg">${res['to_err']}</p>`);
    }
    if(res['from_err']){
        fromInput.insertAdjacentHTML('beforebegin',`<p class="email-form__err-msg">${res['from_err']}</p>`);
    }
    if(res['subject_err']){
        subjetInput.insertAdjacentHTML('beforebegin',`<p class="email-form__err-msg">${res['subject_err']}</p>`);
    }
    if(res['message_err']){
        messageInput.insertAdjacentHTML('beforebegin',`<p class="email-form__err-msg">${res['message_err']}</p>`);
    }
    if(res['top_err']){
       emailForm.insertAdjacentHTML('afterbegin', `<p class="email-form__top-msg email-form__top-msg--err">${res['top_err']}</p>`);
    }
    if(res['top_err'] || res['message_err'] || res['subject_err'] || res['to_err']) return;
    removeAllMessageFromeForm(emailForm);
    // if(res['top-success']){
        if(!(res['top_err'] || res['message_err'] || res['subject_err'] || res['to_err'])){
       emailForm.insertAdjacentHTML('afterbegin', `<p class="email-form__top-msg email-form__top-msg--success">${res['top_success']}</p>`);
       emailForm.reset();
       //reset datas form
       const erreur = document.querySelectorAll(".email-form__err-msg");
       for(let i = 0 ; i< erreur.length ; i++){
        erreur[i].classList.add('cache');
        // erreur[i].classList.remove('email-form__err-msg');
       }
    
    }
}) 
}
