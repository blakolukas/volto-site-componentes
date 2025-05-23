import React from 'react';
import { BlockDataForm, SidebarPortal } from '@plone/volto/components';
import { menuLateralSchema } from './schema';
import MenuLateralBlockView from './View';

const MenuLateralBlockEdit = (props) => {
  const { selected, block, data, onChangeBlock } = props;

  const schema = menuLateralSchema(props);
  const onChangeField = (id, value) => {
    onChangeBlock(block, {
      ...data,
      [id]: value,
    });
  };

  return (
    <>
      <MenuLateralBlockView {...props} data={data} isEditMode />
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema}
          title={schema.title}
          onChangeField={onChangeField}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </>
  );
};

export default MenuLateralBlockEdit;
