<template>
  <table id="storesTable" class="table text-gray-400 border-separate space-y-6 text-sm">
    <thead id="storesTableHeader" class="bg-white text-gray-500 shadow rounded-lg">
      <tr>
        <slot v-for="header in headers" :key="header.id">
          <th :class="header.appearance">{{ header.name }}</th>
        </slot>
      </tr>
    </thead>
    <tbody id="storesTableBody">
      <slot v-for="(row, index) in body" :key="index">
        <tr class="bg-white shadow rounded-lg">
          <td class="p-3">
            <div class="flex align-items-center">
              <img
                class="rounded-full h-12 w-12 object-cover"
                :src="`https://picsum.photos/id/${index}/200`"
                alt="unsplash image"
              >
              <div class="ml-3">
                <div class="p-3 text-gray-600">{{ row.name }}</div>
              </div>
            </div>
          </td>
          <td class="p-3 text-gray-600">{{ row.phone }}</td>
          <td class="p-3 text-gray-600">{{ row.email }}</td>
          <td class="p-3 text-gray-600">{{ row.cif }}</td>
          <td class="p-3">
            <a :id="`storeDetails${index}`" href="#" class="neutral-icon mr-2" @click.prevent="goToDetails(row, index)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
            <a :id="`deleteStore${index}`" href="#" class="negative-icon ml-2" @click="deleteAction(row, index)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </a>
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    headers: { type: Array, required: true },
    body: { type: Array, required: true }
  },
  setup(props, { emit }) {

    function deleteAction(row, index) {
      emit('delete-store', { row: row, index: index });
    }

    function goToDetails(row, index) {
      emit('go-to-details', { row: row, index: index });
    }

    return {
      deleteAction,
      goToDetails
    }
  }
}
</script>
