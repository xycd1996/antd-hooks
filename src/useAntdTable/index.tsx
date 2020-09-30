import { TableProps } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual'
import { FormInstance } from 'antd/lib/form/Form'

interface ReturnType<T> {
  tableOptions: TableProps<T>
  search: SearchType
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
  form?: FormInstance
}

const useTable = <T extends {}>(service: ServiceType, defaultOptions?: OptionsType): ReturnType<T> => {
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
  }, [])

  const _onChange = (e: any) => {
    !isEqual(page, e.current) && _queryList(e.current)
    !isEqual(pageSize, e.pageSize) && _queryList(1, searchParams, e.pageSize)
  }

  const _queryList = async (p: number = page, params: object = searchParams, psize: number = pageSize) => {
    setLoading(true)
    const { success, data } = await _getApi()({
      [pageKey]: p || page,
      [pageSizeKey]: psize || pageSize,
      ...defaultOptions?.extraParams,
      ...(params || searchParams),
    })
    if (success) {
      _queryAfter(data, { p, psize, params })
    }
  }

  const _getApi = () => {
    return service.api
  }

  const _queryAfter = (data: any, { p, psize, params }) => {
    const list = data.list || []
    const total = data.totalCount
    setList(list)
    setTotal(total)
    setLoading(false)
    setPage(p)
    setPageSize(psize)
    setSearchParams(params)
  }

  const _onReset = () => {
    if (!form) {
      return
    }
    form.resetFields()
    _queryList(1, {})
  }

  const _onSubmit = async () => {
    if (!form) {
      return
    }
    await _validateFormStatus(form)
    const values = form.getFieldsValue()
    _queryList(1, values)
  }

  const _validateFormStatus = async form => {
    const result = await form.validateFields()
    return result
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
        showTotal: total => `共 ${total} 条`,
      },
      dataSource: list,
    },
    search: {
      reset: _onReset,
      submit: _onSubmit,
    },
  }
}

export default useTable
