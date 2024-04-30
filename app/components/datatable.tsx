"use client";
import React, { useEffect, useState } from 'react'
import { Input, Select, Table, Col, Row } from 'antd';
import type { TableColumnsType } from 'antd';
import { cityType } from '@/util/types';
import axios from 'axios';
import { requestCitiesType } from '@/util/request';

interface DataType {
  id: Number;
  name: String;
  country: String;
}

export default function DataTable() {

  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState({});
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [countryCodes, setCountryCodes] = useState([]);

  const columns: TableColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: (
        <>
          <Row>
            <Col span={24}>
              <div>NAME</div>
            </Col>
          </Row>
          <Row className='m-auto'>
            <Col span={16}>
              <Input onChange={(e) => setCountryName(e.target.value)} />
            </Col>
          </Row>
        </>
      ),
      dataIndex: 'name',
      render: (_, data: cityType) => <a href={'cities/' + data.id}>{data.name}</a>
    },
    {
      title: (
        <>
          <Row>
            <Col span={24}>
              <div>COUNTRY CODE</div>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <Select className='min-w-full' defaultValue="none" onChange={(selected) => {
                setCountry((selected === 'none') ? '' : selected)
              }}>
                {
                  countryCodes.map((code: { text: String, value: String }, index: number) => (
                    <Select.Option value={code.value} key={index}>{code.text.toUpperCase()}</Select.Option>
                  ))
                }
              </Select>
            </Col>
          </Row>
        </>
      ),
      dataIndex: 'country',
    }
  ];

  const setCountryName = (value: string) => {
    setName(value);
  }

  const getCities = (params: requestCitiesType) => {
    if (!params.offset) delete params.offset;
    if (!params.name?.length) delete params.name;
    if (!params.country?.length) delete params.country;
    setLoading(true);
    axios.get('http://localhost:3001/api/cities', {
      params
    })
      .then((response) => {
        setCities(response.data);
        setTotalPages(response.data.count)
        let distinctCode: any = [];
        let newCodeArray: any = [{ text: 'Select One', value: 'none' }];
        response.data.data.forEach((item: cityType) => {
          if (distinctCode.indexOf(item.country) === -1) {
            distinctCode.push(item.country);
            newCodeArray.push({ text: item.country, value: item.country.toLowerCase() });
          }
        });
        setCountryCodes(newCodeArray);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        }else{
          alert(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    const delayNameChange = setTimeout(() => {
      getCities({
        limit: limit,
        name: name,
        country: country
      });
    }, 500);
    return () => clearTimeout(delayNameChange);
  }, [name])

  useEffect(() => {
    getCities({
      limit: limit,
      offset: offset,
      name: name,
      country: country
    });
  }, [offset, limit, country])

  return (
    <Table
      columns={columns}
      dataSource={cities.data}
      loading={loading}
      rowKey="id"
      pagination={{
        total: totalPages,
        pageSize: limit,
        onChange(page, pageSize) {
          setLimit(pageSize);
          setOffset((page - 1) * pageSize);
        },
      }}
    />
  )
}

