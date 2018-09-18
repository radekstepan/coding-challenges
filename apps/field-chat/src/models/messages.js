import firebase from "firebase/app";
import "firebase/firestore";

import config from "../data/config";

firebase.initializeApp(config.firestore);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const q = db.collection("messages")
  .orderBy("created_at", "asc") // "desc" doesn't complete in time
  .limit(50);

const init = () => ({ list: [], last: null });

const messages = {
  state: init(),
  reducers: {
    // Add messages in bulk.
    addMessages(state, next) {
      const list = [];
      next.forEach(doc => list.push(Object.assign(doc.data(), { id: doc.id })));

      const last = next.docs[next.docs.length - 1];

      return {
        ...state,
        last,
        list: state.list.concat(list)
      };
    },

    clearMessages(state) {
      return init();
    }
  },
  effects: {
    async getNext(clear, state) {
      clear && this.clearMessages(); // clear state during search
      const next = await q.startAfter(clear ? null : state.messages.last).get();
      this.addMessages(next);
    }
  }
};

export default messages;
