class ShareSaleException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ShareSaleException';
    }
}

class Portfolio {
    #stocks;  

    constructor() {
        this.#stocks = {};
    }


    addShares(ticker, shares) {
        if (typeof ticker !== 'string' || !ticker) {
            throw new Error('Invalid ticker symbol');
        }
        if (shares <= 0) {
            throw new Error('Shares must be a positive number');
        }
        this.#stocks[ticker] = (this.#stocks[ticker] || 0) + shares;
    }


    isEmpty() {
        return Object.keys(this.#stocks).length === 0;
    }


    getUniqueTickerCount() {
        return Object.keys(this.#stocks).length;
    }


    getShares(ticker) {
        return this.#stocks[ticker] || 0;
    }


    sell(ticker, shares) {
        if (this.#stocks[ticker] && this.#stocks[ticker] >= shares) {
            this.#stocks[ticker] -= shares;
            if (this.#stocks[ticker] === 0) {
                delete this.#stocks[ticker];
            }
        } else {
            throw new ShareSaleException('Cannot sell more shares than owned.');
        }
    }
}

module.exports = { Portfolio, ShareSaleException };
