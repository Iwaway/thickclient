const Genre = require("../models/genre");

exports.genre_list = async (req, res) => {
  try{
       const data = await Genre.find();
       res.json(data)
   } catch(error){
       res.status(500).json({message: error.message})
   }
};

exports.genre_detail = async (req, res) => {
  try{
    const data = await Genre.findById(req.params.id);
    res.json(data)
} catch(error){
    res.status(500).json({message: error.message})
}
};

exports.genre_create = async (req, res) => {
  const data = new Genre({
    name: req.body.name,
})

try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
} catch (error) {
    res.status(400).json({message: error.message})
}
};

exports.genre_delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Genre.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
};

exports.genre_update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Genre.findByIdAndUpdate(
        id, updatedData, options
    )
    res.send(result)
} catch (error) {
    res.status(400).json({ message: error.message })
}
};