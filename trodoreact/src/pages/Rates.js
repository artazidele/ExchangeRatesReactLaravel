import React, {Component} from 'react';
import axios from 'axios';

class Rates extends Component {

    state = {
        rates: [],
        usd: true,
        gbp: false,
        aud: false,
        loading: true,
        minimum: 0.0,
        maximum: 0.0,
        average: 0.0,
        currencyTo: "USD",
        lastUpdated: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:8000/api/rates');
        if(res.data.status === 200) {
            this.setState({
                rates: res.data.rates,
                loading: false
            });
            console.log("Success");
        }
        
    }

    onRadioButtonChange(toCurrency){
        var tableRates = [];
        if(toCurrency === "USD"){
            console.log("USD RB");
            tableRates = this.state.rates.filter( function (rate) {
                return rate.to === "USD"
            });
        } else if(toCurrency === "GBP") {
            console.log("GBP");
            tableRates = this.state.rates.filter( function (rate) {
                return rate.to === "GBP"
            });
        } else {
            console.log("AUD");
            tableRates = this.state.rates.filter( function (rate) {
                return rate.to === "AUD"
            });
        }
        var minimumR = 0;
        var maximumR = 0;
        var totalR = 0;
        var countR = 0;
        var lastUpdate = ''
        console.log("RB");
        tableRates.map((item) =>  {
            if (minimumR === 0) {
                minimumR = item.rate.toFixed(4);
            } else if (item.rate < minimumR) {
                minimumR = item.rate.toFixed(4);
            }
            if (maximumR === 0) {
                maximumR = item.rate.toFixed(4);
            } else if (item.rate > maximumR) {
                maximumR = item.rate.toFixed(4);
            }
            totalR = totalR + item.rate;
            countR = countR + 1;
            lastUpdate = item.date;
            return 0;
        })
        let averageR = (totalR / countR).toFixed(4);
        this.setState({
            minimum: minimumR,
            maximum: maximumR,
            average: averageR,
            lastUpdated: lastUpdate
        });
    }

    first = true;

    render() {
        var currencies_HTMLTABLE = "";
        if(this.state.loading) {
            currencies_HTMLTABLE = <tr><td colSpan="10"><h2>Loading...</h2></td></tr>
        } else {
            if(this.state.usd){
                let usdRates = this.state.rates.filter( function (rate) {
                    return rate.to === "USD"
                });
                if (this.first) {
                    this.onRadioButtonChange("USD");
                    this.first = false;
                }
                currencies_HTMLTABLE = 
                usdRates.reverse().map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.rate.toFixed(4)}</td>
                        </tr>
                    )
                })

            } else if(this.state.gbp) {
                let gbpRates = this.state.rates.filter( function (rate) {
                    return rate.to === "GBP"
                });
                currencies_HTMLTABLE = 
                gbpRates.reverse().map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.rate.toFixed(4)}</td>
                        </tr>
                    )
                })
            } else {
                let audRates = this.state.rates.filter( function (rate) {
                    return rate.to === "AUD"
                });
                currencies_HTMLTABLE = 
                audRates.reverse().map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.rate.toFixed(4)}</td>
                        </tr>
                    )
                })
            }
        }

        return(
            
            <div className='container px-4 text-center' >
                <h3 className='my-5'>1 EUR to {this.state.currencyTo} Exchange Rate</h3>
                <div className='container'>
                <label>
                    USD : <input
                    name="checkCurrency"
                    type="radio"
                    checked={this.state.usd === true}
                    onChange={e => {
                        this.setState({
                            currencyTo: "USD",
                            usd: true,
                            gbp: false,
                            aud: false
                        });
                        this.onRadioButtonChange("USD");
                    }}
                    />
                </label>
                <br/>
                <label>
                    GBP: <input
                    name="checkCurrency"
                    type="radio"
                    checked={this.state.gbp === true}
                    onChange={e => {
                        this.setState({
                            currencyTo: "GBP",
                            usd: false,
                            gbp: true,
                            aud: false
                        });
                        this.onRadioButtonChange("GBP");
                    }}
                    />
                </label>
                <br/>
                <label>
                    AUD : <input
                    name="checkCurrency"
                    type="radio"
                    checked={this.state.aud === true}
                    onChange={e => {
                        this.setState({
                            currencyTo: "AUD",
                            usd: false,
                            gbp: false,
                            aud: true
                        });
                        this.onRadioButtonChange("AUD");
                    }}
                    />
                </label>
                </div>
                <p>Last updated: {this.state.lastUpdated}</p>
                <div className='container'>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>{this.state.title}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currencies_HTMLTABLE}
                    </tbody>
                </table>
                </div>
                <div className='container'>
                    <p className='my-1'>Minimum: {this.state.minimum} {this.state.currencyTo}, Maximum: {this.state.maximum} {this.state.currencyTo}</p>
                    <p className='my-1'>Average: {this.state.average} {this.state.currencyTo}</p>
                </div>
            </div>
            
        )
        
    }
}

export default Rates;