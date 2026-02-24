const contactModel = require('../models/contactModel');


module.exports.sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const newMessage = new contactModel({
            name,
            email,
            message
        })

        await newMessage.save();

        res.status(200).json({ message: "Message sent successfully!" })
    } catch (error) {
        console.log(error.message);
    }
}