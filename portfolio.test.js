const { Portfolio, ShareSaleException } = require('./portfolio'); 

test('should allow adding a stock with a ticker symbol and number of shares', () => {
    const portfolio = new Portfolio();
    portfolio.addShares('AAPL', 10);  
    expect(portfolio.getShares('AAPL')).toBe(10); 
});

test('should return true if the portfolio is empty', () => {
    const portfolio = new Portfolio();
    expect(portfolio.isEmpty()).toBe(true);
});

test('should return false if the portfolio is not empty', () => {
    const portfolio = new Portfolio();
    portfolio.addShares('AAPL', 10);
    expect(portfolio.isEmpty()).toBe(false);
});

test('should return the count of unique ticker symbols in the portfolio', () => {
    const portfolio = new Portfolio();
    portfolio.addShares('GME', 5);
    portfolio.addShares('RBLX', 10);
    expect(portfolio.getUniqueTickerCount()).toBe(2);
});

test('should update the portfolio when shares are purchased', () => {
    const portfolio = new Portfolio();
    portfolio.addShares('AAPL', 10); 
    expect(portfolio.getShares('AAPL')).toBe(10);  

    // Purchase additional shares
    portfolio.addShares('AAPL', 5);  
    expect(portfolio.getShares('AAPL')).toBe(15);  
});

test('should update the portfolio when shares are sold', () => {
    const portfolio = new Portfolio();
    portfolio.addShares('AAPL', 15);  
    portfolio.sell('AAPL', 5);
    expect(portfolio.getShares('AAPL')).toBe(10);  
});


test('should return the number of shares for a given symbol', () => {
    const portfolio = new Portfolio();
    portfolio.addShares('AAPL', 10);
    expect(portfolio.getShares('AAPL')).toBe(10);
});

test('should remove symbols from the portfolio when no shares are owned', () => {
    const portfolio = new Portfolio();
    portfolio.addShares('AAPL', 10);  
    portfolio.sell('AAPL', 10);
    expect(portfolio.getUniqueTickerCount()).toBe(0);
});

test('should throw ShareSaleException when attempting to sell more shares than owned', () => {
    const portfolio = new Portfolio();
    portfolio.addShares('AAPL', 10);  
    expect(() => portfolio.sell('AAPL', 15)).toThrow(ShareSaleException);  
});