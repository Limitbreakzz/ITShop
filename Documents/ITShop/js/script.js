// ตัวแปรเก็บข้อมูลสินค้าที่ถูกเพิ่มในตะกร้า
let cart = [];

// ฟังก์ชันสำหรับเพิ่มสินค้าไปยังตะกร้า
function addToCart(button) {
    const productElement = button.closest('.product');
    const productName = productElement.getAttribute('data-name');
    const productPrice = productElement.getAttribute('data-price');

    const product = {
        name: productName,
        price: parseInt(productPrice)
    };

    // เพิ่มสินค้าในตะกร้า
    cart.push(product);

    // อัพเดต Local Storage
    updateLocalStorage();

    // อัพเดตจำนวนสินค้าที่ตะกร้า
    updateCartCount();
    updateCartItems();
    toggleCart();  // แสดงตะกร้าเมื่อมีการเพิ่มสินค้า
}

// ฟังก์ชันอัพเดตจำนวนสินค้าในตะกร้า
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length; // อัพเดตจำนวนสินค้าที่ตะกร้า
}

// ฟังก์ชันแสดงรายการสินค้าในตะกร้า
function updateCartItems() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    
    // ล้างรายการสินค้าในตะกร้า
    cartItems.innerHTML = '';
    let total = 0;

    // เพิ่มสินค้าลงในรายการ
    cart.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - ฿${product.price}`;

        // สร้างปุ่มลบสินค้า
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'ลบ';
        deleteButton.onclick = function () {
            removeFromCart(index);
        };

        listItem.appendChild(deleteButton);
        cartItems.appendChild(listItem);
        total += product.price;
    });

    // อัพเดตราคาสุทธิ
    totalPrice.textContent = total;
}

// ฟังก์ชันลบสินค้าจากตะกร้า
function removeFromCart(index) {
    // ลบสินค้าที่ตำแหน่ง index
    cart.splice(index, 1);

    // อัพเดต Local Storage
    updateLocalStorage();

    // อัพเดตจำนวนสินค้าและรายการในตะกร้า
    updateCartCount();
    updateCartItems();
}

// ฟังก์ชันเปิด/ปิดตะกร้า
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('show');  // เปลี่ยนแสดงผลให้เปิด/ปิด
}

// ฟังก์ชันสำหรับเช็คเอาท์
function checkout() {
    alert("ขอบคุณที่ซื้อสินค้ากับเรา!");
    cart = [];  // ล้างตะกร้าเมื่อทำการเช็คเอาท์

    // อัพเดต Local Storage หลังจากล้างตะกร้า
    updateLocalStorage();

    updateCartCount();
    updateCartItems();
}

// ฟังก์ชันอัพเดต Local Storage
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ฟังก์ชันสำหรับโหลดตะกร้าจาก Local Storage เมื่อโหลดหน้าใหม่
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        updateCartItems();
    }
}

// โหลดตะกร้าจาก Local Storage เมื่อหน้าโหลด
loadCartFromLocalStorage();
