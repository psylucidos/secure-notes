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
            @keydown="onEdit"
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
//
// function splice(s, idx, rem, str) {
//   return s.slice(0, idx) + str + s.slice(idx + Math.abs(rem));
// }

function parseMarkdown(markdownText) {
  const htmlText = markdownText
    .replace(/^### (.*$)/gim, '<h3>### $1</h3>')
    .replace(/^## (.*$)/gim, '<h2>## $1</h2>')
    .replace(/^# (.*$)/gim, '<h1># $1</h1>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<b>**$1**</b>')
    .replace(/\*(.*)\*/gim, '<i>*$1*</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/\n$/gim, '<br />');

  return htmlText.trim();
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
      console.log(el.childNodes[i], currentPos, position);
      console.log('selecting', position - passedPositions, 'of', el.childNodes[i]);
      if (i >= 1) {
        console.log('selecting', (position - passedPositions) - 1, 'instead');
        range.setStart(el.childNodes[i].firstChild, position - passedPositions - 1);
      } else {
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
    updateNote() {
      // const text = document.getElementById('editor');
      // console.log('key', e.keyCode);
      // console.log('textInput', text);
      // console.log('content', this.notes[0].content);
      // const index = 0;
      // console.log('index', index);

      // if (e.keyCode >= 65 && e.keyCode <= 90) {
      //   this.notes[0].content = splice(this.notes[0].content, index, 0, e.key);
      // } else if (e.keyCode === 8) {
      //   console.log('DEL');
      //   this.notes[0].content = splice(this.notes[0].content, index, 1, '');
      // }
      console.log('test');
    },
    // onEdit(e) {
    //   const src = e.target.innerText;
    //   this.notes[0].content = src;
    //
    //   console.log(parseMarkdown(src));
    //
    //   e.target.innerHTML = parseMarkdown(src);
    // },
    onBlur() {
      console.log('blr');
    },
    onEdit(e) {
      const currentCaretIndex = getCaretIndex(e.target);
      const content = document.getElementById('editable').innerText;
      // console.log(document.getElementById('editable'));

      console.log('edited', e.key, 'index', currentCaretIndex, 'content', content);

      if (document.getElementById('editable').innerHTML.length > 4) {
        console.log('setting caret');
        const index = window.getSelection().focusOffset;
        console.log('index', index, window.getSelection());
        if (window.getSelection().isCollapsed) {
          e.target.innerHTML = parseMarkdown(content);
          setCaret('editable', index, 0);
        }
      }

      // const selection = window.getSelection();
      // selection.extend(e.target, 2);

      // const el = document.getElementByClass('editable');
      // const selection = window.getSelection();
      // const range = document.createRange();
      // selection.removeAllRanges();
      // range.selectNodeContents(el);
      // range.collapse(false);
      // selection.addRange(range);
      // el.focus();

      // this.$el.querySelector('.editable').blur();
      // this.onEdit(e);
      // this.$el.querySelector('.editable').focus();
    },
  },
});
</script>
