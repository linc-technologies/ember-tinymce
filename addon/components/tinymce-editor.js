/* global tinymce: true */
import Component from '@ember/component';
import { observer } from '@ember/object';
import { assign } from '@ember/polyfills';
import { bind, debounce, later } from '@ember/runloop';

const defaultOptions = {};

export default Component.extend({
  classNames: ['tinymce-editor'],
  tagName: 'textarea',
  tinyEvents: 'change keyup keydown keypress mousedown',
  changeDebounce: 10,

  // State
  options: defaultOptions,
  // editor stores the TinyMCE instance.
  editor: null,

  // optionsChanged observes changes to the TinyMCE configuration in order to
  // dynamically reload
  optionsChanged: observer('options', function () {
    this.initTiny();
  }),

  // valueChanged watches value in order to push changes into TinyMCE
  valueChanged: observer('value', function () {
    let {editor, value} = this.getProperties('editor', 'value');
    if (editor && editor.getContent() !== value) {
      editor.setContent(value || '');
    }
  }),

  // onValueChanged enables developers to supply a callback which is called when
  // the editor's content has changed.
  onValueChanged(value) {
    this.set('value', value);
  },

  // contentChanged detects whether the editor's content has changed.
  contentChanged(editor) {
    let content = editor.getContent();
    if (editor.isDirty() && content !== this.get('value')) {
      this.onValueChanged(editor.getContent());
      editor.setDirty(true);
    }
  },

  // debounceContentChanged attempts to stop needless computation cycles, for
  // example, when holding down a key press.
  debounceContentChanged(editor, time) {
    debounce(this, this.contentChanged, editor, time);
  },

  // setEvents binds events we want to listen to into TinyMCE.
  setEvents: observer('editor', function () {
    let {changeDebounce, editor} = this.getProperties('changeDebounce', 'editor');

    if (!editor) {
      return;
    }

    editor.on(
      this.tinyEvents,
      bind(this, this.debounceContentChanged, editor, changeDebounce),
    );
  }),

  // initTiny initializes a new TinyMCE editor, configured with the provided
  // options.
  initTiny() {
    let {options, editor} = this.getProperties('options', 'editor');
    if (!options) {
      // don't attempt to init if options provided are null.
      return;
    }

    let initFunction = (editor) => {
      this.set('editor', editor);
      this.get('editor').setContent(this.get('value') || ''); //Set content with default text
    };

    let customOptions = {
      selector: `#${this.get('elementId')}`,
      init_instance_callback: bind(this, initFunction)
    };

    if (editor){
      editor.setContent('');
      editor.destroy();
      this.set('editor', null);
    }

    later(() => {
      if (typeof tinymce === 'undefined') { return; }
      tinymce.init(assign({}, options, customOptions));
    }, 10);
  },


  // Lifecycle hooks
  didInsertElement() {
    this.initTiny();
  },

  willDestroyElement() {
    let editor = this.get('editor');
    if (editor) {
      editor.off(this.tinyEvents);
      editor.destroy();
    }
  },
});
