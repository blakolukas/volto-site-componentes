import './BlocoLoco.css';
import Camada_1 from './img/Camada_1.svg';
import Camada_2 from './img/Camada_2.svg';
import Camada_3 from './img/Camada_3.svg';
import Camada_4 from './img/Camada_4.svg';
import Camada_5 from './img/Camada_5.svg';
import Camada_6 from './img/Camada_6.svg';
import Camada_7 from './img/Camada_7.svg';
import Hover1 from './hover/Hover1.svg';
import Hover2 from './hover/Hover2.svg';
import Hover3 from './hover/Hover3.svg';
import Hover4 from './hover/Hover4.svg';
import Hover5 from './hover/Hover5.svg';
import Hover6 from './hover/Hover6.svg';
import Hover7 from './hover/Hover7.svg';

import vector1 from './vectors/vector1.svg';
import vector3 from './vectors/vector3.svg';
import vector2 from './vectors/vector2.svg';

const BlocoLocoView = () => {
  return (
    <div className="loco-container" style={{ backgroundColor: '#2D2D2D' }}>
      {/* 2 Primeiros */}
      <div className="loco-one-to-another">
        {/* Recolhimento do material */}
        <div className="loco-item one">
          <img
            src={Camada_1}
            alt="Bloco Loco"
            style={{ height: '144px', width: '145px' }}
            onMouseEnter={(e) => (e.target.src = Hover1)}
            onMouseLeave={(e) => (e.target.src = Camada_1)}
          />
          <div className="loco-item-text" style={{ placeContent: 'end' }}>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Recolhimento do material
            </span>
            <span style={{ fontSize: '14px' }}>
              Pontos de coleta estabelecidos
            </span>
          </div>
        </div>

        {/* Vector */}
        <img src={vector1} alt="vector" className='vector1'/>

        {/* Triagem */}
        <div className="loco-item two">
          <img
            src={Camada_2}
            alt="Bloco Loco"
            style={{ height: '155px', width: '134px' }}
            onMouseEnter={(e) => (e.target.src = Hover2)}
            onMouseLeave={(e) => (e.target.src = Camada_2)}
          />
          <div className="loco-item-text">
            <span
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              triagem
            </span>
            <span style={{ fontSize: '14px' }}>
              Feita em tal lugar do projeto
            </span>
          </div>
        </div>
      </div>

      {/* Meio */}
      <div
        className='loco-meio'
      >
        <div className="loco-one-to-another">
          {/* Flecha 3 */}
          <img src={vector3} alt="vector" className='vector3 gone'/>

          {/* 3 Itens */}
          <div
            className='loco-meio-itens'
          >
            {/* Recuperáveis */}
            <div className="loco-item">
              <img
                src={Camada_3}
                alt="Bloco Loco"
                style={{ height: '96px', width: '108px' }}
                onMouseEnter={(e) => (e.target.src = Hover3)}
                onMouseLeave={(e) => (e.target.src = Camada_3)}
              />
              <div className="loco-item-text">
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  recuperáveis
                </span>
                <span style={{ fontSize: '14px' }}>
                  Recondicionamento de peças e softwares
                </span>
              </div>
            </div>

            {/* Ociosos */}
            <div className="loco-item">
              <img
                src={Camada_4}
                alt="Bloco Loco"
                style={{ height: '106px', width: '94px' }}
                onMouseEnter={(e) => (e.target.src = Hover4)}
                onMouseLeave={(e) => (e.target.src = Camada_4)}
              />
              <div className="loco-item-text">
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  ociosos
                </span>
                <span style={{ fontSize: '14px' }}>
                  Separação e levantamento de necessidades
                </span>
              </div>
            </div>

            {/* Irrecuperáveis */}
            <div className="loco-item gone">
              <img
                src={Camada_5}
                alt="Bloco Loco"
                style={{ height: '106px', width: '156px' }}
                onMouseEnter={(e) => (e.target.src = Hover5)}
                onMouseLeave={(e) => (e.target.src = Camada_5)}
              />
              <div className="loco-item-text">
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  irrecuperáveis
                </span>
                <span style={{ fontSize: '14px' }}>
                  Reciclagem assistida onde componentes passam pela
                  descaracterização
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Flechas */}
        <div className="loco-one-to-another">
          <div className="loco-two-vectors gone">
            <div
              style={{
                height: '100%',
                width: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingBottom: '20px',
              }}
            >
              {/* Flecha maior */}
              <div className="loco-two-vector ">
                <img
                  src={vector2}
                  alt="vector"
                  className="loco-one-to-one vector2"
                  style={{ transform: 'translateX(25%) translateY(60%)' }}
                />
              </div>

              {/* Flecha */}
              <div className="loco-two-vector ">
                <img src={vector1} alt="vector" className="loco-one-to-one vector1" />
              </div>

              {/* Flecha */}
              <div className="loco-two-vector">
                <img src={vector1} alt="vector" className="loco-one-to-one vector1" />
              </div>
            </div>
          </div>

          {/* 2 Ultimos */}
          <div className="loco-two-vectors">
            <div
              style={{
                height: '56%',
                width: '180px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Doação */}
              <div className="loco-two-vector">
                <div className="loco-item">
                  <img
                    src={Camada_6}
                    alt="Bloco Loco"
                    style={{ height: '130px', width: '92px' }}
                    onMouseEnter={(e) => (e.target.src = Hover6)}
                    onMouseLeave={(e) => (e.target.src = Camada_6)}
                  />
                  <div className="loco-item-text">
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                      }}
                    >
                      doação
                    </span>
                    <span style={{ fontSize: '14px' }}>
                      Para instituições necessitadas cadastradas
                    </span>
                  </div>
                </div>
              </div>

              {/* Reaproveitamento pela indústria */}
              <div className="loco-two-vector gone">
                <div className="loco-item">
                  <img
                    src={Camada_7}
                    alt="Bloco Loco"
                    style={{ height: '82px', width: '117px' }}
                    onMouseEnter={(e) => (e.target.src = Hover7)}
                    onMouseLeave={(e) => (e.target.src = Camada_7)}
                  />
                  <div className="loco-item-text">
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                      }}
                    >
                      reaproveitamento pela indústria
                    </span>
                    <span style={{ fontSize: '14px' }}>
                      Envio para empresas que reaproveitam pó residual
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocoLocoView;
