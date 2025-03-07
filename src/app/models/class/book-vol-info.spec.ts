import { BookVolInfo } from './book-vol-info';


describe('BookVolInfo', () => {
  it('should create an instance with correct properties', () => {
    const mockItem = {
      volumeInfo: {
        title: 'Test Book',
        authors: ['Author One', 'Author Two'],
        publisher: 'Test Publisher',
        publishedDate: '2024-01-01',
        description: 'Test Description',
        previewLink: 'http://example.com',
        imageLinks: { thumbnail: 'http://example.com/image.jpg' }
      }
    };
    const book = new BookVolInfo(mockItem);

    expect(book.title).toBe('Test Book');
    expect(book.authors).toEqual(['Author One', 'Author Two']);
    expect(book.publisher).toBe('Test Publisher');
    expect(book.publishedDate).toBe('2024-01-01');
    expect(book.description).toBe('Test Description');
    expect(book.previewLink).toBe('http://example.com');

  });
  it('should handle missing properties gracefully', () => {
    const mockItem = {};
    const book = new BookVolInfo(mockItem);
  
    expect(book.title).toBeUndefined();
    expect(book.authors).toBeUndefined();
    expect(book.publisher).toBeUndefined();
    expect(book.publishedDate).toBeUndefined();
    expect(book.description).toBeUndefined();
    expect(book.previewLink).toBeUndefined();
  
    expect(book.thumbnail).toEqual({
      smallThumbnail: '/assets/images/capa-indisponivel.png',
      thumbnail: '/assets/images/capa-indisponivel.png',
      small: '',
      medium: '',
      large: '',
      extraLarge: ''
    });
  });
  
})
