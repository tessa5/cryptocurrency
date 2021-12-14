import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { Col, Row, Typography, Select} from 'antd'
import millify from 'millify'
import { 
    MoneyCollectOutlined,
    DollarCircleOutlined, 
    FundOutlined,
    StopOutlined, 
    ExclamationCircleOutlined, 
    CheckOutlined,
    TrophyOutlined,
    ThunderboltOutlined,
    NumberOutlined 
} from '@ant-design/icons'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'
import Loader from './Loader';
import LineChart from './LineChart';

const { Title, Text} = Typography
const { Option } = Select;
const CrypoDetails = () => {
    const { coinId } = useParams()
    const [timePeriod, setTimePeriod] = useState('7d')
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId, timePeriod)
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
    const cryptoDetails = data?.data?.coin
    if (isFetching) return <Loader />;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className="">
        <Col className="">
            <Title level={2} className="">
            {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
            </Title>
            <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
        </Col>
        <Select defaultValue="7d" className="d" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
            {time.map((date) => <Option key={date}>{date}</Option>)}
        </Select>
        <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
        <Col className="">
            <Col className="">
            <Col className="">
                <Title level={3} className="">{cryptoDetails.name} Value Statistics</Title>
                <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
            </Col>
            {stats.map(({ icon, title, value }) => (
                <Col className="">
                <Col className="">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                </Col>
                <Text className="">{value}</Text>
                </Col>
            ))}
            </Col>
            <Col className="">
            <Col className="">
                <Title level={3} className="">Other Stats Info</Title>
                <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
                <Col className="">
                <Col className="">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                </Col>
                <Text className="">{value}</Text>
                </Col>
            ))}
            </Col>
        </Col>
        <Col className="">
            <Row className="">
            <Title level={3} className="">What is {cryptoDetails.name}?</Title>
            {HTMLReactParser(cryptoDetails.description)}
            </Row>
            <Col className="">
            <Title level={3} className="">{cryptoDetails.name} Links</Title>
            {cryptoDetails.links?.map((link) => (
                <Row className="" key={link.name}>
                <Title level={5} className="">{link.type}</Title>
                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                </Row>
            ))}
            </Col>
        </Col>
        </Col>
    )
}

export default CrypoDetails
