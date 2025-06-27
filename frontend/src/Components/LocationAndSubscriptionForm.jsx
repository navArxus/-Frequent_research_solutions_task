import React, { useEffect, useState } from "react";

const LocationAndSubscriptionForm = (props) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [subscription, setSubscription] = useState("Basic");
    const [newsletter, setNewsletter] = useState(true);

    // Fetch countries
    useEffect(() => {
        fetch("https://countriesnow.space/api/v0.1/countries/iso")
            .then(res => res.json())
            .then(result => setCountries(result.data || []))
            .catch(console.error);
    }, []);

    // Fetch states when country changes
    useEffect(() => {
        if (!selectedCountry) return setStates([]);
        fetch("https://countriesnow.space/api/v0.1/countries/states", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: selectedCountry }),
        })
            .then(res => res.json())
            .then(result => setStates(result.data.states || []))
            .catch(console.error);
        setSelectedState("");
        setCities([]);
        setSelectedCity("");
    }, [selectedCountry]);

    // Fetch cities when state changes
    useEffect(() => {
        if (!selectedState) return setCities([]);
        fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: selectedCountry, state: selectedState }),
        })
            .then(res => res.json())
            .then(result => setCities(result.data || []))
            .catch(console.error);
        setSelectedCity("");
    }, [selectedState]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
            subscription,
            newsletter
        });
        props.updateFormData({
            country: selectedCountry,
            state: selectedState,
            city: selectedCity,
            subscription,
            newsletter
        })
        props.submitReq(4)
    };

    return (
        <form onSubmit={handleSubmit} className="w-full mx-auto space-y-4 p-4">
            <div className='' >
                <h1 className='text-2xl font-semibold pb-2' >Preferences </h1>
            </div>
            <div className='border-b-1 border-gray-500/50' ></div>
            {/* Country */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">Country</label>
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                    <option value="">Select Country</option>
                    {countries.map(c => (
                        <option key={c.iso3} value={c.name}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* State */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">State</label>
                <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={!states.length}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                    <option value="">Select State</option>
                    {states.map(s => (
                        <option key={s.state_code || s.name} value={s.name}>{s.name}</option>
                    ))}
                </select>
            </div>

            {/* City */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">City</label>
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!cities.length}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                    <option value="">Select City</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            {/* Subscription Plan */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-900">Subscription Plan</label>
                <div className="flex gap-4">
                    {["Basic", "Pro", "Enterprise"].map(plan => (
                        <label key={plan} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="subscription"
                                value={plan}
                                checked={subscription === plan}
                                onChange={() => setSubscription(plan)}
                            />
                            <span>{plan}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Newsletter Checkbox */}
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="newsletter"
                    checked={newsletter}
                    onChange={() => setNewsletter(n => !n)}
                    className="w-4 h-4"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-900">Subscribe to our newsletter</label>
            </div>

            <div className='flex items-center justify-between pt-2' >
                <button
                    onClick={e => props.submitReq(2)}
                    class="text-black border-black border-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer ">
                    Previuos

                </button>
                <button
                    type="submit"
                    class="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer ">
                    Preview
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default LocationAndSubscriptionForm;
