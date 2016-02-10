describe('popup script', function() {

beforeEach(function(){
chrome = {
  bookmarks: {
    create: function(){},
    search: function(){}
  }
};
spyOn(chrome.bookmarks, 'create');
spyOn(chrome.bookmarks, 'search');
});

  describe('#initialise', function() {


  });
  describe('#isShortLifeFolder', function() {
    it('checks whether there is a short-life folder', function(){
        isShortLifeFolder();
        expect(chrome.bookmarks.search).toHaveBeenCalledWith({ title: 'Short Life Bookmarks'}, jasmine.any(Function));
    });
  });

  describe('#createShortLifeFolder', function(){
    it('creates a Short life Bookmark folder', function() {
      createShortLifeFolder();
      expect(chrome.bookmarks.create).toHaveBeenCalledWith({ title: 'Short Life Bookmarks'}, jasmine.any(Function));
    });
  });
});
