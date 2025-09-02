import { LIST_ULTIMAS } from '../../constants/ActionTypes';
export function listUltimas(params, key) {
  let qs = '';
  if (params && typeof params === 'object' && !Array.isArray(params)) {
    const flags = Array.isArray(params.flags)
      ? params.flags.filter(Boolean).filter((p) => p !== 'Padrao')
      : [];
    const size = params.size;
    const parts = [];
    if (flags.length) {
      parts.push(...flags.map((f) => `${encodeURIComponent(f)}=true`));
    }
    if (typeof size === 'number' && size > 0) {
      parts.push(`b_size=${size}`);
    }
    if (parts.length) {
      qs = `?${parts.join('&')}`;
    }
  } else if (Array.isArray(params)) {
    const flags = params.filter(Boolean).filter((p) => p !== 'Padrao');
    if (flags.length) {
      qs = `?${flags.map((f) => `${encodeURIComponent(f)}=true`).join('&')}`;
    }
  } else if (params && params !== 'Padrao' && typeof params === 'string') {
    qs = `?${encodeURIComponent(params)}=true`;
  }

  return {
    type: LIST_ULTIMAS,
    key,
    request: {
      op: 'get',
      path: `@ultimas_noticias${qs}`,
    },
  };
}
