import { ContentTypeFilterPipe } from './type-filter.pipe';

describe('TypeFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ContentTypeFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
