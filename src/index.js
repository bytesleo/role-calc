import moment from 'moment';
import ms from 'ms';

export function time(roles, get, format) {

    if (roles.length > 0) {

        let array = [];
        let val = null;

        roles.forEach(role => {
            if (role.ttl)
                array.push(parseInt(ms(role.ttl || 0).toFixed(1)))
        });

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
                val = array.reduce((sum, x) => sum + x);
                val = val / array.length;
                break;

            default:
        }

        format = format || 'minutes';
        val = moment.duration(val, 'milliseconds');
        val = val.as(format);

        val = `${val} ${format}`;

        return val;

    } else {
        return null;
    }

}

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

function any(base, user) {

    let found = false;
    user.forEach(_user => base.includes(_user) ? found = true : null);
    return found;
}

function all(base, user) {

    base = duplicity(base);
    user = duplicity(user);

    let count = 0;
    user.forEach(_user => base.includes(_user) ? count++ : null);

    return user.length >= base.length ? count === base.length : count === user.length;

}

function duplicity(array) {
    return array.filter((elem, index, self) => index == self.indexOf(elem));
}
