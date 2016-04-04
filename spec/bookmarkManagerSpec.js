describe('BookmarkManager', function() {
  var shortLifeFolder = {
    "title": "Short Life Bookmarks"
  };
  var newBm = {
    parentId: '385',
    title: undefined,
    url: undefined,
    dateAdded: 1
  };
  var element = {
    target: {
      tagName: "A",
      offsetParent: {
        href: ""
      }
    }
  };

  beforeEach(function() {
    chrome = {
      bookmarks: {
        create: function() {},
        search: function() {},
        getChildren: function() {},
        remove: function() {}
      },
      tabs: {
        query: function() {},
        create: function() {}
      }
    };
    spyOn(chrome.bookmarks, 'remove');
    spyOn(chrome.bookmarks, 'create');
    spyOn(chrome.bookmarks, 'search');
    spyOn(chrome.bookmarks, 'getChildren').and.callFake(function() {
      BookmarkManager.prototype.bookmarks = {
        1: 2
      };
    });
    spyOn(chrome.tabs, 'query');
    spyOn(chrome.tabs, 'create');
  });

  describe('interactWithBookmark fn', function() {
    it('opens a bookmark in a new tab when clicked', function() {
      element.target.tagName = "A";
      myBookmarkManager.interactWithBookmark(element);
      expect(chrome.tabs.create).toHaveBeenCalledWith({
        url: undefined
      });
    });

    it('exits if the item is not a link', function() {
      element.target.tagName = "B";
      myBookmarkManager.interactWithBookmark(element);
      expect(chrome.tabs.create).not.toHaveBeenCalled();
    });
  });

});
