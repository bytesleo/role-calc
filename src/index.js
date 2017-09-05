import moment from 'moment';
import ms from 'ms';

// calc
export function calc(roles, get, format) {

    if (roles.length > 0) {

        let array = [];
        let val = null;

        roles.forEach(role => role.ttl ? array.push(parseInt(ms(role.ttl || 0).toFixed(1))) : null);

        switch (get) {
            case 'max':
                val = Math.max.apply(null, array);
                break;

            case 'min':
                val = Math.min.apply(null, array);
                break;

            case 'sum':
                val = array.reduce((sum, x) => sum + x);
                break;

            case 'average':
                val = array.reduce((sum, x) => sum + x) / array.length;;

                break;

            default:
        }

        format = format || 'minutes';
        val = `${moment.duration(val, 'milliseconds').as(format)} ${format}`;

        return val;

    } else {
        return null;
    }

}

// time
export function time(base, user) {

    user = duplicity(user);

    let roles = [];
    user.forEach(role => base.forEach(brole => role === brole.role ? roles.push(brole) : null));
    return roles;
}

// has
export function has(base, user, filter) {

    let val = null;

    switch (filter) {
        case '*':
            val = all(base, user);
            break;
        default:
            val = any(base, user);

    }
    return val;
}

// any
function any(base, user) {

    let found = false;
    user.forEach(_user => base.includes(_user) ? found = true : null);
    return found;
}

// all
function all(base, user) {

    base = duplicity(base);
    user = duplicity(user);

    let count = 0;
    user.forEach(_user => base.includes(_user) ? count++ : null);

    // console.log(`

    // base: ${base.length}
    // user: ${user.length}
    // count: ${count}

    // `);

    return base.length == count;
}

// duplicity
function duplicity(array) {
    return array.filter((elem, index, self) => index == self.indexOf(elem));
}
