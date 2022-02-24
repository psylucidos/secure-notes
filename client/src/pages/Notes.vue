<template>
  <q-page class="">
    <div id="tabs">
      <q-tabs
        v-model="tab"
        vertical
        class="text-teal"
      >
        <q-list bordered separator>
          <q-item
            v-for="note in notes"
            clickable v-ripple
            @click="tab = note.content.split('\n')[0]"
            :key="note.id"
          >
            <q-item-section>
              <q-item-label>{{ note.content.split('\n')[0] }}</q-item-label>
              <q-item-label caption>{{ note.content.split('\n')[1] }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tabs>
    </div>

    <div id="panels">
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel v-for="note in notes" :name="note.content.split('\n')[0]" :key="note.id">
          <div class="text-h4 q-mb-md">{{ note.content.split('\n')[0] }}</div>
          <p contenteditable="true">{{ note.content.split('\n')[1] }}</p>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<style lang="scss" scoped media="screen">
  #tabs {
    width: 30vw;
    height: 100%;
    float: left;
  }

  #panels {
    width: calc(100vw - 30vw);
    height: 100%;
    float: right;
  }

  #notes-splitter {
    width: 100%;
    height: calc(100vh - 50px);
  }
</style>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageNotes',
  data() {
    return {
      tab: 'mails',
      notes: [
        {
          id: 0,
          content: '# hello\nI hate mondays.',
        },
        {
          id: 1,
          content: '# hello, again\nAnd wednesdays',
        },
      ],
    };
  },
});
</script>
