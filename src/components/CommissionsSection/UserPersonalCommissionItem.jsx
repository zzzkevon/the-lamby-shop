import React,{ useState } from 'react';
import UserEditCommissionScreen from './UserEditCommissionScreen';
import UserCancelCommissionScreen from './UserCancelCommissionScreen';

export default function UsersPersonalCommissionItem({
    id,
    clientName,
    description,
    status,
    date,
    reloadData, // Accept reloadData as a prop
  }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPolicyDisplayed, setPolicyDisplay] = useState(false);
    const [action, setAction] = useState("");
    const [editCommissionDisplay, setEditCommissionDisplay] = useState(false);
    const [cancelCommissionDisplay, setCancelCommissionDisplay] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleClick = action => {
      setPolicyDisplay(!isPolicyDisplayed);
      setAction(action);
    };
  
    const handleClose = () => {
      setPolicyDisplay(!isPolicyDisplayed);
      if (action === "edit commission") {
        setEditCommissionDisplay(true);
      } else if (action === "cancel commission") {
        setCancelCommissionDisplay(true);
      }
    };
  
    const dateCreated = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = dateCreated.toLocaleDateString("en-US", options);
  
    return (
      <div className="w-full border border-gray-300 rounded overflow-hidden mb-2 just-another-hand text-3xl">
        <div className="flex justify-between">
          <div
            className="flex w-full p-2 bg-gray-200 cursor-pointer justify-start"
            onClick={toggleDropdown}
          >
            <div className="flex w-1/4">Id: {id}</div>
            <div className="flex w-1/3">Client Name: {clientName}</div>
            <div className="flex w-1/4">Date Created: {formattedDate}</div>
            <div className="flex w-1/6">Status: {status}</div>
          </div>
        </div>
        {isOpen && (
          <div className="block p-2 bg-white border-t border-gray-300 text-2xl">
            <p>Description: {description}</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleClick("edit commission")}
                className="commission-button"
              >
                Edit Details
              </button>
              <button
                onClick={() => handleClick("cancel commission")}
                className="commission-button"
              >
                Cancel Commission
              </button>
            </div>
          </div>
        )}
        {isPolicyDisplayed && <UserPolicy handleClose={handleClose} />}
        {editCommissionDisplay && (
          <UserEditCommissionScreen
            display={setEditCommissionDisplay}
            id={id}
            description={description}
            status={status}
            reloadData={reloadData}
          />
        )}
        {cancelCommissionDisplay && (
          <UserCancelCommissionScreen
            display={setCancelCommissionDisplay}
            id={id}
            status={status}
            reloadData={reloadData}
          />
        )}
      </div>
    );
}

function UserPolicy({ handleClose }) {
    const policy = `As a customer, you are allowed to edit or cancel your commission as long as the
                    status is still pending. If the curator has already reviewed your commission and
                    the status is no longer pending, then you are encouraged to reach out to the business
                    owner to make changes. The contact page contains information if you need to reach out.`;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="w-1/2 bg-white rounded-lg p-4">
          <h1 className="text-3xl text-center font-bold">User Policy</h1>
          <p>{policy}</p>
          <button
            onClick={handleClose}
            className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
          >
            I Understand
          </button>
        </div>
      </div>
    );
}