import { mount } from '@vue/test-utils';
import router from '@/router/index';
import store from '@/store/index';
import i18n from '@/i18n';

import Login from '@/views/Login.vue';

const user = {
  userName: "test",
  password: "superSecret"
};

const response = {
  access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjMyNDk1MTk5LCJqdGkiOiI3YjMxZDkwMi01N2MxLTQwOWYtOTQ1NS0zMTZkODNkZjgyZWQiLCJ0eXBlIjoiYWNjZXNzIiwic2Vzc2lvbiI6eyJ1c2VyVXVpZCI6ImNmYzdiNDI5LWMzNTktNDFmYS1hYjU5LWEzZjhhOWJhMjVjMiJ9LCJuYmYiOjE2MzI0OTUxOTksImV4cCI6MTYzMjQ5NjA5OX0.wtQvyuxscnu8gDKrVh22tlH8KzfKnx2elzPX_9k5geiM64YXCsbo6RKIbFktqEwKNVRAEvP3N1XZ6PFnrLThOQ",
  refresh_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzMjQ5NTE5OSwianRpIjoiNmEzYjNkYTItOGQxYS00MmQwLWE1MDgtZDI1YzU1Y2U4YTNjIiwidHlwZSI6InJlZnJlc2giLCJzZXNzaW9uIjpudWxsLCJuYmYiOjE2MzI0OTUxOTksImV4cCI6MTYzNTA4NzE5OX0.uhY0f-meNn9Y59T6lNa9VzTYKa8QXD3C-dvE-Ey8Y4_x6dnVGqHZDZyHE6d--3bAVKr_eEBMUU-Hd7UX1sRoYw"
}

const userUuid = 'cfc7b429-c359-41fa-ab59-a3f8a9ba25c2';

describe('Login.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        plugins: [i18n, store, router]
      }
    });
  });

  it('Call login button', async () => {
    await wrapper.vm.login(user);
  });

  it('Call to save data in vuex and go to store', async () => {
    await wrapper.vm.saveDataInVuexAndGoToStore(response, user);
    expect(store.state.accessToken).toBe(`${'Bearer '}${response.access_token}`);
    expect(store.state.refreshToken).toBe(response.refresh_token);
    expect(store.state.login).toBe(false);
    expect(store.state.user.userUuid).toBe(userUuid);
    expect(store.state.user.userName).toBe(user.userName);
  });
});
