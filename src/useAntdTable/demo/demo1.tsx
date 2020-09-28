import { Table } from 'antd'
import React, { useEffect } from 'react'
import { useAntdTable } from 'site-mode'

interface Props {}

const Demo1 = () => {
  const { tableOptions } = useAntdTable({ api: 'users' })

  console.log(tableOptions)
  return (
    <>
      <Table
        rowKey={'id'}
        columns={[
          {
            title: '姓名',
            dataIndex: 'name',
          },
          {
            title: '性别',
            dataIndex: 'gender',
          },
        ]}
        {...tableOptions}
      />
    </>
  )
}

export default Demo1
