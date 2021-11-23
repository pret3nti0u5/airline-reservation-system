const router = require('express').Router();
const Amadeus = require('amadeus');

router.post('/', async (req, res) => {
  try {
    const amadeus = new Amadeus({
      clientId: process.env.apiKey,
      clientSecret: process.env.apiSecret,
    });

    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      travelClass,
      nonStop,
    } = req.body;

    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults: '1',
      travelClass,
      nonStop,
      currencyCode: 'INR',
      includedAirlineCodes: 'UK,AI',
    });
    res.send(response.data);
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
});

module.exports = router;
