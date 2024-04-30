import { weatherType } from '@/util/types'
import { Avatar, Card, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

export const WeatherCard = ({ weather }: { weather: weatherType }) => {
    return (
        <Card
            title={weather.date}
            className='text-center'
            cover={
                <Row>
                    <Col span={8} className='m-auto'>
                        <img
                            alt="example"
                            src={
                                (weather.condition.toLowerCase() === 'clouds')
                                    ? "https://cdn-icons-png.flaticon.com/512/414/414825.png"
                                    : (weather.condition.toLowerCase() === 'rain')
                                        ? "https://cdn-icons-png.flaticon.com/512/4088/4088981.png"
                                        : "https://cdn-icons-png.flaticon.com/512/4064/4064276.png"
                            }
                            style={{ "width": "20% !important" }}
                        />
                    </Col>
                </Row>
            }
        >
            <Meta title={weather.condition}/>

            <Row className='mt-2'>
                <Col span={24}>
                    <p>Min. {weather.min}° -  Max. {weather.max} °</p>
                </Col>
            </Row>
        </Card>
    )
}
