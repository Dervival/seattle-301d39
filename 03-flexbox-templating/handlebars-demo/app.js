'use strict';

//Constructor
function Dog(dogObject){
  this.name = dogObject.name;
  this.image_url = dogObject.image_url;
  this.hobbies = dogObject.hobbies;

  allDogs.push(this);
}

const allDogs = [];

Dog.prototype.renderJQ = function () {
  $('main').append('<div class="clone"></div>');
  let $dogContainer = $('div[class="clone"]')
  console.log($dogContainer);

  //grabs the inner html of that section
  let $clonedDog = $('#dog-template').html(); //grabs html inside

  $dogContainer.html($clonedDog);

  $dogContainer.find('h2').text(this.name);
  $dogContainer.find('img').attr('src', this.image_url);
  $dogContainer.find('p').text(this.hobbies);

  $dogContainer.attr('class', '');
};

Dog.prototype.renderHandlebars = function() {
  let dogSource = $('#dog-handlebars').html(); //we need the html
  let dogTemplate = Handlebars.compile(dogSource); // HB takes that html and builds a function with it that takes in an object with matching property names

  let dogHtml = dogTemplate(this);



  $('body').append(dogHtml);

  // $('body').append(Handlebars.compile($('#dog-handlebars').html())(this));
}

function renderAnyHandlebars(sourceId, data, target){
  let template = Handlebars.compile($(sourceId).html());
  let newHtml = template(data);
  $(target).append(newHtml);
}

function renderAllDogs () {
  allDogs.forEach(dog => {
    renderAnyHandlebars('#dog-handlebars', dog, '#dog-container')
  })
}

let readJSON = function(){
  $.getJSON('./dogs.json', data => {
    data.forEach(item => {
      new Dog(item);
    })
  }).then(renderAllDogs)
}

readJSON();
