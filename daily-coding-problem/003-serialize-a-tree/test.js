const t = require('tap');

const Node = require('./node.js');

const a = new Node(1);
const b = new Node(2);
const c = new Node(3);
const d = new Node(4);
const e = new Node(5);

a.left = b;
a.right = c;
c.left = d;
d.right = e;

const string = '1,2,3,,,4,,,,,,,5';

t.equal(Node.serialize(a), string);
t.equal(Node.deserialize(string).right.left.right.value, e.value);
t.throws(() => Node.deserialize(string).right.left.left);
