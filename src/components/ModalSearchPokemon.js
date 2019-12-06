import React from 'react'
import { Card, Descriptions, Modal, Spin } from 'antd'
import { observer } from 'mobx-react'
import { getColor } from '../helpers'

const ModalSearchPokemon = observer(({ props }) => {
  const { showModal, handleModalOk, modalData } = props
  const { name, sprite, stats, type } = modalData
  const handleOk = event => handleModalOk()

  return (
    <div>
      <Modal
        title={name}
        visible={showModal}
        onOk={handleOk}
        onCancel={handleOk}
      >
        <Card
          headStyle={{}}
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
      </Modal>
    </div>
  )
})

export default ModalSearchPokemon
