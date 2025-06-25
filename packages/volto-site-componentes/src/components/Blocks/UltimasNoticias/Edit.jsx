import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';
import UltimasBlock from './View';
import UltimasBlockList from './ViewLista';
import { ultimasSchema } from './schema';

const variationComponent = {
  default: UltimasBlock,
  list: UltimasBlockList,
};

const UltimasNoticiasEdit = (props) => {
  const { data, onChangeBlock, selected, block, blocksConfig } = props;
  const schema = ultimasSchema({ ...props });

  const variationId = data?.variation || 'default';
  const VariationComponent = variationComponent[variationId] || UltimasBlock;

  return (
    <>
      <VariationComponent {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema}
          formData={data}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          block={block}
          blocksConfig={blocksConfig}
          navRoot={props.navRoot}
          contentType={props.contentType}
        />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(UltimasNoticiasEdit);
