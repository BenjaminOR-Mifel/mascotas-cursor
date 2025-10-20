import base64URI from "@/mixins/base64URI"



describe("test mixin funtion to decode and encode base64 from params",()=>{
  const location={...window.location}
  beforeEach(()=>{
    window.location=location
  })

  test("base64URI.methods.getUrlParam",()=>{
    delete window.location;
    window.location = { search: "?prueba=123" };
    expect(base64URI.methods.getUrlParam("prueba")).toBe('123')
    expect(base64URI.methods.getUrlParam("prueba2")).toBeNull()
  })
  test("base64URI.methods.base64URIEncoder",()=>{
    expect(base64URI.methods.base64URIEncoder({prueba:123})).toBe('eyJwcnVlYmEiOjEyM30%3D')
  })
  test("base64URI.methods.base64URIDecoder",()=>{
    expect(base64URI.methods.base64URIDecoder("eyJwcnVlYmEiOjEyM30%3D")).toMatchObject({prueba:123})
  })
})