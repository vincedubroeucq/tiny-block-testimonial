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
import { useBlockProps, BlockControls, AlignmentToolbar, MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function edit( { attributes, setAttributes }) {
	const { imageId, imageHeight, imageWidth, imageSrc, imageAlt, quote, author, textAlign } = attributes;
	const setImage = image => {
		const imageWidth = ( image.sizes && image.sizes.thumbnail && image.sizes.thumbnail.width ) || image.width; 
		const imageHeight = ( image.sizes && image.sizes.thumbnail && image.sizes.thumbnail.height ) || image.height; 
		const imageSrc = ( image.sizes && image.sizes.thumbnail && image.sizes.thumbnail.url ) || image.url; 
		const imageAlt = image.alt || ''; 
		setAttributes( { imageId: image.id, imageHeight, imageWidth, imageSrc, imageAlt } );
	}

	const removeImage = e => {
		setAttributes( { imageId: 0, imageHeight: 0, imageWidth: 0, imageSrc: '', imageAlt: '' } );
	}

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ textAlign => setAttributes( { textAlign } ) }
				/>
			</BlockControls>
			<blockquote { ...useBlockProps() }>
				<div class="tiny-block-testimonial-wrapper">
					<div class="tiny-block-testimonial-image">
						{ imageId !== 0 ?
							<div class="tiny-block-testimonial-image-wrapper">
								<img src={ imageSrc } width={ imageWidth } height={ imageHeight } alt={ imageAlt } />
								<Button icon="dismiss" isDestructive="true" onClick={ removeImage }><span class="screen-reader-text">{ __( 'Remove image', 'tiny-block-testimonial' ) }</span></Button>
							</div>
							: 
							<MediaPlaceholder
								onSelect = { setImage }
								value = { imageId }
								allowedTypes = { [ 'image' ] }
								labels = { { title: __( 'Upload testimonial author image', 'tiny-block-testimonial' ) } }
							></MediaPlaceholder> 
						}
					</div>
					<div class="tiny-block-testimonial-content" style={ { textAlign: textAlign } }>
						<RichText
							tagName="p"
							value={ quote }							
							onChange={ quote => setAttributes( { quote } ) } 
							placeholder={ __( 'Write the author testimonial', 'tiny-block-testimonial' ) }
						/>
						<RichText
							tagName="cite"
							className={ textAlign ? '' : 'has-text-align-right' }
							value={ author }
							multiline="false"
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] } 
							onChange={ author => setAttributes( { author } ) } 
							placeholder={ __( 'Author name', 'tiny-block-testimonial' ) }
						/>
					</div>
				</div>
			</blockquote>
		</>
	);
}
