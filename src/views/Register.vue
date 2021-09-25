<template>
  <div class="container">
    <form action="#" method="POST">
      <div class="md:flex md:items-center md:justify-center md:h-screen">
        <div class="shadow overflow-hidden sm:rounded-md md:w-8/12">
          <div class="bg-white px-4 py-5 sm:p-6">
            <p class="pb-5 md:text-center">{{ $t('register.title') }}</p>
            <div class="grid grid-cols-12 gap-6">
              <div class="col-span-6">
                <label for="userName" class="block text-sm font-medium text-gray-700">{{ $t('register.userName') }}</label>
                <input type="text" name="userName" id="userName" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="col-span-6">
                <label for="firstName" class="block text-sm font-medium text-gray-700">{{ $t('register.name') }}</label>
                <input type="text" name="firstName" id="firstName" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
              <div class="col-span-6">
                <label for="lastName" class="block text-sm font-medium text-gray-700">{{ $t('register.lastName') }}</label>
                <input type="text" name="lastName" id="lastName" autocomplete="family-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6">
                <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('register.email') }}</label>
                <input type="text" name="email" id="email" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6">
                <label for="password" class="block text-sm font-medium text-gray-700">{{ $t('register.password') }}</label>
                <input type="password" name="password" id="password" autocomplete="off" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>

              <div class="col-span-6">
                <label for="repeteadPassword" class="block text-sm font-medium text-gray-700">{{ $t('register.repeteadPassword') }}</label>
                <input type="password" name="repeteadPassword" id="repeteadPassword" autocomplete="off" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-white text-right sm:px-6">
            <button type="submit" class="inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              {{ $t('generic.buttons.back') }}
            </button>
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ $t('generic.buttons.register') }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>