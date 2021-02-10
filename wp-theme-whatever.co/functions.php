<?php

add_theme_support('title-tag');
add_theme_support('post-thumbnails');

function custom_theme_assets()
{
  wp_enqueue_style('style', get_stylesheet_uri());
}

add_action('wp_enqueue_scripts', 'custom_theme_assets');

function whatever_theme_setup()
{
  add_theme_support('editor-styles');
  add_editor_style('editor-style.css');
}
add_action('after_setup_theme', 'whatever_theme_setup');

add_image_size("hero_image_mobile", 1200, 1200, true);

function disable_image_sizes($new_sizes)
{
  unset($new_sizes['medium']);
  unset($new_sizes['medium_large']);
  unset($new_sizes['large']);
  unset($new_sizes['1536x1536']);
  unset($new_sizes['2048x2048']);
  return $new_sizes;
}
add_filter('intermediate_image_sizes_advanced', 'disable_image_sizes');
add_filter('big_image_size_threshold', '__return_false');
