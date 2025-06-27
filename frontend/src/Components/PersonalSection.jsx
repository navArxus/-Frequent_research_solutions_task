import React, { useEffect, useState } from 'react'
import ProfileSection from './ProfileSection'

const PersonalSection = (props) => {


    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [errors, setErrors] = useState({
        username: "",
        passwordMatch: "",
    });
    const [pic, setPic] = useState("")
    const setimagepic = (image) => {
        setPic(image)
    }

    const validate = () => {
        const newErrors = {
            username: "",
            passwordMatch: "",
        };

        // Username validation
        if (!username.trim()) {
            newErrors.username = "Username is required.";
        } else if (username.length < 4 || username.length > 20) {
            newErrors.username = "Username must be 4–20 characters.";
        } else if (/\s/.test(username)) {
            newErrors.username = "Username cannot contain spaces.";
        }

        // Password validation
        if (!password) {
            newErrors.passwordMatch = "Password is required.";
        } else if (password.length < 8) {
            newErrors.passwordMatch = "Password must be at least 8 characters.";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            newErrors.passwordMatch = "Password must contain a special character.";
        } else if (!/\d/.test(password)) {
            newErrors.passwordMatch = "Password must include at least one number.";
        } else if (password !== confirmPassword) {
            newErrors.passwordMatch = "Passwords do not match.";
        }

        setErrors(newErrors);

        // Return true if no errors
        return Object.values(newErrors).every((val) => val === "");
    };

    const handleSubmit = (e) => {
        if (isAvailable) {

            e.preventDefault();
            if (validate()) {
                alert("Form is valid! Submitting...");
                props.updateFormData({ username, password, image: pic })
                props.submitReq(2);
                // submit logic
            }
        }
    };

    useEffect(() => {
        if (!username) return;

        const delayDebounce = setTimeout(() => {
            // 🔁 Simulate API call here
            fetch(`https://frequent-research-solutions-task.onrender.com/api/check-username?username=${username}`)
                .then((res) => res.json())
                .then((data) => {
                    setIsAvailable(data.exists === false);
                });
        }, 500); // ⏳ Debounce delay

        // 🔙 Cleanup on each keystroke
        return () => clearTimeout(delayDebounce);
    }, [username]);

    return (
        <form onSubmit={handleSubmit} className='h-auto w-full px-4 py-3' >
            <div className='' >
                <h1 className='text-2xl font-semibold pb-2' >Profile Section</h1>
            </div>
            <div className='border-b-1 border-gray-500/50' ></div>
            <ProfileSection setimagepic={setimagepic} />
            <div className='border-b-1 border-gray-500/50' ></div>
            <div className='my-2 flex flex-col gap-2' >
                {/* Username */}
                <div>
                    <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        className={`bg-gray-50 border ${errors.username ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-0 focus:border-black`}
                        placeholder="Enter username"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    {!isAvailable && <p className="text-red-500 text-sm mt-1">{"Username already exists"}</p>}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-0 focus:border-black"
                        placeholder="••••••••"
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirm_password" className="block mb-1 text-sm font-medium text-gray-900">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm_password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-0 focus:border-black`}
                        placeholder="••••••••"
                    />
                    {errors.passwordMatch && <p className="text-red-500 text-sm mt-1">{errors.passwordMatch}</p>}
                </div>
            </div>
            {/* <div className='border-b-1 border-gray-500/50' ></div> */}
            <div className='flex items-center justify-end pt-2' >
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
    )
}

export default PersonalSection
