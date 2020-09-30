import { Table, Form, Input, Select, Col, Row, Button, Space } from 'antd'
import { SearchOutlined, RollbackOutlined } from '@ant-design/icons'
import React from 'react'
import { useTable } from 'site-mode'
import http from '@hlj/hlj-fetch'

const API = {
  queryList: body =>
    http('/hlj/hms/hljCommunity/manager/greater/page', {
      codeKey: 'retCode',
      body,
    }),
}

const columns = [
  {
    title: '用户ID',
    dataIndex: 'userId',
  },
  {
    title: '昵称',
    dataIndex: 'userNick',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '认证等级',
    dataIndex: 'verifiedLevel',
  },
]

const Demo1 = () => {
  const [form] = Form.useForm()

  const service = {
    api: API.queryList,
  }
  const options = {
    form: form,
    pageKey: 'page',
    pageSizeKey: 'perPage',
  }
  const { tableOptions, search } = useTable(service, options)

  const { submit, reset } = search
  return (
    <>
      <Form onReset={reset} onFinish={submit} style={{ padding: '20px 10px' }} form={form}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="userNick" label="用户昵称">
              <Input placeholder="请输入用户昵称" allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="userId" label="用户ID">
              <Input placeholder="请输入用户ID" allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="verifiedLevel" label="认证等级">
              <Select placeholder="请选择认证等级" allowClear onChange={submit}>
                <Select.Option value={''}>全部</Select.Option>
                <Select.Option value={1}>领域认证牛人</Select.Option>
                <Select.Option value={2}>行业领袖人物</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Space>
              <Button htmlType="submit" icon={<SearchOutlined />} type="primary">
                搜索
              </Button>
              <Button htmlType="reset" icon={<RollbackOutlined />} type="dashed">
                重置
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Table rowKey={'id'} columns={columns} {...tableOptions} />
    </>
  )
}

export default Demo1
