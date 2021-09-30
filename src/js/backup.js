import Vue from 'vue';
import { v4 as uuidv4 } from 'uuid';
import _, { times } from 'lodash';
Vue.config.devtools = true;//devツールが表示されない時


/* CreateTaskコンポーネント */
Vue.component('todo-task', {
  template: `
<div>
  <div className="form">
    <div class="inputArea">
      <input
        type="text"
        class="inputText"
        placeholder="something to do task"
        v-on:keyup="this.taskCreate"/>
     </div>
  </div>

  <div class="searchBox" >
    <i class="fa fa-search searchBox__icon" aria-hidden="true" />
        <input type="text"
          class="searchBox__input js-search"
          placeholder="somothing keyword" />
  </div>


<ul class="list js-todo_list">
 <li class="list__item" v-for="i in tasks" v-bind:key="i.id">
  <i class="fa fa-circle-thin" aria-hidden="true" />
   <input type="text" v-model="i.text" class="editText" />
   <span></span>
  <i class="fa fa-trash icon-trash" v-on:click="this.tasksPush" aria-hidden="true" />
 </li>
</ul>

<div>
  `,
  //
  data: function () {
    return {//戻り値は複数返すようにする
      tasks: [
        { id: this.createHashId(), text: 'sample1', editMode: false },
        { id: this.createHashId(), text: 'sample2', editMode: false }
      ]
    }
  },

  methods: {
    /*  一意なIDを生成する */
    createHashId: function () {
      let createId = uuidv4();
      return createId;
    },

    /* dataに配列を追加する */
    tasksPush: function (nextData) {
      //let nextData = { id: 3, text: 'ccc' }
      this.tasks.push(nextData);
    },

    /* key入力したらタスク登録する */
    taskCreate: function (event) {
      //let inputText = event.target.value;//入力文字をキャッシュ

      if (event.keyCode === 13 & event.shiftKey === true) {//shift + Ent

        let inputText = event.target.value;
        if (inputText) {
          let nextData = this.tasks;//dataをキャッシュして変数に
          nextData.push({ id: this.createHashId(), text: inputText });
          return nextData;
        } else {

          // 未入力の処理
        }
      }
    }
  }



});

// =============
// taskあれこれ
// =============
// 文字入力した内容でTaskを登録する
// まずdataのtasksに配列を追加する②
// tasksを更新する
// tasksをループ処理して展開する
// ループ処理したものを描画する





// ==============================================
// Taskに登録する
// ==============================================
// 入力フォームに文字入力する
// Task:キャッシュ
// shift + Entおす
// Taskが空ならバリデーション
// Taskに中身があれば以下の処理を進める
// ①配列群に追加
// ②配列の中のTextに入れる

// DOMを描画する
// そこにタグを加える





new Vue({ el: '#app' })
