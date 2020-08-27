import React from 'react'
import { connect } from 'react-redux';
import LoginModal from './LoginModal';
import ReviewModal from './ReviewModal';

const modalLookup = {
  LoginModal,
  ReviewModal
}

const mapState = (state) => ({
  currentModal: state.modals
})

const ModalManager = ({currentModal}) => {
  let renderedModal;

  if(currentModal){
    const {modalType, modalProps} = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps}/>
  }
  return (
    <div>{renderedModal}</div>
  )
}

export default connect(mapState)(ModalManager);