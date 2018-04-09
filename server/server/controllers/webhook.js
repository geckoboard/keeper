const update = (req, res) => {
  console.log('WEBHOOK_UPDATE', JSON.stringify(req.body));
  res.status(201).send();
};

module.exports = {
  update,
};