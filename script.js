document.addEventListener("DOMContentLoaded", function () {
    let cartItems = [];
    const buttons = document.querySelectorAll(".add-to-cart");
    const cartSection = document.getElementById("chart-section");
    const totalAmount = document.getElementById("total-amount");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const itemName = this.dataset.name;
            const itemPrice = parseFloat(this.dataset.price);

            // Check if the item already exists
            const existingItem = cartItems.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartSection.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {
            total += item.price * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartSection.appendChild(cartItem);

            // Animation effect
            cartItem.style.opacity = "0";
            cartItem.style.transform = "translateY(-10px)";
            setTimeout(() => {
                cartItem.style.opacity = "1";
                cartItem.style.transform = "translateY(0)";
            }, 100);
        });

        totalAmount.textContent = `Total: $${total.toFixed(2)}`;

        // Remove button functionality
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                cartItems.splice(index, 1);
                updateCart();
            });
        });
    }
});

// Function to show selected tab
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const proceedButton = document.getElementById("proceed-payment");

    let cart = [];
    let total = 0;

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.getAttribute("data-name");
            const price = parseInt(event.target.getAttribute("data-price"));

            cart.push({ name, price });
            total += price;
            
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - ₹${item.price}`;
            cartItems.appendChild(li);
        });

        totalPrice.textContent = total;

        if (cart.length > 0) {
            proceedButton.style.display = "inline-block";
        } else {
            proceedButton.style.display = "none";
        }
    }

    proceedButton.addEventListener("click", () => {
        const phonePeUrl = `upi://pay?pa=yourupi@upi&pn=GrupNGO&mc=0000&tid=123456789&tr=987654321&tn=Order&am=${total}&cu=INR`;
        window.location.href = phonePeUrl;
    });
});

 let cart = [];

        function addToCart(itemName, price) {
            cart.push({ name: itemName, price: price });
            updateCart();
        }

        function updateCart() {
            let chartItemsContainer = document.getElementById("chart-items");
            let totalPrice = 0;
            chartItemsContainer.innerHTML = "chart-items";

            cart.forEach((item, index) => {
                let itemDiv = document.createElement("div");
                itemDiv.classList.add("chart-item");
                itemDiv.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeItem(${index})">Remove</button>`;
                chartItemsContainer.appendChild(itemDiv);
                totalPrice += item.price;
            });

            document.getElementById("total-price").innerText = `Total: $${totalPrice.toFixed(2)}`;
        }

        function removeItem(index) {
            cart.splice(index, 1);
            updateCart();
        }

        document.getElementById("proceed-to-payment").addEventListener("click", function () {
            if (cart.length === 0) {
                alert("Your cart is being processed! please Wait...");
                return;
            }
        
            let totalAmount = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        
            // ✅ Fix: Use `encodeURIComponent` to prevent URL issues
            window.location.href = `payment.html?amount=${encodeURIComponent(totalAmount)}`;
        });
        

        document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartContainer = document.getElementById("cart-items");
    const totalAmountContainer = document.getElementById("total-amount");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            let itemName = this.getAttribute("data-name");
            let itemPrice = parseFloat(this.getAttribute("data-price"));
            
            let item = cartItems.find(i => i.name === itemName);
            if (item) {
                item.quantity++;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cartItems.forEach(item => {
            let cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `${item.name} x ${item.quantity} - $${item.price * item.quantity}`;
            cartContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        totalAmountContainer.innerHTML = `Total: $${total}`;
    }

    document.getElementById("checkout").addEventListener("click", () => {
        fetch('/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartItems)
        })
        .then(response => response.json())
        .then(data => {
            alert(`Proceed to payment: ${data.payment_link}`);
            window.location.href = data.payment_link; 
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartContainer = document.getElementById("cart-items");
    const totalAmountContainer = document.getElementById("total-amount");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            let itemName = this.getAttribute("data-name");
            let itemPrice = parseFloat(this.getAttribute("data-price"));
            
            let item = cartItems.find(i => i.name === itemName);
            if (item) {
                item.quantity++;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cartItems.forEach(item => {
            let cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`;
            cartContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        totalAmountContainer.innerHTML = `Total: ₹${total}`;
    }

    document.getElementById("checkout").addEventListener("click", () => {
        fetch('/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: cartItems })
        })
        .then(response => response.json())
        .then(data => {
            alert(`Redirecting to payment...`);
            window.location.href = data.payment_link;  // Redirect to UPI payment
        })
        .catch(error => console.error("Payment failed", error));
    });
});

