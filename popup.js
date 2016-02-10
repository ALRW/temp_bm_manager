var shortLifeFolder = {"title": "Short Life Bookmarks"};
function initialise(){
  isShortLifeFolder();
}

var isShortLifeFolder = function(){
  chrome.bookmarks.search(shortLifeFolder, function(result){
    if(result[0]){
      console.log("There is already a folder");
    } else {
      createShortLifeFolder();
    }
  });
};

var createShortLifeFolder = function(){
  chrome.bookmarks.create(shortLifeFolder, function(){
    console.log("added Short Life Bookmarks Folder");
  });
};

document.addEventListener('DOMContentLoaded', function(){
  initialise();
});
