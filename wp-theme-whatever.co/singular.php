<html>

<head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js" integrity="sha512-oAY57i8MXmaOP7pAylNLnULAM4QLV3uGnvnXVY4zF229/zFzTvG2/5YIgH8iN8oZR2hnbkiDPd4JCJGaH4oG6g==" crossOrigin="anonymous"></script>
  <?php wp_head(); ?>
</head>

<body>
  <div class="container <?php echo ICL_LANGUAGE_CODE ?>">
    <div class="contents">
      <div class="menu"></div>
      <div class="main">
        <div class="logo"></div>
        <?php
        while (have_posts()) {
          the_post();
          if (in_category('work')) {
            include(TEMPLATEPATH . '/single-work.php');
          } else if (in_category('news')) {
            include(TEMPLATEPATH . '/single-news.php');
          }
        }
        ?>
      </div>
    </div>
    <div class="footer"></div>
    <?php wp_footer(); ?>
</body>

</html>