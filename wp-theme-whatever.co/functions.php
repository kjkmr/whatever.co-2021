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
