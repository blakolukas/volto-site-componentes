import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import Endereco from '../../Endereco/Endereco';

const LocalSummary = ({ content }) => {
  return (
    <div className={`Local summary`} style={{ paddingBottom: '40px' }}>
      <Endereco content={content} />
    </div>
  );
};

const LocaisView = (props) => {
  const { locais, headline, className } = props;
  return (
    <Container narrow className={`block locais ${className}`}>
      <Container className={`locais listing`}>
        <h3>{headline}</h3>
        {locais &&
          locais.length > 0 &&
          locais.map(function (Local, i) {
            return <LocalSummary content={Local} key={i} />;
          })}
      </Container>
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
LocaisView.propTypes = {
  headline: PropTypes.string,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
LocaisView.defaultProps = {
  headline: 'Locais',
};

export default LocaisView;
