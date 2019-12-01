import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Card, List, Descriptions } from 'antd'
import { getColor } from '../helpers'

const DisplayPokemon = observer(
  ({ pokemons, getPokemons, loadingPokemons }) => {
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
            total: pokemons.length,
            pageSizeOptions: ['10', '20', '50'],
            defaultPageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true
          }}
          renderItem={({ name, sprite, type, stats }) => (
            <List.Item>
              <Card
                headStyle={{ color: getColor(type) }}
                bordered
                title={name}
                cover={<img alt={name} src={sprite} />}
              />
              <Descriptions bordered column={1} size="small">
                {stats.map(([baseStat, name]) => {
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
  }
)

export default DisplayPokemon
