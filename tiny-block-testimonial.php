<?php
/**
 * Plugin Name:       Tiny Block Testimonial
 * Plugin URI:        https://wordpress.org/plugins/tiny-block-testimonial
 * Description:       Declares a simple testimonial block.
 * Requires at least: 5.5
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Vincent Dubroeucq
 * Author URI:        https://vincentdubroeucq.com/
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       tiny-block-testimonial
 * Domain Path:       /languages
 * @package           tiny-block-testimonial
 */

/*
Tiny Block Testimonial is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.
 
Tiny Block Testimonial is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with Tiny Block Testimonial. If not, see https://www.gnu.org/licenses/gpl-3.0.html.
*/

add_action( 'init', 'tiny_block_testimonial_load_textdomain' );
/**
 * Load translations
 */
function tiny_block_testimonial_load_textdomain(){
    load_plugin_textdomain( 'tiny-block-testimonial', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}


add_action( 'init', 'tiny_block_testimonial_block_init' );
/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function tiny_block_testimonial_block_init() {
	register_block_type_from_metadata( __DIR__ );
    wp_set_script_translations( 'tiny-block-testimonial', 'tiny-block-testimonial', plugin_dir_path( __FILE__ ) . '/languages' );
}
