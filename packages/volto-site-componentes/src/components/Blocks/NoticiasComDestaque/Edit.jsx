import React from 'react';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';
import NoticiasComDestaqueView from './View';
import { noticiasDestaqueSchema } from './schema';

const NoticiasComDestaqueEdit = (props) => {
  const { selected, block, data, onChangeBlock } = props;
  const schema = noticiasDestaqueSchema(props);

  const onChangeField = (id, value) => {
    onChangeBlock(block, {
      ...data,
      [id]: value,
    });
  };

  return (
    <>
      <NoticiasComDestaqueView {...props} isEditMode />
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

export default NoticiasComDestaqueEdit;
