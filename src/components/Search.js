import React from 'react'
import { Checkbox, Input, Row, Col } from 'antd'
import { observer } from 'mobx-react'
import { getColor } from '../helpers'

const Search = observer(({ types, changeTypes, changeSearch }) => {
  const onChangeCheckBox = checkedValues => changeTypes(checkedValues)
  return (
    <div>
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={onChangeCheckBox}
        defaultValue={types}
      >
        <div>Tags</div>
        <Row style={{ paddingLeft: '15%', paddingRight: '5%' }}>
          {types.map(type => {
            return (
              <Col span={8} key={type} style={{ textAlign: 'left' }}>
                <Checkbox style={{ color: getColor(type) }} value={type}>
                  {type}
                </Checkbox>
              </Col>
            )
          })}
        </Row>
      </Checkbox.Group>
      <Input.Search
        style={{ width: '90%', marginTop: '2%' }}
        placeholder="Name of pokemon"
        onKeyUp={e => {
          changeSearch(e.target.value)
        }}
      />
    </div>
  )
})

export default Search
