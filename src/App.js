import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import jsonData from './dataset.json'
import jQuery from 'jquery';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      personData : []
    }
  }
  componentDidMount(){
    this.changeData();
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
    });
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
      let length = array.length;
      while (length--) {
          if (array[length].ID == id) {
              array.splice(length, 1);
              continue;
          }
          array[length].subData && this.findAndDelete(array[length].subData, id);
      }
      return array;
  }

  deleteItem = (id) => {
    this.setState({
      personData:this.findAndDelete(this.state.personData, id)
    })  
  }

  toggleItem = (id) => {
    jQuery('#subItem'+id).slideToggle();
  }

  showSubItems = (person) => {
    if(person.hasOwnProperty('subData') && person.subData.length > 0){
      return(
        <div className="person-sub-container" id={'subItem'+person.ID}>
          {
            person.subData.map((data, dataIndex) => {
              let showSubItemCheck = data.hasOwnProperty('subData') && data.subData.length > 0 ? this.showSubItems(data) : '';
              let personName;
              if(showSubItemCheck){
                personName = (
                  <span className="collapse-container" onClick={(e) => this.toggleItem(data.ID, e)}> <FontAwesomeIcon icon={faChevronDown} /> {data.Name}</span> 
                )
              }
              else{
                personName = (
                  <span className="collapse-container"> {data.Name}</span> 
                )
              }
              return (
                <div className="person-item" key={data.ID}>
                  {personName} 
                  <span className="delete-container"><a href="#" onClick={(e) => this.deleteItem(data.ID, e)}><FontAwesomeIcon icon={faMinusCircle} /></a></span>
                  {showSubItemCheck}
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  render(){
    return(
      <div className="person-container">
        {
          this.state.personData.map((person, personIndex) => {
            let personName;
            if(person.hasOwnProperty('subData') && person.subData.length > 0){
              personName = (
                <span className="collapse-container" onClick={(e) => this.toggleItem(person.ID, e)}> <FontAwesomeIcon icon={faChevronDown} /> {person.Name}</span> 
              )
            }
            else{
              personName = (
                <span className="collapse-container"> {person.Name}</span> 
              )
            }
            return (
              <div className="person-item" key={person.ID}>
                {personName}
                <span className="delete-container"><a href="#" onClick={(e) => this.deleteItem(person.ID, e)}><FontAwesomeIcon icon={faMinusCircle} /></a></span>
                {this.showSubItems(person)}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default App;
