import { shallowMount } from '@vue/test-utils';
import store from '@/store/index';

import App from '@/App';

describe('App.vue', () => {
  beforeEach(() => {
    shallowMount(App, {
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
