class Node {
  constructor(val, left, right) {
    if (typeof val !== 'number') throw new Error('Only numbers are accepted');

    this.value = val;
    this.left = left;
    this.right = right;
  }
  
  static serialize(node) {
    const result = [];
    let nodes = [[0, node]];
    let i = 0; // depth

    while (nodes.length) {
      nodes = nodes.reduce((nodes, [j, node]) => {
        result[Math.pow(2, i) + j - 1] = node.value; // save the node

        if (node.left)
          nodes.push([j * 2, node.left]); // save left next
        if (node.right)
          nodes.push([(j * 2) + 1, node.right]); // save right next

        return nodes;
      }, []);
      
      i++;
    }

    return '' + result;
  }

  static deserialize(string) {
    return new NodeProxy(string.split(','), 0);
  }
}

class NodeProxy {
  constructor(list, index) {
    this.list = list;
    this.index = index;

    if (Number.isNaN(this.value)) throw new Error('The node is undefined');

    this.i = !this.index ? 0 : Math.round(Math.log(this.index) / Math.log(2)); // depth
    this.j = !this.index ? 0 : this.index - Math.pow(2, this.i) + 1; // leaf
  }

  get value() {
    return parseInt(this.list[this.index], 10);
  }

  get left() {
    return new NodeProxy(this.list, Math.pow(2, this.i + 1) + (this.j * 2) - 1);
  }

  get right() {
    return new NodeProxy(this.list, Math.pow(2, this.i + 1) + (this.j * 2));
  }
}

module.exports = Node;