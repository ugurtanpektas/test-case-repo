import React from 'react'
import './App.css'
import jsonData from './dataset.json'
import jQuery from 'jquery'
import Person from './components/Person'
import PersonSub from './components/PersonSub'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      personData : []
    }
  }
  componentDidMount(){
    this.changeData()
  }

  findChild = (arrayData) => {
    let newData = []
    arrayData.forEach(element => {
      let subData = []
      subData = arrayData.filter(subElement => subElement.hasOwnProperty('parentID') && subElement.parentID === element.ID)
      if(subData.length > 0){
        element['subData'] = subData
        subData.forEach(subDataElement => {
          arrayData = arrayData.filter(arrayDataElement => subDataElement.ID !== arrayDataElement.ID)
        })
        this.findChild(element.subData)
      }
    })
    newData = arrayData
    return newData
  }

  changeData = () => {
    let newpersonData = this.findChild(jsonData)
    this.setState({
      personData:newpersonData
    })
  }

  findAndDelete = (array, id) => {
      let length = array.length
      while (length--) {
          if (array[length].ID === id) {
              array.splice(length, 1)
              continue
          }
          array[length].subData && this.findAndDelete(array[length].subData, id)
      }
      return array
  }

  deleteItem = (id) => {
    this.setState({
      personData:this.findAndDelete(this.state.personData, id)
    })  
  }

  toggleItem = (id) => {
    jQuery('#subItem'+id).slideToggle()
  }

  showSubItems = (person) => {
    if(person.hasOwnProperty('subData') && person.subData.length > 0){
      return (<PersonSub person={person}  showSubItems={this.showSubItems} toggleItem={this.toggleItem} deleteItem={this.deleteItem}></PersonSub>)
    }
  }

  render(){
    return(
      <Person personData={this.state.personData} showSubItems={this.showSubItems} toggleItem={this.toggleItem} deleteItem={this.deleteItem}></Person>
    )
  }
}

export default App
