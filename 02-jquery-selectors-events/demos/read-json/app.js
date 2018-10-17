'use strict';

//Constructor
function Dog(dogObject){
  this.name = dogObject.name;
  this.image_url = dogObject.image_url;
  this.hobbies = dogObject.hobbies;

  allDogs.push(this);
}

const allDogs = [];

Dog.prototype.render = function () {
  $('main').append('<div class="clone"></div>');
  let $dogContainer = $('div[class="clone"]')
  console.log($dogContainer);
  //Give dog Container content

  //grabs the inner html of that section
  let $clonedDog = $('#dog-template').html(); //grabs html inside

  $dogContainer.html($clonedDog);

  $dogContainer.find('h2').text(this.name);
  $dogContainer.find('img').attr('src', this.image_url);
  $dogContainer.find('p').text(this.hobbies);

  $dogContainer.attr('class', '');
};

let readJSON = function(){
  $.getJSON('./data.json', data => {
    data.forEach(balloon => {

      new Dog(balloon);

    })
  }).then(renderAllDogs)
}

// $.getJSON('./data.json', console.log);

function renderAllDogs () {
    allDogs.forEach(dog => {
      dog.render();
    })
}

readJSON();