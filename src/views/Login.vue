<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="@/assets/logo.svg" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ $t('login.signInMessage') }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ $t('login.or') }}
          <router-link href="#" class="font-medium text-indigo-600 hover:text-indigo-500" to="/register">
            {{ $t('login.signUpMessage') }}
          </router-link>
        </p>
      </div>
      <Form class="mt-8 space-y-6" @submit="login">
        <div class="rounded-md shadow-sm -space-y-px">
          <LoginInput
            name="userName"
            :placeholder="$t('login.userName')"
          />
          <LoginInput
            name="password"
            type="password"
            :placeholder="$t('login.password')"
            appearance="form-input-bottom"
          />
        </div>
        <div>
          <button type="submit" class="btn-login">
            <span class="absolute right-2 flex items-center pl-3">
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            {{ $t('generic.buttons.access') }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import LoginInput from "@/components/generics/inputs/Login";
import { Form } from "vee-validate";
import router from "@/router";
import { useI18n } from "vue-i18n";
import UserApi from '@/api/user';
import { useStore } from 'vuex';
import { utils } from "@/helpers/commons";

export default {
  name: "Login",
  components: {
    Form,
    LoginInput
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();

    async function login(user) {
      try {
        let { data } = await UserApi.login(user);
        saveDataInVuexAndGoToStore(data, user);
      } catch (error) {
        utils.prepareToastAndShowIt(`${t('login.messages.error')}`);
      }
    }

    function saveDataInVuexAndGoToStore({ access_token, refresh_token }, { userName }) {
      store.commit('setAccessToken', access_token);
      store.commit('setRefreshToken', refresh_token);
      store.commit('isLogin', false);
      store.commit('setUserByToken', access_token);
      store.commit('setUserName', userName);
      router.push({ name: 'stores' });
    }

    return {
      login,
      saveDataInVuexAndGoToStore
    }
  },
}
</script>
