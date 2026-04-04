exports.handler = async function(event) {
  const type = (event.queryStringParameters && event.queryStringParameters.type) ? event.queryStringParameters.type : 'vtos';
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxl3jpAd7DT8iMLokwgcLlNMAHX6WhJFCvdvmWKrTTOneNWPZcfBb7jv6t1CAAvDmEJ/exec?type=' + type;

  try {
    const response = await fetch(scriptUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });
    const text = await response.text();
    console.log('Response:', text.substring(0, 200));
    const data = JSON.parse(text);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  } catch(e) {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ result: 'error', entries: [], message: e.toString() })
    };
  }
};
