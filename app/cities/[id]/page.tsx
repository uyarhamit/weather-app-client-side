"use client";
import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { requestWeatherType } from '@/util/request';
import axios from 'axios';
import { WeatherCard } from '@/app/components/card';
import { Button, Col, Row, Select, message } from 'antd';
import Link from 'next/link';

const cityDetail = ({ params }: { params: requestWeatherType }) => {
  if (Number.isNaN(Number(params.id))) notFound();
  const [weatherlist, setWeatherlist] = useState({});
  const [days, setDays] = useState([]);
  const [day, setDay] = useState(1);
  const getCityWeather = async (id: Number, day: Number) => {
    axios.get(`http://localhost:3001/api/cities/${id}`, {
      params: {
        days: day
      }
    }).then((response) => {
      setWeatherlist(response.data);
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      }else{
        alert(err.message);
      }
    })
  }

  useEffect(() => {
    if (!days.length) {
      let newArray: any = [];
      for (let index = 1; index <= 16; index++) {
        newArray.push({ label: `${index} day`, value: index });
      }
      setDays(newArray);
      getCityWeather(params.id, day)
    }
  }, [weatherlist])


  useEffect(() => {
    getCityWeather(params.id, day);
  }, [day])


  return (
    <div className='bg-white h-screen p-5'>
      <Row className='mb-5'>
        <Col span={12}>
          <Link href="/cities">
            <Button>
              Back
            </Button>
          </Link>
        </Col>
        <Col span={12}>
          <Select className='float-right' options={days} defaultValue={1} onChange={(value) => setDay(value)}></Select>
        </Col>
      </Row>
      <Row className='min-w-full'>
        {
          (typeof weatherlist.data !== 'undefined') ?
            weatherlist.data.map((weathers, index) =>
            (
              <Col span={7} className='m-5' key={index}>
                <WeatherCard weather={weathers} />
              </Col>
            ))
            : <></>

        }
      </Row>
    </div>
  )
}

export default cityDetail;