"use client";
import React, {useState, useRef, useActionState, useEffect} from 'react';
import signupAction from '@/components/signupAction';
import Form from 'next/form';

import { useRouter } from 'next/navigation';

const SignUpPage = () => {

    const [ signUpName, setSignUpName] = useState<string>("") ;
    const [ signUpPassword, setSignUpPassword] = useState<string>("") ;
    const [ role, setRole] = useState<string | "Doctor" | "Patient">("") ;
    const [ sex, setSex] = useState<"Male" | "Female" | string>("");
    const [ age, setAge] = useState<number | undefined>(0);
    const [ doctorinfoID, setDoctorinfoID] = useState< "" | string>("");

    const [ signUpNameErrorMessage , setSignUpNameErrorMessage] = useState('') ;
    const [ signUpPasswordErrorMessage, setSignUpPasswordErrorMessage] = useState('') ;

    const signupForm = useRef<HTMLFormElement>(null);

    const [ state, formAction, isPending] = useActionState(signupAction,"");

    const router = useRouter();

    useEffect(()=> {
        setSignUpNameErrorMessage("");
        setSignUpPasswordErrorMessage("");
        switch(state) {
            case "Password must be more than 2 characters" : {
                setSignUpPasswordErrorMessage("Password must be more than 2 characters");
                break;
            }
            case "Password is required" : {
                setSignUpPasswordErrorMessage("Password is required");
                break;
            }
            case "Age is required" : {
                setSignUpNameErrorMessage("Age is required");
                break;
            }
            case "Age must be a number" : {
                setSignUpNameErrorMessage("Age must be a number");
                break;
            }
            case "Must select either Male or Female" : {
                setSignUpNameErrorMessage("Must select either Male or Female");
                break;
            }
            case "Must select either Patient or Doctor" : {
                setSignUpNameErrorMessage("Must select either Patient or Doctor");
                break;
            }
            case "Username already in use." : {
                setSignUpNameErrorMessage("Username already in use.");
                break;
            }
            case "User created successfully." : {
                setSignUpNameErrorMessage("");
                setSignUpPasswordErrorMessage("");
                router.push('/signin');
                break;
            }
            case "Doctor created successfully." : {
                setSignUpNameErrorMessage("");
                setSignUpPasswordErrorMessage("");
                router.push('/signin');
                break;
            }
            default : {
                setSignUpNameErrorMessage(state);
                break;
            }
        }

    },[state, isPending]);

  return (
    <Form action={formAction} ref={signupForm} id="signUpForm" className='w-full h-full flex justify-center items-center gap-[5px]'>
            <fieldset className='flex justify-center items-center'>
                <legend><p className='text-[30px]'>Create Account</p></legend>
                <div className="flex justify-center items-center" >
                    <div className="flex flex-col justify-center items-center gap-[5px]">
                        <div>
                            <label htmlFor="username" className='text-[20px]'>
                                <span>Username : </span>
                            </label>
                            <input className="p-[3px] border-[2px] rounded-md w-full" id="username" type="text" placeholder="Please key in your user name" name="signup_username" value={ signUpName } onChange = {(event) => { setSignUpName(event.target.value) ; signupForm.current?.classList.remove("formerror"); setSignUpNameErrorMessage("");setSignUpPasswordErrorMessage(""); }} data-testid="testlogin_username" required />
                            { signUpNameErrorMessage && <p style={{ color:'red', fontSize:"30px"}}>{signUpNameErrorMessage}</p> }
                        </div>
                        <div>
                            <label htmlFor="password" className='text-[20px]'>
                            <span>Password : </span>
                            </label>
                            <input className="p-[3px] border-[2px] rounded-md w-full" id="password" type="password" placeholder="Password" name="signup_password" value={ signUpPassword } onChange = {(event) => { setSignUpPassword(event.target.value) ;  signupForm.current?.classList.remove("formerror");setSignUpNameErrorMessage("");setSignUpPasswordErrorMessage(""); }} data-testid="testlogin_password" required />
                            { signUpPasswordErrorMessage && <p style={{ color:'red', fontSize:"30px"}}>{signUpPasswordErrorMessage}</p> }
                        </div>
                        <div>
                            <label htmlFor="age" className='text-[20px]'>
                            <span>Age : </span>
                            </label>
                            <input className="p-[3px] border-[2px] rounded-md w-full" id="age" type="number" placeholder="Age" name="age" value={ age } onChange = {(event) => { setAge(Number(event.target.value)) ;  signupForm.current?.classList.remove("formerror");setSignUpNameErrorMessage("");setSignUpPasswordErrorMessage(""); }} data-testid="testlogin_password" required />
                            { signUpNameErrorMessage && <p style={{ color:'red', fontSize:"30px"}}>{signUpNameErrorMessage}</p> }
                        </div>
                        <div>
                            <label htmlFor="male" >
                                <input id="male" type="radio" name="sex" value="Male"  checked={ sex === "Male" } onChange={ (e) => {setSex && setSex("Male"); setSignUpNameErrorMessage("");setSignUpPasswordErrorMessage(""); }}/>
                                <span className='text-[20px]'> Male </span>
                            </label>
                            <label htmlFor="female" >
                                <input id="female" type="radio" name="sex" value="Female" checked={ sex === "Female" } onChange={ (e) => {setSex && setSex("Female"); setSignUpNameErrorMessage("");setSignUpPasswordErrorMessage(""); }}/>
                                <span className='text-[20px]'> Female </span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="patient" >
                                <input id="patient" type="radio" name="role" value="Patient" defaultChecked= {true}  onChange={ (e) => { setRole && setRole("Patient"); setSignUpNameErrorMessage("");setSignUpPasswordErrorMessage(""); }}/>
                                <span className='text-[20px]'> Patient </span>
                            </label>
                            <label htmlFor="doctor" >
                                <input id="doctor" type="radio" name="role" value="Doctor" checked={ role === "Doctor" } onChange={ (e) => {setRole && setRole("Doctor"); setSignUpNameErrorMessage("");setSignUpPasswordErrorMessage("");}}/>
                                <span className='text-[20px]'> Doctor </span>
                            </label>
                        </div> 

                        {role === "Doctor" && (
                            <div>
                                {/* Add any additional fields or content for doctors here */}
                                <label htmlFor="doctorinfoID" className='text-[20px]'>
                                    <span>Doctor Info ID: </span>
                                </label>
                                <input className="p-[3px] border-[2px] rounded-md w-full" id="doctorinfoID" type="text" placeholder="Enter your Doctor Info ID" name="doctorinfoID" value={doctorinfoID} onChange={(event) => setDoctorinfoID(event.target.value)} />
                            </div>
                        )}                      
                        <div>
                            <button className='p-[10px] bg-sky-500 rounded-xl hover:bg-sky-700 disabled:opacity-30' disabled={ (signUpName && signUpPassword ) ? false : true }>{isPending ? "Submitting..." : "Submit"}</button>
                        </div>
                    </div>
                    
                </div>
                
            </fieldset>
        </Form>
  )
}

export default SignUpPage