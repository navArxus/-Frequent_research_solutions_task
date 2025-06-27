import React, { useState } from 'react'

const ProfileSection = (props) => {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setError(""); // Reset error

        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB size check
                setError("File size must be less than 2 MB.");
                setImage(null);
                setPreview(null);
                return;
            }

            setImage(file);
            setPreview(URL.createObjectURL(file));
            uploadImage(file)

        }
    };
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("http://localhost:4000/api/upload", {
            method: "POST",
            body: formData,
        });
        const data = await res.json(); 
        props.setimagepic({image:data.imageUrl})
    }
    const deleteImageHandler = () => {
        setImage(null);
        setPreview(null);
        setError(null);
    }


    return (
        <div className='h-auto w-full my-4' >
            {/* Profile Picture */}
            <div className='flex items-center justify-start gap-4' >
                <img
                    src={
                        preview ||
                        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?w=360"
                    }
                    alt="Preview"
                    className='w-20 aspect-square rounded-full shadow-lg overflow-hidden'
                />
                <div className=' flex flex-col gap-1 ' >
                    <div className='flex gap-2' >
                        <label htmlFor="uploadpp" className='cursor-pointer border-2 border-black bg-black text-white rounded-md px-2 py-1 ' >Upload Image</label>
                        <button onClick={deleteImageHandler} className='cursor-pointer border-2  rounded-md px-2 py-1 ' >Delete</button>
                    </div>
                    <div>
                        <p className='text-xs text-gray-400' >File type: .png, .jpeg</p>
                        <p className='text-xs text-gray-400' >{"Max size:<2MB"}</p>
                        <input type="file" id="uploadpp" accept="image/*" className='hidden' onChange={handleImageChange} />
                    </div>
                </div>
            </div>
            {error && <p className='text-red-400' >Error: {error}</p>}
        </div>
    )
}

export default ProfileSection
