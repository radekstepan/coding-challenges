const { h, app } = hyperapp
/** @jsx h */

const rebalance = assets => {
  const totals = assets.reduce((t, a) => t + (parseFloat(a.balance) || 0), 0);
  return assets.map(a => {
    const [ target, balance ] = [a.target, a.balance].map(val => /^\d*\.?\d*$/.test(val) ? parseFloat(val) : null);
    return Object.assign(a, {
      action: target !== null && balance !== null ? parseInt((parseFloat(target) / 100) * totals - parseFloat(balance)) : 'NA'
    })
  });
};

const state = {
  active: null,
  assets: [
    { name: 'VTSMX - Vanguard Total Stock', target: '60', balance: '7000' },
    { name: 'VBMFX - Vanguard Total Bond', target: '40', balance: '3000' },
    { name: 'CASHX', target: '0', balance: '1000' }
  ]
};

const view = (state, actions) => {
  const assets = rebalance(state.assets);

  return (
    <main>
      <div class="title">Rebalancer</div>
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Target</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((a, idx) =>
            <tr class={ state.active === idx ? 'active' : '' }
                onclick={() => actions.active({ idx })}
                onfocus={() => actions.active({ idx })}
                onkeydown={() => actions.active({ idx })}
                oninput={e => actions.change({ idx, attr: e.target.className, val: e.target.value })}>
              <td><input type="text"
                         class="name"
                         value={a.name}
                         oncreate={element => !a.name && assets.length - 1 === idx && element.focus()}></input></td>
                       <td><input type="text"
                         class="target"
                         value={a.target}></input>%</td>
                       <td><sub>$</sub><input type="text"
                          class="balance"
                          value={a.balance}></input></td>
                        <td>{a.action ?
                            <div class={`action ${a.action > 0 ? 'buy' : 'sell'}`}>{a.action}</div> : '-'}</td>
            </tr>
          )}
        </tbody>
      </table>
      <input type="button"
             onclick={actions.add}
             class="add"
             value="Add Asset"></input>
    </main>
  )
};



const actions = {
  change:
    e =>
      state =>
        state.assets[e.idx] = Object.assign(state.assets[e.idx], { [e.attr]: e.val })
  ,
  active:
    e =>
      state =>
        state.active = e.idx,
  add:
    e =>
      state => ({
        active: state.assets.length,
        assets: state.assets.concat([{ target: 0, balance: 0 }])
      })
};

const main = app(state, actions, view, document.body);
