const productDataUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

document.addEventListener("DOMContentLoaded", function() {
  fetch(productDataUrl)
    .then(response => response.json())
    .then(data => {
      displayProducts(data);
    })
    .catch(error => console.error('Error fetching product data:', error));
});

function openCategory(evt, categoryName) {
  let i, tabcontent, tablinks;
  
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  document.getElementById(categoryName).style.display = "block";
  evt.currentTarget.className += " active";
}

function displayProducts(products) {
  const menProducts = products.filter(product => product.category === 'men');
  const womenProducts = products.filter(product => product.category === 'women');
  const kidsProducts = products.filter(product => product.category === 'kids');
  
  displayProductCards('men', menProducts);
  displayProductCards('women', womenProducts);
  displayProductCards('kids', kidsProducts);
}

function displayProductCards(category, products) {
  const categoryTab = document.getElementById(category);
  products.forEach(product => {
    const productCard = createProductCard(product);
    categoryTab.appendChild(productCard);
  });
}

function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');
  
  const productImage = document.createElement('img');
  productImage.src = product.image;
  productCard.appendChild(productImage);
  
  const productBadge = document.createElement('span');
  productBadge.classList.add('product-badge');
  productBadge.textContent = product.badge;
  productCard.appendChild(productBadge);
  
  const productTitle = document.createElement('h2');
  productTitle.textContent = product.title;
  productCard.appendChild(productTitle);
  
  const vendorName = document.createElement('p');
  vendorName.textContent = `Vendor: ${product.vendor}`;
  productCard.appendChild(vendorName);
  
  const price = document.createElement('p');
  price.textContent = `Price: ${product.price}`;
  productCard.appendChild(price);
  
  const comparePrice = document.createElement('p');
  comparePrice.textContent = `Compare at price: ${product.compareAtPrice}`;
  productCard.appendChild(comparePrice);
  
  const discount = document.createElement('p');
  discount.textContent = `Calculated discount: ${product.discount}% off`;
  productCard.appendChild(discount);
  
  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to cart';
  productCard.appendChild(addToCartButton);
}