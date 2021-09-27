import { mount } from '@vue/test-utils';
import store from '@/store/index';

import App from '@/App.vue';


describe('App.vue', () => {
  beforeEach(() => {
    mount(App, {
      global: {
        plugins: [store]
      }
    });
  });

  it('Check showToast state to be falsy', () => {
    expect(store.state.showToast).toBe(false);
  });

  it('Show toast', () => {
    store.commit('setShowToast', true);
    expect(store.state.showToast).toBe(true);
  });
});
