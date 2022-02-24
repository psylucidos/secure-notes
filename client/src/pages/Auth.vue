<template>
  <q-page class="flex flex-center">
    <AuthComponent />
  </q-page>
</template>

<script>
import AuthComponent from 'components/Auth.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageAuth',
  components: {
    AuthComponent,
  },
});
</script>
