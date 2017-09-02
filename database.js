//List of fruits to be used as a static database to be used in my project

var statusENUMS={
    COMPLETE:"COMPLETE",
    ACTIVE:"ACTIVE",
    DELETE:"DELETE"
};
var todos={
    1:{title:"Banana" ,status:statusENUMS.ACTIVE},
    2:{title:"Mango" ,status:statusENUMS.COMPLETE},
    3:{title:"Grapes",status:statusENUMS.ACTIVE},
    4:{title:"Guava",status:statusENUMS.ACTIVE},
    5:{title:"Pineapple",status:statusENUMS.ACTIVE},
    6:{title:"Orange",status:statusENUMS.ACTIVE},
    7:{title:"Peach",status:statusENUMS.ACTIVE},
    8:{title:"Cherry",status:statusENUMS.ACTIVE}
};
var next_fruit_id=9;
module.exports={
    statusENUMS:statusENUMS,
    todos:todos,
    next_fruit_id:next_fruit_id
};