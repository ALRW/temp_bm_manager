function BookmarkManager() {
}

BookmarkManager.prototype = {

  initialise: function() {
    this.isShortLifeFolder();
  },
  createShortLifeFolder: function() {
    chrome.bookmarks.create(shortLifeFolder, function() {
      console.log("added Short Life Bookmarks Folder");
    });
  },

  isShortLifeFolder: function() {
    chrome.bookmarks.search(shortLifeFolder, function(result) {
      if (result[0]) {
        console.log("There is already a folder");
      } else {
        BookmarkManager.prototype.createShortLifeFolder();
      }
    });
  },

  getParentID: function(){
    chrome.bookmarks.getChildren('2', function(result){
      result.forEach(function(object){
        if(object.title === 'Short Life Bookmarks'){

        }
      });
    });
  },

  createBookmark: function(title, url){
    chrome.bookmarks.create(newBookmark);
  }
};

BookmarkManager.prototype.newBookmark = {
  parentId: "411",
  title: title,
  url: url
};
