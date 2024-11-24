// Kiểm tra khi nhấn Đăng ký
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Ngừng gửi form

    // Lấy giá trị các trường input
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    // Kiểm tra mật khẩu và xác nhận mật khẩu có trùng khớp không
    if (password !== confirmPassword) {
        alert('Mật khẩu và xác nhận mật khẩu không trùng khớp!');
        return;
    }

    // Nếu không có lỗi, gửi form
    this.submit(); // Gửi form thực sự (có thể gửi lên server hoặc thực hiện xử lý khác)
});


let cart = [];

function addToCart(id, name, price) {
    let existingItem = cart.find(item => item.id === id);
    const button = document.getElementById(`add-to-cart-${id}`);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    // Cập nhật số lượng trên nút
    const itemInCart = cart.find(item => item.id === id);
    button.innerText = `Đã thêm ${itemInCart.quantity} sản phẩm`;

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()} VND</span>
                <button onclick="removeFromCart(${item.id})">Xóa</button>
            </div>
        `;
    });

    totalPrice.innerText = `${total.toLocaleString()} VND`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}
// Lưu trữ một chuỗi
localStorage.setItem("username", "MerStore");

// Lưu trữ số
localStorage.setItem("userAge", 24);
let gh = JSON.parse(localStorage.getItem('gh')) || [];

// Thêm sản phẩm vào giỏ hàng
function addToCart(id, name, price) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    alert('Sản phẩm đã được thêm vào giỏ hàng.');
}

// Cập nhật số lượng huy hiệu giỏ hàng
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalQuantity > 0) {
        badge.style.display = 'block';
        badge.innerText = totalQuantity;
    } else {
        badge.style.display = 'none';
    }
}

// Hiển thị/ẩn popup giỏ hàng
function toggleCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    if (cartPopup.style.display === 'block') {
        cartPopup.style.display = 'none';
    } else {
        renderCartItems();
        cartPopup.style.display = 'block';
    }
}

// Hiển thị danh sách sản phẩm trong giỏ hàng
function renderCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Giỏ hàng trống.</p>';
        document.getElementById('cart-total').innerText = 'Tổng cộng: 0 VND';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        total += item.quantity * item.price;

        itemDiv.innerHTML = `
            <span>${item.name} - ${item.quantity} x ${item.price.toLocaleString()} VND</span>
            <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
            <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
            <button onclick="removeFromCart(${item.id})">Xóa</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    document.getElementById('cart-total').innerText = `Tổng cộng: ${total.toLocaleString()} VND`;
}

// Thay đổi số lượng sản phẩm
function updateCartQuantity(id, change) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
            updateCartBadge();
        }
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartBadge();
}

// Cập nhật badge khi tải trang
updateCartBadge();
