import React, { useState, useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import { getMethod, postMethod, deleteMethod } from '../Services/APIServices';
import {useHistory} from 'react-router-dom';
const Application = () => {
    const history = useHistory();
    const [toggle, setToggle] = useState(0);
    const [state, setState] = useState('');
    const [date, setDate] = useState('');
    const [cases, setCases] = useState('');
    const [death, setDeath] = useState('');
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');
    const [dataOptionList, setSortOptionList] = useState([]);
    const [dataList, setDateList] = useState([]);
    const [sortState, setSortState] = useState('');
    const [accordingCases, setAccordingCases] = useState('');
    const [accordingDate, setAccordingDate] = useState('');
    const handleSortAccordingDate=async(e)=>{
        if(accordingDate !='' && sortState)
        {
            await getMethod('/api/v1/covid/get/data/state/date?state='+sortState+'&date='+accordingDate+'&page=1&limit=100000').then(response => {
                if(response.success) {
                    if (response.data.length > 0) {
                        setDateList(response.data)
                    }
                } else {
                    setDateList([]);
                }
                //setDateList
            });
        }
    }
    const handleSortAccordingCases=async(e)=>{
        if(accordingCases)
        {
            await getMethod('/api/v1/covid/get/states?cases=' + accordingCases).then(response => {
                if(response.success) {
                    if (response.data.length > 0) {
                        setDateList(response.data)
                    }
                } else {
                    setDateList([]);
                }
                //setDateList
            });
        }
    }
    const sortAccordingState = async (value) => {
        setSortState(value);
        await getMethod('/api/v1/covid/get/data/state?state=' + value).then(response => {
            if (response.success) {
                if (response.data.length > 0) {
                    setDateList(response.data)
                }
            } else {
                setDateList([]);
            }
            //setDateList
        });
    }
    const pickMonthArray = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const dateFormatConverter2 = (arg) => {
        let date = new Date(arg);
        return date.getUTCFullYear() + '-' + pickMonthArray[date.getUTCMonth() + 1] + '-' + (date.getUTCDate() < 10 ? pickMonthArray[date.getUTCDate()] : date.getUTCDate());
    }
    const editItem = async (data) => {
        setToggle(2);
        setState(data?.state);
        setDate(dateFormatConverter2(data?.date));
        setCases(data?.cases);
        setDeath(data?.deaths);
    }
    const getData = async () => {
        await getMethod('/api/v1/covid/list').then(response => {
            if (response.success) {
                setDateList(response.data)
            } else {
                setDateList([]);
            }
            //setDateList
        });
    }
    const getData2 = async () => {
        await getMethod('/api/v1/covid/list').then(response => {
            if (response.success) {
                setSortOptionList(response.data)
            } else {
                setSortOptionList([]);
            }
            //setDateList
        });
    }
    const deleteItem = async (data) => {
        await postMethod('/api/v1/covid/delete/data/state?state=' + data).then(response => {
            console.log(response)
            if (response.success) {
                setError1({ status: true, message: response.data });
                getData();
                setTimeout(function () {
                    setError1('');
                }, 3000);
            } else {
                setError1({ status: false, message: 'Failed!' });
            }
        });
    }
    const dateFormatConverter = (arg) => {
        let date = new Date(arg);
        let datel = date.getUTCDate();
        let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let returnDate = datel + ' ' + monthArray[(date.getUTCMonth())] + ' ' + date.getUTCFullYear()
        return returnDate;
    }
    const onHandleAdd = async (e) => {
        e.preventDefault();
        const addData = { cases: cases, deaths: death, state: state, date: date };
        await postMethod('/api/v1/covid/add/data', addData).then(response => {
            if (response.success) {
                setError({ status: true, message: 'Successfully Data Added!' });
                getData();
                setState('')
                setDate('');
                setCases('');
                setDeath('');
                setTimeout(function () {
                    setError('');
                }, 3000);
            } else {
                setError({ status: false, message: response.data.error });
                setTimeout(function () {
                    setError('');
                }, 5000);
            }
        });
    }
    const onHandleEdit = (e) => {
        e.preventDefault();
        const editData = { cases: cases, deaths: death, state: state, date: date };
        postMethod('/api/v1/covid/update/data', editData).then(response => {
            if (response.success) {
                setError({ status: true, message: 'Successfully Data Edited!' });
                setState('')
                setDate('');
                setCases('');
                setDeath('');
                setTimeout(function () {
                    setError('');
                    setToggle(0);
                    getData();
                }, 3000);
            } else {
                setError({ status: false, message: 'Failed!' });
                setTimeout(function () {
                    setError('');
                }, 5000);
            }
        });
    }
    useEffect(async () => {
        await getData();
        await getData2();
    }, [])
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <h1>Application Development</h1>
            </div>
            <div className='container'>
                <div className='row text-right'>
                    <div className='col-md-6 col-12'>

                    </div>
                    <div className='col-md-3 col-12'>
                        <button className='rcbtn02' onClick={() => { toggle === 1 ? setToggle(0) : toggle === 2 ? setToggle(0) : setToggle(1) }} style={{ width: '100%', position: 'relative', right: '0' }}>
                            {toggle === 1 ? 'Total Cases' : toggle === 2 ? 'Total Cases' : 'Add Cases Details'}
                        </button>
                    </div>
                    <div className='col-md-3 col-12'>
                        <button className='rcbtn02' onClick={() => history.push('/')} style={{ width: '100%', position: 'relative', right: '0' }}>
                            Back
                        </button>
                    </div>
                </div>
                {
                    toggle === 1 ?
                        <div className='row justify-content-center heading'>
                            <div className='col-md-12 col-12'>
                                <h2>{toggle === 1 ? 'Add Cases Details' : toggle === 2 ? 'Edit Cases Details' : ''}</h2>
                            </div>
                            <div className='col-md-6 col-12'>
                                <Form className='row'>
                                    <p className={error?.status ? '' : 'error'}>{error?.message ? error?.message : ''}</p>
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control type="text" placeholder="State" value={state} onChange={(e) => { setState(e.target.value) }} required={toggle === 2 ? false : true} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicDate">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="date" placeholder="Date" value={date} onChange={(e) => { setDate(e.target.value) }} required={toggle === 2 ? false : true} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicNumber">
                                        <Form.Label>Cases</Form.Label>
                                        <Form.Control type="number" placeholder="Cases" value={cases} onChange={(e) => { setCases(e.target.value) }} required={toggle === 2 ? false : true} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicNumber">
                                        <Form.Label>Deaths</Form.Label>
                                        <Form.Control type="number" placeholder="Deaths" value={death} onChange={(e) => { setDeath(e.target.value) }} required={toggle === 2 ? false : true} />
                                    </Form.Group>
                                    <div className='row justify-content-center' style={{ width: '100%', marginLeft: '0px' }}>
                                        <input type='submit' className='rcbtn03' onClick={(e) => { onHandleAdd(e) }} value='Add Data' style={{ textAlign: 'center' }} />
                                    </div>
                                </Form>
                            </div>
                        </div>
                        : toggle === 2 ?
                            <div className='row justify-content-center heading'>
                                <div className='col-md-12 col-12'>
                                    <h2>Edit Cases Details</h2>
                                </div>
                                <div className='col-md-6 col-12'>
                                    <Form className='row'>
                                        <p className={error?.status ? '' : 'error'}>{error?.message ? error?.message : ''}</p>
                                        <Form.Group className="mb-3" controlId="formBasicText">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control type="text" placeholder="State" value={state} onChange={(e) => { setState(e.target.value) }} required={toggle === 2 ? false : true} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicDate">
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control type="date" placeholder="Date" value={date} onChange={(e) => { setDate(e.target.value) }} required={toggle === 2 ? false : true} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicNumber">
                                            <Form.Label>Cases</Form.Label>
                                            <Form.Control type="number" placeholder="Cases" value={cases} onChange={(e) => { setCases(e.target.value) }} required={toggle === 2 ? false : true} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicNumber">
                                            <Form.Label>Deaths</Form.Label>
                                            <Form.Control type="number" placeholder="Deaths" value={death} onChange={(e) => { setDeath(e.target.value) }} required={toggle === 2 ? false : true} />
                                        </Form.Group>
                                        <div className='row justify-content-center' style={{ width: '100%', marginLeft: '0px' }}>
                                            <input type='submit' className='rcbtn03' onClick={(e) => { onHandleEdit(e) }} value='Edit Data' style={{ textAlign: 'center' }} />
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            : toggle === 0 ?
                                <div className='row justify-content-center heading'>
                                    <h2>Total Cases</h2>
                                    <div className='col-md-12 col-12'>
                                        <p className={error1?.status ? '' : 'error'}>{error1?.message ? error1?.message : ''}</p>
                                    </div>
                                    <div className='col-md-12 col-12'>
                                        <div className='row'>
                                            <div className='col-md-4 col-12'>
                                            <select value={sortState} onChange={(e) => sortAccordingState(e.target.value)}  className='rsvinp04'>
                                            <option value>According State</option>
                                            {
                                                dataOptionList?.length > 0 ?
                                                    dataOptionList?.map((item, index) =>
                                                        <option value={item?.state} key={index + 1}>{item?.state}</option>
                                                    )
                                                : null
                                            }
                                        </select>
                                            </div> 
                                            <div className='col-md-4 col-12' style={{display:'flex'}}>
                                                <input type='number' className='rsvinp01' placeholder='According Cases' value={accordingCases} onChange={(e)=>setAccordingCases(e.target.value)}/>
                                                <input type='submit' className='rsvinp02' style={{width:'fit-content'}} value='Search' onClick={(e)=>handleSortAccordingCases(e)}/>
                                            </div>
                                            <div className='col-md-4 col-12' style={{display:'flex'}}>
                                                <input type='date' className='rsvinp01' value={accordingDate} onChange={(e)=>setAccordingDate(e.target.value)}/>
                                                <input type='submit' className='rsvinp02' style={{width:'fit-content'}} value='According Date With State' onClick={(e)=>handleSortAccordingDate(e)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-12 col-12'>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>State</th>
                                                    <th>Cases</th>
                                                    <th>Death</th>
                                                    <th>Date</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dataList?.length > 0 ?
                                                        dataList?.map((item, index) =>
                                                            <tr key={index} id={item?._id}>
                                                                <td>{index + 1}</td>
                                                                <td>{item?.state}</td>
                                                                <td>{item?.cases}</td>
                                                                <td>{item?.deaths}</td>
                                                                <td>{dateFormatConverter(item?.date)}</td>
                                                                <td><a type='button' onClick={() => { editItem(item) }} style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}>Edit</a></td>
                                                                <td><a type='button' onClick={() => { deleteItem(item?.state) }} style={{ textDecoration: 'none', color: 'red', cursor: 'pointer' }}>Delete</a></td>
                                                            </tr>
                                                        )
                                                        : null
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                : null
                }
            </div>
        </div>
    )
}
export default Application;