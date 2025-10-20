import handleError from "@/mixins/handleError"
import { shallowMount } from "@vue/test-utils"
const mockComponent= {
  name: 'mockComponent',
  render() { return <div /> }
}



const te=jest.fn()
const t=jest.fn()
const mifelToast={
  show:jest.fn()
}
describe("test mixin funtion to handleError",()=>{
  beforeEach(()=>{
    jest.resetAllMocks()
  })
  test("show error if translation exist and no function associated",()=>{
    const message='Controleld Message'
    te.mockReturnValue(true)
    t.mockReturnValue(message)
    const wrapper=shallowMount(mockComponent,{
      mixins:[handleError],
      mocks:{
        $te:te,
        $t:t,
        $mifelToast:mifelToast
      },
    })
    wrapper.vm.handleError(new Error(JSON.stringify({translationKey:'001',trazabilityCode:'123-123-123-123-123'})))
    expect(wrapper.vm.$t).toBeCalled()
    expect(wrapper.vm.$t).toBeCalledTimes(1)
    expect(wrapper.vm.$t).toBeCalledWith("errors.001", {"trazabilityCode": "123-123-123-123-123"})
    expect(wrapper.vm.$mifelToast.show).toBeCalled()
    expect(wrapper.vm.$mifelToast.show).toBeCalledTimes(1)
    expect(wrapper.vm.$mifelToast.show).toBeCalledWith({ 
      description: message,
      type: 'error',
      containerId: 'toast',
      alwaysVisible: true
    })
  })
  test("show default error if translation not exist and no error function",()=>{
      const message='Controleld Message'
      te.mockReturnValue(false)
      t.mockReturnValue(message)
      const wrapper=shallowMount(mockComponent,{
        mixins:[handleError],
        mocks:{
          $te:te,
          $t:t,
          $mifelToast:mifelToast
        },
      })
      wrapper.vm.handleError(new Error(JSON.stringify({translationKey:'001',trazabilityCode:'123-123-123-123-123'})))
      expect(wrapper.vm.$t).toBeCalled()
      expect(wrapper.vm.$t).toBeCalledTimes(1)
      expect(wrapper.vm.$t).toBeCalledWith("errors.default", {"errorSlug":"001","trazabilityCode": "123-123-123-123-123"})
      expect(wrapper.vm.$mifelToast.show).toBeCalled()
      expect(wrapper.vm.$mifelToast.show).toBeCalledTimes(1)
      expect(wrapper.vm.$mifelToast.show).toBeCalledWith({ 
        description: message,
        type: 'error',
        containerId: 'toast',
        alwaysVisible: true
      })
    })
    test("run function if exist",()=>{
      const message='Controleld Message'
      te.mockReturnValue(true)
      t.mockReturnValue(message)
      const wrapper=shallowMount(mockComponent,{
        mixins:[handleError],
        mocks:{
          $te:te,
          $t:t,
          $mifelToast:mifelToast,
          ['error-001']:jest.fn()
        },
      })
      const error=new Error(JSON.stringify({translationKey:'001',trazabilityCode:'123-123-123-123-123'}))
      wrapper.vm.handleError(error)
      expect(wrapper.vm.$t).toBeCalled()
      expect(wrapper.vm.$t).toBeCalledTimes(1)
      expect(wrapper.vm.$t).toBeCalledWith("errors.001", {"trazabilityCode": "123-123-123-123-123"})
      expect(wrapper.vm.$mifelToast.show).not.toBeCalled()
      expect(wrapper.vm['error-001']).toBeCalled()
      expect(wrapper.vm['error-001']).toBeCalledWith({"translationKey":"001","trazabilityCode":"123-123-123-123-123"})
    })
  
})