import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate,useParams } from 'react-router-dom';
import AxiosService from './utils/ApiService';
import { useFormik } from 'formik';
import * as Yup from 'yup'

function EditUser() {

    let params = useParams()//this will return a object
    let [initialValues,setinitialValues] = useState({
    Books:{
        title:"",
        author:"",
        ISBNnumber:"",
        publicationDate:""
     },
     Author:{
        authorsname:"",
        birthdate:"",
        shortbio:"",
     }
    });
   
    const getUserData = async () => {
        let {id} = params;
        try {
          let res=await AxiosService.get(`/formikbookauthor/${id}`);
          if (res.status ===200) {
            setinitialValues({
               Books:{
                    title:res.data.Books.title,
                    author:res.data.Books.author,
                    ISBNnumber:res.data.Books.ISBNnumber,
                    publicationDate:res.data.Books.publicationDate
                },
                Author:{
                    authorsname:res.data.Author.authorsname,
                    birthdate:res.data.Author.birthdate,
                    shortbio:res.data.Author.shortbio
                }})
          }
        }
        catch(error){
            console.log(error);
        }

    };
  
    let navigate = useNavigate()// this will return a function


 let formik=useFormik({
    initialValues:initialValues,

validationSchema:Yup.object({

       Books: Yup.object({
            title:Yup.string().required('Title is Required'),
            author:Yup.string().required('author is Required'),
            ISBNnumber:Yup.string().required('ISBN number required').matches(/^\d{13}$/,'Enter a valid ISBN No'),
            publicationDate:Yup.date().max('2024-01-10','select lesser than current date')
        }),

        Author:Yup.object({
            authorsname:Yup.string().required('Authorsname is Required'),
            birthdate:Yup.date().max('2024-01-10','select lesser than current date'),
            shortbio:Yup.string().required('Enter a biography')
        })
          }),
enableReinitialize: true,
          onSubmit:async(values) => {
            let {id}=params;
            values.id=id;
            try {
              let res=await AxiosService.put(`/formikbookauthor/${id}`,values);
              if (res.status===200) navigate("/dashboard");
            } catch (error) {
              console.log(error);
            }
          },

          
    });

  
useEffect(()=>{getUserData()},[])


    
      return <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
            <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
                    </div>
            <Form onSubmit={formik.handleSubmit}>

              <Form.Group className="mb-3" >
                <Form.Label>Books</Form.Label>

                <Form.Control type="text" placeholder="Title" id="title" name="Books.title" onChange={formik.handleChange} value={formik.values.Books.title} onBlur={formik.handleBlur}/>
                {formik.touched.Books?.title && formik.errors.Books?.title ?(<div style={{color:"red"}}>{formik.errors.Books.title}</div>) : null}&nbsp;

                <Form.Control type="text" placeholder="Author" id="author" name="Books.author" onChange={formik.handleChange} value={formik.values.Books.author} onBlur={formik.handleBlur}/>
                {formik.touched.Books?.author && formik.errors.Books?.author ?(<div style={{color:"red"}}>{formik.errors.Books.author}</div>) : null}&nbsp;

                <Form.Control type="text" placeholder="ISBNnumber" id="ISBNnumber" name="Books.ISBNnumber" onChange={formik.handleChange} value={formik.values.Books.ISBNnumber} onBlur={formik.handleBlur}/>
                {formik.touched.Books?.ISBNnumber && formik.errors.Books?.ISBNnumber ?(<div style={{color:"red"}}>{formik.errors.Books.ISBNnumber}</div>) : null}&nbsp;

                <Form.Control type="date" placeholder="publicationDate" id="publicationDate" name="Books.publicationDate" onChange={formik.handleChange} value={formik.values.Books.publicationDate} onBlur={formik.handleBlur}/>
                {formik.touched.Books?.publicationDate && formik.errors.Books?.publicationDate ?(<div style={{color:"red"}}>{formik.errors.Books.publicationDate}</div>) : null}&nbsp;

              </Form.Group>



              <Form.Group className="mb-3" >
                <Form.Label>Author</Form.Label>

                <Form.Control type="text" placeholder="authorsname" id="authorsname" name="Author.authorsname" onChange={formik.handleChange} value={formik.values.Author.authorsname} onBlur={formik.handleBlur}/>
                {formik.touched.Author?.authorsname&& formik.errors.Author?.authorsname ?(<div style={{color:"red"}}>{formik.errors.Author.authorsname}</div>) : null}&nbsp;

                <Form.Control type="date" placeholder="birthdate" id="birthdate" name="Author.birthdate" onChange={formik.handleChange} value={formik.values.Author.birthdate} onBlur={formik.handleBlur}/>
                {formik.touched.Author?.birthdate&& formik.errors.Author?.birthdate ?(<div style={{color:"red"}}>{formik.errors.Author.birthdate}</div>) : null}&nbsp;

                <Form.Control type="text" placeholder="shortbio" id="shortbio" name="Author.shortbio" onChange={formik.handleChange} value={formik.values.Author.shortbio} onBlur={formik.handleBlur}/>
                {formik.touched.Author?.shortbio && formik.errors.Author?.shortbio?(<div style={{color:"red"}}>{formik.errors.Author.shortbio}</div>) : null}&nbsp;

              </Form.Group>
    
              
              
              <Button variant="success" type='submit' style={{alignItems:"center"}}>Submit</Button>

          </Form>

         </div>
        </div>
      </div>
    }
    
    export default EditUser
    