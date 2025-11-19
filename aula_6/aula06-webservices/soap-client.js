// soap-client.js
const axios = require('axios');
const fs = require('fs');

// Função para enviar uma request SOAP
async function chamarServicoSOAP(temperaturaCelsius) {
    // XML para a request SOAP
    const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope 
  xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:ns1="http://exemplo.com/servicos/temperatura">
  <SOAP-ENV:Body>
    <ns1:ConverterCelsiusParaFahrenheitRequest>
      <ns1:temperaturaCelsius>${temperaturaCelsius}</ns1:temperaturaCelsius>
    </ns1:ConverterCelsiusParaFahrenheitRequest>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;

    try {
        // Serviço SOAP público para testes
        const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso';

        const response = await axios.post(url, soapEnvelope, {
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'http://exemplo.com/servicos/temperatura/ConverterCelsiusParaFahrenheit'
            }
        });

        console.log('Resposta completa:');
        console.log(response.data);

        // TODO: Extrair a temperatura em Fahrenheit da resposta XML
        // DICA: Pode usar uma biblioteca como 'xml2js' para parsing

        return {
            celsius: temperaturaCelsius,
            fahrenheit: 'EXTRAIR DA RESPOSTA'
        };
    } catch (error) {
        console.error('Erro ao chamar serviço SOAP:', error.message);
        throw new Error('Falha ao converter temperatura');
    }
}

// Função para testar
async function testarSOAP() {
    try {
        const resultado = await chamarServicoSOAP(25.0);
        console.log('Resultado da conversão:', resultado);
    } catch (error) {
        console.error(error.message);
    }
}

testarSOAP();