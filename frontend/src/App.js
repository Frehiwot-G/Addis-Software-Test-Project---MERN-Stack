import { useState,useEffect } from "react";
import axios from 'axios';

function App() {
  const[music, setmusic] = useState(null);
  const[create_form, setcreateform] = useState({
    Title: "",
    Artist: "",
    Album: "",
    Gener: "",
  });

  const[update_form, setupdateform] = useState({
    _id: null,
    Title: "",
    Artist: "",
    Album: "",
    Gener: "",
  });

  useEffect(()=>{
    fetchmusic();
  }, []);

  const fetchmusic = async() => {
    const res =await axios.get("http://localhost:3000/");
    setmusic(res.data.Music);

  };

  const updatecreateform = (e)=>{
    const {name,value}=e.target;

    setcreateform({
      ...create_form,
      [name]: value,
    });
    // console.log({name,value});
  };

  const createmusic= async(e)=>{
    e.preventDefault();

    const res = await axios.post("http://localhost:3000/music", create_form);
    
    //update list
    setmusic([...music, res.data.Music]);

    // clear form
    setcreateform({Title:"", Artist:"", Album:"", Gener:""});
    // console.log(res)
  };

  const delete_music= async(_id)=>{
   const res= await axios.delete(`http://localhost:3000/music/${_id}`);
   const newmusic = [...music].filter((music) =>{
    return music._id !== _id;
   })
   setmusic(newmusic);
   console.log(res);
  };

  const handleupdatefield = (e)=>{
    const {name,value}=e.target;

    setupdateform({
      ...update_form,
      [name]: value,
    });
    // console.log({name,value});
  };
  
  const toggleupdate = (music)=> {
    setupdateform({Title:music.Title, Artist:music.Artist, Album:music.Album, Gener:music.Gener, _id:music._id});
  };

  const update_music = async(e)=>{
    e.preventDefault();
    const {Title, Artist, Album, Gener} = update_form;
    const res = await axios.put(`http://localhost:3000/music/${update_form._id}`, {Title, Artist, Album, Gener});
    
    //update list
    const newmusic=[...music];
    const musicindex= music.findIndex((musics)=>{
      return musics._id === update_form._id;
    });

    newmusic[musicindex]= res.data.Music;

    setmusic(newmusic);

    //clear form
    setupdateform({_id:null,Title:"", Artist:"", Album:"", Gener:""});

  };

  return (
    <div className="App">
      <div>
        <h2>musics:</h2>
        {music && 
        music.map((music) => {
          return(
            <div key={music._id}>
              <h3>{music.Artist}</h3>
              <button onClick={()=>delete_music(music._id)}>delete music list</button>
              <button onClick={()=>toggleupdate(music)}>update music list</button>
            </div>
          );
        })}
      </div>

      {update_form._id && (
      <div>
      <h2>update music list</h2>
        <form onSubmit={update_music}>
          <input onChange={handleupdatefield} value={update_form.Title}  name="Title"/>
          <input onChange={handleupdatefield} value={update_form.Artist}  name="Artist"/>
          <input onChange={handleupdatefield} value={update_form.Album}  name="Album"/>
          <input onChange={handleupdatefield} value={update_form.Gener}  name="Gener"/>
          <button type="submit">update</button>
        </form>
      </div>
      )}


{!update_form._id && (
      <div>
        <h2>create music list</h2>
        <form onSubmit={createmusic}>
          <input onChange={updatecreateform} value={create_form.Title} name="Title"/>
          <input onChange={updatecreateform} value={create_form.Artist} name="Artist"/>
          <input onChange={updatecreateform} value={create_form.Album} name="Album"/>
          <input onChange={updatecreateform} value={create_form.Gener} name="Gener"/>
          <button type="submit">create</button>
        </form>
      </div>
)}
    </div>
  );
}
export default App;
