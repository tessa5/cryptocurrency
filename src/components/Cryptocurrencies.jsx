import React, { useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Col, Input, Row } from 'antd'

import {useGetCryptoQuery} from '../services/cryptoApi'
import { ConsoleSqlOutlined } from '@ant-design/icons'


const Crypocurrencies = ({simplified}) => {
    const {data: cryptoList, isFetching} = useGetCryptoQuery();
    const [crypto, setCrypto] = useState(cryptoList?.data?.coins)

    console.log(crypto)

    return (
        <>
        <Row gutters={[32,32]} className='crypto-card-container'>
            {crypto.map((currency) =>(
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
