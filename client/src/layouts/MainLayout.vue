<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Secure Notes
        </q-toolbar-title>

        <div>
          <q-tabs align="left">
            <q-route-tab to="/notes" v-if="hasAuth" label="Notes" />
            <q-route-tab to="/auth" :label="hasAuth ? 'Logout' : 'Login'" @click="logout()" />
          </q-tabs>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  methods: {
    logout() {
      if (this.hasAuth) {
        console.log('LOGOUT'); // eslint-disable-line
      }
    },
  },
  computed: {
    hasAuth() { // demo function do not use in production
      if (this.$route.fullPath === '/auth'
        || this.$route.fullPath === '/') {
        return false;
      }
      return true;
    },
  },
});
</script>
