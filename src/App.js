import Layout from "./components/Layout";
import HotelList from "./features/hotel/HotelList";
import HotelPage from "./features/hotel/HotelPage"
import { Routes, Route, Navigate } from "react-router-dom";
import HotelContentPreview from "./features/content-preview/HotelContentPreview";
import HotelContentTranslation from "./features/content-translation/HotelContentTranslation";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HotelList />} />

                <Route path="hotel">
                    <Route index element={<HotelList />} />
                    <Route path=":hotelId" element={<HotelPage />} />
                </Route>
                <Route path="profile">
                    <Route index element={<HotelContentPreview />}></Route>
                </Route>
                <Route path="trans">
                    <Route index element={<HotelContentTranslation />}></Route>
                </Route>

                {/* Catch all - replace with 404 component if you want */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
