// Select elements
const form = document.getElementById('add-item-form');
const inventoryBody = document.getElementById('inventory-body');
const totalPriceElement = document.getElementById('total-price');

// Inventory array to store items
let inventory = [];
let totalPrice = 0; // Variable to store total price of all items

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get values from form
    const itemName = document.getElementById('item-name').value;
    const itemQuantity = document.getElementById('item-quantity').value;
    const itemPrice = document.getElementById('item-price').value;

    // Calculate total price for this item
    const itemTotalPrice = itemQuantity * itemPrice;

    // Create item object
    const item = {
        name: itemName,
        quantity: itemQuantity,
        price: itemPrice,
        totalPrice: itemTotalPrice
    };

    // Add item to inventory
    inventory.push(item);

    // Update total price
    totalPrice += itemTotalPrice;

    // Clear form fields
    form.reset();

    // Update inventory list and total price on UI
    updateInventoryList();
    updateTotalPrice();
});

// Function to update the inventory list on the page
function updateInventoryList() {
    // Clear the current inventory list
    inventoryBody.innerHTML = '';

    // Loop through inventory array and add each item to the table
    inventory.forEach((item, index) => {
        const row = document.createElement('tr');

        // Add item details to the row
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
            <td>₹${item.totalPrice}</td>
            <td><button class="delete-btn" onclick="deleteItem(${index})">Delete</button></td>
        `;

        // Append the row to the table body
        inventoryBody.appendChild(row);
    });
}

// Function to update the total price on the page
function updateTotalPrice() {
    totalPriceElement.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
}

// Function to delete an item from the inventory
function deleteItem(index) {
    // Deduct the item's total price from the overall total
    totalPrice -= inventory[index].totalPrice;

    // Remove item from inventory array
    inventory.splice(index, 1);

    // Update the inventory list and total price
    updateInventoryList();
    updateTotalPrice();
}
