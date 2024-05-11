import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { FormEvent, useContext, useState } from "react";
import { AppContext } from "../Context/ParentContext";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  askUser: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, askUser }) => {
  const appContext = useContext(AppContext);
  const { setLoginDone, setLoginSuccessfull, setLoggedInUser } = appContext || {
    setLoginDone: () => {},
    setLoginSuccessfull: () => {},
    setLoggedInUser: () => {},
  };
  const { user } = useAuth0();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isSocial = user?.sub?.split("|")[0] === "auth0" ? false : true;
    const postData = { ...user };

    if (isSocial) {
      postData.username = input;
      axios
        .post("http://localhost:5001/api/users/tosocial", postData)
        .then((res) => {
          setError(" ");
          setLoggedInUser(res.data.postUser);
          setLoginSuccessfull(true);
          setLoginDone(true);
          closeModal();
        })
        .catch((err) => {
          setError(err.response?.data.error.replace("userName", "Username"));
          setLoggedInUser({});
          setLoginSuccessfull(false);
          setLoginDone(true);
        });
    } else {
      postData.name = input;
      axios
        .post("http://localhost:5001/api/users", postData)
        .then((res) => {
          setError(" ");
          setLoggedInUser(res.data.postUser);
          setLoginSuccessfull(true);
          setLoginDone(true);
          closeModal();
        })
        .catch((err) => {
          console.log(err.response?.data);
          setLoggedInUser({});
          setLoginSuccessfull(false);
          setLoginDone(true);
        });
    }

    // closeModal();
  };

  const closeModal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onClose();
      setIsTransitioning(false);
    }, 300); // Adjust the duration to match your transition duration in CSS
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div
            className={`fixed inset-0 transition-opacity ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
            // onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div
            className={`relative flex flex-col bg-white w-full max-w-md mx-auto rounded-lg shadow-lg transition-all ${
              isTransitioning
                ? "transform translate-y-8 opacity-0 scale-0"
                : "transform translate-y-0 opacity-100 scale-1"
            }`}
          >
            <div className="flex items-center justify-center px-4 py-3 bg-gray-100 border-b border-gray-200 rounded-t-lg">
              <h3 className="text-lg font-semibold text-center">
                Give {askUser}
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <p className="text-center">
                As You are new to the Website, Please provide <b>{askUser}</b>,
                so that we can know and help you better.
              </p>
              <form
                className="flex flex-col items-center"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  className="mt-4 py-2 text-black border border-black rounded-md text-center w-80 bg-[#00000010]"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
                <p className="text-red-500 text-center mb-4">{error}</p>
                <button
                  className="bg-black px-4 py-2 rounded-lg text-white"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
