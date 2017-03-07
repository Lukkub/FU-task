import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, doubleAsync, getComicsCollection } from '../modules/counterReducer'
import Counter from '../../../components/Counter/counter'

const mapActionCreators = {
  increment,
  doubleAsync,
  getComicsCollection
}

const mapStateToProps = (state) => ({
  value: state.counter,
})

export default connect(mapStateToProps, mapActionCreators)(Counter)
