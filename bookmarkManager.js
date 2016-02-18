function BookmarkManager() {
}

var dayInMilliseconds = 86400000;

BookmarkManager.prototype = {

  initialise: function() {
    this.isShortLifeFolder();
    this.setParentId();
  },
  createShortLifeFolder: function() {
    chrome.bookmarks.create(this.shortLifeFolder, function() {
      console.log("added Short Life Bookmarks Folder");
    });
  },

  isShortLifeFolder: function() {
    chrome.bookmarks.search(this.shortLifeFolder, function(result) {
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
          BookmarkManager.prototype.getBookmarks();
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

  getBookmarks: function(){
    var parentID = BookmarkManager.prototype.newBookmark.parentId.toString();
    chrome.bookmarks.getChildren(parentID, function(bookmarks){
      console.log(bookmarks);
      BookmarkManager.prototype.bookmarks = bookmarks;
      BookmarkManager.prototype.showBookmarks();
    });
  },

  showBookmarks: function(){
    var list = $('ul.list-group');
    for (var i = 0; i < Manager.bookmarks.length; i++){
      $item = $('<a href="' + Manager.bookmarks[i].url + '" class="list-group-item">' + Manager.bookmarks[i].title + '</a>');
      list.append($item);
    }
  },

  openBookmark: function(element){
    if (element.target.tagName !== 'A') {
      return;
    }
    chrome.tabs.create({
      url: element.target.href
    });
  },

  removeBookmarks: function(){
    new Promise(function(resolve, reject){
      var parentID = BookmarkManager.prototype.newBookmark.parentId.toString();
      chrome.bookmarks.getChildren(parentID, function(shortLifeFolderBookmarks){
        resolve(shortLifeFolderBookmarks);
      });
  }).then(function(shortLifeFolderBookmarks){
    console.log(shortLifeFolderBookmarks);
    shortLifeFolderBookmarks.forEach(function(bookmark){
      if(Date.now() - bookmark.dateAdded > dayInMilliseconds){
        console.log("removing" + bookmark.title);
        chrome.bookmarks.remove(bookmark.id);
      }
    });
  });
}
};

BookmarkManager.prototype.newBookmark = {
  parentId: '',
  title: 'default',
  url: 'http://default.com'
};

BookmarkManager.prototype.shortLifeFolder = {"title": "Short Life Bookmarks"};

// BookmarkManager.prototype.bookmarks = [];
