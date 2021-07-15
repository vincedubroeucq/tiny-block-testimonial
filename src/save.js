/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const { imageHeight, imageWidth, imageSrc, imageAlt, quote, author, textAlign } = attributes;
	const alignClass = textAlign ? ` has-text-align-${textAlign}` : '';
	const citeAlignClass = alignClass ? '' : 'has-text-align-right';
	return (
		<blockquote { ...useBlockProps.save() }>
			<div class="tiny-block-testimonial-wrapper">
				<div class="tiny-block-testimonial-image">
					<div class="tiny-block-testimonial-image-wrapper">
						<img src={ imageSrc } width={ imageWidth } height={ imageHeight } alt={ imageAlt } />
					</div>
				</div>
				<div class={ 'tiny-block-testimonial-content' + alignClass }>
					<RichText.Content tagName="p" value={ quote } />
					<RichText.Content tagName="cite" value={ author } className={ citeAlignClass } />
				</div>
			</div>
		</blockquote>
	);
}
