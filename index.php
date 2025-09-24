<!-- SPA shell layout (index.php) -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.5"/>
  
  <title>Paola e Riccardo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Amarante&family=Open+Sans&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="css/style.css"/>
</head>
<body>

<div id="bg-overlay"></div>
<!-- <div class="page-tint"></div> -->

  <!-- <div id="page-curtain"></div> -->
  <div class="mobile-overlay"></div>

  <?php include 'partials/music.php'; ?>
  <!-- <?php include 'partials/corners.php'; ?> -->
  <?php include 'partials/header.php'; ?>

  <main id="spa-content"></main>

  <?php include 'partials/footer.php'; ?>

  <script src="js/main.js"></script>
  <script src="js/spa.js"></script>
  <!-- <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&v=alpha&libraries=maps3d"></script> -->
  




</body>

</html>


