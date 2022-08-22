import React, { memo, useContext } from 'react';
import ReactFlow, { Background } from 'react-flow-renderer';
import { fromJS, Map } from 'immutable';
import _ from 'lodash';

import { DiagramContext } from '../../Context';

function Chart({ elements }) {
  const [, dispatch] = useContext(DiagramContext);

  const handleSelect = (els) => {
    dispatch({ type: 'SELECT_NODE', data: els?.[0] || Map() });
  };
  const handleMove = (e, node) => {
    dispatch({ type: 'UPDATE_NODE', data: fromJS(node) });
  };

  const links = elements.flatMap((el) => (el.data.commands.concat(el.data.messages)).flatMap((cmd) => cmd.actions.filter((a) => a.type === 'change_state').flatMap((action) => {
    const srcState = el.id;
    const targetState = action.options.state;
    return { source: srcState, target: targetState };
  })))
    .concat(elements.flatMap((el) => el.data.initial.filter((a) => a.type === 'change_state').flatMap((action) => {
      const srcState = el.id;
      const targetState = action.options.state;
      return { source: srcState, target: targetState };
    })))
    .map((link, idx) => ({ id: elements.length + idx, ...link }));
  console.log(links);

  return (
    <ReactFlow
      elements={elements.concat(links)}
      multiSelectionKeyCode={-1}
      onSelectionChange={handleSelect}
      nodesConnectable={false}
      onNodeDragStop={handleMove}
      snapToGrid
      snapGrid={[10, 10]}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
    >
      <Background color="#aaa" gap={10} />
    </ReactFlow>
  );
}

const areEqual = (prevProps, nextProps) => _.isEqual(prevProps.elements, nextProps.elements);

export default memo(Chart, areEqual);
