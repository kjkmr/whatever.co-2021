<div class="work">
  <div class="header">
    <div class="image"><?php the_post_thumbnail() ?></div>
    <div class="info">
      <div class="inner">
        <div class="date"><?php the_date() ?></div>
        <div class="title"><?php the_title() ?></div>
        <div class="tags"><span>Tag 1</span><span>Tag 2</span><span>Tag 3</span></div>
      </div>
    </div>
  </div>
  <div class="excerpt">
    <div class="text">
      <div class="title"><?php echo get_field('subtitle') ?: "(subtitle)"; ?></div>
      <div class="desc"><?php echo Get_field('overview') ?: "(overview)"; ?></div>
    </div>
    <div class="image">
      <img src="<?php echo get_field('side_image')['url'] ?: "http://placehold.jp/24/eeeeee/adadad/562x316.png?text=(image)"; ?>" alt="">
    </div>
  </div>
  <div class="entry-body"><?php the_content(); ?></div>
</div>