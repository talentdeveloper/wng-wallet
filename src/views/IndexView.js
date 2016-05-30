import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexgrid'

export class IndexView extends React.Component {
  render () {
    return (
      <Row>
        <Col md={12}>
          Test
        </Col>
      </Row>
    )
  }
}

export default connect()(IndexView)
