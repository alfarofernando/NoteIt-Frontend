const AuthHeader = ({ isLogin, handleClose }) => (
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-3xl font-semibold text-center flex-grow">
            {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <button
            onClick={handleClose}
            className="text-xl lg:text-3xl text-red-600 hover:text-red-800"
        >
            x
        </button>
    </div>
);

export default AuthHeader;
