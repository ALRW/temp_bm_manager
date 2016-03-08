var myBookmarkManager = (function() {

    var shortLifeFolder = {
        "title": "Short Life Bookmarks"
    };
    var shortLifeFolderId; 
    var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    var shortLifeBookmarks = [];

    function privateIsShortLifeFolder() {
        return new Promise(function(resolve) {
            chrome.bookmarks.search(shortLifeFolder, function(result) {
                if (result[0]) {
                    shortLifeFolderId = result[0].id;
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    function privateCreateShortLifeFolder() {
        return new Promise(function(resolve) {
            chrome.bookmarks.create(shortLifeFolder, function(response) {
                shortLifeFolderId = response.id;
                resolve("Success");
            });
        });
    }

    function privateGetBookmarks() {
        return new Promise(function(resolve) {
            chrome.bookmarks.getChildren(shortLifeFolderId, function(bookmarks) {
                if (bookmarks) {
                    shortLifeBookmarks = bookmarks;
                    resolve(bookmarks);
                } else {
                  resolve("There are no Bookmarks");
                }
            });
        });
    }

    return {
        isShortLifeFolder: privateIsShortLifeFolder,
        createShortLifeFolder: privateCreateShortLifeFolder,
        getBookmarks: privateGetBookmarks
    };

})();







function BookmarkManager() {}


var otherBookmarksFolderId = '2';
var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

BookmarkManager.prototype = {

    initialise: function() {
        BookmarkManager.prototype.isShortLifeFolder().then(function(result) {
            if (result) {
                BookmarkManager.prototype.setParentId().then(function(result) {
                    if (result === "Success") {
                        BookmarkManager.prototype.getBookmarks().then(function(result) {
                            BookmarkManager.prototype.removeBookmarks(result).then(function(bookmarks) {
                                BookmarkManager.prototype.showBookmarks();
                            });
                        });
                    }
                });
            } else {
                BookmarkManager.prototype.createShortLifeFolder().then(function(result) {
                    if (result === "Success") {
                        console.log('Short Life Folder Created');
                    }
                });
            }
        });
    },

    // isShortLifeFolder: function() {
    //     return new Promise(function(resolve) {
    //         chrome.bookmarks.search(BookmarkManager.prototype.shortLifeFolder, function(result) {
    //             if (result[0]) {
    //                 resolve(true);
    //             } else {
    //                 resolve(false);
    //             }
    //         });
    //     });
    // },

    // createShortLifeFolder: function() {
    //     return new Promise(function(resolve) {
    //         chrome.bookmarks.create(BookmarkManager.prototype.shortLifeFolder, function(response) {
    //             BookmarkManager.prototype.newBookmark.parentId = response.id;
    //             resolve("Success");
    //         });
    //     });
    // },

    setParentId: function() {
        return new Promise(function(resolve) {
            chrome.bookmarks.getChildren(otherBookmarksFolderId, function(result) {
                result.forEach(function(node) {
                    if (node.title === 'Short Life Bookmarks') {
                        BookmarkManager.prototype.newBookmark.parentId = node.id;
                        resolve("Success");
                    }
                });
            });
        });
    },

    getBookmarks: function() {
        return new Promise(function(resolve) {
            var parentId = BookmarkManager.prototype.newBookmark.parentId.toString();
            chrome.bookmarks.getChildren(parentId, function(bookmarks) {
                if (bookmarks) {
                    BookmarkManager.prototype.bookmarks = bookmarks;
                    resolve(bookmarks);
                }
            });
        });
    },

    removeBookmarks: function(bookmarks) {
        return new Promise(function(response) {
            bookmarks.forEach(function(bookmark) {
                if (Date.now() - bookmark.dateAdded > weekInMilliseconds) {
                    console.log("removing" + bookmark.title);
                    chrome.bookmarks.remove(bookmark.id);
                }
            });
            BookmarkManager.prototype.getBookmarks().then(function(bookmarks) {
                response(bookmarks);
            });
        });
    },

    showBookmarks: function() {
        var list = $('ul.list-group');
        for (var i = 0; i < Manager.bookmarks.length; i++) {
            $item = $('<a href="' + Manager.bookmarks[i].url + '" class="list-group-item">' + Manager.bookmarks[i].title + '</a>');
            list.append($item);
        }
    },

    createBookmark: function() {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabArray) {
            BookmarkManager.prototype.newBookmark.title = tabArray[0].title;
            BookmarkManager.prototype.newBookmark.url = tabArray[0].url;
            chrome.bookmarks.create(BookmarkManager.prototype.newBookmark);
        });
    },

    openBookmark: function(element) {
        if (element.target.tagName !== 'A') {
            return;
        }
        chrome.tabs.create({
            url: element.target.href
        });
    },

};

BookmarkManager.prototype.newBookmark = {
    parentId: '',
    title: 'default',
    url: 'http://default.com'
};

BookmarkManager.prototype.shortLifeFolder = {
    "title": "Short Life Bookmarks"
};
