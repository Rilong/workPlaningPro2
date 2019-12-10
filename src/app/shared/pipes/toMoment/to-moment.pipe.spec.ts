import { ToMomentPipe } from './to-moment.pipe';

describe('ToMomentPipe', () => {
  it('create an instance', () => {
    const pipe = new ToMomentPipe();
    expect(pipe).toBeTruthy();
  });
});
