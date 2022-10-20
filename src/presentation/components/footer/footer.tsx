import React, { memo } from 'react'
import Styles from './footer-styles.scss'

const Foooter: React.FC = () => {
  return (
    <footer className={Styles.footer} />
  )
}

export default memo(Foooter)
