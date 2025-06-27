import React from 'react';

const Preview = ({ formData , handleFinalSubmit }) => {
  console.log(formData)
  return (
    <div className="max-w-2xl mx-auto p-6 rounded-xl shadow-lg bg-white text-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile Preview</h2>

      {formData.image?.image && (
        <div className="mb-6 text-center">
          <img
            src={formData.image.image}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-full mx-auto shadow"
          />
        </div>
      )}

      <div className="space-y-4">
        <Field label="Username" value={formData.username} />
        <Field label="Profession" value={formData.profession} />
        <Field label="Company Name" value={formData.companyName} />
        <Field label="Address" value={formData.address} />
        <Field label="Country" value={formData.country} />
        <Field label="State" value={formData.state} />
        <Field label="City" value={formData.city} />
        <Field label="Subscription" value={formData.subscription} />
        <Field label="Newsletter Subscription" value={formData.newsletter ? "Yes" : "No"} />
      </div>
      <div className='flex items-center justify-end pt-2' >
        <button
          // type="submit"
          onClick={handleFinalSubmit}
          class="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer ">
          Submit
        </button>
      </div>
    </div>
  );
};

// Helper component to render each field
const Field = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium">{label}:</span>
    <span>{value || 'N/A'}</span>
  </div>
);

export default Preview;
