const Spam = require("../models/spams");

exports.spams_list = async (req, res) => {
   try{
        const data = await Spam.find().sort({theme : 1});
        res.json(data)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.spam_detail = async (req, res) => {
      try{
        const data = await Spam.findById(req.params.id);
        res.json(data)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.spam_create = async (req, res) => {
      const data = new Spam({
        theme: req.body.theme,
        body: req.body.body,
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

exports.spam_delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Spam.findByIdAndDelete(id)
    res.send(`Document with ${data.theme} has been deleted..`)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
};

exports.spam_update = async (req, res) => {
      try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Spam.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};