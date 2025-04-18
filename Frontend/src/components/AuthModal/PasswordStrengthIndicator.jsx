const PasswordStrengthIndicator = ({ strength }) => {
    const getStrengthLabel = () => {
        switch (strength) {
            case 0:
                return 'Muy débil';
            case 1:
                return 'Débil';
            case 2:
                return 'Moderada';
            case 3:
                return 'Fuerte';
            case 4:
                return 'Muy fuerte';
            default:
                return '';
        }
    };

    const strengthColors = ['#ff0000', '#ff5c33', '#ffa31a', '#33cc33', '#009933'];

    return (
        <div className="flex items-center mb-2">
            <div className="w-full bg-gray-200 h-2 rounded">
                <div
                    className="h-2 rounded"
                    style={{
                        width: `${(strength + 1) * 20}%`,
                        backgroundColor: strengthColors[strength] || '#ccc',
                    }}
                />
            </div>
            <span className="ml-2 text-sm font-semibold">{getStrengthLabel()}</span>
        </div>
    );
};

export default PasswordStrengthIndicator;
