describe('popup script', function() {
var bmm = new BookmarkManager();
var shortLifeFolder = {"title": "Short Life Bookmarks"};
var newBm = { parentId: '385', title: undefined, url: undefined };

  beforeEach(function() {
    chrome = {
      bookmarks: {
        create: function() {},
        search: function() {}
      }
    };
    spyOn(chrome.bookmarks, 'create');
    spyOn(chrome.bookmarks, 'search');
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
      expect(chrome.bookmarks.create).toHaveBeenCalledWith(newBm);
    });
  });
});
