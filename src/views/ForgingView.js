import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import PageTitle from 'components/PageTitle'
import ForgingContainer from 'components/Forging/ForgingContainer'

export class ForgingView extends React.Component {

  render () {
    return (
      <PageTitle pageName='forging'>
        <Row>
          <Col xs={12} md={12}>
            <ForgingContainer />
          </Col>
        </Row>
      </PageTitle>
    )
  }
}

export default ForgingView
