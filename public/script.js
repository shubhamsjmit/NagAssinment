console.log("Is the script file loading");
const RESPONSE_DONE=4;
const STATUS_OK=200;
const FRUITS_LIST_ID="new_list_div";
const NEW_FRUITS_LIST_ID="new_fruit_input";

//execute the function at the start of the webpage
window.onload=getFruitAJAX();

//this is used to get the list of all the fruits when page loads or there are changes during
// the exicution of the webpage
function getFruitAJAX() {
    var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==RESPONSE_DONE){
            if(xhr.status==STATUS_OK){
                console.log(xhr.responseText);
                addFruitElements(FRUITS_LIST_ID,xhr.responseText);
            }
        }
    }//end of callback
    xhr.send(data=null);
}

function addFruitElements(id,fruits_data_json)
{
    var fruits=JSON.parse(fruits_data_json);
    var parentDiv=document.getElementById(id);
    parentDiv.innerHTML="";
    if(parentDiv){
        Object.keys(fruits).forEach(function (key) {
            var fruitElement=createFruitElement(key,fruits[key]);
            parentDiv.appendChild(fruitElement);
        });
    }
}

function createFruitElement(id,fruitObject) {
    var fruitElement=document.createElement("div");
    fruitElement.innerText=fruitObject.title;
    fruitElement.setAttribute("data-id",id);
    fruitElement.setAttribute("class","todoStatus"+fruitObject.status);

    if(fruitObject.status!="DELETED"){

    }
    if(fruitObject.status=="ACTIVE"){
        var CompleteButton=document.createElement("button");
        completeButton.innerText="Mark as complete";
        completeButton.setAttribute("onclick","completeFruitAJAX("+id+")");
        fruitElement.appendChild(completeButton);
    }
    return fruitElement;
}

function addFruitAjax(){
    var title=document.getElementById(NEW_FRUITS_LIST_ID).value;
    var xhr=new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="fruitName="+encodeURI(title);
    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addFruitElements(FRUITS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function CompleteFruitsAJAX(){
    var xhr=new XMLHttpRequest();
    xhr.open("PUT","/api/todos/:id",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    data="fruitStatus=COMPLETE";
    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addFruitElements(TODOS_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}