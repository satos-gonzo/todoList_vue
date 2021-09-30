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
        v-model="this.inputArea"
        placeholder="something to do task"
        v-on:keyup="this.taskCreate"/>
     </div>
  </div>

  <div class="searchBox">
    <i class="fa fa-search searchBox__icon" aria-hidden="true" />
        <input type="text"
          class="searchBox__input js-search"
          v-model="search"
          placeholder="somothing keyword" />
  </div>

<ul class="list js-todo_list">
 <li class="list__item"
     v-bind:id="i.id"
     v-bind:key="i.id"
     v-for="i in filterItem"
     v-bind:class="{isDone:i.isDone}">
  <i class="fa fa-circle-thin icon-check"
     aria-hidden="true"
     v-on:click="handleCheck(i)"></i>
   <input type="text"
      v-model="i.text"
      v-on:keyup="taskUpdate(event,i)"
      v-bind:class="{hideDom:!i.editMode}"
      class="editText"/>
   <span
      v-on:click="changeEditMode(i)"
      v-bind:class="{hideDom:i.editMode}">{{i.text}}</span>
  <i class="fa fa-trash icon-trash" aria-hidden="true"
   v-on:click="handleRemove"></i>
 </li>
</ul>

<div>
  `,
  //this.createHashId()
  data: function () {
    return {//戻り値は複数返すようにする
      tasks: [
        { id: this.createHashId(), text: 'sample1', editMode: false, isDone: false, searchWord: '' },
        { id: this.createHashId(), text: 'sample2', editMode: false, isDone: false, searchWord: '' },
        { id: this.createHashId(), text: 'test1', editMode: false, isDone: false, searchWord: '' }
      ],
      inputArea: '',
      search: ''
      //ここをv-modelでbindすると入力後文字が消える
    }
  },

  // ==============================================
  // 検索
  // ==============================================
  // 入力文字をキャッシュ
  /* 検索機能で使用 */
  // inputに入力した文字列の一部があればその配列をすべて返す
  computed: {
    filterItem: function () {
      // dataを配列に入れる
      // 現在のdataを展開する
      // dataのtextプロパティの一部にinpuTextがあるかチェック
      return this.searchItem(this.tasks, this.search);
    }
  },


  methods: {
    /* 検索処理 */
    // textが部分一致しているオブジェクトを返す
    searchItem: function (array, key) {
      return array.filter(function (i) {
        return i.text.indexOf(key) !== -1 || key === "";
      });
    },


    /*  一意なIDを生成する */
    createHashId: function () {
      let createId = uuidv4();
      return createId;
    },

    /* key入力したらタスク登録する */
    taskCreate: function (event) {
      //let inputText = event.target.value;//入力文字をキャッシュ
      //shift + Ent
      if (event.keyCode === 13 & event.shiftKey === true) {
        let inputText = event.target.value;
        if (inputText) {
          let currentData = this.tasks;
          let nextData = { id: this.createHashId(), text: inputText, editMode: false, isDone: false, searchWord: '' }
          return currentData.push(nextData);

        } else {

          // 未入力の処理
        }
      }
    },
    /* タスクを削除する削除 */
    handleRemove: function (event) {
      let trashIcon = event.target;//ゴミは箱のタグ
      if (trashIcon.classList.contains('icon-trash')) {
        let listItem = trashIcon.closest('.list__item');//
        // id属性値の取得
        let id_number = ''
        id_number = listItem.getAttribute('id');
        // dataの配列群を取得
        let array = this.tasks;
        // 削除するDOMを取得
        let remove_data = array.filter((key) => key.id == id_number);
        //console.log(remove_data);
        //console.log(remove_data[0].id);

        // クリックしたタグのIDとdata配列内のidが一致していれば削除
        if (remove_data[0].id == id_number) {
          // dataのIDと一致するID以外を配列に残す
          this.tasks = array.filter((id) => {
            return (id.id != remove_data[0].id);
          })
        }
      }
    },
    /* taskのstatusの切り替え */
    // 引数を指定するメソッドをつくり、HTMLタグにbindする場合に引数を指定する
    handleCheck: function (i) {
      i.isDone = i.isDone ? false : true;//trueならfalseにする
      //console.log(i.isDone);
      return i.isDone;
    },

    /* taskの編集ステータスの切り替え*/
    changeEditMode: function (i) {
      i.editMode = i.editMode ? false : true;
      //console.log(i.editMode);
      return i.editMode;
    },

    /* タスク名編集 */
    taskUpdate: function (event, i) {
      let val = event.target.value;
      if (event.keyCode === 13 && event.shiftKey === true) {
        //console.log(val)
        i.text = val;//dataを更新
        i.editMode = (i.editMode === true) ? false : true;
        return i.text;
      }
    }


  }

});



new Vue({ el: '#app' })
