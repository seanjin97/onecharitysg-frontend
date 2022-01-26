import React, {useState, useEffect} from "react"
import Datatable from "../schedule/index"


const Wat = () =>{
    const [data, setData] = useState([])
    const [q, setQ] = useState('')

    useEffect(()=>{
        fetch('https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Schedule')
        .then((response) => response.json())
        .then((json) => setData(json))
    }, [])
    console.log("test")
    return(
        <div>
            <div>filter goes here</div>
            <Datatable data = {data}/>
        </div>
    )

}


export default Wat


// export async function getStaticProps() {

//     class info extends Component {
//         constructor(props){
//             super(props)
//             this.state = {
//                 items:[],
//                 isLoaded: false,
//             }
//         }
//         componentDidMount(){
//             fetch('https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Schedule')
//             .then(res => res.json())
//             .then(json=> {
//                 this.setState({
//                     isLoaded:true,
//                     items: json,

//                 })
//             })
//         }
//         render(){
//             var {isLoaded, items } = this.state
//             if (!isLoaded){
//                 return <div>Loading...</div>
//             }
//             else{
//                 return(
//                     <div className = "Api">
//                         <ul>
//                             {items.map(item =>(
//                                 <li key = {item.id} >
//                                     {item.scheduleID}   |   {item.date} |   {item.startTime} |   {item.charity_charityID}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )
        
//                 }

//             }

//     }
// }
// export default getStaticProps


