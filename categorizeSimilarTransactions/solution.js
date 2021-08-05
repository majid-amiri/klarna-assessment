const categorizeSimilarTransactions = (transactions) => {  
  return transactions.map(tx => {
    if(tx.category){
      return tx;
    };
    
    const similars = transactions.filter(ctx => ctx.category && ctx.targetAccount === tx.targetAccount && Math.abs(tx.amount - ctx.amount) <= 1000);
    
    // if there are no similars, return original item
    if(similars.length === 0) {
      return tx;
    }
    // if there is only one similar item, categorize it
    else if(similars.length === 1){
      return {
        ...tx,
        category: similars[0].category
      }
    }
    // if there are multiple similar items, check which has smallest difference
    else {
      const sortedSimilars = similars.sort((a,b) => Math.abs(tx.amount - a.amount) - Math.abs(tx.amount - b.amount));
      return {
        ...tx,
        category: sortedSimilars[0].category
      }
    }
  })
};

module.exports = categorizeSimilarTransactions
