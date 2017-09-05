const role = require('./dist/index');

// calc

let roles = [
	{
		role: 'Developer',
		ttl: '15 minutes'
	},
	{
		role: 'Specialist',
		ttl: '2 hours'
	},
	{
		role: 'Manager',
		ttl: '3 days'
	},
	{
		role: 'Administrator',
		ttl: '1 years'
	},
	{
		role: 'Director',
		ttl: '90 minutes'
	},
	{
		role: 'Designer',
		ttl: '55 hours'
	},
	{
		role: 'other'
	}
];

let sum = role.calc(roles, 'sum');
let max = role.calc(roles, 'max', 'hours');
let min = role.calc(roles, 'min', 'minutes');
let average = role.calc(roles, 'average', 'days');

// has

let required = [
	'Developer',
	'Specialist',
	'Technician',
	'Director',
	'Manager',
	'Designer',
	'Analyst',
	'Administrator'
];

let candidates = [
	'Developer',
	'Administrator',
	'Designer'
];

let any1 = role.has(required, candidates); // true
let any2 = role.has(['Developer'], candidates); // true
let any3 = role.has(required, ['Other', 'Fake']); // false

let all1 = role.has(required, candidates, '*'); // false
let all2 = role.has(['Developer', 'Designer'], candidates, '*'); // true
let all3 = role.has(['Director'], ['Director', 'Other'], '*'); // true

// time

let time = role.time(roles, candidates);

console.log(`
	calc
			sum: ${sum}
			max: ${max}
			min: ${min}
			average: ${average}


	has
		any
			any1: ${any1}
			any2: ${any2}
			any3: ${any3}
		*
			all1: ${all1}
			all2: ${all2}
			all3: ${all3}
`);

console.log(`time:`, time);
