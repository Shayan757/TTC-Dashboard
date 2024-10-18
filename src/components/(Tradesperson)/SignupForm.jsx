"use client";
import { useState, useEffect } from "react";
import { ChevronDown, MapPin, Mail } from "lucide-react";
import "./barstyle.css";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { toast } from "react-toastify";
import {generateToken} from '../../utils/functions'
const SignupForm = () => {
  const router = useRouter();

  const [distance, setDistance] = useState(5);
  const [background, setBackground] = useState("");
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    trade: "",
    postcode: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setBackground(
      `linear-gradient(to right, #FFD700 0%, #FFD700 ${
        distance * 10
      }%, #F0F0F0 ${distance * 10}%, #F0F0F0 100%)`
    );
  }, [distance]);

  const validate = () => {
    const newErrors = {};
    if (!formData.trade) {
      newErrors.trade = "Trade is required";
    }
    if (!formData.postcode) {
      newErrors.postcode = "Postcode is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await generateToken();
    const checkExistingUser = await fetch("/api/check-existing-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
        'Authorization': `Bearer ${token}`,
      },
      cache: "no-cache",
      body: JSON.stringify({
        email: formData.email,
      }),
    });

    const checkExistingUserResult = await checkExistingUser.json();

    if (checkExistingUserResult?.success === "exist") {
      toast.info('User already exist', {
        position: "top-right",
      });
      localStorage.setItem("updateFlag", false);
      localStorage.setItem("emailFlag", null);
      return;
    } else if (checkExistingUserResult?.success === "true") {
      localStorage.setItem("updateFlag", true);
      localStorage.setItem("emailFlag", formData.email.toLowerCase());
      router.push("/login");
    } else if (checkExistingUserResult?.success === "false") {
      localStorage.setItem("updateFlag", false);
      localStorage.setItem("emailFlag", null);
      const validationErrors = validate();
      if (Object.keys(validationErrors).length === 0) {
        router.push(
          `/login/tradesperson/varify-email?trade=${formData.trade}&postcode=${formData.postcode}&email=${formData.email}&distance=${distance}`
        );
      } else {
        setErrors(validationErrors);
      }
    }

    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length === 0) {
    //   router.push(
    //     `/login/tradesperson/varify-email?trade=${formData.trade}&postcode=${formData.postcode}&email=${formData.email}&distance=${distance}`
    //   );
    // } else {
    //   setErrors(validationErrors);
    // }
  };

  const handleChange = (selectedOption) => {
    setFormData({
      ...formData,
      trade: selectedOption ? selectedOption.label : "",
    });
  };

  useEffect(() => {
    const getLeads = async () => {
      try {
        const response = await fetch(`/api/main-trade`, {
          method: "GET",
          headers: { "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        if (data.success) {
          const tradeOptions = data.services.map((service) => ({
            value: service.id,
            label: service.type,
          }));
          setOptions(tradeOptions);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getLeads();
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6">
        Find the best clients in your area
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="trade"
            className="block text-sm font-medium text-gray-700"
          >
            Main Trade
          </label>
          <div className="relative mt-1">
            <Select
              value={options.find((option) => option.label === formData.trade)}
              onChange={handleChange}
              options={options}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#F0F0F0",
                  borderColor: "gray-300",
                  borderRadius: "0.375rem",
                  padding: "0.5rem",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  "&:hover": {
                    borderColor: "#FFD700",
                  },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#FFD700" : "#FFF",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#FFD700",
                    color: "#FFF",
                  },
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "#000",
                }),
              }}
              placeholder="Select your trade"
            />
            {errors.trade && (
              <p className="text-red-500 text-sm mt-1">{errors.trade}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="postcode"
            className="block text-sm font-medium text-gray-700"
          >
            Post Code
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={(e) =>
                setFormData({ ...formData, postcode: e.target.value })
              }
              className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-200 border-gray-300 shadow-sm focus:border-gold focus:ring focus:ring-gold-200 focus:ring-opacity-50"
              placeholder="Post Code"
            />
            {errors.postcode && (
              <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>
            )}
          </div>
        </div>

        <div className="w-full max-w-md mx-auto mt-2">
          <div className="relative mb-4">
            <label htmlFor="distance" className="block text-gray-700 mb-2">
              Distance
            </label>
            <div className="relative w-full h-10">
              <input
                type="range"
                id="distance"
                min="0"
                max="10"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className={`slider w-full cursor-pointer`}
                style={{ background }}
              />
              <div
                className={`marker`}
                style={{ left: `${(distance / 10) * 100}%` }}
              >
                <div className={`tooltip`}>{distance} miles</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block w-full pl-10 pr-3 py-2 bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring focus:ring-gold-200 focus:ring-opacity-50"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
        >
          Sign Up for Free
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
