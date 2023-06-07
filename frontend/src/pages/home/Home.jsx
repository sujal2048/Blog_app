import { useEffect,useState } from "react";
import axios from "axios";
import Header from "../../components/header/Header"
import Posts from "../../components/Posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import { useLocation } from "react-router";
import { URI } from "../../App";
export default function Home() {
    const [posts,setPosts] = useState([]);
    const {search} = useLocation();



    useEffect(()=>{
        const fetchPosts = async()=>{
            const res = await axios.get(`${URI}/posts` + search)
            setPosts(res.data)

        }
        fetchPosts()
    },[search])
    return (
        <>
            <Header/>
            <div className="home">
                
            <Posts posts={posts}/>
            <Sidebar/>

            </div>
        </>
    )
}
