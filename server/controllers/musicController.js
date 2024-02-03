const music = require('../module/music');

const fetch_music= async(req,res)=>{
    const Music= await music.find();
    res.json({Music});
};

const fetch_music_by_id= async(req,res)=>{
    const musicID= req.params.id;
 
    const Music= await music.findById(musicID);
    res.json({Music});
 };

 const create_new_music= async(req,res)=>{
    const {Title,Artist,Album,Gener}= req.body;
    // const Title= req.body.Title;
    // const Artist= req.body.Artist;
    // const Album= req.body.Album;
    // const Gener= req.body.Gener;
 
    const Music = await music.create({
     Title,
     Artist,
     Album,
     Gener
    });
 
    res.json({Music})
    
 };


 const update_music= async(req,res)=>{
    const musicID= req.params.id;

    const {Title,Artist,Album,Gener}= req.body;

    // const Title= req.body.Title;
    // const Artist= req.body.Artist;
    // const Album= req.body.Album;
    // const Gener= req.body.Gener;
 
    await music.findByIdAndUpdate(musicID, {
        Title,
        Artist,
        Album,
        Gener,
    });

    const Music= await music.findById(musicID);

    res.json({Music});
 };


 const delete_music= async(req,res)=>{
    const musicID= req.params.id; 
    await music.findByIdAndDelete(musicID);

    res.json({success: "record deleted"});
 };

 module.exports = {
    fetch_music,
    fetch_music_by_id,
    create_new_music,
    update_music,
    delete_music
 }