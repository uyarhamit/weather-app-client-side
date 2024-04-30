import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import DataTable from '../components/datatable';

const cityList = () => {
  return (
    <div className='bg-white h-screen p-5'>
      <Card title="City List">
        <DataTable />
      </Card>
    </div>
  )
}

export default cityList;