import { dispatch } from '@rematch/core'

const account = {
  state: { error: null, username: null },
  reducers: {
    save(state, props) {
      return Object.assign({}, state, { username: props.username || null, error: !!props.error });
    }
  },
  effects: {
    async signin(props, state) {
      const { username, password } = props;

      const res = await fetch('/default/FCCodeTestAuth', { // will be proxied
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        }
      });

      if (res.status !== 200) {
        return this.save({ error: true });
      } else {
        this.save({ username });
        dispatch.messages.getNext(true); // trigger message load
      }
    },
    async signout(props, state) {
      this.save({});
    }
  }
};

export default account;
