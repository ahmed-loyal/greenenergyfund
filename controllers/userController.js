
// controller actions
module.exports.index_get = (req, res) => {
    res.render('index', { title: 'Greenery Fund - Asset Management & Loans'});
  }

module.exports.consultpage_get = (req, res) => {
  res.render('consultpage', { title: 'Let us handle it for you!'});
}

module.exports.applyloan_get = (req, res) => {
    res.render('applyloan', { title: 'Apply Loan'});
  }

module.exports.applyloan_post = (req, res) => {
    res.send('applyloan');
  }