import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import Spinner from './Spinner';

const PrivateRoute = () => {
    const { status } = useSession();

    if (status === 'checking') {
        return <Spinner />;
    } else if (status === 'error') {
        return (
            <p role='alert'>
                Unable to verify your session. Please refresh to try again.
            </p>
        );
    } else if (status === 'anonymous') {
        return <Navigate to='/login' replace />;
    } else if (status === 'authenticated') {
        return <Outlet />;
    }
};

export default PrivateRoute;
