<template>
  <div class="container">
    <Form @submit.prevent="register" :validation-schema="schema">
      <div class="flex items-center justify-center h-screen">
        <div class="shadow overflow-hidden rounded md:w-8/12">
          <div class="bg-white px-4 py-5 sm:p-6">
            <p class="pb-5 text-center">{{ $t('register.title') }}</p>
            <div class="grid grid-cols-12 gap-6">
              <div class="md:col-span-6 col-span-12">
                <TextInput
                  name="userName"
                  class="form-input"
                  :label="$t('register.userName')"
                  :placeholder="$t('register.placeholders.userName')"
                />
              </div>
              <div class="md:col-span-6 col-span-12">
                <TextInput
                  name="name"
                  class="form-input"
                  :label="$t('register.name')"
                  :placeholder="$t('register.placeholders.name')"
                />
              </div>
              <div class="md:col-span-6 col-span-12">
                <TextInput
                  name="lastName"
                  class="form-input"
                  :label="$t('register.lastName')"
                  :placeholder="$t('register.placeholders.lastName')"
                />
              </div>
              <div class="md:col-span-6 col-span-12">
                <TextInput
                  name="email"
                  class="form-input"
                  :label="$t('register.email')"
                  :placeholder="$t('register.placeholders.email')"
                />
              </div>
              <div class="md:col-span-6 col-span-12">
                <TextInput
                  name="password"
                  type="password"
                  class="form-input"
                  :label="$t('register.password')"
                  :placeholder="$t('register.placeholders.password')"
                />
              </div>
              <div class="md:col-span-6 col-span-12">
                <TextInput
                  name="repeteadPassword"
                  type="password"
                  class="form-input"
                  :label="$t('register.repeteadPassword')"
                  :placeholder="$t('register.placeholders.repeteadPassword')"
                />
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-white text-right sm:px-6">
            <button class="btn-secondary" @click="back">
              {{ $t('generic.buttons.back') }}
            </button>
            <button class="btn-primary">
              {{ $t('generic.buttons.register') }}
            </button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import * as Yup from "yup";
import { emitter } from '@/helpers/emitter';
import { ref } from 'vue';
import { Form } from "vee-validate";
import router from "@/router";
import TextInput from "@/components/generics/TextInput.vue";
import { useI18n } from "vue-i18n";
import UserApi from '@/api/user';

export default {
  name: 'Register',
  components: {
    Form,
    TextInput
  },
  setup() {
    const user = ref({});
    const { t } = useI18n();
    const toast = {};

    const MIN_LENGTH_VALUE = 6;
    const MAX_LENGTH_VALUE = 45;
    const MIN_MSG = `${t('generic.validations.minLength')} ${MIN_LENGTH_VALUE}`;
    const MAX_MSG = `${t('generic.validations.maxLength')} ${MAX_LENGTH_VALUE}`;
    const REQUIRED = t('generic.validations.required');

    const schema = Yup.object().shape({
      userName: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
      name: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
      lastName: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
      email: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).email(t('generic.validations.invalidEmail')).required(REQUIRED),
      password: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).required(REQUIRED),
      repeteadPassword: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).required(REQUIRED)
        .oneOf([Yup.ref("password")], t('generic.validations.unmatchPasswords')),
    });

    function back() {
      router.back();
    }

    async function register(user) {
      debugger
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
      schema,
      user,
    }
  }
}
</script>
