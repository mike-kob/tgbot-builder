import React, { useContext } from 'react'
import ReactFlow, { Background } from 'react-flow-renderer'
import { fromJS, Map } from 'immutable'

import { DiagramContext } from '../Context'

const Diagram = () => {
  const [state, dispatch] = useContext(DiagramContext)

  const handleSelect = (els) => {
    dispatch({ type: 'SELECT_NODE', data: els?.[0] || Map() })
  }
  const handleMove = (e, node) => {
    dispatch({ type: 'UPDATE_NODE', data: fromJS(node) })
  }

  return (
    <ReactFlow
      elements={state.get('elements').toJS()}
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

export default Diagram
