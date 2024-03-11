const restaurantsURL = "../db/partners.json";

const restaurantsNode = document.querySelector(".restaurants");


const getData = async (URL) => {
    const res = await fetch(URL, {method: 'GET'});

    if (res.ok) {
        const data = await res.json();
        console.log(data);
        return await data;
    }

    throw new Error("Ошибка");
}

const createRestaurant = ({name, kitchen, price, stars, time_of_delivery, image, products}) => {
    // const data = await getData(restaurantsURL);
    
    const restaurantCard = `
    <div class="restaurant-card" data-product=${products}>
        <h3>${name}</h3>
        <span>${kitchen}</span>
        <ul>
            <li>${price}</li>
            <li>${stars}</li>
            <li>${time_of_delivery}</li>
        </ul>
        <img src="${image}" alt="">
    </div>
    `

    restaurantsNode.insertAdjacentHTML('beforeend', restaurantCard);
}

const openRestaurant = async e => {
    const target = e.target;
    const restaurant = target.closest('.restaurant-card');
    if (restaurant) {
        const fetchURL = `../db/${restaurant.dataset.product}`;
        const data = await getData(fetchURL);
        console.log(data);
    }
}

const init = async () => {
    const restaurantArr = await getData(restaurantsURL);
    restaurantArr.map(item => createRestaurant(item))
}

restaurantsNode.addEventListener('click', openRestaurant);

init();