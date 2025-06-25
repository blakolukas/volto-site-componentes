import { withBlockExtensions } from '@plone/volto/helpers';
import UltimasNoticiasView from './DefaultView';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUltimas } from '../../../actions/ultimas/ultimas';

const UltimasBlockList = (props) => {
  const { data, isEditMode } = props;
  const dispatch = useDispatch();
  const items = useSelector((state) => state.ultimas?.data);

  // Limita o número de itens entre 1 e 4 (ou 2 e 4, se preferir)
  const maxItems = Math.max(1, Math.min(data?.maxItems || 4, 4));
  const limitedItems = items ? items.slice(0, maxItems) : [];

  useEffect(() => {
    dispatch(listUltimas(data?.options));
  }, [dispatch, data?.options]);

  return (
    <UltimasNoticiasView
      {...data}
      isEditMode={isEditMode}
      items={limitedItems}
      variationId={'list'}
    />
  );
};

export default withBlockExtensions(UltimasBlockList);
