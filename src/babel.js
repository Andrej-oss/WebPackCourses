async function start() {
return new Promise(resolve => {
    resolve('async is working')
})
}
const t = 7;
start().then(data => console.log(data));
class Util {
    static id = new Date();
}

console.log(Util.id);

import ('lodash').then(_ => {
    console.log('lodash',  _.castArray({ 'a': 1 }))
});
