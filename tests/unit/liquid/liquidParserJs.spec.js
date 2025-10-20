import LiquidParserJs from "@/liquid/LiquidParserJs";
const liquidParser=new LiquidParserJs()
jest.mock('../../../src/liquid/local-liquid-variables', () => ({ name: 'modyo',assets:[
  {id:'123',url:'url',alt_text:'alt_text'}
] }));

describe('LiquidParser', () => {
  test('if no liqiud string is provided throws error', () => {
    const liquidText = '{{test';
    expect(() => { liquidParser.parse(liquidText); }).toThrow(Error);
  });
  test('if no liqiud string is provided throws error on asyncRequest', async () => {
    const liquidText = '{{test';
    expect(liquidParser.parseAsync(liquidText)).rejects.toThrow(Error);
  });
  test('return var on asyncRequest', async () => {
    const liquidText = '{{name}}';
    const liquidResponse = await liquidParser.parseAsync(liquidText);
    expect(liquidResponse).toBe('modyo');
  });
  test('return var on parse', (done) => {
    const liquidText = '{{name}}';
    const liquidResponse = liquidParser.parse(liquidText);
    expect(liquidResponse).toBe('modyo');
    done();
  });
  test(' asset_image filter works',()=>{
    const liquidText = '{{"123"|asset_image}}';
    const liquidResponse = liquidParser.parse(liquidText);
    expect(liquidResponse).toBe("<img src='url' alt='alt_text' />");
  })
});