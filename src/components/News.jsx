import React, {useState} from 'react'
import {Avatar, Card, Col, Row, Select, Typography} from 'antd'

import moment from 'moment'

import { useGetNewsQuery} from '../services/newsApi'
import { useGetCryptoQuery} from '../services/cryptoApi'
import Loader from './Loader'

const {Text, Title} = Typography
const {Option} = Select

const demoImage =' http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'
const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } = useGetNewsQuery({ newsCategory, count: simplified ? 9 : 14})
    const {data } =useGetCryptoQuery(50)
    if(!cryptoNews?.value) return <Loader/>
    return (
        <>
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className=''
                        placeholder='select a Cryptocurrency'
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption ={(input, option) => option.children.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0}
                        >
                            <Option value='Cryptocurrency'>Cryptocurrency</Option>
                            {data?.data?.coins.map((coin) => 
                            <option value={coin.name}>{coin.name}</option>
                            )}
                        </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className=' '>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div>
                                <Title level={3}>{news.name}</Title>
                                <img style={{maxWidth: '200px', maxHeight: '100px'}}
                                    src={news?.image?.thumbnail?.contentUrl || demoImage} 
                                    alt='img'
                                />
                            </div>
                            <p>
                                    {news.description > 100 ? `${news.description.substring(0,100)}...`
                                    : news.description
                                }
                                
                            </p>
                            <div className='Prov'>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=''/>
                                    <Text>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
            
        </>
    )
}

export default News
