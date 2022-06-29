const command = require('./codeblock.js');

describe('!cb', () => {
  describe('does trigger', () => {
    it.each(['!cb js 02397492749864392'])('should trigger', (string) => {
      expect(command.regex.test(string)).toBeTruthy();
    });
  });

  describe('callback', () => {
    it('that should return correct output', () => {
      expect(command.cb({
        content: '!cb js 123',
        channel: {
          fetchMessage(arg) {
            return arg ? 'test' : 'also test';
          },
        },
      })).toMatchSnapshot();
    });
  });
});
