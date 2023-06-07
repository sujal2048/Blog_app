import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import "./sidebar.css"
import { URI } from "../../App";
export default function Sidebar() {
    const [cats,setCats] = useState([]);

    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axios.get(`${URI}/categories`);
            setCats(res.data);
        }
        getCats();
    },[]);
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://userpic.codeforces.org/1834688/title/73d6c2f6b9f1b48e.jpg" alt=""/>
                <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam cum soluta ea est excepturi doloremque earum. Odit quis soluta molestias eos quod nobis, voluptatem minus molestiae iste eius exercitationem tenetur.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c)=>(
                        <Link to ={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                        
                    ))}
                    
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>

    )
}
