module.exports = (router) => {
  const hiking_json = require('../json/hiking.json');

  router.get('/hiking/json', (req, res) => {
    res.status(200).send(hiking_json);
  });
};
