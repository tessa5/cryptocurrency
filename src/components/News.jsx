import React from 'react'
import {Avatar, Card, Col, Row, Select, Typography} from 'antd'

import moment from 'moment'

import { useGetNewsQuery} from '../services/newsApi'

const {Text, Title} = Typography
const {Option} = Select

const demoImage =' http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'
const News = ({ simplified }) => {

    const { data: cryptoNews } = useGetNewsQuery({ newsCategory : ' Cryptocurrency', count: simplified ? 7 : 14})
        if(!cryptoNews?.value) return 'Loading...'
    return (
        <>
        <Row gutter={[24, 24]}>
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className=' '>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div>
                                <Title level={3}>{news.name}</Title>
                                <img 
                                    src={news?.image?.thumbnail?.contentUrl || demoImage} 
                                    alt='img'
                                />
                            </div>
                            <p>
                                    {news.description > 100 ? `${news.description.substring(0,100)}...`
                                    : news.description
                                }
                                
                            </p>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
            
        </>
    )
}

export default News
