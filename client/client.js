const fetch = require('node-fetch');

const api = 'http://localhost:5000';
const headers = { 'Content-Type': 'application/json' };

const getRequest = async ({ link }) => {
  try {
    const request = await fetch(link, { method: 'GET', headers });
    if (request.status === 200) {
      return request.statusText
    } else {
      throw new Error(`${request.status}: ${request.statusText}`);
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
	for (let i = 0; i < 50; i++) {
			const res = await getTest();
			console.log(res);
	}
}

main();