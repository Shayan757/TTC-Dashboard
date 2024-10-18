
export default function PopupSpinner({ isVisible  }) {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-yellow-500 border-r-yellow-500 border-b-transparent border-l-transparent">


        </div>
      </div>
    );
  }
  