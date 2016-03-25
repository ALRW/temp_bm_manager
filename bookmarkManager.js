var myBookmarkManager = (function() {

  var shortLifeFolder = {
    "title": "Short Life Bookmarks"
  };
  var shortLifeFolderId;
  var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  var shortLifeBookmarks = [];
  var newBookmark;
  var fnList = [privateSetFolderId, privateGetBookmarks, privateRemoveBookmarks, privateShowBookmarks];

  function publicInitialize(list){
    var p = Promise.resolve();
    return list.reduce(function(pacc, fn){
      return pacc = pacc.then(fn);
    }, p)
    .catch(function(error){
      console.log(error);
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
      .then(function() {
        chrome.bookmarks.create(newBookmark, function(result){
          shortLifeBookmarks.push(result);
          $item = $('<a href="' + result.url + '" class="list-group-item">' + result.title + '</a>');
          $('ul.list-group').append($item);
        });
      });
  }

  function privateBuildNewBookmark() {
    return new Promise(function(resolve) {
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, function(tabArray) {
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
    fnList: fnList,
    initialize: publicInitialize,
    createBookmark: publicCreateBookmark,
    openBookmark: publicOpenBookmark
  };

})();
