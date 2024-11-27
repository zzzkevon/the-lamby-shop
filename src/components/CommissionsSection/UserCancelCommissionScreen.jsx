import React from 'react';
import axios from 'axios';
import { useToast } from "../../contexts/ToastContext";

export default function UserCancelCommissionScreen({ display, id, status, reloadData }) {
    //creates a local reference to the value provided by the ToastContext
    const showToast = useToast();
    const url =
      "https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/getUserCommissions";
  
    const deleteRequest = () => {
      axios
        .delete(url, {
          data: { id },
        })
        .then(response => {
          console.log("Delete successful:", response.data);
          showToast("Successfully cancelled commission!", "success");
          reloadData(); // Call reloadData after a successful delete
        })
        .catch(error => {
          console.error("Error deleting item:", error);
          showToast("Error! Network delete request failed.", "error");
        });
    };
  
    const cancelCommission = () => {
      if (status === "pending") {
        deleteRequest();
        display(false);
      } else {
        showToast(
          `Sorry, the commission can't be cancelled
          since it is not in the pending status.`,
          "error"
        );
        display(false);
      }
    };
  
    const exitScreen = () => {
      display(false);
    };
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="w-1/4 bg-white rounded-lg p-4">
          <h1 className="text-3xl text-center font-bold">Cancel Commission?</h1>
          <p>
            Are you sure you want to cancel your commission? This will remove it
            permanently.
          </p>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={exitScreen}
              className="commission-button closebutton rounded"
            >
              Close
            </button>
            <button onClick={cancelCommission} className="commission-button">
              Delete Commission
            </button>
          </div>
        </div>
      </div>
    );
  }