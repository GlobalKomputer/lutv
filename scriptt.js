document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchinput');
    const productList = document.getElementById('product-list');
    const products = productList.getElementsByClassName('product');
    const cartButton = document.getElementById('cart-button');
    const cartSection = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    let cart = [];
    
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const product = document.querySelector(`.product[data-id="${item.id}"]`);
            const productName = product.getElementsByTagName('h2')[0].textContent;
            const productPrice = parseFloat(product.getElementsByTagName('p')[0].textContent.replace('$', ''));
            total += productPrice * item.quantity;

            const listItem = document.createElement('li');
            listItem.textContent = `${productName} - ${item.quantity} x $${productPrice.toFixed(2)}`;
            cartItems.appendChild(listItem);
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        cartButton.textContent = `Cart (${cart.length})`;

        if (cart.length > 0) {
            cartSection.classList.remove('hidden');
        } else {
            cartSection.classList.add('hidden');
        }
    }

    function addToCart(productId) {
        const productInCart = cart.find(item => item.id === productId);
        
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }

        updateCart();
    }

    // Add event listener for the 'Add to Cart' button
    Array.from(products).forEach(product => {
        const addToCartButton = product.querySelector('.add-to-cart');
        const productId = parseInt(product.getAttribute('data-id'));

        addToCartButton.addEventListener('click', () => {
            addToCart(productId);
        });
    });

    // Add event listener for the search input
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(products).forEach(product => {
            const title = product.getElementsByTagName('h2')[0].textContent.toLowerCase();
            const description = product.getElementsByTagName('p')[0].textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterProducts);

    const searchButton = document.getElementById('searchbutton');
    searchButton.addEventListener('click', filterProducts);
});
