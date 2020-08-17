'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    tinyMCE:{
      load: true,
      apiKey: 'no-api-key',
      version: '5.4.1',
      sriHash: 'sha384-oap60xwXZh7bNDdoSHVBtMsWkvS1kl6osQyFFOSDzPblo0981h44ynbbQ9RiaLj8'
    }
  };
};
