function BookmarkManager() {
}

BookmarkManager.prototype = {

  initialise: function() {
    this.isShortLifeFolder();
    this.setParentId();
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

  setParentId: function(){
    chrome.bookmarks.getChildren('2', function(result){
      result.forEach(function(object){
        if(object.title === 'Short Life Bookmarks'){
          BookmarkManager.prototype.newBookmark.parentId = object.id;
        }
      });
    });
  },

  createBookmark: function(){
    chrome.tabs.query({currentWindow: true, active : true}, function(tabArray){
      BookmarkManager.prototype.newBookmark.title = tabArray[0].title;
      BookmarkManager.prototype.newBookmark.url = tabArray[0].url;
      chrome.bookmarks.create(BookmarkManager.prototype.newBookmark);
    });
  },
};

BookmarkManager.prototype.newBookmark = {
  parentId: '',
  title: 'default',
  url: 'http://default.com'
};
