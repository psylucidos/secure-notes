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
            @click="tab = note.id"
            :key="note.id"
          >
            <q-item-section>
              <q-item-label>{{ note.id }}</q-item-label>
              <q-item-label caption>test</q-item-label>
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
        <q-tab-panel v-for="note in notes" :name="note.id" :key="note.id">
          <div class="text-h4 q-mb-md">{{ note.content.split('<br/>')[0] }}</div>
          <p
            id="editable"
            @keyup="onEdit"
            contenteditable="true"
          ></p>
          {{ note.content }}
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

function parseMarkdown(markdownText) {
  const htmlText = markdownText
    .replace(/^### (.*$)/gim, '<h5>### $1</h5>')
    .replace(/^## (.*$)/gim, '<h4>## $1</h4>')
    .replace(/^# (.*$)/gim, '<h3># $1</h3>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<b>**$1**</b>')
    .replace(/_(.*)_/gim, '<i>_$1_</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>");
    // .replace(/\n$/gim, '<br />');

  return htmlText;
}

function parseMarkdown(text) {
  return sd.render(text);
}

function getCaretIndex(element) {
  let position = 0;
  const isSupported = typeof window.getSelection !== 'undefined';
  if (isSupported) {
    const selection = window.getSelection();
    if (selection.rangeCount !== 0) {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      position = preCaretRange.toString().length;
    }
  }
  return position;
}

function setCaret(elementID, position) {
  const el = document.getElementById(elementID);
  const range = document.createRange();
  const sel = window.getSelection();

  let currentPos = 0;
  let passedPositions = 0;
  for (let i = 0; i < el.childNodes.length; i += 1) {
    const target = el.childNodes[i];
    const content = target.data || target.innerHTML;
    currentPos += content.length;
    // console.log('CHILD', i, content, 'position', currentPos);
    if (currentPos >= position) {
      console.log('child node', el.childNodes[i], 'current position', currentPos, 'postion?', position);
      console.log('selecting', position - passedPositions, 'of', el.childNodes[i]);
      if (el.childNodes[i].firstChild) {
        console.log('going into first child');
        range.setStart(el.childNodes[i].firstChild, position - passedPositions);
      } else {
        console.log('not going into child');
        range.setStart(el.childNodes[i], position - passedPositions);
      }
      range.collapse(true);
      break;
    }
    passedPositions += content.length;
  }

  sel.removeAllRanges();
  sel.addRange(range);
}

export default defineComponent({
  name: 'PageNotes',
  data() {
    return {
      tab: 'mails',
      notes: [
        {
          id: 0,
          content: 'hello',
        },
        {
          id: 1,
          content: '# hello, again\nAnd wednesdays',
        },
      ],
    };
  },
  methods: {
    onEdit(e) {
      const currentCaretIndex = getCaretIndex(e.target);
      const content = document.getElementById('editable').innerText;
      console.log('key:', e.key, 'with keycode:', e.keyCode, 'index:', currentCaretIndex, 'content:', content);
      if (e.keyCode >= 49 && e.keyCode <= 90) {
        if (document.getElementById('editable').innerHTML.length > 4) {
          console.log('SETTING caret');
          console.log('index:', currentCaretIndex, 'selection:', window.getSelection());
          console.log('content before parse:', content);
          console.log('parsed', parseMarkdown(content));
          if (window.getSelection().isCollapsed) {
            e.target.innerHTML = parseMarkdown(content);
            setCaret('editable', currentCaretIndex);
          }
        }
      }
    },
  },
});
</script>
