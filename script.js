let catalogData = [];
let cart = JSON.parse(localStorage.getItem('shop_cart')) || [];

async function init() {
    const response = await fetch('object.json');
    catalogData = await response.json();
    render(catalogData);
    showCart();
}

function render(arr) {
    const container = document.getElementById('catalog');
    container.innerHTML = arr.map(el => `
        <div class="card">
            <div class="card-img">
                <img src="${el.img}">
            </div>
            <div class="card-info">
                <h2>Смартфон ${el.name}</h2>
                <p>Бренд: <b>${el.brand}</b></p>
                <p>Операционная система: <b>${el.os}</b></p>
                <p>Экран: <b>${el.screen}</b></p>
                <p>Память ОЗУ/ПЗУ: <b>${el.ram_rom}</b></p>
                <p>Камера: <b>${el.camera}</b></p>
                <p>Батарея: <b>${el.battery}</b></p>
                <p>Число симкарт: <b>${el.sim}</b></p>
                <div class="price">Цена: ${el.price} $</div>
                <button class="buy-btn" onclick="addToCart(${el.id})">В КОРЗИНУ</button>
            </div>
        </div>
    `).join('');
}

document.getElementById('find').oninput = function(e) {
    const val = e.target.value.toLowerCase();
    const filtered = catalogData.filter(i => i.name.toLowerCase().includes(val));
    render(filtered);
};

function addToCart(id) {
    const item = catalogData.find(x => x.id === id);
    cart.push(item);
    updateStorage();
}

function removeFromCart(i) {
    cart.splice(i, 1);
    updateStorage();
}

function emptyCart() {
    cart = [];
    updateStorage();
}

function updateStorage() {
    localStorage.setItem('shop_cart', JSON.stringify(cart));
    showCart();
}

function showCart() {
    const list = document.getElementById('cartDisplay');
    const total = document.getElementById('sum');
    list.innerHTML = cart.map((x, i) => `
        <div class="cart-item">
            <span>${x.name}</span>
            <span onclick="removeFromCart(${i})" style="cursor:pointer">❌</span>
        </div>
    `).join('');
    total.innerText = cart.reduce((acc, curr) => acc + curr.price, 0);
}

init();