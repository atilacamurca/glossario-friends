require('dotenv').config()

const Trakt = require('trakt.tv');
let options = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENTE_SECRET,
  redirect_uri: 'https://glossario-friends.netlify.app',   // defaults to 'urn:ietf:wg:oauth:2.0:oob'
  pagination: true      // defaults to false, global pagination (see below)
};

function seasonSummary ({ data, pagination}) {
  const one = data[1]
  console.log('one:', one)
}

const trakt = new Trakt(options);
(async function () {
  try {
    const { data } = await trakt.seasons.summary({ id: 'friends', extended: 'full' })
    const one = data[1]
    console.log('one:', one)
  } catch (e) {
    console.error(e)
  }
})()

