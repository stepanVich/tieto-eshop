<!DOCTYPE html>
<html>

	<head>
		<title>E-shop Product Page</title>
		<meta charset="UTF-8">
		<?php require("includes/external_files.php"); ?>
		<link rel="stylesheet" href="css/main.css" />
	</head>

	<body>

		<?php require("includes/sticky-nav.php"); ?>

		<?php 
			// Fetch data
			$data = file_get_contents("data/products.json");
			$json = json_decode($data, true);
			foreach ($json as $products => $product) {
				if($product["id"] != $_GET["id"])
					continue;
		?>

		<div class="product-page-title" data-product-id=<?php echo $_GET["id"] ?>>
			<div class="container">
				<div class="row">
					<h1 class="product-page-heading"><?php echo $product["name"] ?></h1>
				</div>
			</div>
		</div>

		<div class="product-page-content container">
			<div class="row">
				<div class="col-md-6">
					<div class="product-page-price"><?php echo $product["price"] ?></div>
					<div class="product-page-description">Aenean sed ante finibus, iaculis sem nec, viverra ligula. Fusce semper posuere ipsum ut tincidunt. Aliquam in rutrum ligula. Aliquam ornare risus enim, vitae posuere neque laoreet condimentum. Proin vitae malesuada orci. Nullam quam ipsum, finibus ut erat sit amet, facilisis porta est. Quisque sollicitudin leo eu massa ornare semper. Proin sit amet metus vel eros rhoncus consectetur lobortis eu eros. Pellentesque eleifend mattis convallis.</div>
				
					<form class="product-page-add-to-cart-form">
						<label for="product-page-quantity" class="product-page-quantity-label">
							<div class="product-page-quantity-label">In Cart</div>
							<input class="form-input" type="number" name="qty" id="product-page-quantity" value="0" min="0">
						</label>
						<button class="form-submit" type="submit">Refresh Cart</button>
					</form>

				</div>
				<div class="col-md-6 order-first order-sm-first order-md-last">
					<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
					  <div class="carousel-inner">

					  	<?php
						$isActive = true;
					  	foreach($product["images"] as $img) {				  	
	
					  	?>
					    	<div class="carousel-item <?php if($isActive) echo 'active'; ?>">
					      		<img src="images/products/<?php echo $img; ?>" class="d-block w-100" alt="...">
					    	</div>
					    <?php $isActive = false; }; ?>
					  </div>
					  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
					    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
					    <span class="visually-hidden">Previous</span>
					  </button>
					  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
					    <span class="carousel-control-next-icon" aria-hidden="true"></span>
					    <span class="visually-hidden">Next</span>
					  </button>
					</div>				

				</div>
			</div>
		</div>
	<?php break;} ?>
	</body>




</html>