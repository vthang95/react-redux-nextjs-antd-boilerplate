import { Component } from 'react'

import style from './style.scss'

class PostComponent extends Component {
  render() {
    return (
      <div className="post-style">
        This is a card
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </div>
    )
  }
}

export default PostComponent