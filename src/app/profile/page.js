"use client"
 
import axios from "axios";
 
export default function ProfilePage() {
    const logout = async () => {
        try {
            await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout.php`, {
                withCredentials: true
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
 
    return (
        <div>
            <button onClick={logout}>Выйти</button>
        </div>
    )
}