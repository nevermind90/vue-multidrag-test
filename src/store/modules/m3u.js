import Vue from 'vue'

export default {
  state: {
    rows: [
      {id: 1, selected: false, name: "soccer ball"},
      {id: 2, selected: false, name: "washcloth"},
      {id: 3, selected: false, name: "fridge"},
      {id: 4, selected: false, name: "bottle of ink"},
      {id: 5, selected: false, name: "rabbit"},
      {id: 6, selected: false, name: "container of pudding"},
      {id: 7, selected: false, name: "shawl"},
      {id: 8, selected: false, name: "toilet paper tube"},
      {id: 9, selected: false, name: "ipod charger"},
      {id: 10, selected: false, name: "class ring"},
      {id: 11, selected: false, name: "lip gloss"},
      {id: 12, selected: false, name: "lion"},
      {id: 13, selected: false, name: "desk"},
      {id: 14, selected: false, name: "dove"},
      {id: 15, selected: false, name: "rolling pin"},
      {id: 16, selected: false, name: "marble"},
      {id: 17, selected: false, name: "pillow"},
      {id: 18, selected: false, name: "boom box"},
      {id: 19, selected: false, name: "postage stamp"},
      {id: 20, selected: false, name: "tea pot"}
    ]
  },
  getters: {
    allRows: state => {
      return state.rows.filter(row => row.status !== "delete");
    }
  },
  actions:{
    async reorderRows(state,{ rowIds }) {
      await this.commit("reorderRows", { rowIds });
    }
  },
  mutations: {
    reorderRows(state, { rowIds }) {
      const rows = state.rows.filter(r => rowIds.indexOf(r.id) < 0);
      const targetIx = state.rows.reduce((res, row, ix) => {
        ix = rowIds.indexOf(row.id) >= 0 ? ix : res;
        return Math.min(ix, res);
      }, rows.length);
      const reorderedRows = rowIds.map(id => state.rows.find(r => r.id === id));
      rows.splice(targetIx, 0, ...reorderedRows);
      state.rows = rows;
    },
    setRowProperty(state, { rowId, property, value }) {
      let key = state.rows.findIndex(row => row.id === rowId);
      if (key === -1) {
        return;
      }
      let currentElement = state.rows[key];
      currentElement[property] = value;
      Vue.set(state.rows, key, currentElement);
    }
  }
};
