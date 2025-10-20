const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules() // Most important - it clears the cache
  process.env = { ...OLD_ENV }; // Make a copy
});

afterAll(() => {
  process.env = OLD_ENV; // Restore old environment
});


describe('LiquidParser', () => {
  test('if is production use platformParser', () => {
    process.env.NODE_ENV = 'production';
    const liquidParser=require('@/liquid/liquidParser').default
    expect(liquidParser.constructor.name).toBe("PlatformParser")
  });
    test('if is other env use platformParser', () => {
      const liquidParser=require('@/liquid/liquidParser').default
      expect(liquidParser.constructor.name).toBe('LiquidParserJs')
    });
});
