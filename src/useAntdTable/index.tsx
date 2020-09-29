import { TableProps } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface ReturnType<T> {
  tableOptions?: TableProps<T>
  search?: SearchType
}

interface SearchType {
  reset: () => void
  submit: () => void
}

interface ServiceType {
  api: any
}

interface OptionsType {
  page?: number
  pageSize?: number
  pageKey?: string
  pageSizeKey?: string
  extraParams?: {
    [key: string]: any
  }
  form?: WrappedFormUtils
}

const useTable = <T extends {}>(
  service: ServiceType,
  defaultOptions?: OptionsType
): ReturnType<T> => {
  const pageKey = defaultOptions?.pageKey || 'page'
  const pageSizeKey = defaultOptions?.pageSizeKey || 'pageSize'
  const form = defaultOptions?.form
  const [list, setList] = useState<any[]>([])
  const [page, setPage] = useState(defaultOptions?.page || 1)
  const [pageSize, setPageSize] = useState(defaultOptions?.pageSize || 10)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState({})

  useEffect(() => {
    _queryList()
  }, [page, pageSize, searchParams])

  const _onChange = (e: any) => {
    !isEqual(page, e.current) && setPage(e.current)
    !isEqual(pageSize, e.pageSize) && setPageSize(e.pageSize)
  }

  const _queryList = async () => {
    setLoading(true)
    const { success, data } = await _getApi()({
      [pageKey]: page,
      [pageSizeKey]: pageSize,
      ...defaultOptions?.extraParams,
      ...searchParams
    })
    if (success) {
      _queryAfter(data)
    }
  }

  const _getApi = () => {
    return service.api
  }

  const _queryAfter = (data: any) => {
    const list = data.list || []
    const total = data.totalCount
    setList(list)
    setTotal(total)
    setLoading(false)
  }

  const _onReset = () => {
    if (!form) {
      return
    }
    form.resetFields()
    setSearchParams({})
  }

  const _onSubmit = () => {
    if (!form) {
      return
    }
    setTimeout(() => {
      const values = form.getFieldsValue()
      setSearchParams(values)
    })
  }

  return {
    tableOptions: {
      onChange: _onChange,
      loading,
      pagination: {
        pageSize: pageSize,
        showSizeChanger: true,
        current: page,
        total: total,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`
      },
      dataSource: list
    },
    search: {
      reset: _onReset,
      submit: _onSubmit
    }
  }
}

export default useTable
