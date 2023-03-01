import React, { useEffect, useRef, useState } from 'react'

const Registration = () => {
    const hobbies = ["Learning", "Photography", "Dancing", "Singing", "Drawing", "Handicraft", "Coding", "Cooking", "Painting", "Swimming", "Pottery","Sports","Writing","Garderning","Shopping","Acting"]

    const [input, setInput] = useState({name: "", email: "", contactNo: "", gender: "", city: "", birthdate: "", hobby: []})
    const [allInput, setAllInput] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    const ref = useRef(null)
    const refClose = useRef(null)

       

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })

    }

    const handleCheck = (e) => {
        let check = e.target.checked
        let value = e.target.value
        if (check) {
            let hobby = ([...input.hobby, value])
            console.log(hobby, check);
            setInput({ ...input, hobby: hobby })
        }
        else {
            let remove = (input.hobby.filter((e) => (e !== value)))
            setInput({ ...input, hobby: remove })
        }
    }


    const addData = () => {
        ref.current.click();
        setInput({ name: "", email: "", contactNo: "", gender: "", city: "", birthdate: "", hobby: [] })
        setIsEdit(false);
    }

    const updateData = (currentValue, index) => {
        ref.current.click()
        setInput({ index, name: currentValue.name, email: currentValue.email, contactNo: currentValue.contactNo, gender: currentValue.gender, city: currentValue.city, birthdate: currentValue.birthdate, hobby: currentValue.hobby })
        setIsEdit(true)
    }

    const deleteData = (index) => {
        allInput.splice(index, 1)
        localStorage.setItem('Data', JSON.stringify(allInput));
        setAllInput(JSON.parse(localStorage.getItem('Data')))
    }

    const saveData = () => {
        if (isEdit) {
            let update = (JSON.parse(localStorage.getItem('Data')))

            for (let index = 0; index < update.length; index++) {
                if (index === input.index) {
                    update[index].name = input.name;
                    update[index].email = input.email;
                    update[index].contactNo = input.contactNo;
                    update[index].gender = input.gender;
                    update[index].city = input.city;
                    update[index].birthdate = input.birthdate;
                    update[index].hobby = input.hobby;
                }
                localStorage.setItem('Data', JSON.stringify(update));
                setAllInput(update)
            }
        } else {
            setInput({ name: "", email: "", contactNo: "", gender: "", city: "", birthdate: "", hobby: [] })
            let details = [...allInput, input];
            localStorage.setItem('Data', JSON.stringify(details));
            setAllInput(details)
            console.log(details);
        }
        refClose.current.click();
    }

    const getData = () => {
        const lsdata = JSON.parse(localStorage.getItem('Data'))
        if (lsdata != null) {
            setAllInput(lsdata)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className='container'>
                <div className="d-flex justify-content-between">

                    <h1 className='text-left'>Registration Form</h1>
                    <button type='button' className='btn btn-warning my-2' onClick={addData}><i className="fa-solid fa-plus"></i></button>
                </div>
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{isEdit ? "Update Data" : "Add Data"}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="card p-2">

                                    <form>
                                        <div className="my-3">
                                            <label htmlFor="name" className="form-label "> <b>Full Name</b> </label>
                                            <input type="text" className="form-control" id="name" name='name' value={input.name} onChange={handleChange}  required />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="email" className="form-label"> <b>Email address</b> </label>
                                            <input type="email" className="form-control" id="email" name='email' value={input.email} onChange={handleChange} aria-describedby="emailHelp" required />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="contactNo" className="form-label"><b>Contact No</b></label>
                                            <input type="text"  className="form-control" id="contactNo" name='contactNo' value={input.contactNo} onChange={handleChange}  required  />
                                        </div>
                                        <div className='my-3'>
                                            <label ><b>Gender</b></label><br />
                                            <div className="form-check form-check-inline">

                                                <label className="form-check-label" htmlFor="inlineRadio1">female</label>
                                                <input className="form-check-input" type="radio" id="inlineRadio1" name='gender' value="Female" onChange={handleChange}  />
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label" htmlFor="inlineRadio2">male</label>
                                                <input className="form-check-input" type="radio" id="inlineRadio2" name='gender' value="Male" onChange={handleChange} />
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label" htmlFor="inlineRadio2">other</label>
                                                <input className="form-check-input" type="radio" id="inlineRadio2" name='gender' value="Other" onChange={handleChange} />
                                            </div>

                                        </div>
                                        <div className='my-3'>
                                            <label htmlFor="city" className='form-label'><b>City</b></label><br />
                                            <select id="city" name='city' className='form-control' value={input.city} onChange={handleChange} required>
                                                <option value="" disabled>Select City</option>
                                                <option value="Surat">Surat</option>
                                                <option value="Vadodara">Vadodara</option>
                                                <option value="Ahemdabad">Ahemdabad</option>
                                                <option value="Mumbai">Mumbai</option>
                                                <option value="Chennai">Chennai</option>
                                                <option value="Rajkot">Rajkot</option>
                                                <option value="Banglore">Banglore</option>
                                                <option value="Pune">Pune</option>
                                                <option value="Delhi">Delhi</option>
                                                <option value="Hyderabad">Hyderabad</option>
                                                <option value="Jaipur">Jaipur</option>
                                                <option value="Lucknow">Lucknow</option>
                                                <option value="Kanpur">Kanpur</option>
                                                <option value="Ludhiana">Ludhiana</option>
                                                <option value="Agra">Agra</option>
                                                <option value="Srinagar">Srinagar</option>
                                                <option value="Amritsar">Amritsar</option>
                                                <option value="Udaipur">Udaipur</option>
                                                <option value="Bhopal">Bhopal</option>
                                    
                                           </select>
                                        </div>

                                        <div className='my-3'>
                                            <label htmlFor="birthday" className='form-label'><b>Birthdate</b> </label><br />
                                            <input type="date" id="birthday" className='form-control' name='birthdate' value={input.birthdate} onChange={handleChange}  />
                                        </div>

                                        <label htmlFor="hobby" className=''><b>Hobbies</b></label><br />
                                        {hobbies.map((hobby, index) => {
                                            return <div className="form-check form-check-inline" key={index}>
                                                <input className="form-check-input" type="checkbox" value={hobby} id={`flexCheckDefault ${index}`} onChange={handleCheck} />
                                                <label className="form-check-label" htmlFor={`flexCheckDefault ${index}`}  >
                                                    {hobby}
                                                </label>
                                            </div>
                                        })}
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                <button type="button" className="btn btn-primary" disabled={input.name ===""|| input.email==="" || input.contactNo==="" || input.birthdate ===""|| input.city  ===""} onClick={saveData}>{isEdit ? "Update Data" : "Add Data"}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <hr />

            <div className='container'>
                <h1>Your Details</h1>
                <div className="row">
                    {allInput.map((det, index) => {
                        return <div className="col-lg-4 col-md-6 col-sm-1 my-2" key={index}>
                            <div className="card" style={{height:"305px"}}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="card-title"><b> <i>Name:</i> </b>  {det.name}</h5>
                                        <div>
                                            <i className="fa-solid fa-file-pen mx-2 text-success fs-4" style={{cursor:"pointer"}} onClick={() => updateData(det, index)}></i>
                                            <i className="fa-solid fa-trash text-danger fs-4" style={{cursor:"pointer"}} onClick={() => deleteData(index)}></i>
                                        </div>
                                    </div>
                                    <h6 className="card-subtitle mb-2 text-muted"><b> <i>Email:</i> </b>  {det.email}</h6>
                                    <p className="card-text"><b><i>Contact No:</i> </b> {det.contactNo}</p>
                                    <p className="card-text"><b><i>Gender:</i> </b> {det.gender}</p>
                                    <p className="card-text"><b><i>City:</i> </b>  {det.city}</p>
                                    <p className="card-text"><b><i> Birthdate:</i></b>{det.birthdate}</p>
                                    <p className="card-text"><b><i> Hobby </i></b>: {det.hobby.join(" , ")}</p>
                                </div>
                            </div>
                        </div>
                    })}
               </div>
            </div>
        </div>
    )
}

export default Registration
