const imageInput = document.getElementById("image-input");
const topText = document.getElementById("topTextInput");
const bottomText = document.getElementById("bottomTextInput");
const canvas = document.getElementById("meme");

let image;

if(imageInput){
   
    imageInput.addEventListener('change', () => {
        const imageDataUrl = URL.createObjectURL(imageInput.files[0]);
        image = new Image();
        image.src = imageDataUrl;
        image.addEventListener("load", () =>{
            updateMemeCanvas(canvas, image, topText.value, bottomText.value);
        }, {once:true});
    });
}

topText.addEventListener('change', () => {
    updateMemeCanvas(canvas, image, topText.value, bottomText.value);
});

bottomText.addEventListener('change', () => {
    updateMemeCanvas(canvas, image, topText.value, bottomText.value);
});

function updateMemeCanvas(canvas, image, topText, bottomText){
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width/10);
    const yOffset = 48 + height/25;

    //Update canvas background

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);


    //Prepare text
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize/4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px Merriweather`;

    //Add top text
    ctx.textBaseLine = "top";
    ctx.strokeText(topText, width/2, yOffset);
    ctx.fillText(topText, width/2, yOffset);
    //Add bottom text
    ctx.textBaseLine = "bottom";
    ctx.strokeText(bottomText, width/2, height - yOffset);
    ctx.fillText(bottomText, width/2, height - yOffset);
}