import './App.css';
import News from './component/News';
import NavBar from './component/navBar'
import React, {Component } from 'react'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 6
  state = {
    progress: 0
  }


  setProgress=(progress)=>{
    this.setState({progress: progress})
  }


  render() {
    

    return (
      <>
        
        <Router>
        <NavBar/>
        <LoadingBar
          color='#0d6efd'
          height={3}
          shadow={true}
          progress={this.state.progress}
          // onLoaderFinished={() => setProgress(0)}
          />
        <Routes>

          <Route exact path='/' element={<News setProgress = {this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general"/>}/>
          <Route exact path='/business' element={<News setProgress = {this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business"/>}/>
          <Route exact path='/entertainment' element={<News setProgress = {this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>}/>
          <Route exact path='/health' element={<News setProgress = {this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health"/>}/>
          <Route exact path='/science' element={<News setProgress = {this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science"/>}/>
          <Route exact path='/sports' element={<News setProgress = {this.setProgress} key="sport" pageSize={this.pageSize} country="in" category="sports"/>}/>
          <Route exact path='/technology' element={<News setProgress = {this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology"/>}/>

        </Routes>
        </Router>
      </>
    )
    }
  }
