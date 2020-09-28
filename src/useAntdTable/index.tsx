import { TablePaginationConfig, TableProps } from 'antd/lib/table'
import { useEffect, useState } from 'react'

interface Props<RecordType> {
  service?: any
  options?: TableProps<RecordType>
}

const useAntdTable = (props: Props): { tableOptions: TableProps } => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  return {
    tableOptions: {
      loading,
      pagination: {
        pageSize: pageSize,
        showSizeChanger: true,
        current: page,
        total: page * pageSize,
        showQuickJumper: true,
      },
      dataSource: list,
    },
  }
}

export default useAntdTable
