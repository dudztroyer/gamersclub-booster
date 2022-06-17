const BASE_URL = 'https://gamersclub.com.br/player';

const SELETOR_DATA_CRIACAO = '.gc-list-title:contains("Registrado em")';

const SELETOR_QTD_PARTIDAS =
  '#my-profile > div:nth-child(5) > div > div > div.gc-card-history-content > p.gc-card-history-text';

const SELETOR_QTD_VITORIAS =
  '#my-profile > div:nth-child(5) > div > div > div.gc-card-history-content > p.gc-card-history-detail > span:nth-child(1)';

const SELETOR_QTD_DERROTAS =
  '#my-profile > div:nth-child(5) > div > div > div.gc-card-history-content > p.gc-card-history-detail > span:nth-child(2)';

function scrapText( html, selector ) {
  return $( html ).find( selector ).text() || ' 0';
}

export async function obterDadosDaConta( id ) {
  const promise = new Promise( ( resolve, reject ) => {
    try {
      const url = `${BASE_URL}/${id}`;

      $.get( url, function ( html ) {
        let porcentagemVitoria = 0;

        const dataCriacao = $( html ).find( SELETOR_DATA_CRIACAO ).next().text();
        const qtdPartidas = parseInt( scrapText( html, SELETOR_QTD_PARTIDAS ) );
        const qtdVitorias = parseInt( scrapText( html, SELETOR_QTD_VITORIAS ) );
        const qtdDerrotas = parseInt( scrapText( html, SELETOR_QTD_DERROTAS ) );

        if ( qtdPartidas && qtdVitorias ) {
          porcentagemVitoria = Math.round( ( 100 * qtdVitorias ) / qtdPartidas );
        }

        resolve( {
          dataCriacao,
          qtdPartidas,
          qtdVitorias,
          qtdDerrotas,
          porcentagemVitoria
        } );
      } );
    } catch ( e ) {
      reject( e );
    }
  } );

  return promise;
}
