var myBookmarkManager = (function() {

  var shortLifeFolder = {
    "title": "Short Life Bookmarks"
  };
  var shortLifeFolderId;
  var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  var shortLifeBookmarks = [];
  var newBookmark;

  function publicInitialize() {
    privateSetFolderId()
      .then(function() {
        privateGetBookmarks()
          .then(function() {
            privateRemoveBookmarks();
            privateShowBookmarks();
          });
      });
  }

  function publicOpenBookmark(element) {
    if (element.target.tagName !== 'A') {
      return;
    }
    chrome.tabs.create({
      url: element.target.href
    });
  }

  function publicCreateBookmark() {
    privateBuildNewBookmark()
    .then(function(){
      shortLifeBookmarks.push(newBookmark);
      chrome.bookmarks.create(newBookmark);
    });
  }

  function privateBuildNewBookmark (){
    return new Promise(function(resolve){
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, function(tabArray){
        newBookmark = {
            parentId: shortLifeFolderId,
            title: tabArray[0].title,
            url: tabArray[0].url
        };
        resolve();
      });
    });
  }

  function privateSetFolderId() {
    return new Promise(function(resolve) {
      chrome.bookmarks.search(shortLifeFolder, function(result) {
        if (result[0]) {
          shortLifeFolderId = result[0].id;
          resolve();
        } else {
          chrome.bookmarks.create(shortLifeFolder, function(response) {
            shortLifeFolderId = response.id;
            resolve();
          });
        }
      });
    });
  }

  function privateGetBookmarks() {
    return new Promise(function(resolve) {
      chrome.bookmarks.getChildren(shortLifeFolderId, function(bookmarks) {
        if (bookmarks) {
          shortLifeBookmarks = bookmarks;
          resolve();
        } else {
          resolve();
        }
      });
    });
  }

  function privateRemoveBookmarks() {
    if (!shortLifeBookmarks[0]) {
      return;
    }
    shortLifeBookmarks.forEach(function(bookmark) {
      if (privateIsRemovable(bookmark)) {
        var index = shortLifeBookmarks.indexOf(bookmark);
        shortLifeBookmarks.splice(index, 1);
        chrome.bookmarks.remove(bookmark.id);
      }
    });
  }

  function privateIsRemovable(bookmark) {
    if (Date.now() - bookmark.dateAdded > weekInMilliseconds) {
      return true;
    }
    return false;
  }

  function privateShowBookmarks() {
    if (!shortLifeBookmarks[0]) {
      return;
    }
    var list = $('ul.list-group');
    for (var i = 0; i < shortLifeBookmarks.length; i++) {
      $item = $('<a href="' + shortLifeBookmarks[i].url + '" class="list-group-item">' + shortLifeBookmarks[i].title + '</a>');
      list.append($item);
    }
  }

  return {
    initialize: publicInitialize,
    createBookmark: publicCreateBookmark,
    openBookmark: publicOpenBookmark
  };

})();
