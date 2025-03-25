import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const GridServicos = ({ items = [] }) => {
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    const target = document.getElementById('page-document');
    if (target) {
      setPortalTarget(target);
      target.style.display = 'flex';
    }
  }, []);

  if (!portalTarget) return null; // Wait until the target is ready

  return createPortal(
    <div
      className="nav-grid"
      style={{ width: '20%', padding: '120px 0 0 40px' }}
      ref={(el) => {
        if (el && portalTarget?.firstChild !== el) {
          portalTarget.insertBefore(el, portalTarget.firstChild); // Move to first position
        }
      }}
    >
      <div className="nav-grid-link">
        {items.map((item) => (
          <a
            href={
              item['@type'] === 'Link'
                ? item.getRemoteUrl
                : item.getURL
                  ? item.getURL
                  : item['url']
            }
            key={item['@id']}
          >
            <div className="nav-grid-item" key={item['@id']}>
              <div className="nav-content">
                <h3>{item.title}</h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>,
    portalTarget,
  );
};

export default GridServicos;
