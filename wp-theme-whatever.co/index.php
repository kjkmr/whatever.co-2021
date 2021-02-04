<html>

<head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js"
        integrity="sha512-oAY57i8MXmaOP7pAylNLnULAM4QLV3uGnvnXVY4zF229/zFzTvG2/5YIgH8iN8oZR2hnbkiDPd4JCJGaH4oG6g=="
        crossOrigin="anonymous"></script>
    <?php wp_head();?>
</head>

<body>
    <div class="container">
        <div class="contents">
            <div class="menu"></div>
            <div class="main">
            <div class="logo"></div>
            <?php while (have_posts()): the_post();?>
            <div class="header">
                <div class="image"><?php the_post_thumbnail()?></div>
                <div class="info">
                    <div class="inner">
                    <div class="date"><?php the_date()?></div>
                    <div class="title"><?php the_title()?></div>
                    <div class="tags"><span>Tag 1</span><span>Tag 2</span><span>Tag 3</span></div>
                    </div>
                </div>
            </div>
            <div class="excerpt">
                <div class="text">
                    <div class="title"><?php the_field('subtitle'); ?></div>
                    <div class="desc"><?php the_field('overview'); ?></div>
                </div>
                <div class="image">
                    <img src="<?php echo get_field('side_image')['url']; ?>" alt="">
                </div>
            </div>
            <div class="entry-body"><?php the_content();?></div>
            <?php endwhile;?>
        </div>
    </div>
    <?php wp_footer();?>
</body>

</html>
