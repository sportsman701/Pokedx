import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Card, Descriptions, List, Spin } from 'antd'
import { getColor } from '../helpers'

const DisplayPokemon = observer(({ props }) => {
  const {
    total,
    customPagination,
    loadingPokemons,
    loadingInfoPok,
    setPagination,
    getPokemons,
    pokemons
  } = props
  useEffect(() => {
    function fetchPokemons() {
      return getPokemons()
    }
    fetchPokemons()
  }, [getPokemons])
  return (
    <div style={{ background: '#ECECEC', padding: '15px' }}>
      <List
        grid={{
          gutter: 8,
          column: 4,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 8
        }}
        dataSource={pokemons}
        loading={loadingPokemons}
        pagination={{
          total: total,
          pageSizeOptions: customPagination,
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (current, size) => setPagination(current, size),
          onShowSizeChange: (current, size) => setPagination(current, size)
        }}
        renderItem={({ name, sprite, stats, type }) => (
          <List.Item>
            <Card
              loading={loadingInfoPok}
              bordered
              title={name}
              cover={
                sprite ? (
                  <img alt={name} src={sprite} />
                ) : (
                  <Spin style={{ paddingTop: '10%' }} tip="Image loading..." />
                )
              }
            />
            <Descriptions bordered column={1} size="small">
              {type &&
                type.map(([type, name]) => {
                  return (
                    <Descriptions.Item label={name} key={name}>
                      <p style={{ color: getColor(type) }}>{type}</p>
                    </Descriptions.Item>
                  )
                })}
              {stats &&
                stats.map(([baseStat, name]) => {
                  return (
                    <Descriptions.Item label={name} key={name}>
                      {baseStat}
                    </Descriptions.Item>
                  )
                })}
            </Descriptions>
          </List.Item>
        )}
      />
    </div>
  )
})

export default DisplayPokemon
