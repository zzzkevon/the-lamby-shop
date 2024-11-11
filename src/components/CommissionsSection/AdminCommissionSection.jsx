import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from "../../contexts/ToastContext";
import star from '../../images/story_stars_1.png';

import AdminCommissionItem from './AdminCommissionItems';

// Admin view of the Commission Page
export default function AdminCommissionSection() {
    // For getting and setting admin commissions from DB
    const [adminCommissions, setAdminCommissions] = useState([]);
  
    // For invoking popup messages
    const showToast = useToast();
  
    // GET request from API for all existing commissions
    const loadAdminCommissions = () => {
      axios
        .get(
          `https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/admin`
        )
        .then(response => {
          // Get only the item id, clientName, and description
          let mappedData = response.data.map(item => ({
            id: item.id,
            clientName: `${item.firstName} ${item.lastName}`,
            description: item.description,
            createdAt: item.createdAt,
            status: item.commissionStatus,
            phoneNumber: item.phoneNumber,
            email: item.email,
          }));
          setAdminCommissions(mappedData);
          showToast("All commissions received!", "success");
        })
        .catch(err => {
          showToast("Error getting commission data.", "error");
          console.error(err);
        });
    };
  
    /* 
      When user first loads admin commission page, they will be 
      prompted with either message based on successful retrieval
      of all commissions.
    */
    useEffect(() => {
      loadAdminCommissions();
    }, []);
  
    // Getting form data from CommissionItem
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ id: null, commissionStatus: "" });
  
    /* 
      Adds a form item to items[] whenever setFormData()
      gets invoked inside of CommissionItem()
    */
    useEffect(() => {
      setItems([
        ...items,
        {
          id: formData.id,
          commissionStatus: formData.commissionStatus,
        },
      ]);
    }, [formData]);
  
    /* 
      Update items list everytime setItems is 
      invoked from the useEffect() above this one.
    */
    useEffect(() => {
      // FOR TESTING ADDING FORM DATA INTO ITEMS[] console.log(`Item list size: ${items.length}`)
    }, [items]);
  
    // Custom popup when you click confirm changes button
    const confirmAction = () => {
      showToast(
        <>
          <div className="just-another-hand">
            <p className="font-bold text-4xl">
              Are you sure you want to confirm changes?
            </p>
            <br></br>
            <div className="flex items-center justify-center grid grid-cols-2 text-2xl">
              <button className="button" onClick={handleConfirm}>
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
  
    // Update commission statuses if confirm chosen from confirmAction()
    const handleConfirm = async () => {
      let updatecommission_url = `https://cbothh6c5c.execute-api.us-west-2.amazonaws.com/Development/updateCommissionStatus`;
      // Items is empty if length is 1
      if(items.length == 1) {
        showToast("Please add a form selection before confirming changes.", "error");
        return;
      }
      showToast("Submitting changes for commission statuses");
      for (let i = 1; i < items.length; i++) {
        // Skip item if id is null
        if(items[i].id == null)
          continue;
        // Else, run the update request
        else { 
          axios.put(updatecommission_url, 
                    { commissionStatus: items[i].commissionStatus },
                    { params: { id: items[i].id } })
                .then(response => {
                    showToast(`Success updating status for commission ID ${items[i].id}`, "success");
                    console.log(response.data);        
                    /* 
                      Reload admin commissions with 
                      the new popup messages on a 
                      successful update request
                    */         
                    loadAdminCommissions();
                })
                .catch(error => {
                    showToast(`Error updating status for commission ID ${items[i].id}`, "error");
                    console.error(error);
                });
          }
        }
    };
  
    // Cancel toast popup if cancel chosen from confirmAction()
    const handleCancel = () => {
      showToast("Canceled. No changes were made to the commission's statuses");
    };
  
    return (
      <div>
        <div
          className="just-another-hand text-3xl"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
          <h1
            className="header-font header-format"
            style={{ fontSize: "2em", padding: "25px" }}
          >
            C O M M I S S I O N S
          </h1>
          <img src={star} alt="" class="w-16 h-16 mb-4"></img>
        </div>
  
        <div className="just-another-hand flex w-full justify-around items-center">
          {/*creates and displays the commission item components from the data in the commission array*/}
          <ul className="justify-around w-4/5">
            {adminCommissions.map(commissionItem => (
              <>
                <AdminCommissionItem
                  id={commissionItem.id}
                  clientName={commissionItem.clientName}
                  description={commissionItem.description}
                  createdAt={commissionItem.createdAt}
                  status={commissionItem.status}
                  phoneNumber={commissionItem.phoneNumber}
                  email={commissionItem.email}
                  items={items}
                  setItems={setItems}
                  setFormData={setFormData}
                  reloadData={loadAdminCommissions}
                />
              </>
            ))}
            {/*<button onClick={test} className="button button-text">TEST</button>*/}
            <button
              onClick={confirmAction}
              className="commission-button text-2xl"
            >
              Confirm Changes
            </button>
          </ul>
        </div>
      </div>
    );
  }