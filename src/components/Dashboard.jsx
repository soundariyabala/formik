import React,{useEffect, useState} from 'react'
import Card from './Card'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import AxiosService from './utils/ApiService';


function Dashboard() {
    let [user,setUser] = useState([])
    let data = [
        {
            title:"EARNINGS (MONTHLY)",
            value:"$45,000",
            color:'primary',
            icon:'fa-calendar',
            isProgress:false
        },
        {
            title:"EARNINGS (ANNUAL)",
            value:"$215,000",
            color:'success',
            icon:'fa-dollar-sign',
            isProgress:false
        },
        {
            title:"TASKS",
            value:"20",
            color:'info',
            icon:'fa-clipboard-list',
            isProgress:true
        },
        {
            title:"PENDING REQUEST",
            value:"18",
            color:'warning',
            icon:'fa-comments',
            isProgress:false
        }
    ]
    let navigate = useNavigate()

    let handleDelete = async(id)=>{
        try {
            let res = await AxiosService.delete(`/formikbookauthor/${id}`);
            if(res.status===200)
            {
                getData()
            }
        } catch (error) {
           console.log(error)
        }
    }

    const getData = async()=>{
        try {
            let res = await AxiosService.get('/formikbookauthor')
            if(res.status===200)
            {
                setUser(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{getData()},[])

    
  return <>
    <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>
                <div className="row">
                    {
                        data.map((e,i)=>{
                            return <Card cardData={e} key={i}/>
                        })
                    }
                </div>
                <div className="row">
                <h2 style={{textAlign:"center"}}>Details of Books</h2>
                <Table striped bordered hover>
                   
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN No</th>
                        <th>Publication Date</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            user.map((e,i)=>{
                                return <tr key={e.id}>
                                    <td>{i+1}</td>
                                    <td>{e.Books.title}</td>
                                    <td>{e.Books.author}</td>
                                    <td>{e.Books.ISBNnumber}</td>
                                    <td>{e.Books.publicationDate}</td>
                                    <td>
                                        <Button variant='primary' onClick={()=>navigate(`/edituser/${e.id}`)}>Edit</Button>
                                        &nbsp;
                                        <Button variant='danger' onClick={()=>{handleDelete(e.id)}}>Delete</Button>
                                    </td></tr>})}
                    </tbody>
                </Table>

                <h2 style={{textAlign:"center"}}>Details of Author</h2>
                <Table striped bordered hover>
                   
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Author Name</th>
                        <th>Birth Date</th>
                        <th>Biography</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            user.map((e,i)=>{
                                return <tr key={e.id}>
                                    <td>{i+1}</td>
                                    <td>{e.Author.authorsname}</td>
                                    <td>{e.Author.birthdate}</td>
                                    <td>{e.Author.shortbio}</td>
                                    <td>
                                        <Button variant='primary' onClick={()=>navigate(`/edituser/${e.id}`)}>Edit</Button>
                                        &nbsp;
                                        <Button variant='danger' onClick={()=>{handleDelete(e.id)}}>Delete</Button>
                                    </td></tr>})}
                    </tbody>
                </Table>

                </div>
            </div>
        </div>
    </div>
  </>
}

export default Dashboard
