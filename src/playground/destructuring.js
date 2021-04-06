/** Object Destruturing */
const person = {
    name: 'Zach',
    age: 24,
    location: {
        city: 'Hong Kong',
        temp: 25,
    }
};

const { name : firstname = 'Annoymous', age } = person;
console.log(`${firstname} is ${age}.`);

const { temp: temperature, city: c } = person.location;
if (c && temperature) {
    console.log(`It's ${temperature} in ${c}.`);
}

/** Object Destruturing : Challenge */
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin',
    },
};

const {name : publisherName = 'Self-Published'} = book.publisher;
console.log(publisherName); //Penguin, Self-Published



/** Array Destruturing */
const address = ['1 Tai Man Street', 'Kowloon', 'Hong Kong', '00000'];
const [, location, city = 'Macau'] = address;
console.log(`You are in ${location} ${city}.`)

/** Array Destruturing : Challenge */
const item = ['Coffee (iced)', '$3.00', '$3.50', '$3.75'];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);