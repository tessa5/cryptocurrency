import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'

import { useGetCryptoQuery } from '../services/cryptoApi'
import {Cryptocurrencies, News} from '../components'

const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCryptoQuery(10);
    const globalStat = data?.data?.stats;

    if(isFetching) return 'Loading...'
    return (
        <>
        <Title level={2} className='heading'>Global Crypto Stats</Title>
        <Row>
            <Col span={12}><Statistic title='Total Crypto' value={globalStat.total} /></Col>
            <Col span={12}><Statistic title='Total Exchanges' value={globalStat.totalExchanges}/></Col>
            <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStat.total24hVolume)}/></Col>
            <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStat.totalMarketCap)}/></Col>
            <Col span={12}><Statistic title='Total Markets' value={millify(globalStat.totalMarkets)}/></Col>
        </Row>
        <div>
            <Title level={2} className='counting'>Top 10 Cryptocurrencies in the Crypto World</Title>
            <Title level={3} className='showing'><Link to="/cryptocurrencies">Show more</Link></Title>
        </div>
        <Cryptocurrencies simplified/>
        <div>
            <Title level={2} className='counting'>Latest Crypto News</Title>
            <Title level={3} className='showing'><Link to="/news">Show more</Link></Title>
        </div>
        <News simplified />
        </>
    )
}

export default Homepage
