import React, { useState } from 'react'
import './../css/form.css'
import './../css/createUser.css'

import { API_URL } from './../config'


export default function Overview(){
    const [ values, setValues ] = useState()

    const submitUser = async (event) => {
        event.preventDefault()
        console.log(values)
        try{
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            console.log(data)
            if(data.error){
               //set error
            }else{
                //set success
            }
        }catch(err){
            if(err){console.log(err); return; }
            //set error
        }
    }

    const handleChange = (event) => {
        event.persist();
        if(event.target.name === 'dateOfBirth'){
            let newDate = new Date(event.target.value);
            var dd = String(newDate.getDate()).padStart(2, "0");
            var mm = String(newDate.getMonth() + 1).padStart(2, "0");
            var yy = newDate.getFullYear().toString().substr(2, 2);

            newDate = dd + mm + yy;
            newDate.toString();
            setValues(values => ({ ...values, 'dateOfBirth':  newDate })); 
            return      
        }//else{
            setValues(values => ({ ...values, [event.target.name]: event.target.value }));       
        // }
    }

    return(
        <div>

        <form>
        <h2>Create User</h2>
            <div className="formField">
                <label htmlFor="name">Name</label>  
                <input name="name" type="text" placeholder="Name" onChange={handleChange}/>
            </div>
            
            <div className="labelRadio">
            <p>Gender</p>
                <input type="radio" id="female" name="genderIdentification" value='0002' onChange={handleChange} />
                <label htmlFor="female"> Female </label>
                <input id="male" type="radio" name="genderIdentification" value='0001' onChange={handleChange} />
                <label htmlFor="male"> Male </label>
            </div>
    
            <div className="formField">
                <label htmlFor=""> Address </label>
                <select name="address" id="addressSelect" placeholder="Select Address" onChange={handleChange} defaultValue="Select Address">
                    <option value="Select Address" disabled >Select Address</option>
                    <option value="Lygten 17, 2400 Norrebro">Lygten 17</option>
                    <option value="Lygten 37, 2400 Norrebro">Lygten 37</option>
                </select>
            </div>

            <div className="formField">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input name="dateOfBirth" placeholder="dd/mm/yyyy" type="date" onChange={handleChange}/>
            </div>

            <div className="labelRadio">
            <p>Is the user an employee</p>
                <input type="radio" id="employee" name="isEmployee" value='true' onChange={handleChange} />
                <label htmlFor="employee"> Is Employee </label>
                <input type="radio" id="not" name="isEmployee" value='false' onChange={handleChange}/>
                <label htmlFor="not"> Not Employee </label>
            </div>

            <input type="submit" value="Create User" onClick={submitUser}/>
        </form>

        </div>
    )
}