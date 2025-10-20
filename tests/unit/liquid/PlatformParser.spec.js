import LiquidParserJs from "@/liquid/PlatformParser";
const liquidParser=new LiquidParserJs()
jest.mock('../../../src/liquid/local-liquid-variables', () => ({ name: 'modyo' }));

describe('test on production', () => {
  test('return string on production', () => {
    const liquidText = '{{name}}';
    const liquidResponse = liquidParser.parse(liquidText);
    expect(liquidResponse).toBe(liquidText);
  });
  test('return string on production on asyncRequest', async () => {
    const liquidText = '{{name}}';
    const liquidResponse = await liquidParser.parseAsync(liquidText);
    expect(liquidResponse).toBe(liquidText);
  });
});