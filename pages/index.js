import React from 'react'

import bigdaddy from 'hocs/bigdaddy'
import PostComponent from 'components/PostComponent'

class Index extends React.Component {
  render() {
    return (
      <h1>
        Hello Boilerplate
        <PostComponent />
      </h1>
    )
  }
}

export default bigdaddy(Index)