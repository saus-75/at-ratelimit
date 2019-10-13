const fetch = require('node-fetch');

const api = 'http://localhost:5000';
const headers = { 'Content-Type': 'application/json' };

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRequest = async ({ link }) => {
  try {
    const request = await fetch(link, { method: 'GET', headers });
    if (request.status === 200) {
      return `${request.status}: ${request.statusText}`
    } else {
      const body = await request.json();
      throw new Error(`${request.status}: ${body.error}`);
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getTest = async () => {
	return await getRequest({ link: `${api}/test` });
}

const main = async () => {
	while(true){
      await delay(1000);
			const res = await getTest();
			console.log(res);
	}
}

main();