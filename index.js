/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-tinymce',

  contentFor: function (type, config) {
    let content = '';

    if (type === 'head-footer' && config['tinyMCE'] && config['tinyMCE']['load']) {
      let src = `https://cdn.tiny.cloud/1/${config['tinyMCE']['apiKey']}/tinymce/${config['tinyMCE']['version']}/tinymce.min.js`;

      let sriHash = '';
      if (config['tinyMCE']['sriHash'] !== '') {
        sriHash = `integrity="${config['tinyMCE']['sriHash']}"`;
      }

      content = `<script type="text/javascript" src="${src}" ${sriHash} crossorigin="anonymous"></script>`;
    }

    return content;
  },

  included: function (app) {
    app.import('app/styles/addons.css');
  }
};
