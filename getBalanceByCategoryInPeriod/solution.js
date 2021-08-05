const getBalanceByCategoryInPeriod = (
  transactions,
  categories,
  start,
  end
) => {
  if(!categories || !categories.length) return {};
  
  const balances = categories.reduce((obj, cat) => {
    obj[cat] = 0;
    return obj;
  }, {})
    
  transactions.forEach((tx) => {
    const { category, time, amount } = tx;
    const date = new Date(time).getTime();
  
    if(
      balances[category] !== undefined && // if exists in the requested categories
      date >= start.getTime() && // if is equal or greater than requested start date
      date < end.getTime() // if is less than requested end date
    ){
      balances[category] += amount;
    }
  })
  
  return balances;
};

module.exports = getBalanceByCategoryInPeriod;
