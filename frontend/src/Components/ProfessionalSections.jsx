import React, { useState } from "react";

const ProfessionalSections = (props) => {
    const [profession, setProfession] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({
        profession: "",
        companyName: "",
        address: "",
    });

    const validate = () => {
        const newErrors = {
            profession: "",
            companyName: "",
            address: "",
        };

        if (!profession) {
            newErrors.profession = "Profession is required.";
        }

        if (profession === "Entrepreneur" && !companyName.trim()) {
            newErrors.companyName = "Company name is required for Entrepreneurs.";
        }

        if (!address.trim()) {
            newErrors.address = "Address Line 1 is required.";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((e) => e === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // alert("Profession Details Validated Successfully");
            // handle save
            props.updateFormData({profession:profession , companyName:companyName,address:address})
            props.submitReq(3);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full mx-auto space-y-4 p-4">
            <div className='' >
                <h1 className='text-2xl font-semibold pb-2' >Profile Section</h1>
            </div>
            <div className='border-b-1 border-gray-500/50' ></div>
            {/* Profession Dropdown */}
            <div>
                <label htmlFor="profession" className="block mb-1 text-sm font-medium text-gray-900">
                    Profession
                </label>
                <select
                    id="profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className={`bg-gray-50 border ${errors.profession ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                >
                    <option value="">Select</option>
                    <option value="Student">Student</option>
                    <option value="Developer">Developer</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                </select>
                {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession}</p>}
            </div>

            {/* Company Name (only if Entrepreneur) */}
            {profession === "Entrepreneur" && (
                <div>
                    <label htmlFor="company_name" className="block mb-1 text-sm font-medium text-gray-900">
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="company_name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className={`bg-gray-50 border ${errors.companyName ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                        placeholder="Enter your company name"
                    />
                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>
            )}

            {/* Address Line 1 */}
            <div>
                <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900">
                    Address Line 1
                </label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`bg-gray-50 border ${errors.address ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                    placeholder="123 Main St"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className='flex items-center justify-between pt-2' >
                <button
                    onClick={e => props.submitReq(1)}
                    class="text-black border-black border-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer ">
                    Previuos
                    
                </button>
                <button
                    type="submit"
                    class="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer ">
                    Next
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default ProfessionalSections;
