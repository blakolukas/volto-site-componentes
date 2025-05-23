import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchContent } from '@plone/volto/actions';
import { useLocation, useHistory } from 'react-router-dom'; // Importa o hook useLocation
import './MenuLateral.css';

const MenuLateralBlockView = (props) => {
  const { data, isEditMode } = props;
  const dispatch = useDispatch();
  const location = useLocation(); // Obtém o caminho atual da página
  const history = useHistory(); // Substitui useNavigate
  const searchResults = useSelector(
    (state) => state.search.subrequests?.menuLateral?.items || [],
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.caminho) {
      setLoading(true);
      dispatch(
        searchContent(
          '',
          {
            path: data.caminho,
            metadata_fields: ['Title', 'getURL', '@type'],
          },
          'menuLateral',
        ),
      ).finally(() => setLoading(false));
    }
  }, [data.caminho, dispatch]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Normaliza o valor selecionado para garantir que seja um pathname
    const normalizePath = (url) => {
      try {
        const urlObj = new URL(url); // Converte para um objeto URL
        return urlObj.pathname; // Retorna apenas o pathname
      } catch (error) {
        return url; // Retorna o valor original se não for uma URL absoluta
      }
    };

    const normalizedPath = normalizePath(selectedValue);

    if (normalizedPath) {
      history.push(normalizedPath); // Redireciona para o caminho normalizado
    }
  };

  const getSelectedValue = () => {
    const activeItem = searchResults.find((item) =>
      (item.getURL || item['@id']).toString().endsWith(location.pathname),
    );
    return activeItem ? activeItem.getURL || activeItem['@id'] : '';
  };

  return (
    <div>
      <div className="menu-lateral-caixa">
        {isEditMode && (
          <p className="menu-lateral-edit">Arraste aqui o Menu Lateral.</p>
        )}
        <div className="menu-lateral-container">
          {data.title && <h2 className="menu-lateral-title">{data.title}</h2>}
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ul className="menu-lateral-list">
              {searchResults.map((item) => {
                const isActive = (item.getURL || item['@id'])
                  .toString()
                  .endsWith(location.pathname.replace('/edit', '')); // Verifica se o link corresponde ao caminho atual
                return (
                  <li
                    key={item['@id']}
                    className={isActive ? 'menu-lateral-item-active' : ''}
                  >
                    {isActive ? (
                      <button
                        className="menu-lateral-link-active"
                        disabled
                        aria-disabled="true"
                      >
                        <i className="fa-solid fa-chevron-down"></i>
                        {item.Title}
                      </button>
                    ) : (
                      <a
                        href={item.getURL || item['@id']}
                        className="menu-lateral-link"
                      >
                        <i className="fa-solid fa-chevron-right"></i>
                        {item.Title}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="menu-lateral-dropdown">
        <div className="menu-lateral-dropdown-container">
          <select onChange={handleSelectChange} value={getSelectedValue()}>
            <option value="" disabled hidden>
              Selecione...
            </option>
            {searchResults.map((item) => (
              <option key={item['@id']} value={item.getURL || item['@id']}>
                {item.Title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MenuLateralBlockView;
