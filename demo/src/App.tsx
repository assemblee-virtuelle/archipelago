import { Routes, Route } from 'react-router-dom';
import DemoEmbeddedCalendar from './DemoEmbeddedCalendar';


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<DemoEmbeddedCalendar />} />

        </Routes>
    );
}
