import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

class PersonSub extends React.Component{
    render(){
        return(
            <div className="person-sub-container" id={'subItem'+this.props.person.ID}>
              {
                this.props.person.subData.map((data, dataIndex) => {
                  let showSubItemCheck = data.hasOwnProperty('subData') && data.subData.length > 0 ? this.props.showSubItems(data) : ''
                  let personName
                  if(showSubItemCheck){
                    personName = (
                      <span className="collapse-container" onClick={(e) => this.props.toggleItem(data.ID, e)}> 
                        <span className="arrow"><FontAwesomeIcon icon={faChevronDown} /></span> 
                        <span className="column">{data.Name}</span>
                        <span className="column">{data.Phone}</span>
                        <span className="column">{data.City}</span>
                      </span> 
                    )
                  }
                  else{
                    personName = (
                      <span className="collapse-container"> 
                        <span className="arrow"></span> 
                        <span className="column">{data.Name}</span>
                        <span className="column">{data.Phone}</span>
                        <span className="column">{data.City}</span>
                      </span> 
                    )
                  }
                  return (
                    <div className="person-item" key={data.ID}>
                      {personName} 
                      <span className="delete-container" onClick={(e) => this.props.deleteItem(data.ID, e)}><FontAwesomeIcon icon={faMinusCircle} /></span>
                      {showSubItemCheck}
                    </div>
                  )
                })
              }
            </div>
          )
    }
}

export default PersonSub