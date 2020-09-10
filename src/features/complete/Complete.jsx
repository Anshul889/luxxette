import React from 'react'
import styles from './Complete.module.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const mapState = (state, ownProps) => ({
  auth: state.firebase.auth,
})

const Complete = ({ auth }) => {
  return (
    <div className={styles.complete}>
      <h2>Thank you for your order</h2>
      <Link to={`/profile/${auth.uid}`}>
        <Button>Track</Button>
      </Link>
    </div>
  )
}

export default connect(mapState, null)(Complete)
