import { Table } from 'antd'
import React from 'react'
import { useAntdTable } from 'site-mode'

interface Props {}

const Demo1 = () => {
  const { tableOptions } = useAntdTable({}<>)
  return (
    <>
      <Table
        columns={[
          {
            title: 'name',
            dataIndex: 'name',
          },
        ]}
        {...tableOptions}
      />
    </>
  )
}

export default Demo1
