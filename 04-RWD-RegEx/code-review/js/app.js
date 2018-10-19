'use strict';

$(() => {
  const _allImages = [];

  const Image = function(img){
    Object.assign(this, img);
    _allImages.push(this);
  }

  Image.prototype.render = function() {
    let imageTemplate = Handlebars.compile($('#img-template').html());
    let newImg = imageTemplate(this);
    $('.deck').append(newImg);
  }

  function loadImages () { // eventually this function pulls from remote
    let images = [{
      'image_url': 'http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg',
      'title': 'uniWhal',
      'description': 'A unicorn and a narwhal nuzzling their horns',
      'keyword': 'narwhal',
      'horns': 1
    },
    {
      'image_url': 'https://images.unsplash.com/photo-1512636618879-bbe79107e9e3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd9460ee6d1ddbb6b1ca7be86dfc4590&auto=format&fit=crop&w=1825&q=80',
      'title': 'Rhino Family',
      'description': 'Mother (or father) rhino with two babies',
      'keyword': 'narwhal',
      'horns': 2
    },
    {
      'image_url': 'https://www.dhresource.com/0x0s/f2-albu-g5-M00-1A-11-rBVaI1hsIIiALxKzAAIHjSU3VkE490.jpg/wholesale-halloween-costume-prop-unicorn.jpg',
      'title': 'A Unicorn Head',
      'description': 'Someone wearing a creepy unicorn head mask',
      'keyword': 'unicorn',
      'horns': 1
    },
    {
      'image_url': 'https://images.unsplash.com/photo-1518946222227-364f22132616?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4836a6fca62e7dce9324346bacfde085&auto=format&fit=crop&w=2534&q=80',
      'title': 'Bee a UniLego',
      'description': 'Lego figurine dressed in a unicorn outfit',
      'keyword': 'unilego',
      'horns': 3
    }];

    images.forEach(img => {
      new Image(img);
    })
  }

  function clearImageContainer() {
    $('.deck').html('');
  }


  function renderImages(){ //DONE:needs to use handlebars
    clearImageContainer();
    _allImages.forEach(img => {
      img.render();
    })
  }

  function sortImages () {
    let sortType = $(this).data('sortby');

    _allImages.sort((a,b) => {
      let flag = 0;
      if(a[sortType] > b[sortType]){
        flag = 1;
      } else if( a[sortType] < b[sortType]){
        flag = -1;
      }
      return flag
    })
    renderImages();
  }

  function registerListeners() {
    $('form').on('change', 'input', sortImages);
  }

  // Render a bunch of images
  // pagination

  //filter images by a keyword

  //sort the images by some data

  //detail view

  function initialize() {
    loadImages();
    renderImages();
    registerListeners();
  }

  initialize();

})


