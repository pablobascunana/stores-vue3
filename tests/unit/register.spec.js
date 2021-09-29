import { mount } from '@vue/test-utils';
import router from '@/router/index';
import store from '@/store/index';
import i18n from '@/i18n';

import Register from '@/views/Register.vue';

const user = {
  userName: "test",
  name: "Pepe",
  lastName: "test test",
  email: "unemail@email.com",
  password: "superSecret",
  repeteadPassword: "superSecret"
};

const error = { response: { data: 'userName' } }

describe('Register.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Register, {
      global: {
        plugins: [i18n, store, router]
      }
    });
  });

  it('Call back button', async () => {
    await wrapper.vm.back();
  });

  it('Call register button', async () => {
    await wrapper.vm.register(user);
  });

  it('Call prepare success toast', async () => {
    await wrapper.vm.prepareSuccessToast(user);
    expect(store.state.showToast).toBe(false);
  });

  it('Call check error', async () => {
    await wrapper.vm.checkError(error, user);
    error.response.data = 'email'
    await wrapper.vm.checkError(error, user);
    error.response.data = 'abcde'
    await wrapper.vm.checkError(error, user);
  });
});
