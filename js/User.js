const user = document.querySelector("#js-user"),
	userForm = user.querySelector("#js-user-form"),
	userInput = userForm.querySelector("input"),
	userName = user.querySelector("h1");

const USER_LS = "userName";

function userFormSubmitHandler(event){
	event.preventDefault();

	const name = userInput.value;
	userName.innerText = `${name}'s To Do List`;

	hideTag(userForm);
	showTag(userName);

	storeLS(USER_LS, name);
}

function showTag(tag){
	tag.classList.remove("hideTag");
	tag.classList.add("showTag");
}
 
function hideTag(tag){
	tag.classList.remove("showTag");
	tag.classList.add("hideTag");
}

function storeLS(key, value){
	localStorage.setItem(key, value);
}

function loadLS(key){
	const loadedUserName = localStorage.getItem(key);

	if (loadedUserName !== null){
		hideTag(userForm);
		showTag(userName);
		userName.innerText = `${loadedUserName}'s To Do List`;
	}else{
		showTag(userForm);
		hideTag(userName);
	}
}

function init(){
	loadLS(USER_LS);
	userForm.addEventListener("submit", userFormSubmitHandler);
}

init();