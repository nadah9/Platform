import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaLaptop, FaGoogle } from "react-icons/fa"; // Importing the Google icon

const ChoicePage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleChoice = (type: string) => {
    setSelectedType(type);
  };

  const handleSubmit = () => {
    if (selectedType) {
      navigate(`/signup?type=${selectedType}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-300">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Join as a Student or Company
      </h1>

      {/* Carte Étudiant */}
      <div
        className={`flex items-center justify-between w-full max-w-md p-5 border rounded-lg cursor-pointer transition-all shadow-md hover:shadow-lg ${
          selectedType === "etudiant" ? "text-[#7886C7]" : "text-gray-800"
        }`}
        onClick={() => handleChoice("etudiant")}
      >
        <div className="flex items-center gap-4">
          <FaLaptop className="text-3xl text-gray-700" />
          <span className="text-lg font-medium">
            I’m a student
          </span>
        </div>
        <input
          type="radio"
          name="accountType"
          checked={selectedType === "etudiant"}
          readOnly
          className="w-5 h-5 accent-[#5c6bc0]" // Couleur plus foncée pour le cercle
        />
      </div>

      {/* Carte Entreprise */}
      <div
        className={`flex items-center justify-between w-full max-w-md p-5 mt-4 border rounded-lg cursor-pointer transition-all shadow-md hover:shadow-lg ${
          selectedType === "entreprise" ? "text-[#7886C7]" : "text-gray-800"
        }`}
        onClick={() => handleChoice("entreprise")}
      >
        <div className="flex items-center gap-4">
          <FaBriefcase className="text-3xl text-gray-700" />
          <span className="text-lg font-medium">
            I’m a company
          </span>
        </div>
        <input
          type="radio"
          name="accountType"
          checked={selectedType === "entreprise"}
          readOnly
          className="w-5 h-5 accent-[#5c6bc0]" // Couleur plus foncée pour le cercle
        />
      </div>

      {/* Bouton de validation */}
      <button
        onClick={handleSubmit}
        className={`w-full max-w-md mt-6 p-3 rounded-lg font-medium transition-all ${
          selectedType
            ? "bg-[#7886C7] text-white hover:bg-[#6a75b0]"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        disabled={!selectedType}
      >
        Create Account
      </button>

      {/* Lien vers la connexion */}
      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-[#7886C7] font-medium hover:underline">
          Log In
        </a>
      </p>

      {/* Sign up with Google */}
      <div className="mt-6 w-full max-w-md">
        <button
          className="flex items-center justify-center w-full p-3 border rounded-lg bg-white text-gray-800 shadow-md hover:shadow-lg transition-all"
          onClick={() => alert("Google Sign-Up clicked!")}
        >
          <FaGoogle className="mr-3 text-xl text-red-500" />
          <span className="font-medium">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
};

export default ChoicePage;
