import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Menu Lateral',
    defaultMessage: 'Menu Lateral',
  },
  description: {
    id: 'Menu Lateral Descrição',
    defaultMessage: 'Título do menu lateral',
  },
  title_titulo: {
    id: 'Título',
    defaultMessage: 'Título',
  },
  description_titulo: {
    id: 'Título Descrição',
    defaultMessage: 'Título a ser descrito no menu lateral',
  },
  title_caminho: {
    id: 'Caminho',
    defaultMessage: 'Caminho',
  },
  description_caminho: {
    id: 'Caminho Descrição',
    defaultMessage: 'Caminho para buscar os itens do menu lateral',
  },
});

export const menuLateralSchema = (props) => {
  return {
    title: props.intl.formatMessage(messages.title),
    description: props.intl.formatMessage(messages.description),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'caminho'],
      },
    ],
    properties: {
      title: {
        title: props.intl.formatMessage(messages.title_titulo),
        description: props.intl.formatMessage(messages.description_titulo),
        widget: 'textarea',
      },
      caminho: {
        title: props.intl.formatMessage(messages.title_caminho),
        description: props.intl.formatMessage(messages.description_caminho),
        widget: 'text',
      },
    },
    required: ['title', 'caminho'],
  };
};
