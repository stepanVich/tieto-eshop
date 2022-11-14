<!DOCTYPE html>
<html>

	<head>
		<title>E-shop Main Page</title>
		<meta charset="UTF-8">
		<?php require("includes/external_files.php"); ?>
		<link rel="stylesheet" href="css/main.css" />
	</head>

	<body>

		<?php require("includes/sticky-nav.php"); ?>

		<div class="container list-of-products">
			<h2 class="main-heading">Featured Products</h2>
			<div class="row list-of-products-flex">
				<?php 
					// fetch products data
					$data = file_get_contents("data/products.json");
					$json = json_decode($data, true);
					foreach ($json as $products => $product) {
						$product_url = "product.php?id=".$product["id"]; 
						?>
						<div class="col-md-3">
							<article id="product-<?php echo $product['id']; ?>" class="product" data-product-id=<?php echo $product['id']; ?>>
								<a href="<?php echo $product_url ?>" class="product-image-wrap">
									<div class="product-image-overlay">
										<div class="product-image-overlay-child">
											<button class="product-add-one">+</button>
											<span class="product-count">0</span>
											<button class="product-remove-one">-</button>
										</div>
									</div>
									<img class="product-image" src="images/products/<?php echo $product['images'][0] ?>" />
								</a>
								<div class="product-brand">Mr & Mrs White</div>
								<a href="<?php echo $product_url ?>" class="product-link"><?php echo $product['name']; ?></a>
								<div class="product-price"><?php echo $product['price']; ?></div>
							</article>
						</div>
						<?php
					}					
					?>

			</div>
		</div>

		

	</body>




</html>