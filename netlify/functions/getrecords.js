const https = require('https');

exports.handler = async function(event) {
  const type = event.queryStringParameters && event.queryStringParameters.type ? event.queryStringParameters.type : 'vtos';
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxl3jpAd7DT8iMLokwgcLlNMAHX6WhJFCvdvmWKrTTOneNWPZcfBb7jv6t1CAAvDmEJ/exec?type=' + type;
  
  return new Promise((resolve) => {
    https.get(scriptUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsed)
          });
        } catch(e) {
          resolve({
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            body: JSON.stringify({ result: 'error', entries: [] })
          });
        }
      });
    }).on('error', () => {
      resolve({
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ result: 'error', entries: [] })
      });
    });
  });
};
