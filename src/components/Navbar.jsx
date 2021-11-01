import React from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import {HomeOutlined, MoneyCollectOutlined, BulbOutlined,FundOutlined} from '@ant-design/icons'

import icon from '../images/icon.png'
const Navbar = () => {
    return (
        <div className="nav_container">
            <div className="logo_container">
                <Avatar src={icon} size="large"
                />
                <Typography.Title level={3} className="logo">
                    <Link to="/">Crypto</Link>
                </Typography.Title>
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />}> 
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}> 
                        <Link to="/crypocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}> 
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}> 
                        <Link to="/news">News</Link>
                    </Menu.Item>
                    
                </Menu>
                <Button className="menu"></Button>
            </div>
            
        </div>
    )
}

export default Navbar
