import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from "../../contexts/ToastContext";

// Commission items inside of the Admin's commission page
export default function AdminCommissionItem({
    id,
    clientName,
    description,
    createdAt,
    status,
    phoneNumber,
    email,
    items,
    setItems,
    setFormData,
    reloadData,
    handleCheckBox,
    setHandleCheckBox,
  }) {
    // For invoking popup messages
    const showToast = useToast();
  
    // For opening the commission item to view dropdown contents
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    // For handling checkbox values
    const [selected, setSelected] = useState(null);

    /* 
      FIX ADDED: 
      When handleCheckBox gets turned true from AdminCommissionSection...
        set selected variable to null, set handleCheckbox flag back to false, and clear items array
    */
    useEffect(() => {
      if(handleCheckBox){
        setSelected(null);
        setHandleCheckBox(false);
        setItems([null]);
      }
    }, [handleCheckBox])

    /*  
      Get's the id and sets the selected 
      commission status, pushing it into the
      formData array in AdminCommissionSection()
    */
    const handleFormChanges = event => {
      // Prevent default form submission action
      event.stopPropagation();
      // Add selection if item checkbox isn't checked
      if (selected === null) {
        setSelected(event.target.value);
        setFormData({ id: id, commissionStatus: event.target.value });
      }
      // Else, remove the item from item array
      else {
        setSelected(null);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
          const newItemsArray = [
            ...items.slice(0, index),
            ...items.slice(index + 1),
          ];
          setItems(newItemsArray);
        }
      }
    };
  
    // For formatting the date
    const formattedDate = date => {
      const dateCreated = new Date(date);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = dateCreated.toLocaleDateString("en-US", options);
      return formattedDate;
    };

    const confirmAction = () => {
      showToast(
        <>
          <div className="just-another-hand">
            <p className="font-bold text-4xl">
              Are you sure with deleting this commission?
            </p>
            <br></br>
            <div className="flex items-center justify-center grid grid-cols-2 text-2xl">
              <button className="button" onClick={handleDelete}>
                Confirm
              </button>
              <button className="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </>,
        "error"
      );
    };
  
    // For handling delete commission button
    const handleDelete = () => {
      let deletecommission_url = `https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/updateCommissionStatus`;
      axios
        .delete(deletecommission_url, { params: { id: id } })
        .then(response => {
          showToast(`Deleting commission ID ${id}`, "success");
          console.log(response.data);
          /* 
            FIX ADDED: 
            To prevent other commission items from being opened 
            when a deletion of another commission occurs
          */
          setIsOpen(false);
          // Reload data on successful delete
          reloadData();
        })
        .catch(error => {
          showToast(`Error deleting commission ID ${id}`, "error");
          console.error(error);
        });
    };
  
    // Handling cancel in confirmAction() when confirming to delete commission submission
    const handleCancel = () => {
      showToast("Canceled delete.");
    };
  
    return (
      <>
        <div className="w-full border border-gray-300 rounded overflow-hidden mb-2 just-another-hand text-3xl">
          <div className="flex justify-between">
            <div
              className="flex w-full p-2 bg-gray-200 cursor-pointer justify-start"
              onClick={toggleDropdown}
              data-testid="open-dropdown-commission"
            >
              <div className="flex w-1/4" data-testid="commission-id">Id: {id}</div>
              {/* 
                We test if clientName length is 1 for null because 
                of the space that always gets pushed into clientName
              */}
              <div className="flex w-1/2" data-testid="client-name">
                {/* old clientName.length !== 1 ? clientName : "N/A"*/}
                Client Name: {clientName && clientName.length > 1 ? clientName : "N/A"}
              </div>
              <div className="flex w-1/4" data-testid="commission-date">Date: {formattedDate(createdAt)}</div>
              <div className="flex w-1/4" data-testid="commission-status">Current status: {status}</div>
            </div>
            <div className="flex justify-center border border-black bg-gray-150">
              {/* This part below is the 3 checkboxes.*/}
              <div className="flex space-x-4">
                <label className="flex px-2 items-center space-x-2">
                  <input
                    type="checkbox"
                    value="accepted"
                    checked={selected === "accepted"}
                    onChange={handleFormChanges}
                    className="form-checkbox accent-green-400"
                    data-testid="accept"
                  />
                  <span>Accept</span>
                </label>
  
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="declined"
                    checked={selected === "declined"}
                    onChange={handleFormChanges}
                    className="form-checkbox accent-red-500"
                    data-testid="decline"
                  />
                  <span>Decline</span>
                </label>
  
                <label className="flex px-2 items-center space-x-2">
                  <input
                    type="checkbox"
                    value="flagged"
                    checked={selected === "flagged"}
                    onChange={handleFormChanges}
                    className="form-checkbox accent-yellow-300"
                    data-testid="flag"
                  />
                  <span>Flag</span>
                </label>
              </div>
            </div>
          </div>
  
          {isOpen && (
            <>
              <div className="grid grid-cols-2 block p-2 bg-white border-t border-gray-300 text-2xl" data-testid="dropdown-content">
                <div>
                  <p className="font-bold flex w-1/4">--Contact info--</p>
                  <p className="flex w-1/4" data-testid="phone-number">
                    Phone Number: {phoneNumber && phoneNumber.length !== 0 ? phoneNumber : "N/A"}
                  </p>
                  <p className="flex w-1/4" data-testid="email">
                    Email: {email && email.length !== 0 ? email : "N/A"}
                  </p>
                  <button onClick={confirmAction} className="commission-button" data-testid="delete-commission-button">
                    Delete Commission
                  </button>
                </div>
  
                <div>
                  <p className="font-bold">--Description--</p>
                  <p>{description}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }