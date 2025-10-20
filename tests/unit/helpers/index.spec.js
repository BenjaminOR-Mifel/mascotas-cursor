import helpers from "@/helpers";
describe("test base helpers for cookies",()=>{
  beforeEach(()=>{
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'myCookie=omnomnom'
    });
  })
  it('set cookie with helper method',()=>{
    helpers.setCookie('myCookie','myValue',4);
    expect(document.cookie).toContain('myCookie=myValue')
  })
  it('get cookie with helper method',()=>{
    helpers.setCookie('myCookie','myValue',4);
    expect(helpers.getCookie('myCookie')).toBe('myValue')
  })

  it('get cookie with helper method return null if not exist',()=>{
    helpers.setCookie('myCookie','myValue',4);
    expect(helpers.getCookie('notMyCookie')).toBeNull()
  })
  it('get cookie with helper method return value if space is encoded in name',()=>{
    helpers.setCookie('%20test','myValue',4);
    expect(helpers.getCookie('test')).toBe('myValue')
  })
  it('set 8 days to cookie as default value',()=>{
    helpers.setCookie('tst','myValue');
    const d = new Date();
    d.setTime(d.getTime() + (8 * 24 * 60 * 60 * 1000));
    expect(document.cookie).toContain(`${d.getDate()}`)
    expect(document.cookie).toContain(`${d.getFullYear()}`)
  })
})