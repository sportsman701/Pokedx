import React from 'react'
import { Radio, Row, Col, Input, message } from 'antd'
import { observer } from 'mobx-react'
import { getColor } from '../helpers'

const Search = observer(({ props }) => {
  const { types, changeType, searchPokemon, pokemonExist } = props
  const onChangeRadio = event => changeType(event.target.value)
  const error = () => {
    message.error('Pokemon is not found', 2)
  }
  if (pokemonExist === false) {
    error()
  }
  return (
    <div>
      <Radio.Group
        style={{ width: '100%' }}
        onChange={onChangeRadio}
        defaultValue="any"
        buttonStyle="solid"
      >
        <div>Tags</div>
        <Row style={{ paddingLeft: '15%', paddingRight: '5%' }}>
          {types.map(type => {
            return (
              <Col span={5} key={type} style={{ textAlign: 'left' }}>
                <Radio.Button
                  style={{ color: getColor(type), width: 75 }}
                  value={type}
                >
                  {type}
                </Radio.Button>
              </Col>
            )
          })}
        </Row>
      </Radio.Group>
      <Input.Search
        style={{ width: '97%' }}
        placeholder="Full name of pokemon (e.g. bulbasaur,pikachu)"
        enterButton="Search"
        size="large"
        onSearch={value => searchPokemon(value)}
      />
    </div>
  )
})

export default Search
