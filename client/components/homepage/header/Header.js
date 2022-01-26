import Link from 'next/link'
import { Home, BarChart, ListAlt, Fastfood, ImportExport, List, ArrowForward, SupervisorAccount } from '@material-ui/icons';
import DropDownMenu from './DropDownMenu';
import Router from 'next/router'
import { useState } from 'react';

export default function Header({ name, role }) {

    const [ openMenu, setopenMenu ] = useState(false);

    const setOpen = () => {
        setopenMenu(!openMenu);
    }

    const onLogout = async () => {
        // let url = 'https://g1t3-node-auth-srv.cfapps.us10.hana.ondemand.com/api/auth/clear';
        // let url = 'http://localhost:5000/api/auth/clear';
        let url = '/api/auth/clear';
        console.log("attempting to logout");
        const response = await fetch(url, {credentials: 'include'});
        Router.push('/front');
    }

    return (    
        <div className="bg-white">
        <div className="container mx-auto">
        <nav className="flex items-center p-3 flex-wrap">
            <span className="flex flex-row content-center border-r-1 border-gray-400">
            <img
                src="images/logo2.png"
                className="h-6 block mx-2"
                alt="logo"
            />
            </span>
            <span className="mt-1 mx-2 flex flex-row text-l text-black font-bold tracking-wide"> EBS G1T3 </span>

            <div className="ml-auto">
            <button type="button"  onClick={() => setOpen}
            className="text-black font-bold font-size text-l items-center justify-center inline-flex px-3 py-2 rounded lg:hidden ml-auto outline-none nav-toggler mr-2 hover:bg-gray-900 hover:text-white focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded="true">
                <i className="">Menu</i>
            </button>
            {openMenu && <DropDownMenu tabIndex="0" data={['Home', 'Analytics', 'Plan Schedule', 'Diet', 'Import Data', 'List']}/>}
            </div>

            <div className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto" id="navigation">    
                
                <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto mx-auto" >
                    <Link href="/home">
                    <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white">
                        <Home className="py-1" /><span>Home</span>
                    </a>
                    </Link>

                    <Link href="/analytic">
                    <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
                        <BarChart className="py-1" /><span>Analytics</span>
                    </a>
                    </Link>
                    <Link href="/schedule">
                    <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
                        <ListAlt className="py-1" /><span>Plan Schedule</span>
                    </a>
                    </Link>
                    <Link href="/diet">
                    <a href="/diet" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
                        <Fastfood className="py-1" /><span>Diet</span>
                    </a>
                    </Link>
                    <Link href="/import">
                    <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
                        <ImportExport className="py-1" /><span>Import Data</span>
                    </a>
                    </Link>
                    <Link href="/review">
                    <a href="/review" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
                            <List className="py-1"/><span>Requests</span>
                    </a>
                    </Link>
                    <Link href="/admin">
                        <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
                            <SupervisorAccount className="py-1"/><span>Admin</span>
                        </a>
                    </Link>                    
                    {/* { role == "admin" &&
                        <Link href="/admin">
                        <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
                            <SupervisorAccount className="py-1"/><span>Admin</span>
                        </a>
                        </Link>
                    } */}
                </div>
            </div>

            <div>
                <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" 
                onClick={onLogout}
                >
                    <ArrowForward className="py-1"/><span className=""> Logout </span>
                </a>
            </div>
        
        </nav>
        </div>
        </div>
    );
}

// class Header extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             openMenu: false,
//             role: this.props['role']
//         }
//         this.onBlur = this.onBlur.bind(this);
//         this.onLogout = this.onLogout.bind(this);
//         console.log(this.props);
//         console.log(this);
//     }

//     onBlur = () => {
//         this.setState({
//             openMenu: false
//         });
//         console.log(this.state.openMenu);
//     }

//     onLogout = async () => {
//         // let url = 'https://g1t3-node-auth-srv.cfapps.us10.hana.ondemand.com/api/auth/clear';
//         let url = 'http://localhost:5000/api/auth/clear';
//         console.log("attempting to logout");
//         const response = await fetch(url, {credentials: 'include'});
//         Router.push('/front');

//     }

//     render () {
//         return (    
//             <div className="bg-white">
//             <div className="container mx-auto">
//             <nav className="flex items-center p-3 flex-wrap">
//                 <span className="flex flex-row content-center border-r-1 border-gray-400">
//                 <img
//                     src="images/logo2.png"
//                     className="h-6 block mx-2"
//                     alt="logo"
//                 />
//                 </span>
//                 <span className="mt-1 mx-2 flex flex-row text-l text-black font-bold tracking-wide"> EBS G1T3 </span>

//                 <div className="ml-auto">
//                 <button type="button"  onClick={() => this.setState({openMenu: !this.state.openMenu})}
//                 className="text-black font-bold font-size text-l items-center justify-center inline-flex px-3 py-2 rounded lg:hidden ml-auto outline-none nav-toggler mr-2 hover:bg-gray-900 hover:text-white focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded="true">
//                     <i className="">Menu</i>
//                 </button>
//                 {this.state.openMenu && <DropDownMenu tabIndex="0" onBlur={ this.onBlur } data={['Home', 'Analytics', 'Plan Schedule', 'Diet', 'Import Data', 'List']}/>}
//                 </div>

//                 <div className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto" id="navigation">    
                    
//                     <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto mx-auto" >
//                         <Link href="/home">
//                         <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white">
//                             <Home className="py-1" /><span>Home</span>
//                         </a>
//                         </Link>

//                         <Link href="/analytic">
//                         <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
//                             <BarChart className="py-1" /><span>Analytics</span>
//                         </a>
//                         </Link>
//                         <Link href="/schedule">
//                         <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
//                             <ListAlt className="py-1" /><span>Plan Schedule</span>
//                         </a>
//                         </Link>
//                         <Link href="/diet">
//                         <a href="/diet" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
//                             <Fastfood className="py-1" /><span>Diet</span>
//                         </a>
//                         </Link>
//                         <Link href="/import">
//                         <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
//                             <ImportExport className="py-1" /><span>Import Data</span>
//                         </a>
//                         </Link>
//                         <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
//                             <List className="py-1"/><span>List</span>
//                         </a>
                        
//                         { this.role == "admin" &&
//                             <Link href="/admin">
//                             <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" >
//                                 <SupervisorAccount className="py-1"/><span>Admin</span>
//                             </a>
//                             </Link>
//                         }
                        

//                     </div>
//                 </div>


//                 <div>
//                     <a href="#" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold font-size text-l items-center justify-center hover:bg-gray-900 hover:text-white" 
//                     onClick={this.onLogout}
//                     >
//                         <ArrowForward className="py-1"/><span className=""> Logout </span>
//                     </a>
//                 </div>
            
//             </nav>
//             </div>
//             </div>


            


//             // {/* <div classNameName="logo" ><a href="#" classNameName="logo-text"> TESTVV </a></div> */}
        
//             // {/* <NavContainer /> */}
//         );
//     }
// }

// export default Header;
