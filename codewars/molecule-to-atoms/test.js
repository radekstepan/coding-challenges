const t = require('tap');

const parse = require('./parse.js');

t.deepEqual(parse('A(B)C'), { 'A': 1, 'B': 1, 'C': 1 });
t.deepEqual(parse('H2O'), { 'H': 2, 'O': 1 });
t.deepEqual(parse('Mg(OH)2'), { 'Mg': 1, 'O': 2, 'H': 2 });
t.deepEqual(parse('K4[ON(SO3)2]2'), { 'K': 4, 'O': 14, 'N': 2, 'S': 4 });
t.deepEqual(parse('B2H6'), { 'B': 2, 'H': 6 });
t.deepEqual(parse('C6H12O6'), { 'C': 6, 'H': 12, 'O': 6 });
t.deepEqual(parse('Mo(CO)6'), { 'Mo': 1, 'C': 6, 'O': 6 });
t.deepEqual(parse('Fe(C5H5)2'), { 'Fe': 1, 'C': 10, 'H': 10 });
t.deepEqual(parse('(C5H5)Fe(CO)2CH3'), { 'C': 8, 'H': 8, 'Fe': 1, 'O': 2 });
t.deepEqual(parse('Pd[P(C6H5)3]4'), { 'Pd': 1, 'P': 4, 'C': 72, 'H': 60 });
t.deepEqual(parse('As2{Be4C5[BCo3(CO2)3]2}4Cu5'), { 'As': 2, 'Be': 16, 'C': 44, 'B': 8, 'Co': 24, 'O': 48, 'Cu': 5 });
t.deepEqual(parse('{[Co(NH3)4(OH)2]3Co}(SO4)3'), { 'Co': 4, 'N': 12, 'H': 42, 'O': 18, 'S': 3 });
