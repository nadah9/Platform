import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userType = params.get("type") || "etudiant"; // Par défaut "etudiant"

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    // Étudiant
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    school: "",
    graduationYear: "",
    majorField: "",
    yearOfStudy: "",
    stage: "",
    password: "",
    confirmPassword: "",
    isGraduated: false,

    // Entreprise
    companyName: "",
    address: "",
    contact: "",
    website: "",
    industry: "",
    description: "",

    // Case à cocher des conditions
    agreeToTerms: false,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleGraduationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isGraduated: e.target.checked,
    });
  };

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      agreeToTerms: e.target.checked,
    });
  };

  const nextStep = () => {
    setErrorMessage(null);

    console.log("Current step:", step);
    console.log("User type:", userType);

    if (userType === "etudiant") {
      if (step === 1 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone)) {
        setErrorMessage("First name, last name, email, and phone are required.");
        return;
      }

      if (step === 2 && (!formData.birthday || !formData.school || (formData.isGraduated && !formData.graduationYear) || (!formData.isGraduated && !formData.majorField))) {
        setErrorMessage("Birthday, school, major, and graduation year (if graduated) are required.");
        return;
      }

      if (step === 3) {
        if (!formData.password || formData.password.length < 6) {
          setErrorMessage("Password must be at least 6 characters.");
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }
        if (!formData.agreeToTerms) {
          setErrorMessage("You must agree to the Terms & Conditions to proceed.");
          return;
        }
      }
    } else if (userType === "entreprise") {
      if (step === 1 && (!formData.companyName || !formData.address || !formData.contact)) {
        setErrorMessage("Company name, address, and contact are required.");
        return;
      }

      if (step === 2 && (!formData.website || !formData.industry || !formData.description)) {
        setErrorMessage("Website, industry, and description are required.");
        return;
      }

      if (step === 3) {
        if (!formData.password || formData.password.length < 6) {
          setErrorMessage("Password must be at least 6 characters.");
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setErrorMessage("Passwords do not match.");
          return;
        }
        if (!formData.agreeToTerms) {
          setErrorMessage("You must agree to the Terms & Conditions to proceed.");
          return;
        }
      }
    }

    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setSuccessMessage("Account created successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-6">
          {["1", "2", "3"].map((num, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  step >= index + 1 ? "bg-[#7886C7] text-white border-[#7886C7]" : "border-gray-300 text-gray-500"
                }`}
              >
                {num}
              </div>
              <span className={`text-sm ${step >= index + 1 ? "text-[#2D336B] font-semibold" : "text-gray-400"}`}>
                {index === 0 ? "Basic info" : index === 1 ? "Contact info" : "Login info"}
              </span>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-center mb-4 text-[#2D336B]">Join us</h1>
        <p className="text-gray-500 text-center mb-6">Complete the form to create your account.</p>

        {successMessage && (
          <div className="bg-[#D1E8F6] text-[#2D336B] p-4 rounded-lg mb-4 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-[#F8D7DA] text-[#721C24] p-4 rounded-lg mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1 for Etudiant */}
          {step === 1 && userType === "etudiant" && (
            <div className="mb-6">
              <div className="flex space-x-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-[#2D336B]">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                    placeholder="Tyler"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-[#2D336B]">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                    placeholder="Johnson"
                  />
                </div>
              </div>
              <label className="block text-sm font-medium text-[#2D336B] mt-4">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                placeholder="email@example.com"
              />
              <label className="block text-sm font-medium text-[#2D336B] mt-4">Phone</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                placeholder="Phone number"
              />
              <button
                type="button"
                className="mt-4 bg-[#7886C7] text-white p-3 rounded-lg w-full hover:bg-[#2D336B] transition duration-300"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          )}
           {/* Step 1 for entreprise */}
           {step === 1 && userType === "entreprise" && (
            <div className="mb-6">
              <div className="w-full">
                <label className="block text-sm font-medium text-[#2D336B]">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                  placeholder="Company Name"
                />
              </div>
              <div className="w-full mt-4">
                <label className="block text-sm font-medium text-[#2D336B]">Location</label>
                <input
                  id="address"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                  placeholder="Company Address"
                />
              </div>
              <div className="w-full mt-4">
                <label className="block text-sm font-medium text-[#2D336B]">Contact Phone </label>
                <input
                  id="contact"
                  type="text"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                  placeholder="Phone Number"
                />
              </div>
              <button
                type="button"
                className="mt-4 bg-[#7886C7] text-white p-3 rounded-lg w-full hover:bg-[#2D336B] transition duration-300"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          )}


          {/* Step 2 for Etudiant */}
          {step === 2 && userType === "etudiant" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#2D336B]">Birthday</label>
              <input
                type="date"
                id="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
              />
              <label className="block text-sm font-medium text-[#2D336B] mt-4">School</label>
              <input
                type="text"
                id="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                placeholder="Your school"
              />
              <div className="mt-4">
                <label className="text-sm font-medium text-[#2D336B]">Are you graduated?</label>
                <input
                  type="checkbox"
                  id="isGraduated"
                  checked={formData.isGraduated}
                  onChange={handleGraduationChange}
                  className="ml-2"
                />
                <span className="text-sm text-[#2D336B]">Yes, I have graduated</span>
              </div>

              {/* Graduation Year or Year of Study */}
              {!formData.isGraduated && (
                <>
                  <label className="block text-sm font-medium text-[#2D336B] mt-4">Year of Study</label>
                  <select
                    id="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                  >
                    <option value="">Select Year of Study</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                  </select>
                </>
              )}

              {formData.isGraduated && (
                <>
                  <label className="block text-sm font-medium text-[#2D336B] mt-4">Graduation Year</label>
                  <select
                    id="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                  >
                    <option value="">Select Graduation Year</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </>
              )}

              {/* Major Field */}
              {!formData.isGraduated && (
                <>
                  <label className="block text-sm font-medium text-[#2D336B] mt-4">Major Field</label>
                  <select
                    id="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                  >
                    <option value="">Select Majorr</option>
                    <option value="2023">Developement</option>
                    <option value="2024">CyberSecurity</option>
                    <option value="2025">Businees Intelligence</option>
                    <option value="2026">Artificial Intelligence</option>
                  </select>
                </>
              )}

              <button
                type="button"
                className="mt-4 bg-[#7886C7] text-white p-3 rounded-lg w-full hover:bg-[#2D336B] transition duration-300"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          )}
          {/* Step 2 for entreprise */}
          {step === 2 && userType === "entreprise" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#2D336B]">Website</label>
              <input
                id="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                placeholder="Company Website"
              />
              <label className="block text-sm font-medium text-[#2D336B] mt-4">Industry</label>
              <input
                id="industry"
                type="text"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                placeholder="Industry"
              />
              <label className="block text-sm font-medium text-[#2D336B] mt-4">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                placeholder="Company Description"
              />
              <button
                type="button"
                className="mt-4 bg-[#7886C7] text-white p-3 rounded-lg w-full hover:bg-[#2D336B] transition duration-300"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          )}

          {/* Step 3 for all */}
          {step === 3 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#2D336B]">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                placeholder="*********"

              />
              <label className="block text-sm font-medium text-[#2D336B] mt-4">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#7886C7] rounded-lg mt-1"
                placeholder="*********"

                />
                {/* Case à cocher "I agree to the Terms & Conditions" */}
      <input
        type="checkbox"
        id="agreeToTerms"
        checked={formData.agreeToTerms}
        onChange={handleInputChange}
        className="mr-2"
      />
      <label htmlFor="agreeToTerms" className="text-sm text-[#2D336B]">
        I agree to the <span className="text-[#7886C7]">Terms & Conditions</span>
      </label>
    
                
              <button
                type="submit"
                className="mt-4 bg-[#7886C7] text-white p-3 rounded-lg w-full hover:bg-[#2D336B] transition duration-300"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
