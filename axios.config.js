const CLIENT_ID = '89e7517b8d61a72';

export const settings = {
  async: true,
  crossDomain: true,
  headers: {
    'Authorization': 'Client-ID ' + CLIENT_ID,
  },
  processData: false,
  contentType: false,
  mimeType: "multipart/form-data",
};

export const traktSettings = {
  headers : {
    'Content-type':	'application/json',
    'trakt-api-key': '56ec419c2290fb47abda0d48f0bb7e574a73d0ab65aa3b3ee1c877b193d2709a',
    'trakt-api-version': 2,
  }
};
