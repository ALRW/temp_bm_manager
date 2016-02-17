var shortLifeFolder = {"title": "Short Life Bookmarks"};

document.addEventListener('DOMContentLoaded', function(){
  var Manager = new BookmarkManager();
  Manager.initialise();
  document.getElementById('add').addEventListener('click', function(){
    Manager.createBookmark('Hello', 'http://www.hello.com');
  });
});
