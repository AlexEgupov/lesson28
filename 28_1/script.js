'use strict';

const body = document.querySelector('body');

let select;
let div;
let p;

const getData = () => {
    return fetch('cars.json')
        .then((response) => response.json())
        .catch((error) => console.log(error));
};

const sendData = (car) => {

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(car),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
};

body.insertAdjacentHTML('beforeend', `
    <select>
        <option>Выбери тачку</option>
    </select>
    <div>Выбери тачку</div>
    <p></p>
`);

select = document.querySelector('select');
div = document.querySelector('div');
p = document.querySelector('p');

getData().then((data) => {
    let cars = data.cars;
    cars.forEach(elem => {
        select.insertAdjacentHTML('beforeend', `
        <option>${elem.brand}</option>
        `);
    });
    select.addEventListener('change', (e) => {
        let car = select.options[select.selectedIndex].text;
        cars.forEach((elem) => {
            if (elem.brand == car) {
                div.textContent = `Тачка ${elem.brand} ${elem.model}`;
                p.textContent = `Цена: ${elem.price}$`;
                sendData(elem);
            } else if (car == 'Выбери тачку') {
                div.textContent = car;
                p.textContent = '';
            }
        });
    });
});
