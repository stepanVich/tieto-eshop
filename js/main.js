$(document).ready(function() {
	let id = $(".product-page-title").data("product-id");
	// Set cookie on product cart submit
	$(".product-page-add-to-cart-form").submit(function(ev) {
		ev.preventDefault();
		let cartQuantityValue = $("#product-page-quantity").val();
		if(cartQuantityValue != 0) {
			// create object that will be saved to cookie
			let name = $(".product-page-heading").text();
			let price = $(".product-page-price").text();
			let count =$("#product-page-quantity").val();
			// save object to cookie
			createCookie(id, JSON.stringify({"name": name, "price": price, "count": count, "id": id}), 10);
		} else {
			//remove object from cookie
			eraseCookie(id);
		}
	});

	// Set value at product page input from cookie
	if($("#product-page-quantity").length) {
		$("#product-page-quantity").val(JSON.parse(readCookie(id)).count);
	}

	// set cart list
	refreshCartList();
	$("#cart-page-dynamic-list-submit").click(function(ev) {
		$(".cart-page-product-item ").each(function(i, el) {
			let count =$(el).find(".cart-page-product-count").val();
			let id = $(el).data("product-id");
			if(count != 0) {
				
				let name = $(el).find(".cart-page-product-name").text();
				let price = $(el).find(".cart-page-product-price").text();
				createCookie(id, JSON.stringify({"name": name, "price": price, "count": count, "id": id}), 10);
			} else {
				eraseCookie(id);
			}

						 
		});
	});	

	$(".product-add-one").click(function(ev) {
		ev.preventDefault();
		var $el = $(ev.target).parents(".product");
		let id = $el.data("product-id");	
		let count =parseInt($el.find(".product-count").text()) + 1;
		let name = $el.find(".product-link").text();
		let price = $el.find(".product-price").text();
		if(count > 0) {
			createCookie(id, JSON.stringify({"name": name, "price": price, "count": count, "id": id}), 10);
			$el.find(".product-count").text(count);
		} else {
			eraseCookie(id);
		}				
	});

	$(".product-remove-one").click(function(ev) {
		ev.preventDefault();
		var $el = $(ev.target).parents(".product");
		let id = $el.data("product-id");	
		let count =parseInt($el.find(".product-count").text()) - 1;
		let name = $el.find(".product-link").text();
		let price = $el.find(".product-price").text();
		if(count > 0) {
			createCookie(id, JSON.stringify({"name": name, "price": price, "count": count, "id": id}), 10);
		} else {
			eraseCookie(id);
		}	
		if(count < 0)
			count = 0;
		$el.find(".product-count").text(count);	
	});

	if($(".list-of-products").length) {
		var cookieArray = parseCookie();
		for (var i = 0; i < cookieArray.length; i++) {
			var product = JSON.parse(cookieArray[i]);
			var productId = product["id"];
			var productCount = product["count"];
			$("#product-" + productId).find(".product-count").text(productCount);
		}		
	}

});



function refreshCartList() {
	// Set cart content
	// Check if we are on cart page
	if($("#cart-page-dynamic-list").length) {
		// parse cookie
		// for each cookie add one product
		var cookieArray = parseCookie();
		for (var i = 0; i < cookieArray.length; i++) {
			var product = JSON.parse(cookieArray[i]);
			$("#cart-page-dynamic-list").append(
				`<div data-product-id=${product.id} class='row  cart-page-product-item'>
					<div class="col-md-6">
						<div class='cart-page-product-name'><a href="product.php?id=${product.id}">${product.name}</a></div>
						<div class='cart-page-product-price'>${product.price}</div>
					</div>
					<div class="col-md-6">
						<input type="number" min="0" class='cart-page-product-count form-input' value=${product.count} />
					</div>
				</div>`);
		}
		if(cookieArray.length == 0) {
			$("#cart-page-dynamic-list").text("Your cart is empty.");
		} else {
			$("#cart-page-dynamic-list").append(

			`<div class="row">
				<div class="col-md-6">
				</div>
				<div class="col-md-6">
					<button id="cart-page-dynamic-list-submit" class="form-submit" type="button">Refresh Cart</button>
				</div>
			</div>`
			);
		}
	}
}


function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function parseCookie() {
	var ca = document.cookie.split(';');
	if(ca[0] == "") return [];
	var cookieArray = [];
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		splitCookie = c.split("=");
		cookieContent = splitCookie[1];
		// Check for other cookies (for example _ga)
		if(!isNaN(parseInt(splitCookie[0])))
			cookieArray.push(decodeURIComponent(cookieContent));
	}
	return cookieArray;
}
