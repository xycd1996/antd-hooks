import { Table } from 'antd'
import React, { useEffect } from 'react'
import { useAntdTable } from 'site-mode'

interface Props {}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
]

const Demo1 = () => {
  const service = {
    api: 'users',
  }
  const options = {
    extraParams: {
      int: 666,
    },
  }
  const { tableOptions } = useAntdTable(service, options)

  return (
    <>
      <Table rowKey={'_id'} columns={columns} {...tableOptions} />
    </>
  )
}

export default Demo1
