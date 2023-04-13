const Book = require("../models/book");

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

exports.book_list = async (req, res) => {
  try{
       const data = await Book.find();
       res.json(data)
   } catch(error){
       res.status(500).json({message: error.message})
   }
};

exports.book_detail = async (req, res) => {
  try{
    const data = await Book.findById(req.params.id);
    res.json(data)
} catch(error){
    res.status(500).json({message: error.message})
}
};

exports.book_create = async (req, res) => {
  const data = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    genre: req.body.genre,
})

try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
} catch (error) {
    res.status(400).json({message: error.message})
}
};

exports.book_delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Book.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
};

exports.book_update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Book.findByIdAndUpdate(
        id, updatedData, options
    )
    res.send(result)
} catch (error) {
    res.status(400).json({ message: error.message })
}
};