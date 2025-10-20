import App from '@/App.vue'
import { shallowMount } from '@vue/test-utils'
const translateMock=jest.fn()
describe('test app component',()=>{
  beforeEach(()=>{
    jest.resetAllMocks()
  })
  it('handles the change of language',()=>{
    const wrapper=shallowMount(App,{
      stubs:['router-view'],
      mocks:{
        $i18n:{
          locale:'en'
        },
        $t:translateMock
      }
    });
    expect(wrapper.vm.$i18n.locale).toBe('en')
    window.dispatchEvent(new CustomEvent("changedLanguage", {
      detail:{language: 'es'}
    }));
    expect(wrapper.vm.$i18n.locale).toBe('es')
  })
  it('render external wrapper as should',()=>{
    const wrapper=shallowMount(App,{
      stubs:['router-view'],
      mocks:{
        $i18n:{
          locale:'en'
        },
        $t:translateMock

      }
    });
    expect(wrapper).toMatchSnapshot()
  })
})