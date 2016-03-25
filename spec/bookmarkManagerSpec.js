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
      tagName: "A"
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

  describe('initialize fn', function() {
    it('runs a list of promises is series', function(done) {
      function fn1(){return Promise.resolve(1);}
      function fn2(res){return res + 1;}
      var fnlist = [fn1, fn2];
      myBookmarkManager.initialize(fnlist)
      .then(function(result){
        expect(result).toEqual(2);
        done();
      });
    });
  });

  describe('openBookmark fn', function() {
    it('opens a bookmark in a new tab when clicked', function() {
      element.target.tagName = "A";
      myBookmarkManager.openBookmark(element);
      expect(chrome.tabs.create).toHaveBeenCalledWith({
        url: undefined
      });
    });

    it('exits if the item is not a link', function() {
      element.target.tagName = "B";
      myBookmarkManager.openBookmark(element);
      expect(chrome.tabs.create).not.toHaveBeenCalled();
    });
  });

});
