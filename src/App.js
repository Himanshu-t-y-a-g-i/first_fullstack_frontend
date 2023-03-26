import { decodeToken, isExpired } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Footer } from './Components/Footer';
import { Navbar } from './Components/Navbar';
import { setLsToken } from './Redux/authentication/action';
import { AllRoutes } from './Routes/AllRoutes';

function App() {
    const store = useSelector(store => store.authReducer);
    const dispatch = useDispatch();
    if (store.isAuth === false) {
        const lsData = JSON.parse(localStorage.getItem("loginStatus_appFS"));
        if (lsData) {
            if (lsData.isAuth && isExpired(lsData.token) === false) {
                lsData.role = decodeToken(lsData.token);
                dispatch(setLsToken(lsData));
            }
        }
    }
    return (
        <div className="App">
            <Navbar />
            <AllRoutes />
            <Footer />
        </div>
    );
}

export default App;