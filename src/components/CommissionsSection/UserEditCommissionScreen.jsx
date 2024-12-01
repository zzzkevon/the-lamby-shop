import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../../contexts/ToastContext";

export default function UserEditCommissionScreen({
  display,
  id,
  description,
  status,
  reloadData,
}) {
  const [newDescription, setNewDescription] = useState(description);
  //creates a local reference to the value provided by the ToastContext
  const showToast = useToast();
  const url =
    "https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/getUserCommissions";

  const putRequest = () => {
    axios
      .put(url, {
        id: id,
        description: newDescription,
      })
      .then(response => {
        // console.log("Response:", response.data);
        showToast("Successfully updated commission!", "success");
        reloadData();
      })
      .catch(error => {
        console.error("Error updating data:", error);
        showToast("Error! Network put request failed.", "error");
      });
  };

  const editCommission = () => {
    if (status === "pending") {
      putRequest();
      display(false);
    } else {
      showToast(
        `Sorry, the commission can't be changed
           since it is not in the pending status.`,
        "error"
      );
      display(false);
    }
  };

  const exitScreen = () => {
    setNewDescription(description);
    display(false);
  };

  const handleChange = event => {
    setNewDescription(event.target.value);
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="w-1/2 bg-white rounded-lg p-4">
        <h2 class="text-3xl text-center font-bold">Edit Commission?</h2>
        <p>New Description:</p>
        <textarea
          value={newDescription}
          onChange={handleChange}
          className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={exitScreen}
            className="commission-button closebutton rounded"
          >
            Close
          </button>
          <button onClick={editCommission} className="commission-button">
            Submit Changes
          </button>
        </div>
      </div>
    </div>
  );
}
