import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUltimas } from '../../../actions/ultimas/ultimas';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { ConditionalLink } from '@plone/volto/components';
import PreviewLink from '../../PreviewLink/PreviewLink';
import './NoticiasDestaque.css';
const NoticiasComDestaqueView = (props) => {
  const { data, isEditMode } = props;
  const dispatch = useDispatch();

  const blockId = useMemo(() => props?.id || 'singleton', [props?.id]);
  const mainKey = useMemo(
    () => `noticiasComDestaque:${blockId}:main`,
    [blockId],
  );
  const fillKey = useMemo(
    () => `noticiasComDestaque:${blockId}:fill`,
    [blockId],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await dispatch(
        listUltimas({ flags: ['manchete', 'destaque'], size: 4 }, mainKey),
      );
      const items = res?.result?.items || [];
      if (!cancelled && items.length < 4) {
        await dispatch(listUltimas({ size: 4 }, fillKey));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dispatch, mainKey, fillKey]);

  const ultimasState = useSelector((state) => state.ultimas);
  const mainData = ultimasState?.byKey?.[mainKey];
  const fillData = ultimasState?.byKey?.[fillKey];
  const baseItems = mainData?.data ?? ultimasState?.data ?? [];
  const isLoading =
    ((mainData?.loading ?? ultimasState?.loading) && baseItems.length === 0) ||
    false;

  const merged = (() => {
    const primary = Array.isArray(baseItems) ? baseItems : [];
    if (primary.length >= 4) return primary;
    const fallback = Array.isArray(fillData?.data) ? fillData.data : [];
    if (!fallback.length) return primary;
    const seen = new Set(primary.map((it) => it['@id']));
    const extras = fallback.filter((it) => !seen.has(it['@id']));
    return primary.concat(extras).slice(0, 4);
  })();
  const items = merged || [];
  const highlight = items[0] || null;
  const list = items.slice(1, 4);

  const rightTitle = data?.titleRight || 'Notícias';
  const rawSourceLink =
    (typeof data?.source === 'string'
      ? data?.source
      : data?.source?.[0]?.['@id'] ||
        data?.source?.['@id'] ||
        data?.source?.value) || null;
  const noticiasHref = rawSourceLink
    ? flattenToAppURL(rawSourceLink)
    : '/noticias';

  return (
    <div className="nd-wrapper">
      {isLoading && <div className="nd-loading">Carregando notícias…</div>}

      {!isLoading && (
        <div className="nd-grid">
          <div className="nd-left">
            {highlight ? (
              <ConditionalLink item={highlight} condition={!isEditMode}>
                <div className="nd-left-card">
                  <div className="nd-left-image">
                    <PreviewLink
                      item={highlight}
                      alt={highlight?.image_caption}
                      className="nd-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="nd-left-content">
                    <h2 className="nd-left-title">{highlight?.title}</h2>
                  </div>
                </div>
              </ConditionalLink>
            ) : (
              <div className="nd-empty">Sem notícias.</div>
            )}
          </div>

          <div className="nd-right">
            <h3 className="nd-right-heading">{rightTitle}</h3>
            <div className="nd-right-list">
              {list.map((item) => (
                <ConditionalLink
                  key={item['@id']}
                  item={item}
                  condition={!isEditMode}
                >
                  <div className="nd-card">
                    <div className="nd-card-image">
                      <PreviewLink
                        item={item}
                        alt={item?.image_caption}
                        className="nd-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="nd-card-content">
                      <h4 className="nd-card-title">{item.title}</h4>
                    </div>
                  </div>
                </ConditionalLink>
              ))}
            </div>
            {list.length === 0 && !highlight && (
              <div className="nd-empty">Sem notícias.</div>
            )}
            <div className="nd-dotted" />
            <div className="nd-more">
              <a href={noticiasHref} className="nd-more-link">
                MAIS NOTÍCIAS
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticiasComDestaqueView;
