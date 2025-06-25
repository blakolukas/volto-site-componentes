import React from 'react';
import UltimasBlock from './View';
import UltimasBlockList from './ViewLista';

const variationComponent = {
  default: UltimasBlock,
  list: UltimasBlockList,
};

const UltimasNoticiasViewDispatcher = (props) => {
  const { data } = props;
  const variationId = data?.variation || 'default';
  const VariationComponent = variationComponent[variationId] || UltimasBlock;
  return <VariationComponent {...props} />;
};

export default UltimasNoticiasViewDispatcher;
