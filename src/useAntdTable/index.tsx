import { TablePaginationConfig, TableProps } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual'

interface ReturnType<T> {
  tableOptions?: TableProps<T>
}

interface ServiceType {
  api: string
}

const useAntdTable = <T extends {}>(service: ServiceType, defaultOptions?: TableProps<T>): ReturnType<T> => {
  const [api, setApi] = useState(service.api)
  const [list, setList] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    _queryList()
  }, [page, pageSize])

  const _onChange = (e: any) => {
    !isEqual(page, e.current) && setPage(e.current)
    !isEqual(pageSize, e.pageSize) && setPageSize(e.pageSize)
  }

  const _queryList = async () => {
    setLoading(true)
    const res = await fetch(`/api/${api}?page=${page}&per_page=${pageSize}`, {
      method: 'GET',
    })
    const list = await res.json()
    setList(list)
    setLoading(false)
  }

  return {
    tableOptions: {
      onChange: _onChange,
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
