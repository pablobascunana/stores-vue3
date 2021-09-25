<template>
  <div class="container">
    <form action="#" method="POST">
      <div class="flex items-center justify-center h-screen">
        <div class="shadow overflow-hidden rounded md:w-8/12">
          <div class="bg-white px-4 py-5 sm:p-6">
            <p class="pb-5 text-center">{{ $t('register.title') }}</p>
            <div class="grid grid-cols-12 gap-6">
              <div class="md:col-span-6 col-span-12">
                <label for="userName" class="form-label">{{ $t('register.userName') }}</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  autocomplete="given-name"
                  class="form-input"
                  v-model="user.userName"
                >
              </div>
              <div class="md:col-span-6 col-span-12">
                <label for="firstName" class="form-label">{{ $t('register.name') }}</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autocomplete="given-name"
                  class="form-input"
                  v-model="user.name"
                >
              </div>
              <div class="md:col-span-6 col-span-12">
                <label for="lastName" class="form-label">{{ $t('register.lastName') }}</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autocomplete="family-name"
                  class="form-input"
                  v-model="user.lastName"
                >
              </div>

              <div class="md:col-span-6 col-span-12">
                <label for="email" class="form-label">{{ $t('register.email') }}</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autocomplete="email"
                  class="form-input"
                  v-model="user.email"
                >
              </div>

              <div class="md:col-span-6 col-span-12">
                <label for="password" class="form-label">{{ $t('register.password') }}</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="off"
                  class="form-input"
                  v-model="user.password"
                >
              </div>

              <div class="md:col-span-6 col-span-12">
                <label for="repeteadPassword" class="form-label">{{ $t('register.repeteadPassword') }}</label>
                <input
                  type="password"
                  name="repeteadPassword"
                  id="repeteadPassword"
                  autocomplete="off"
                  class="form-input"
                  v-model="user.repeteadPassword"
                >
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-white text-right sm:px-6">
            <button type="submit" class="btn-secondary" @click.prevent="back">
              {{ $t('generic.buttons.back') }}
            </button>
            <button type="submit" class="btn-primary" @click.prevent="register">
              {{ $t('generic.buttons.register') }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue';
import router from "@/router";
import { useI18n } from "vue-i18n";
import UserApi from '@/api/user';

export default {
  name: 'Register',
  setup() {
    const app = getCurrentInstance();
    const emitter = app.appContext.config.globalProperties.$emitter;
    const user = ref({});
    const { t } = useI18n();
    const toast = {};

    function back() {
      router.back();
      // toast.message = 'asdfghjlkjhkfghjffytrxkfhc,gjvhkuoiyldutksryxfh,cgj.vhk-goyiñldtukrsyzdmhcjgkvhiltdukxydzm';
      //   toast.color = 'bg-red-500';
      //   emitter.emit('show-toast', toast);
    }

    async function register() {
      try {
        await UserApi.register(user.value);
        toast.message = `${t('register.messages.success1')} ${user.value.userName} ${t('register.messages.success2')}`
        emitter.emit('show-toast', toast);
        router.back();
      } catch (error) {
        toast.message = checkError(error.response.data);
        toast.color = 'bg-red-500';
        emitter.emit('show-toast', toast);
      }
    }

    function checkError(errorMessage) {
      if (errorMessage.includes('userName')) {
        return `${t('register.messages.userNameError')} ${user.value.userName} ${t('register.messages.exists')}`;
      } else if (errorMessage.includes('email')) {
        return `${t('register.messages.emailError')} ${user.value.email} ${t('register.messages.exists')}`;
      }
      return `${t('register.messages.error')} ${user.value.userName}`;      
    }

    return {
      back,
      register,
      user
    }
  }
}
</script>
