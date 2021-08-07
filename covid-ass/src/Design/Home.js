import React from 'react';
import { Link } from "react-router-dom";
const Home=()=>{
    return(
        <div className='container-fluid bgBanner'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-12 col-12' style={{height:'100px'}}>
                    </div>
                    <div className='col-md-12 col-12' style={{height:'100px'}}>
                    </div>
                    <div className='col-md-12 col-12' style={{height:'100px'}}>
                    </div>
                    <div className='col-md-12 col-12' style={{height:'100px'}}>
                    </div>
                    <div className='col-md-12 col-12' style={{marginBottom:'25px'}}>
                        <h1>Application Development</h1>
                    </div>
                    <div className='col-md-12 col-12 text-center'>
                        <Link className='rcbtn01' to='/application'>Start</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;