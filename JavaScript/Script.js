//email validation
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  const $result = $("#validationcheck");
  const email = $("#email").val();
  $result.text("");
  if (validateEmail(email)) {
    $result.text("this email is valid!");
    $result.css("color", "green");
  } else {
    $result.text("this email is not valid");
    $result.css("color", "red");
  }
  if (email == ""){
    $result.text("");
  }
  return false;
}
$("#email").on("input", validate);

//password visibility
$("#togglepassword").click(function visible() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  });

//current year copyright
$('#copyright').html("<p> &copy; Copyright "+ new Date().getFullYear() + "<br> All Rights Reserved.</p>");

//change images on product landing page
$(".imgs").on("click", function swap() {
  var picNumber = $(this).attr("id");
  document.getElementById("expandedImg").src=`../midia/cardigan${picNumber}.jpg`;
});

//shopping cart
let carts = document.querySelectorAll('.add-cart');
let products = [
  {
    name: "Kristina Dam Oak Table With",
    tag: "product1",
    price: 799.5,
    inCart: 0,
  },
  {
    name: "Hay - About A Lounge Chair AAL",
    tag: "product2",
    price: 659.5,
    inCart: 0,
  },
  {
    name: "Active Facial Mask and Charcoal",
    tag: "product3",
    price: 129.5,
    inCart: 0,
  },
  {
    name: "Cocktail Table Walnut | YES",
    tag: "product4",
    price: 299.9,
    inCart: 0,
  },
  {
    name: "Hay - About A Lounge Chair AAL",
    tag: "product5",
    price: 659.5,
    inCart: 0,
  },
  {
    name: "TORY DESK CALENDAR",
    tag: "product6",
    price: 410.9,
    inCart: 0,
  },
  {
    name: "CH445 Wing Chair SUITE NY",
    tag: "product7",
    price: 330.5,
    inCart: 0,
  }
]

for (let i=0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = Number(productNumbers);
  if(productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
      product.inCart = 1;
      cartItems = {
        [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = Number(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price)    
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="product d-flex column my-3 mx-3 border-bottom justify-content-around">

        <div class="product d-flex column col-3">          
          <img class="img-fluid" style="max-width: 25%;" src="../midia/${item.tag}.png">
          <h3>${item.name}</h3>
        </div>

        <div class="price col-3">
          <p>$${item.price}</p>
        </div>

        <div class="d-flex column">
          <span class="mx-2">${item.inCart}</span>          
        </div>

        <div>
          <h5>$${item.inCart * item.price}</h5>
        </div>

      </div>
      `
    });
    productContainer.innerHTML += `
    <div class="product d-flex column justify-content-between my-3 mx-3 border-bottom">
      <p>total cost:</p>
      <h3>$${cartCost}</h3>
    </div>
    `
  }
}

onLoadCartNumbers();
displayCart();