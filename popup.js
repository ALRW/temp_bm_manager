function initialise(){
  chrome.bookmarks.create({"title": "Short Life Bookmarks"}, function(){
    console.log("added Short Life Bookmarks Folder");
  });
}

document.addEventListener('DOMContentLoaded', function(){
  initialise();
});
