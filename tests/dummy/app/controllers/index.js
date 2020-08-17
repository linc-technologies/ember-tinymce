import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import { htmlSafe } from '@ember/template';

// options provides the default dummy app settings.
let options = {
  height: 300,
  mobile: {
    theme: 'mobile'
  },
  plugins: [
    'advlist autolink autoresize lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools'
  ],
  menubar: 'file edit insert',
  toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
  toolbar2: 'print preview media | forecolor backcolor emoticons',
  image_advtab: true,
  templates: [
    {
      title: 'Test template 1',
      content: 'Test 1'
    },
    {
      title: 'Test template 2',
      content: 'Test 2'
    }
  ],
};

// demoText provides the dummy text for the demo.
let demoText = `
<div>
  <p style="text-align: center; font-size: 15px;">
    <img src="https://www.tinymce.com/images/glyph-tinymce@2x.png" alt="" width="220" height="194">
  </p>
  <p style="text-align: center; color: #7e7e7e; font-size: 15px; font-family: avenir; font-weight: 200;">
    TinyMCE is a platform independent web-based JavaScript HTML WYSIWYG<br>
    editor control released as open source under LGPL.
  </p>
  <p style="text-align: center; color: #868686; font-size: 15px; font-family: avenir; font-weight: 200;">
    <em>TinyMCE enables you to convert HTML textarea fields or other HTML elements to editor instances.</em>
  </p>
  <p>&nbsp;</p>
</div>
`;

export default Controller.extend({
  // State
  demoText,
  options,
  menuBar: true,

  // Methods
  displayText: computed('demoText', function () {
    return htmlSafe(this.demoText);
  }),

  actions: {
    toggleMenu() {
      let options = this.get('options');
      this.set('options', null);
      this.toggleProperty('menuBar');

      let self = this;
      later(function () {
        options['menubar'] = self.get('menuBar');
        self.set('options', options);
      }, 10);
    }
  }
});
