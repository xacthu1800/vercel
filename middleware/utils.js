
function calculateTotalQuantity(req, res, next) {
    let totalQuantity = 0;
    if (req.session.cart) {
        for (let productId in req.session.cart) {
            totalQuantity += req.session.cart[productId];
        }
    }
    res.locals.carts = totalQuantity;
    next();
}

// Tạo mã đơn hàng từ thời gian hiện tại và tổng tiền
function generateOrderCode(tongTien) {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    // Tạo mã đơn hàng
    const orderCode = `${day}${month}${year}${hour}${minute}${second}`;
    return orderCode;
}

function convertCartToString(cart) {
    let cartString = '';
    for (const [product, quantity] of Object.entries(cart)) {
        cartString += `${product} - ${quantity}; `;
    }
    // Xóa dấu cách ở cuối chuỗi
    cartString = cartString.trim();
    return cartString;
}

function getCurrentDate() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0'); // Lấy ngày và đảm bảo định dạng là 2 chữ số, thêm '0' nếu cần
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng và đảm bảo định dạng là 2 chữ số, thêm '0' nếu cần
    const year = now.getFullYear(); // Lấy năm

    // Kết hợp ngày, tháng và năm thành chuỗi định dạng "DD-MM-YYYY"
    const currentDate = `${day}-${month}-${year}`;

    return currentDate;
}

module.exports = {
    calculateTotalQuantity,
    generateOrderCode,
    convertCartToString,
    getCurrentDate
};
