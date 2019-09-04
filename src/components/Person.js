import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

class Person extends React.Component{
  
    render(){
        return(
            <div className="person-container">
              {
                this.props.personData.map((person, personIndex) => {
                  let personName
                  if(person.hasOwnProperty('subData') && person.subData.length > 0){
                    personName = (
                      <span className="collapse-container" id="toggleTrigger" onClick={(e) => this.props.toggleItem(person.ID, e)}> 
                        <span className="arrow"><FontAwesomeIcon icon={faChevronDown} /></span> 
                        <span className="column">{person.Name}</span>
                        <span className="column">{person.Phone}</span>
                        <span className="column">{person.City}</span>
                      </span> 
                    )
                  }
                  else{
                    personName = (
                      <span className="collapse-container">
                        <span className="arrow"></span> 
                        <span className="column">{person.Name}</span>
                        <span className="column">{person.Phone}</span>
                        <span className="column">{person.City}</span>
                      </span> 
                    )
                  }
                  return (
                    <div className="person-item" key={person.ID}>
                      {personName}
                      <span className="delete-container" onClick={(e) => this.props.deleteItem(person.ID, e)}><FontAwesomeIcon icon={faMinusCircle} /></span>
                      {this.props.showSubItems(person)}
                    </div>
                  )
                })
              }
            </div>
          )
    }
}

export default Person