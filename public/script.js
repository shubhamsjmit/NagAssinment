console.log("Is the script file loading");
const RESPONSE_DONE=4;
const STATUS_OK=200;
const FRUITS_LIST_ID="fruit_list_div";
const NEW_FRUITS_LIST_ID="fruit_input_id";
const COMPLETE_FRUITS_DIVISION="CompletedFruits";
const DELETE_FRRUITS_DIVISION="DeletedFruits";
//execute the function at the start of the webpage
window.onload=getFruitAJAX();

//this is used to get the list of all the fruits when page loads or there are changes during
// the exicution of the webpage
/*function mainLoadFun(){
getFruitAJAX();
}*/

function getFruitAJAX() {
    var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==RESPONSE_DONE){
            if(xhr.status==STATUS_OK){
                console.log(xhr.responseText);
          //      console.log("1: point reached");
                if(FRUITS_LIST_ID=="fruit_list_div") {
                    addFruitElements(FRUITS_LIST_ID, xhr.responseText);
                }
                if(COMPLETE_FRUITS_DIVISION=="CompletedFruits"){
                    addFruitElements(COMPLETE_FRUITS_DIVISION, xhr.responseText);
                }
                if(DELETE_FRRUITS_DIVISION=="DeletedFruits"){
                    addFruitElements(DELETE_FRRUITS_DIVISION, xhr.responseText);
                }

            }
        }
    }//end of callback
    xhr.send(data=null);
}

function addFruitElements(id,fruits_data_json)
{
    var fruits=JSON.parse(fruits_data_json);
    var parentDiv=document.getElementById(id);
  //  console.log("2:point reached");
    parentDiv.innerHTML="";
    if(parentDiv){
    //    console.log("inside upper if");
        Object.keys(fruits).forEach(function (key) {
            if(fruits[key].status=="ACTIVE" && id=="fruit_list_div") {
      //          console.log("inside lower if");
                var fruitElement = createFruitElement(key, fruits[key]);
                parentDiv.appendChild(fruitElement);
        //        console.log("last of if");
            }
            if(fruits[key].status=="COMPLETE" && id=="CompletedFruits") {
                //          console.log("inside lower if");
                var fruitElement = createFruitElement(key, fruits[key]);
                parentDiv.appendChild(fruitElement);
                //        console.log("last of if");
            }
            if(fruits[key].status=="DELETE" && id=="DeletedFruits") {
                //          console.log("inside lower if");
                var fruitElement = createFruitElement(key, fruits[key]);
                parentDiv.appendChild(fruitElement);
                //        console.log("last of if");
            }
        });
    }
}

function createFruitElement(id,fruitObject) {
    var fruitElement=document.createElement("div");
    fruitElement.setAttribute("data-id",id);
    fruitElement.setAttribute("data-status",fruitObject.status);
    fruitElement.setAttribute("class","todoStatus"+fruitObject.status);
//console.log("3:point reached");
    var completeCheckbox;
    if(fruitObject.status=="ACTIVE"){
        console.log("4:point reached");
        completeCheckbox=document.createElement("input");
        //completeButton.innerText="Mark as complete";
        completeCheckbox.setAttribute("type","checkbox");
        completeCheckbox.setAttribute("onclick","completeFruitAJAX("+id+",'ACTIVE')");
        fruitElement.appendChild(completeCheckbox);
    }
    if(fruitObject.status=="COMPLETE"){
        console.log("4:point reached");
        completeCheckbox=document.createElement("input");
        //completeButton.innerText="Mark as complete";
        completeCheckbox.setAttribute("type","checkbox");
        completeCheckbox.setAttribute("checked",true);
        completeCheckbox.setAttribute("onclick","completeFruitAJAX("+id+",'COMPLETE')");
        fruitElement.appendChild(completeCheckbox);
    }
    var newContent = document.createTextNode(fruitObject.title);
    fruitElement.appendChild(newContent);

    if(fruitObject.status!="DELETE"){
        var completeButton=document.createElement("Button");
        completeButton.innerText = "Mark as Delete";
        completeButton.setAttribute("onclick","deleteFruitAJAX("+id+")");
        completeButton.setAttribute("class", "breathHorizontal");
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
function completeFruitAJAX(id,fruStatus){
    //var status="ACTIVE";
   // var status1="COMPLETE";
    console.log("complete function called")
    var xhr=new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data;
    console.log("crossed data");
   if(fruStatus=="ACTIVE") {
       console.log("ACTIVE :"+xhr.responseText);
        data = "fruitStatus=COMPLETE";
        }
        if(fruStatus=="COMPLETE") {
            console.log("COMPLETE :"+xhr.responseText);
            data = "fruitStatus=ACTIVE";
        }
    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                //  mainLoadFun();
                  addFruitElements(FRUITS_LIST_ID, xhr.responseText);
                  addFruitElements(COMPLETE_FRUITS_DIVISION, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function deleteFruitAJAX(id){
    var xhr=new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="fruitStatus=DELETE";
    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                //  mainLoadFun();
                addFruitElements(FRUITS_LIST_ID, xhr.responseText);
                console.log(xhr.responseText);
                addFruitElements(DELETE_FRRUITS_DIVISION, xhr.responseText);
                addFruitElements(COMPLETE_FRUITS_DIVISION, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
var hc=document.getElementById("hidecomplete");
var hd=document.getElementById("hidedelete");
var sc=document.getElementById("showcomplete");
var sd=document.getElementById("showdelete")
hc.onclick=function () {
    var cla=document.getElementsByClassName("hidecompfruit");
    for(var i=0;i<cla.length;i++)
    {
        cla[i].style.display='none';
    }

    var scf=document.getElementsByClassName("showcompfruit");

    for(var i=0;i<scf.length;i++)
    {
        scf[i].style.display='inline';
    }
}
hd.onclick=function () {
    var cla=document.getElementsByClassName("hidedelfruit");
    for(var i=0;i<cla.length;i++)
    {
        cla[i].style.display='none';
    }
    var sdf=document.getElementsByClassName("showdelfruit");
    for(var i=0;i<sdf.length;i++)
    {
        sdf[i].style.display='inline';
    }
}
sc.onclick=function () {
    var cla=document.getElementsByClassName("hidecompfruit");
    for(var i=0;i<cla.length;i++)
    {
        cla[i].style.display='inline';
    }
    var scf=document.getElementsByClassName("showcompfruit");
    for(var i=0;i<scf.length;i++)
    {
        scf[i].style.display='none';
    }
}
sd.onclick=function () {
    var cla=document.getElementsByClassName("hidedelfruit");
    for(var i=0;i<cla.length;i++)
    {
        cla[i].style.display='inline';
    }
    var sdf=document.getElementsByClassName("showdelfruit");
    for(var i=0;i<sdf.length;i++)
    {
        sdf[i].style.display='none';
    }
}