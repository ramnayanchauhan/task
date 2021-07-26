import React, { useState } from 'react'
import './style.scss';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
// import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import CryptoJs from 'crypto-js';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
    paperStyle: {
        width: '467px',
        margin: '20px auto',
        padding: '30px 20px',
        height: '647px',
    },
    birthStyle: {
        margin: theme.spacing(1),
        minWidth: 113,
        maxWidth: 300,
    },
    selectStyle: {
        margin: theme.spacing(1),
        minWidth: 121,
        maxWidth: 300,
    },
}));
const Signup = () => {
    const classes = useStyles();
    // const initialFormData = Object.freeze();
    const [formData, updateFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
        dob: '',
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validate();
        // reset();

    }

    // const reset = (e) => {
    //     updateFormData({
    //         name: "",
    //         lastName: "",
    //         email: "",
    //         password: "",
    //         mobile: "",
    //         dob: '',
    //     })
    
    // }
    const validate = () => {
        // md5 encryption
       const pwd = CryptoJs.MD5(formData.password).toString(); 

        if (!formData.name) {
            setErrorMsg("Name is Required");

        }
        else if (!formData.lastName) {
            setErrorMsg("LastName is Required");
        }
        else if (!formData.email) {
            setErrorMsg("Email is Required");
        }
        else if ((!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))) {
            setErrorMsg("Enter Correct Email");
        }
        else if (!formData.password) {
            setErrorMsg("Password is Required");
        }
        else if (!formData.mobile) {
            setErrorMsg("Mobile is Required");
        }
        else if (!formData.mobile.match(/^\d{10}$/)) {
            setErrorMsg("Please Enter Your 10 Digit Mobile Number");
        }
        else if (!formData.dob) {
            setErrorMsg("DOB is Required");
        }
        else {
            setSuccess(true);
            if(true){
                fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbTDjpg5ypj1DsRzIF2ZRMhxfI7_2BCxk', {
        
                    method: 'POST',
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        returnSecureToken: true
                    }),
        
                    headers: {
                        'Content-Type': 'application/json'
                    }
        
                }).then(res => {
                    if (res.ok) {
                      console.log("response data",res)
                    } else {
                        res.json().then(data => {
                            // console.log("error dataa", data);
                        });
                    }
                });
        
            }
            setSuccessMsg("Form Successfully submitted!!!");
           
        }
        // reset();
    }

    // useEffect(() => {
    //     if(success){
    //     fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyDbTDjpg5ypj1DsRzIF2ZRMhxfI7_2BCxk', {

    //         method: 'POST',
    //         body: JSON.stringify({
    //             email: formData.email,
    //             password: formData.password,
    //             returnSecureToken: true
    //         }),

    //         headers: {
    //             'Content-Type': 'application/json'
    //         }

    //     }).then(res => {
    //         if (res.ok) {

    //         } else {
    //             res.json().then(data => {
    //                 console.log("dataa", data);
    //             });
    //         }
    //     });

    // }

    // }, []);


    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Grid>
                <Paper elevation={20} className={classes.paperStyle}>
                    <Grid align='center'>
                        <Avatar >
                            {/* <AddCircleOutlineOutlinedIcon /> */}
                        </Avatar>
                        <h2 >Sign Up</h2>
                        <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                    </Grid>

                    <div>
                        {successMsg ? <strong style={{ color: 'green' }}>{successMsg}</strong> : errorMsg ? <strong style={{ color: 'red' }}>{errorMsg}</strong> : ""}
                    </div>
                    <div>
                        <TextField style={{ width: '19ch' }} label='Name' name="name" placeholder="Enter your name" onChange={handleChange} />
                        <TextField style={{ width: '19ch' }} label='LastName' name="lastName" placeholder="Enter your last name" onChange={handleChange} />
                    </div>
                    <div>
                        <TextField fullWidth label='Email' name="email" error={formData.isEmail} helperText={formData.errormessage} placeholder="Enter your email" onChange={handleChange} />
                    </div>
                    <div>
                        <TextField fullWidth label='Password' error={formData.isPassword} helperText={formData.errormessage} name="password" type="password" placeholder="Enter your password" onChange={handleChange} />
                    </div>
                    <div>
                        <TextField fullWidth label='Moble' error={formData.isMobile} helperText={formData.errormessage} name="mobile" placeholder="Enter your mobile number" onChange={handleChange} />
                    </div>
                    <div>
                        <TextField fullWidth lable="DOB" name="dob" error={formData.isDOB} helperText={formData.errormessage} type="date" placeholder="Enter your DOB" onChange={handleChange} />
                    </div>
                    <div>
                        <TextField fullWidth label='Gender (Option)' placeholder="Enter your Gender" />
                    </div>

                    <div>
                        <p>By clicking "Continue", you agree to the Terms and Privacy Policy</p>
                    </div>
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>

                </Paper>
            </Grid>
        </form>
    )
}

export default Signup;