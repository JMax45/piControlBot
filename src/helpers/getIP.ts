import https from 'https';

const getIP = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    https
      .get('https://ifconfig.me', (res) => {
        res.on('data', (data) => {
          resolve(data.toString());
        });
      })
      .on('error', reject);
  });
};

export default getIP;
