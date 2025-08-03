import React from 'react';
import { FaXmark } from 'react-icons/fa6';
import Modal from 'react-modal';

interface ModalProps {
       title: string;
       isOpen: boolean;
       dismissable?: boolean;
       onClose?: () => void;
       children: React.ReactNode;
       style?: {
        overlay?: React.CSSProperties;
        content?: React.CSSProperties;
      };
}
const BaseModal: React.FC<ModalProps> = ({ title, onClose, children, dismissable = false,isOpen , style}) => {
       return (
              <Modal
  isOpen={isOpen}
  onRequestClose={dismissable ?  onClose : () => {}}
  ariaHideApp={false}
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style?.overlay,
    },
    content: {
      position: 'relative',
      inset: 'auto', // Reset the default inset
      width: 'auto', // Allow width to adjust based on content
      maxWidth: '90%', // Ensure modal doesn't exceed screen width
      minWidth: '50%', // Ensure modal doesn't exceed screen width
      maxHeight: '90vh', // Ensure modal doesn't exceed screen height
      overflowY: 'auto', // Make content scrollable if it overflows
      padding: '0', // Remove default padding
      border: 'none', // Remove default border
      borderRadius: '0.5rem', // Add rounded corners
      ...style?.content,
    },
  }}
>
  <div className="bg-white rounded-lg shadow-lg w-full">
    <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
      <h2 className="text-xl font-semibold">{title}</h2>
      <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
        <FaXmark/>
      </button>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
</Modal>
       );
};

export default BaseModal;