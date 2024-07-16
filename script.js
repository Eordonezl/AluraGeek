document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('add-product-form');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productImage = document.getElementById('product-image');
    const productContainer = document.getElementById('product-container');

    // Cargar productos desde localStorage al cargar la página
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    savedProducts.forEach(product => addProductToDOM(product));

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validación básica
        if (productName.value.trim() === '' || productPrice.value.trim() === '' || productImage.value.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Crear el producto
        const product = {
            name: productName.value,
            price: parseFloat(productPrice.value).toFixed(2),
            image: productImage.value
        };

        // Guardar producto en localStorage
        savedProducts.push(product);
        localStorage.setItem('products', JSON.stringify(savedProducts));

        addProductToDOM(product);

        // Limpiar el formulario
        productForm.reset();
    });

    function addProductToDOM(product) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="delete-btn">&times;</button>
            </div>
        `;

        // Añadir evento para eliminar producto
        productCard.querySelector('.delete-btn').addEventListener('click', () => {
            productCard.remove();
            deleteProduct(product.name); // Eliminar de localStorage también
        });

        productContainer.appendChild(productCard);
    }

    function deleteProduct(productName) {
        const updatedProducts = savedProducts.filter(product => product.name !== productName);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
});
