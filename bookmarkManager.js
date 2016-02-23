function BookmarkManager() {
}

var dayInMilliseconds = 86400000;

BookmarkManager.prototype = {

  initialise: function() {
    BookmarkManager.prototype.isShortLifeFolder().then(function(result){
      if(result){
        BookmarkManager.prototype.setParentId();
      } else {
        BookmarkManager.prototype.createShortLifeFolder();
        }
      });
  },
  createShortLifeFolder: function() {
    return new Promise(function(resolve){
      chrome.bookmarks.create(BookmarkManager.prototype.shortLifeFolder, function(response) {
        BookmarkManager.prototype.newBookmark.parentId = response.id;
        resolve("Success");
      });
    });
  },

  isShortLifeFolder: function() {
    return new Promise(function(resolve){
      chrome.bookmarks.search(BookmarkManager.prototype.shortLifeFolder, function(result) {
        if (result[0]) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },

  setParentId: function(){
    return new Promise(function(resolve){
    chrome.bookmarks.getChildren('2', function(result){
      result.forEach(function(node){
        if(node.title === 'Short Life Bookmarks'){
          BookmarkManager.prototype.newBookmark.parentId = node.id;
          resolve("Success");
        }
      });
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
    var parentId = BookmarkManager.prototype.newBookmark.parentId.toString();
    chrome.bookmarks.getChildren(parentId, function(bookmarks){
      console.log(bookmarks);
      BookmarkManager.prototype.bookmarks = bookmarks;
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
