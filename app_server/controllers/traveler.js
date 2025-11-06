exports.list = (req, res) => {
  const trips = [
    { name: 'Cancún Escape', price: '$899', start: '2026-01-15' },
    { name: 'Bahamas Getaway', price: '$1,099', start: '2026-02-10' },
    { name: 'Bali Adventure', price: '$1,499', start: '2026-03-05' }
  ];
  res.render('travel', { title: 'Travel Packages', trips });
};
