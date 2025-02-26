import { AuthorsPipe } from './authors.pipe';

describe('AuthorsPipe', () => {
  let pipe: AuthorsPipe
  beforeEach(() => {
    pipe = new AuthorsPipe();
  });
  it('should return the first author from the array', () => {
    const authors = ['Author One', 'Author Two', 'Author Three'];
    expect(pipe.transform(authors)).toBe('Author One');
  });
})
