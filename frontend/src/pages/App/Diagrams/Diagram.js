import React, { useContext, useEffect } from 'react'
import { mapValues } from 'lodash'
import * as actions from '@mrblenny/react-flow-chart/src/container/actions'
import { FlowChart } from '@mrblenny/react-flow-chart'

import StateNode from './StateNode'
import { Context } from '../bot/store'

const SelectedListener = (props) => {
  const [, dispatch] = useContext(Context)

  useEffect(() => {
    dispatch({ type: 'SELECT', data: props.selected })
  }, [props.selected])

  return (
        <>
            {props.children}
        </>
  )
}

class Diagram extends React.Component {
  constructor (props) {
    super(props)
    this.state = props.chart
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.chart !== this.props.chart) {
      this.setState(this.props.chart)
    }
  }

  render () {
    const stateActions = mapValues(actions, (func) => (...args) => this.setState(func(...args)))

    return (
            <SelectedListener selected={this.state.selected}>
                <FlowChart
                    style={{ height: '100%' }}
                    chart={this.state}
                    callbacks={stateActions}
                    Components={{
                      NodeInner: StateNode,
                    }}
                />
            </SelectedListener>
    )
  }
}

export default Diagram
