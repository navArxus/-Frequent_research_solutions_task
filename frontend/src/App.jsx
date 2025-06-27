import { useState } from 'react'
import './App.css'
import PersonalSection from './Components/PersonalSection'
import ProfessionalSections from './Components/ProfessionalSections';
import LocationAndSubscriptionForm from './Components/LocationAndSubscriptionForm';
import Preview from './Components/Preview';



function App() {

  const [currentState, setCurrentState] = useState(1);

  const [formData, setFormData] = useState({
    image: '',
    imgPreview: '',
    username: '',
    password: '',
    profession: '',
    companyName: '',
    address: '',
    country: '',
    state: '',
    city: '',
    subscription: 'Basic',
    newsletter: true,
  })

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }))
  }

  const handleFinalSubmit = async () => {
    const res = await fetch("https://frequent-research-solutions-task.onrender.com/api/save-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    console.log(result)
    console.log("Final Submitted Data:", formData)
    // Optionally: send to backend or show success page
  }

  const changeState = value => {
    console.log(value)
    setCurrentState(value);
  }


  return (
    <div className='border-2 flex items-center justify-center w-full min-h-[100vh] h-auto overflow-y-auto py-8 bg-gray-200'>

      <div className='h-auto w-[40%] shadow-2xl  rounded-xl bg-white' >
        {currentState == 1 && <PersonalSection submitReq={changeState} updateFormData={updateFormData} />}
        {currentState == 2 && <ProfessionalSections submitReq={changeState} updateFormData={updateFormData} />}
        {currentState == 3 && <LocationAndSubscriptionForm submitReq={changeState} updateFormData={updateFormData} />}
        {currentState == 4 && <Preview formData={formData} handleFinalSubmit={handleFinalSubmit} />}
      </div>
    </div>
  )
}

export default App
