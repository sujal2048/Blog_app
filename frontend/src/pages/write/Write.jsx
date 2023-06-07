import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { URI } from "../../App";


export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const[username,setUsername]=useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newPost = {
            username:user.username,    //username:user.username,
            title,
            desc,
        };
        setUsername(user.username)
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo=filename;
            try{
                await axios.post(`${URI}/upload`,data);
            }catch(err){
                console.log(`write failed 2 ${user.username} `)

            }
        }
        try{
            const res = await axios.post(`${URI}/posts`,newPost);    //for here is user.username is not defined and api will not accept with out username
            window.location.replace(`/post/`+res.data._id);
        }catch(err){
            console.log(`write failed 1 ${user.username} `)

        }
    }
    return (
        <div className="write">
            {file &&
            (<img className="writeImg" src={URL.createObjectURL(file)} alt="" />)}
            
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                    <i className ="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display: "none"}} onChange={(e)=> setFile(e.target.files[0])}/>
                    <input type="text" placeholder="Title" className="writeInput" autoFocus={true}
                        onChange={e=>setTitle(e.target.value)}
                    />

                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your story..."
                        type="text"
                        className="writeInput writeText"
                        onChange={e=>setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}
