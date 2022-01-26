import React, {Component, useState, useEffect} from "react"

class Table extends Component {
	constructor(props) {
        super(props)
	    this.state = {
		users: [],
		isLoading: false,
        isError: false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        const hack = "https://cors-anywhere.herokuapp.com/"
        const url = "https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Schedule";
        const response = await fetch(hack + url );
        if (response.ok) {
          const respond_value = await response.json()
          const users = respond_value["value"]
          this.setState({ users, isLoading: false })
        } else {
          this.setState({ isError: true, isLoading: false })
        }
    }

    // i cant get this to work
    renderTableHeader = () => {
        <th>
            <td className ="font-bold">
                ID
            </td>
            <td>
                Date
            </td>
            <td>
                Time
            </td>
            <td>
                Charity

            </td>
        </th>

    //     return Object.keys(this.state.users).map(attr => <th key={attr}>{attr}</th>)
    }
        // Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)

    renderTableRows = () => {
        return this.state.users.map(user => {
            return (
            // can help check if theres any issues using this as the key?
           <tr key={user.scheduleID}>
                <td>{String(user.scheduleID)}</td>
                <td>{user.date}</td>
                <td>{user.startTime}</td>
                <td>{String(user.charity_charityID)}</td>
            </tr>
            )
        })
    }

    render() {
        const { users, isLoading, isError } = this.state
    
        if (isLoading) {
          return <div>Loading...</div>
        }
    
        if (isError) {
          return <div>Error</div>
        }
    
        return (
            <table>
              <thead>
                {/* <tr>
                  {this.renderTableHeader()}
                </tr> */}
                <tr>
                    <td className="font-bold"> 
                        ID
                    </td>
                    <td className="font-bold"> 
                        Date
                    </td>
                    <td className="font-bold"> 
                        Time
                    </td>
                    <td className="font-bold"> 
                        Charity
                    </td>         
                </tr>
              </thead>
              <tbody>
                {this.renderTableRows()}
              </tbody>
            </table>
          )
          //  : (
          //   <div>
          //     No Schedule.
          // </div>
          // )
      }
}
export default Table