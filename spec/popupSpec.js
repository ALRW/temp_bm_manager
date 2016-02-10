describe('popup script', function() {
var bmm = new BookmarkManager();

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

  describe('#initialise', function() {


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
});
