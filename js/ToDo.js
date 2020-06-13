const toDoTag = document.querySelector("#js-toDo"),
	toDoForm = document.querySelector("#js-toDo-form"),
	toDoInput = toDoForm.querySelector("input"),
	pendingTitle = toDoTag.querySelector("#js-pending-title"),
	pendingList = toDoTag.querySelector("#js-pending-list"),
	finishedTitle = toDoTag.querySelector("#js-finish-title"),
	finishList = toDoTag.querySelector("#js-finish-list");

const PENDINGS_LS = "pendingList";
const FINISHED_LS = "finishList";

let pendingObj = {
	LS_KEY: PENDINGS_LS,
	objList: [],
	count: 0,
	tag: pendingList,
	delEmoji: "❌",
	checkEmoji: "✔️"
};

let finishObj = {
	LS_KEY: FINISHED_LS, 
	objList: [],
	count: 0,
	tag: finishList,
	delEmoji: "❌",
	checkEmoji: "✅"
};

function toDoFormSubmitHandler(event){
	event.preventDefault();
	const toDoText = toDoInput.value;

	makeToDo(toDoText, pendingObj);

	toDoInput.value = "";
}

function delBtnClickHandler(event){
	const toDo = event.target.parentNode;
	const list = toDo.parentNode;

	list.removeChild(toDo);
	deleteObj(parseInt(toDo.id,10), list);
}

function checkBtnClickHandler(event){
	const toDo = event.target.parentNode;
	const listFrom = toDo.parentNode;
	let listTo;

	if (listFrom === pendingList){
		listTo = finishList;
	}else if (listFrom === finishList){
		listTo = pendingList;
	}

	moveToDo(toDo,listFrom, listTo);
}

function moveToDo(toDo, listFrom, listTo){
	let listFromObj = getObj(listFrom);
	let listToObj = getObj(listTo);

	const id = parseInt(toDo.id, 10);

	const text = listFromObj.objList.filter(function(obj){
		return obj.id === id;
	})[0].text;

	deleteObj(id, listFromObj.tag);

	listFrom.removeChild(toDo);

	makeToDo(text, listToObj);
}

function makeToDo(text, listObj){
	const li = document.createElement("li");
	const toDoText = document.createElement("span");
	const delBtn = document.createElement("button");
	const checkBtn = document.createElement("button");

	toDoText.innerText = text;
	delBtn.innerText = listObj.delEmoji;
	checkBtn.innerText = listObj.checkEmoji;

	delBtn.addEventListener("click", delBtnClickHandler);
	checkBtn.addEventListener("click", checkBtnClickHandler);

	li.appendChild(toDoText);
	li.appendChild(delBtn);
	li.appendChild(checkBtn);

	listObj.tag.appendChild(li);
	const id = createObj(text, listObj.tag);
	li.id = id;
}

function getObj(tag){
	let listObj;

	if(tag === pendingList){
		listObj = pendingObj;
	}else if(tag === finishList){
		listObj = finishObj;
	}

	return listObj;
}

function createObj(text, tag){
	let listObj = getObj(tag);

	const id = listObj.count+1;

	listObj.objList.push({id, text});
	listObj.count += 1;

	storeLocalStorage(listObj.LS_KEY, JSON.stringify(listObj.objList));

	return id;
}

function deleteObj(id, tag){
	let listObj = getObj(tag);
	
	listObj.objList = listObj.objList.filter(function(obj){
		return obj.id !== id;
	});

	storeLocalStorage(listObj.LS_KEY, JSON.stringify(listObj.objList));
}

function storeLocalStorage(key, value){
	localStorage.setItem(key, value);
}

function loadLocalStorage(){
	const loadedPendingList = localStorage.getItem(PENDINGS_LS);
	const loadedFinishList = localStorage.getItem(FINISHED_LS);

	if(loadedPendingList !== null){
		const parsedPendingList = JSON.parse(loadedPendingList);

		parsedPendingList.forEach(function(obj){
			makeToDo(obj.text, pendingObj);
		});
	}

	if(loadedFinishList !== null){
		const parsedFinishList = JSON.parse(loadedFinishList);

		parsedFinishList.forEach(function(obj){
			makeToDo(obj.text, finishObj);
		});
	}

}


function init(){
	loadLocalStorage();
	toDoForm.addEventListener("submit", toDoFormSubmitHandler);
}

init();