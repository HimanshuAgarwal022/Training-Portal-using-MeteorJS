Router.configure({
   layoutTemplate: 'layout'  //can be any template name
 });

Router.map(function () {
  this.route('home', {
    path: '/',
  });
  this.route('about');
  this.route('sop');
  this.route('relay');
  this.route('contactor');
  this.route('articles', {
    // articles now under `articleList` instead of `this`
    data: {
      articleList: function () {return Articles.find()},
      selectedArticle: {}
    }
  });
  this.route('article', {
    path: '/article/:_id',
    // provide data for both `articleList` and `selectedArticle`
    data: function () {
      return {
        articleList: Articles.find(),
        selectedArticle: Articles.findOne({_id: this.params._id})
      }
    },
    template: 'articles'  //change template target
  });
});

Articles = new Meteor.Collection('articles');

Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_EMAIL"
});

Accounts.config({ passwordResetTokenExpirationInDays: 7 });
Accounts.config({ forbidClientAccountCreation: true });


import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './layout.html';


  Template.nav.events({
    'click #button': function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    }
  });

Template.sidenav.helpers({
    'abc': function(){ return " Products "; }
});
Template.sidenav.events({
    'click button': function() {
    	document.getElementById("myDropdown").classList.toggle("show");
        // put your action here
        //console.log("button was clicked");
    }
});


if (Meteor.isServer) {
  Meteor.startup(function () 
  {
    if (! Articles.findOne())
    {
      var articles = [
        {title: 'Article 1', body: 'This is article 1'},
        {title: 'Article 2', body: 'This is article 2'},
        {title: 'Article 3', body: 'This is article 3'}
      ];
      articles.forEach(function (article) 
      {
        Articles.insert(article);
      })
    }
  });

}

if (Meteor.isClient) 
{
  Template.home.helpers({username:function(){
    if (Meteor.user()){
      return "Welcome user: " +Meteor.user().username;
      //return Meteor.user().emails[0].address;
    }
    else{
      return "Please Login";
    }
  }})


  Template.navItems.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
  });
  Template.articles.helpers({
    maybeSelected: function () {
      var currentRoute = Router.current();
      return currentRoute &&
        this._id === currentRoute.params._id ? 'selected' : '';
    }
  });

   var img_data1 = [
  {
       img_src:"ORimage1.jpg",
       img_alt:"img"

       },

  { img_src:"ORimage2.jpg",
    img_alt:"img"

  },
   {
       img_src:"ORimage3.jpg",
       img_alt:"img"

       },

  { img_src:"ORimage4.jpg",
    img_alt:"img"

  },

{
       img_src:"ORimage5.jpg",
       img_alt:"img"

       },

  { img_src:"ORimage6.jpg",
    img_alt:"img"

  },



];
  Template.ORimages.helpers({
    ORimages:function()
    {
    if (Meteor.user()){
      return img_data1
    }
    else{
      return "Please Login";
    }
  }});

var img_data2 = [
  {
       img_src:"CR1.jpg",
       img_alt:"img"

       },

  { img_src:"CR2.jpg",
    img_alt:"img"

  },
   {
       img_src:"CR3.jpg",
       img_alt:"img"

       },

  { img_src:"CR4.jpg",
    img_alt:"img"

  },

{
       img_src:"CR5.jpg",
       img_alt:"img"

       },

  { img_src:"CR6.jpg",
    img_alt:"img"

  },
 { img_src:"CR7.jpg",
    img_alt:"img"

  },
 { img_src:"CR8.jpg",
    img_alt:"img"

  },

];
  Template.CRimages.helpers({
    CRimages:function()
    {
    if (Meteor.user()){
      return img_data2
    }
    else{
      return "Please Login";
    }
  }});


}
