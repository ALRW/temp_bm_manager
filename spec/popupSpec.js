describe('popup script', function() {
var bmm = new BookmarkManager();
var shortLifeFolder = {"title": "Short Life Bookmarks"};
var newBm = { parentId: '385', title: undefined, url: undefined };

  beforeEach(function() {
    chrome = {
      bookmarks: {
        create: function() {},
        search: function() {},
        getChildren: function(){}
      },
      tabs: {
        query: function(){},
      }
    };
    spyOn(chrome.bookmarks, 'create');
    spyOn(chrome.bookmarks, 'search');
    spyOn(chrome.bookmarks, 'getChildren');
    spyOn(chrome.tabs, 'query');

  });

  describe('#isShortLifeFolder', function() {
    it('checks whether there is a short-life folder', function() {
      bmm.isShortLifeFolder();
      expect(chrome.bookmarks.search).toHaveBeenCalledWith(shortLifeFolder, jasmine.any(Function));
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

});
