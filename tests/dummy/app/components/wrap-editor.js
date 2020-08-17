import Component from '@ember/component';

export default Component.extend({
  isShowingModal: false,

  actions:{
    toggleModal(){
      this.toggleProperty('isShowingModal');
    }
  }
});
