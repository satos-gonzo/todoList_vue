import Vue from 'vue';
Vue.config.devtools = true;//devツールが表示されない時

/* タスク用コンポーネントの定義 */
Vue.component('createtask', {
  template: `
    <div className="form">
    <div class="inputArea">
      <input
        type="text"
        class="inputText"
        placeholder="something to do task"
        v-on:keyup=""/>
     </div>
  </div>
  `
})
