describe('BookmarkManager', function() {
var bmm = new BookmarkManager();
var shortLifeFolder = {"title": "Short Life Bookmarks"};
var newBm = { parentId: '385', title: undefined, url: undefined };
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
        getChildren: function(){}
      },
      tabs: {
        query: function(){},
        create: function(){}
      }
    };
    spyOn(chrome.bookmarks, 'create');
    spyOn(chrome.bookmarks, 'search');
    spyOn(chrome.bookmarks, 'getChildren').and.callFake(function(){
      BookmarkManager.prototype.bookmarks = {1:2};
    });
    spyOn(chrome.tabs, 'query');

  });

  describe('#isShortLifeFolder', function() {
    it('checks whether there is a short-life folder', function() {
      bmm.isShortLifeFolder().then(function(){
      
      });
    });
  });

  describe('#createShortLifeFolder', function() {
    it('creates a Short life Bookmark folder', function() {
      bmm.createShortLifeFolder();
      expect(chrome.bookmarks.create).toHaveBeenCalledWith(shortLifeFolder, jasmine.any(Function));
    });
  });

  describe('#createBookmark', function(){
    it('creates a new short-life bookmark', function(){
      bmm.createBookmark();
      expect(chrome.tabs.query).toHaveBeenCalledWith({currentWindow: true, active : true}, jasmine.any(Function));
    });
  });

  describe('#setParentId', function(){
    it('ensures that new bookmarks are added to the correct folder', function(){
      bmm.setParentId();
      expect(chrome.bookmarks.getChildren).toHaveBeenCalledWith('2', jasmine.any(Function));
    });
  });

  describe('#getBookmarks', function(){
    it('gets all the bookmarks in the shortLifeFolder', function(){
      bmm.getBookmarks();
      expect(bmm.bookmarks).toEqual({1:2});
    });
  });

  describe('#openBookmark', function(){
    it('exits if the item is not a link', function(){
      spyOn(chrome.tabs, 'create');
      element.target.tagName = "B";
      bmm.openBookmark(element);
      expect(chrome.tabs.create).not.toHaveBeenCalled();
    });

  });

});
