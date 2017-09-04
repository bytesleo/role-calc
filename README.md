# role-calc

[![NPM version](https://badge.fury.io/js/role-calc.svg)](https://npmjs.org/package/role-calc) [![Build Status](https://travis-ci.org/kevoj/role-calc.svg?branch=master)](https://travis-ci.org/kevoj/role-calc) [![dependencies Status](https://david-dm.org/kevoj/role-calc/status.svg)](https://david-dm.org/kevoj/role-calc) [![devDependencies Status](https://david-dm.org/kevoj/role-calc/dev-status.svg)](https://david-dm.org/kevoj/role-calc?type=dev)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/kevoj/role-calc/master/LICENSE)

> library to work with roles, contains calculation of times for the session, validation of required roles

This library is ideal for working with [redis-jwt](https://github.com/kevoj/redis-jwt)

## Installation

Npm

```bash
npm install role-calc --save
```

Yarn
```bash
yarn add role-calc
```

## Usage

### has

```javascript

import {has} from 'role-calc';

// Roles required
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

// Roles user
let candidates = [
	'Developer',
	'Administrator',
	'Designer'
];

// if it contains one
has(required, candidates);						// -> true
has(['Developer', 'Director'], candidates);		// -> true
has(required, ['Other', 'Fake']);				// -> false

// must meet everyone '*'
has(required, candidates, '*');					// -> true
has(['Developer', 'Analyst'], candidates, '*');	// -> false
has(required, ['Developer', 'Other'], '*');		// -> false
has(required, ['Developer', 'Developer'], '*');	// -> true


```

### time

```javascript

import {time} from 'role-calc';

// Roles with time
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

/*
time(roles, option, format)

- roles: array
- option: max, min, sum, average
- format(optional): milliseconds, seconds, minutes, hours, days, weeks, months, years
*/

time(roles, 'sum');				// -> 533805 minutes
time(roles, 'max', 'hours');	// -> 8766 hours
time(roles, 'min', 'minutes');	// -> 15 minutes
time(roles, 'average', 'days');	// -> 61.782986111111114 days

```

## Development

### Start

`npm start`

### Serve

`npm run serve`

### Build

`npm run build`

### Test

`npm test`

## License

MIT © [Leonardo Rico](https://github.com/kevoj/role-calc/blob/master/LICENSE)