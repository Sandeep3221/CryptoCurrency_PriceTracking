import React from 'react'
import { useState,useEffect } from 'react'
// MaFIorWDjB/Nu2fUYwA37tbVZ+IlXEQqE7rBQqy9dg0=

function CryptoTracking() {
  const [cryptoData, setCryptoData] = useState([])
    const [search, setSearch] = useState("")

    const cryptoCurrency = async() =>{
    try {
      const options = {
        method: 'GET',
        headers: { 
          accept: 'application/json', 
          'x-cg-demo-api-key': 'CG-jM2qmEGDeSoPFjfAUyoEUAG4' 
        }
      };

      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR', options);
      const data = await response.json();
      
      console.log(data);
      setCryptoData(data); // This is now inside the async function and will work
    } catch (err) {
      console.error('Error fetching crypto data:', err);
    }
  }

    const handleInput = (e) =>{
        setSearch(e.target.value)
    }

    useEffect(()=>{
        cryptoCurrency()
    },[])
  return (
    <div className='container'>
        <div>
                <h1>CryptoCurrency Price Tracking</h1>
                <input type="text" placeholder='Search here...' onChange={handleInput}/>
        </div>
        <div>
                <table>
                  <thead>
                    <tr>

                      <th>Rank</th>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Market Cap</th>
                      <th>Price</th>
                      <th>Total Supply</th>
                      <th>Total Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoData.filter((value)=>{
                      console.log(value);
                      return value.name.toLowerCase().includes(search.toLowerCase())
                    }).map((value,ind)=>{
                      return <tr>
                        <td>{value.market_cap_rank}</td>
                        <td>
                        <div className='icons'>
                          <img src={value.image} alt={value.name} />
                            <span>{value.name}</span>
                        </div>
                        </td>
                        <td>{value.symbol}</td>
                        <td>{value.market_cap}</td>
                        <td>{value.current_price}</td>
                        <td>{value.total_supply.toFixed(2)}</td>
                        <td>{value.total_volume}</td>
                      </tr>
                    })
                    }
                  </tbody>
                </table>
        </div>
    </div>
  )
}

export default CryptoTracking