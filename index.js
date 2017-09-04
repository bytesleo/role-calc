var role = require('./dist/index');

// time

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

let sum = role.time(roles, 'sum');
let max = role.time(roles, 'max', 'hours');
let min = role.time(roles, 'min', 'minutes');
let average = role.time(roles, 'average', 'days');

console.log(`
	time
		sum: ${sum}
		max: ${max}
		min: ${min}
		average: ${average}
`);


// require

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

let any1 = role.has(required, candidates);
let any2 = role.has(['Developer', 'Director'], candidates);
let any3 = role.has(required, ['Other', 'Fake']);

let all1 = role.has(required, candidates, '*');
let all2 = role.has(['Developer', 'Analyst'], candidates, '*');
let all3 = role.has(required, ['Developer', 'Other'], '*');
let all4 = role.has(required, ['Developer', 'Developer'], '*');

console.log(`
	has
		any
			any1: ${any1}
			any2: ${any2}
			any3: ${any3}
		*
			all1: ${all1}
			all2: ${all2}
			all3: ${all3}
			all4: ${all4}
`);
