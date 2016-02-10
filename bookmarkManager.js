function BookmarkManager() {}

BookmarkManager.prototype = {

  initialise: function() {
    BookmarkManager.prototype.isShortLifeFolder();
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

};
