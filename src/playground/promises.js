const promise = new Promise((resolve, reject) => {  // Promises are usually created by the library
    setTimeout(() => {
        resolve({
            name: 'Zach',
            age: 24,
        });
        // reject('Something went wrong!');
    }, 5000);
});

console.log('before');

// promise.then((data) => { // .then
//     console.log('1', data);
// }, (error) => { // 2nd argument automatically recognised as .catch
//     console.log('error: ', error);
// });

promise.then((data) => { // .then
    console.log('1', data);

    return new Promise((resolve, reject) => {  // Promises are usually created by the library
        setTimeout(() => {
            resolve('This is my other promise');
            // reject('Something went wrong!');
        }, 5000);
    });
}).then((str) => { // promise chaining
    console.log('Does this run?', str); // YES
}).catch((error) => { // .catch, more explicit
    console.log('error: ', error);
});

console.log('after');