import { Mongo } from 'meteor/mongo';
Todos = new Mongo.Collection('todos');
if(Meteor.isClient){

//heleper
Template.main.helpers({

todos:function(){

return Todos.find
    (
	{},{sort:{CreatedAt:-1}}
	);

}


});
Template.main.events({

"submit .new-todo":function(event){

var text = event.target.text.value;

Todos.insert({
Text:text,CreatedAt:new Date(),userId:Meteor.userId(),username:Meteor.user().username
});


event.target.text.value='';
//stopping the form for submiiting
return false;
},
"click .toggle-checked":function(){
    

	Todos.update(this._id,{$set:{checked:!this.checked}});
    var a = this._id;
    console.log("This is id"+a);

},
"click .delete-todo":function(){
	if(confirm('Are You sure')){
Todos.remove(this._id);


	}

}



});

Accounts.ui.config({

	passwordSignupFields:"USERNAME_ONLY"
});

}



if(Meteor.isServer){


}