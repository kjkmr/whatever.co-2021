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

function my_admin_enqueue_scripts()
{
  wp_enqueue_style('my-google-font', '//fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500;700&display=block', false, null, 'all');
}
add_action('admin_enqueue_scripts', 'my_admin_enqueue_scripts');

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

function extend_tiny_mce_before_init($mce_init)
{
  $mce_init['cache_suffix'] = 'v=' . time();
  return $mce_init;
}
add_filter('tiny_mce_before_init', 'extend_tiny_mce_before_init');
