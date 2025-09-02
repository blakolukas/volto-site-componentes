import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Notícias com destaque',
    defaultMessage: 'Notícias com destaque',
  },
  title_right: {
    id: 'Título direita',
    defaultMessage: 'Título da lista à direita',
  },
  fonte: {
    id: 'Fonte',
    defaultMessage: 'Fonte',
  },
});

export const noticiasDestaqueSchema = (props) => ({
  title: props.intl.formatMessage(messages.title),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['titleRight', 'source'],
    },
  ],
  properties: {
    titleRight: {
      title: props.intl.formatMessage(messages.title_right),
      widget: 'text',
      default: 'Notícias',
    },
    source: {
      title: props.intl.formatMessage(messages.fonte),
      widget: 'object_browser',
      mode: 'link',
      allowExternals: false,
    },
  },
  required: [],
});
