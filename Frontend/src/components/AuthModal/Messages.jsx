const Messages = ({ formError, errorMessage, successMessage }) => {
    return (
        <div className="mt-2">
            {formError && <p className="text-red-600 text-sm">{formError}</p>}
            {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
            {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
        </div>
    );
};

export default Messages;
