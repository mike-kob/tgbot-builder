import React, { memo, useContext } from 'react'
import ReactFlow, { Background } from 'react-flow-renderer'
import { fromJS, Map } from 'immutable'
import _ from 'lodash'

import { DiagramContext } from '../../Context'
import { INIT_NODE_ID } from '@/pages/Bot/constans'

const Chart = ({ initState, elements }) => {
  const [, dispatch] = useContext(DiagramContext)

  const handleSelect = (els) => {
    dispatch({ type: 'SELECT_NODE', data: els?.[0] || Map() })
  }
  const handleMove = (e, node) => {
    dispatch({ type: 'UPDATE_NODE', data: fromJS(node) })
  }
console.log('INIT', initState)
  const initNode = {
    ...initState,
    position: {
      x: 0,
      y: 0,
    },
  }

  const links = elements.concat([initNode]).flatMap(el => el.data.commands.flatMap(cmd =>
    cmd.actions.filter(a => a.type === 'change_state').flatMap(action => {
      const srcState = el.id
      const targetState = action.options.state
      return { source: srcState, target: targetState }
    }))).map((link, idx) => ({ id: elements.length + idx, ...link }))

  return (
    <ReactFlow
      elements={elements.concat(links).concat([initNode])}
      multiSelectionKeyCode={-1}
      onSelectionChange={handleSelect}
      nodesConnectable={false}
      onNodeDragStop={handleMove}
      snapToGrid={true}
      snapGrid={[10, 10]}
    >
      <Background color="#aaa" gap={10}/>
    </ReactFlow>
  )
}

const areEqual = (prevProps, nextProps) =>
  _.isEqual(prevProps.initState, nextProps.initState) &&
  _.isEqual(prevProps.elements, nextProps.elements)

export default memo(Chart, areEqual)
