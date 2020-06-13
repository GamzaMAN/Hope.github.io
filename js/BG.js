const body = document.querySelector("body");

const MAX_IMG_NUM = 5;

function paintImage(imgNumber){
	const img = new Image();
	img.src = `./img/${imgNumber}.jpg`;
	img.classList.add("bgImg");
	body.prepend(img);
}


function getRandom(){
	return parseInt(Math.random() * MAX_IMG_NUM + 1, 10);
}

function init(){
	paintImage(getRandom());
}

init(); 