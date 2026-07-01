alert("JavaScript شغال");     const products = document.querySelectorAll(".product");
const invoiceBody = document.getElementById("invoiceBody");
const totalPrice = document.getElementById("totalPrice");
const discount = document.getElementById("discount");
const paid = document.getElementById("paid");
const change = document.getElementById("change");
const search = document.getElementById("search");

const newOrder = document.getElementById("newOrder");
const deleteItem = document.getElementById("deleteItem");
const clearBill = document.getElementById("clearBill");
const printBill = document.getElementById("printBill");

const date = document.getElementById("date");
const time = document.getElementById("time");

let cart = [];
let selectedRow = -1;

function updateClock() {
    const now = new Date();

    date.textContent = now.toLocaleDateString("ar-EG");
    time.textContent = now.toLocaleTimeString("ar-EG");
}

setInterval(updateClock,1000);
updateClock();

function renderInvoice() {

    invoiceBody.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${(item.qty * item.price).toFixed(2)}</td>
        `;

        row.addEventListener("click", () => {

            selectedRow = index;

            document.querySelectorAll("#invoiceBody tr").forEach(r => {
                r.classList.remove("selected");
            });

            row.classList.add("selected");

        });

        invoiceBody.appendChild(row);

        total += item.qty * item.price;

    });

    const discountValue = Number(discount.value) || 0;

    const finalTotal = Math.max(total - discountValue, 0);

    totalPrice.textContent = finalTotal.toFixed(2);

    const paidValue = Number(paid.value) || 0;

    change.value = Math.max(paidValue - finalTotal, 0).toFixed(2);

}


products.forEach(product => {

    product.addEventListener("click", () => {

        const name = product.dataset.name;
        const price = Number(product.dataset.price);

        const item = cart.find(p => p.name === name);

        if (item) {

            item.qty++;

        } else {

            cart.push({
                name: name,
                price: price,
                qty: 1
            });

        }

        renderInvoice();

    });

});

discount.addEventListener("input", renderInvoice);

paid.addEventListener("input", renderInvoice);

search.addEventListener("input", () => {

    const value = search.value.trim();

    products.forEach(product => {

        const productName = product.dataset.name;

        if (productName.includes(value)) {

            product.style.display = "flex";

        } else {

            product.style.display = "none";

        }

    });

});


clearBill.addEventListener("click", () => {

    cart = [];
    selectedRow = -1;

    discount.value = 0;
    paid.value = 0;
    change.value = "0.00";

    renderInvoice();

});

newOrder.addEventListener("click", () => {

    cart = [];
    selectedRow = -1;

    discount.value = 0;
    paid.value = 0;
    change.value = "0.00";

    renderInvoice();

});

deleteItem.addEventListener("click", () => {

    if (selectedRow === -1) {
        alert("اختر صنفًا أولاً");
        return;
    }

    cart.splice(selectedRow, 1);

    selectedRow = -1;

    renderInvoice();

});

printBill.addEventListener("click", () => {

    window.print();

});

renderInvoice();
