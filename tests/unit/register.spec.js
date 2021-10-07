import { shallowMount } from '@vue/test-utils';
import router from '@/router/index';
import store from '@/store/index';
import i18n from '@/i18n';

import Register from '@/views/Register';

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
    wrapper = shallowMount(Register, {
      global: {
        plugins: [i18n, store, router]
      }
    });
  });

  it('Call register button', async () => {
    await wrapper.vm.register(user);
  });

  it('Call show toast and back to login', async () => {
    wrapper.vm.showToastAndBackToLogin(user);
  });

  it('Call check error', async () => {
    await wrapper.vm.checkError(error, user);
    error.response.data = 'email'
    await wrapper.vm.checkError(error, user);
    error.response.data = 'abcde'
    await wrapper.vm.checkError(error, user);
  });
});
