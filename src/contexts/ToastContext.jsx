import React, { createContext, useContext, useState, useRef } from 'react';

const ToastContext = createContext();

// Custom hook to use the ToastContext
export const useToast = () => {
  return useContext(ToastContext);
};

const toastStyles = {
	success: 'bg-green-500 text-white',
	error: 'bg-red-500 text-white',
	warning: 'bg-orange-500 text-white',
	info: 'bg-blue-500 text-white',
};

// Provider component
export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);
	const idRef = useRef(0); // Ref to maintain unique ID counter

	const showToast = (message, type = 'info') => {
		// Generate a unique ID for each toast
		const id = idRef.current++;
		setToasts((prev) => [...prev, { id, type, message }]);

		// Remove the toast after 3 seconds
		setTimeout(() => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
		}, 3000);
	};

	return (
		<ToastContext.Provider value={showToast}>
			{children}
			<div className="fixed bottom-4 right-4 space-y-2 flex flex-col items-end">
				{toasts.map((toast) => (
				<div key={toast.id} className={`p-4 rounded shadow-lg ${toastStyles[toast.type]} 
																			inline max-w-xs`}>
					{toast.message}
				</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};