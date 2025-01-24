import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import Messages from './Messages';

const AuthForm = ({
    isLogin,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordStrength,
    handlePasswordChange,
    formError,
    errorMessage,
    successMessage,
    handleActionClick,
}) => (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-1">
        {!isLogin && (
            <>
                <label className="block text-sm md:text-lg lg:text-xl font-semibold">Nombre</label>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-1 md:p-2 lg:p-3 xl:p-4 border rounded"
                />
            </>
        )}
        <label className="block text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">Email</label>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-1 md:p-2 lg:p-3 border rounded"
        />
        <label className="block text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold">Password</label>
        {!isLogin && <PasswordStrengthIndicator strength={passwordStrength} />}
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-1 md:p-2 lg:p-3 xl:p-4 border rounded"
        />
        <Messages
            formError={formError}
            errorMessage={errorMessage}
            successMessage={successMessage}
        />
        <button
            type="button"
            onClick={handleActionClick}
            className="w-full bg-amber-500 text-white py-1 md:py-2 lg:py-3 xl:py-4 rounded hover:bg-amber-600 transition duration-300"
        >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
    </form>
);

export default AuthForm;
