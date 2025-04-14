import axios from "axios";
import { redirect } from "next/navigation";

async function checkAuth() {
    const res = await axios.get(`${process.env.API_BASE_URL}/api/checkSession.php`, {
        withCredentials: true,
    });
    return res.data.authenticated;
}

export default async function ProfilePage() {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
        redirect("/auth");
    }

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