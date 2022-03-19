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
            @mousedown="onMouseDown"
            contenteditable="true"
          ></p>
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

function parseMarkdown(markdownText) { // eslint-disable-line
  const htmlText = markdownText
    .replace(/^### (.*$)/gim, '<h5 style="margin: 0;">### $1</h5>')
    .replace(/^## (.*$)/gim, '<h4 style="margin: 0;">## $1</h4>')
    .replace(/^# (.*$)/gim, '<h3 style="margin: 0;"># $1</h3>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*(.*)\*/gim, '<b>*$1*</b>')
    .replace(/_(.*)_/gim, '<i>_$1_</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/\n/gim, '<br />');

  return htmlText;
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

function setCaret(elementID, position) { // eslint-disable-line
  console.log('Setting caret...');
  const el = document.getElementById(elementID);
  const range = document.createRange();
  const sel = window.getSelection();

  let currentPos = 0;
  let passedPositions = 0;
  console.log('Looping through', el.childNodes);
  for (let i = 0; i < el.childNodes.length; i += 1) {
    const target = el.childNodes[i];
    console.log('Current Target', Object(target));
    const content = target.data || target.innerHTML;
    if (i !== 0) {
      if (target.nodeName === 'BR' && el.childNodes[i - 1].nodeName === 'BR') {
        console.log('last target was br, and this target is br, adding 1 to pos');
        currentPos += 1;
      } else {
        currentPos += content.length;
      }
    } else {
      currentPos += content.length;
    }

    if (currentPos >= position) {
      let rangePosition;
      if (target.nodeName === 'BR') {
        rangePosition = 0;
      } else {
        rangePosition = position - passedPositions;
      }
      console.log('setting caret to position', rangePosition, 'of', el.childNodes[i], 'or child');
      if (el.childNodes[i].firstChild) {
        range.setStart(el.childNodes[i].firstChild, rangePosition);
      } else {
        range.setStart(el.childNodes[i], rangePosition);
      }
      range.collapse(true);
      break;
    }
    passedPositions += content.length;
    console.log('currentPos', currentPos, 'passedPositions', passedPositions);
  }

  sel.removeAllRanges();
  sel.addRange(range);
}

export default defineComponent({
  name: 'PageNotes',
  data() {
    return {
      tab: 'mails',
      notes: [],
    };
  },
  created() {
    console.log('Setting up!');
    this.loadNotes();
  },
  methods: {
    loadNotes() {
      console.log('Loaded in 1 note!');
      this.notes.push({
        id: 0,
        content: 'hello',
      });
    },
    onEdit(e) {
      console.log('Note edit!');
      const { keyCode } = e;

      console.log('keycode:', keyCode);

      if ((keyCode >= 49 && keyCode <= 90) || keyCode === 32) {
        console.log('letter or number pressed');
      } else if (keyCode === 37 // arrow left
              || keyCode === 39 // arrow right
              || keyCode === 38 // arrow up
              || keyCode === 40) { // arrow down
        console.log('arrow pressed');
      } else if (keyCode === 8) {
        console.log('delete button pressed');
      } else if (keyCode === 13) {
        console.log('ender button presed');
        this.renderMarkdown(1);
      }
    },
    onMouseDown(e) {
      console.log('mouse down', e);
      // this.renderMarkdown();
    },
    renderMarkdown() {
      const currentCaretIndex = getCaretIndex(document.getElementById('editable'));
      const content = document.getElementById('editable').innerText;

      if (window.getSelection().isCollapsed) {
        console.log('before', `${content}END`);
        console.log('setting carret to', currentCaretIndex);
        document.getElementById('editable').innerHTML = parseMarkdown(content);
        console.log('after', document.getElementById('editable').innerHTML);
        console.log(document.getElementById('editable'));
        setCaret('editable', currentCaretIndex + 1);
      }
    },
  },
});
</script>
