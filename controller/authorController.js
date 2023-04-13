const Author = require("../models/author");

exports.author_list = async (req, res) => {
   try{
        const data = await Author.find();
        res.json(data)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.author_detail = async (req, res) => {
      try{
        const data = await Author.findById(req.params.id);
        res.json(data)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.author_create = async (req, res) => {
      const data = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

exports.author_delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Author.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
};

exports.author_update = async (req, res) => {
      try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Author.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};
