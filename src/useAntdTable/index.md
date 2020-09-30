---
nav:
  title: hooks
  path: /hooks
group:
  title: Table
  path: /table
  order: 1
---

# useTable

封装了 antd-table 和 antd-form 的联动逻辑。

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```javascript
const { tableOptions: TableProps, search: SearchType } = useTable((service: ServiceType), (defaultOptions: OptionsType))
```

### TableProps

与 ant API Table 部分一致

### SearchType

| 参数   | 说明                      | 类型       | 备注 |
| ------ | ------------------------- | ---------- | ---- |
| reset  | 重置 search 表单筛选项    | () => void | -    |
| submit | search 表单筛选项执行搜索 | () => void | -    |

### ServiceType

| 参数 | 说明                 | 类型 | 备注                   |
| ---- | -------------------- | ---- | ---------------------- |
| api  | 婚礼纪 http 请求方法 | -    | 必填，否则无法执行请求 |

### OptionsType

| 参数        | 说明                 | 类型               | 备注                                      |
| ----------- | -------------------- | ------------------ | ----------------------------------------- |
| page        | 默认页数             | number             | -                                         |
| pageSize    | 默认请求页条数       | number             | -                                         |
| pageKey     | 默认请求分页参数     | number             | 默认值: `page`                            |
| pageSizeKey | 默认请求分页条数参数 | number             | 默认值: `pageSize`                        |
| extraParams | 默认请求额外携带参数 | [key: string]: any | -                                         |
| form        | 筛选表单 form 实例   | FormInstance       | 如需筛选表单和 Table 联动需传递 form 实例 |
