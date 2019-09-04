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
      cityData : []
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
    let newCityData = this.findChild(jsonData)
    console.log(newCityData)
    this.setState({
      cityData:newCityData
    })
  }
  deleteItem = (id) => {
    this.setState({
      cityData:this.state.cityData.filter(cityElement => cityElement.ID !== id)
    })
  }
  toggleItem = (id) => {
    jQuery('#subItem'+id).slideToggle();
  }

  showSubItems = (city) => {
    if(city.hasOwnProperty('subData') && city.subData.length > 0){
      return(
        <div className="city-sub-container" id={'subItem'+city.ID}>
          {
            city.subData.map((data, dataIndex) => {
              return (
                <div className="city-item" key={dataIndex}>
                  {data.Name}
                  {this.showSubItems(data)}
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
      <div className="city-container">
        {
          this.state.cityData.map((city, cityIndex) => {
            return (
            <div className="city-item" key={cityIndex}>
              <span className="collapse-container" onClick={(e) => this.toggleItem(city.ID, e)}> <FontAwesomeIcon icon={faChevronDown} /> {city.Name}</span> 
              <span className="delete-container"><a href="#" onClick={(e) => this.deleteItem(city.ID, e)}><FontAwesomeIcon icon={faMinusCircle} /></a></span>
              {this.showSubItems(city)}
            </div>)
          })
        }
      </div>
    )
  }
}

export default App;
