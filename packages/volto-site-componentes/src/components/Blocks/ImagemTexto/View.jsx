import React, { useMemo } from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import './ImagemTexto.css';

const ImagemTextoBlockView = (props) => {
  const { data } = props;
  const image_data = useMemo(() => data, [data]);
  const align =
    image_data?.image_position === 'right' || image_data?.image_position === ''
      ? 'reverse'
      : '';
  const image_name = flattenToAppURL(image_data?.image);
  const image_url = image_data?.image
    ? `${image_data?.image}/@@images/image`
    : '';

  return (
    <div
      className={`imagem-texto-block-wrapper ${image_data?.background_color}`}
    >
      <div className={`container ${align}`}>
        <div className={`container-image`}>
          {image_url ? (
            <figure>
              <a href={image_data?.image}>
                <img src={image_url} alt={image_name} />
              </a>
              <figcaption>{image_name}</figcaption>
            </figure>
          ) : null}
        </div>
        <div className={`container-text`}>
          {image_data?.image_description ? (
            <p>{image_data.image_description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ImagemTextoBlockView;
