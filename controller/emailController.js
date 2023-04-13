const Email = require("../models/emails");

exports.emails_list = async (req, res) => {
   try{
        const data = await Email.find().sort({first_name : 1});
        res.json(data)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.email_detail = async (req, res) => {
      try{
        const data = await Email.findById(req.params.id);
        res.json(data)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.email_create = async (req, res) => {
      const data = new Email({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        surname: req.body.surname,
        email: req.body.email,
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

exports.email_delete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Email.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
};

exports.email_delete_email = async (req, res) => {
    try {
      const data = await Email.findOneAndDelete({ email: req.body.email})
      res.send(`Document with ${data.email} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  };

exports.email_update = async (req, res) => {
      try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Email.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

exports.email_update_email = async (req, res) => {
    try {
        const params = req.params;
        const updatedData = req.body;
        const options = { new: true };

        const data = await Email.findOneAndUpdate(
            {email: email}, updatedData, options
        )
        res.send(`Document with ${data.email} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  };