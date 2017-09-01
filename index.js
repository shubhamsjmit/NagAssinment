var express=require("express");
var app=express();//initiate to get the functionality of the express

var bodyParser=require("body-parser");//middle wares

var fruitsDB=require("./database.js");

app.use("/",express.static(__dirname+"/public"));
app.use("/",bodyParser.urlencoded({extended:false}));

//to get all the fruits that are active ie we still have to buy
app.get("/api/todos",function (req,res) {
    res.json(fruitsDB.todos);
});
//to get the data  from the id ,from that data we will change the status of the list to delete
app.delete("/api/todos/:id",function (req,res) {
    var delID=req.params.id;
    var todoFruit=fruitsDB.todos[delID];
    if(!todoFruit){
        res.status(400).json({error:"Fruits to delete doesnot exist"});
    }
    else {
        todoFruit.status=fruitsDB.statusENUMS.DELETE;
        res.json(fruitsDB.todos)
    }
});
//To add new fruit in the fruit list
app.post("/api/todos",function (req,res) {
    var todoFruit=req.body.fruitName;
    if(!todoFruit || todoFruit=="" || todoFruit.trim()==""){
        res.status(400).json({error:"Fruit name cant be empty"});
    }
    else{
        var titletest=false;
        //for(var i=0;i<fruitsDB.length;)
        var newFruit={
            title : req.body.fruitName,
            status : fruitsDB.statusENUMS.ACTIVE
        }
        fruitsDB.todos[fruitsDB.next_fruit_id]=newFruit;
        fruitsDB.next_fruit_id=fruitsDB.next_fruit_id+1;
        res.json(fruitsDB.todos);
    }
});
//put is used to make the changes in the status of fruits list i.e. from active to either complete or delete
app.put("/api/todos/:id",function (req,res) {
    console.log("inside put");
    var modFruitId=req.params.id;
    var fruitObject=fruitsDB.todos[modFruitId];
    console.log("test 1:"+fruitObject);
    if(!fruitObject) {
        res.status(400).json({error: "Can't modify a todo that doesnt exist"});
    }
    else{
       /* var fruitname=req.body.fruitName;
        if(fruitname && fruitname!="" && fruitname.trim()!=""){
            fruitName1.title=fruitname;
        }*/
       console.log(req.body.fruitStatus);
        var fruitStatus1=req.body.fruitStatus;
        console.log("before if:"+fruitStatus1);
        if(fruitStatus1 && (fruitStatus1==fruitsDB.statusENUMS.COMPLETE||fruitStatus1==fruitsDB.statusENUMS.ACTIVE)){
            fruitObject.status=fruitStatus1;
            console.log("inside if:"+fruitObject.status);
        }
        res.json(fruitsDB.todos);
    }
});
//to make the server i.e. desktop to run at port no 4000 and at start of that executi the callback function
app.listen(4000,function () {
    console.log("Server is started !!!!");
});