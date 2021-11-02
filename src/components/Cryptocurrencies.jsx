import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Col, Input, Row } from 'antd'

import {useGetCryptoQuery} from '../services/cryptoApi'



const Crypocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 50;
    const {data: cryptoList, isFetching} = useGetCryptoQuery(count);
    const [crypto, setCrypto] = useState([])
    const[search, setSearch] = useState('')

    useEffect(() => {
        setCrypto(cryptoList?.data?.coins)

        const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
        setCrypto(filteredData)
    }, [cryptoList, search])

    console.log(crypto);
    if(isFetching) return 'Loading...'

    return (
        <>
        <div className="">
            <Input 
            Placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <Row gutters={[32,32]} className='crypto-card-container'>
            {crypto?.map((currency) =>(
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                    <Link to={`/crypto/${currency.id}`}>
                        <Card 
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl} alt=''/> }
                            hoverable
                        >
                            <p>Price: {millify(currency.price)}</p>
                            <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {millify(currency.change)}%</p>

                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
        </>
    )
}

export default Crypocurrencies
