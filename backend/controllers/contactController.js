const contactModel = require('../models/contactModel');
const {z} = require('zod');

const contactSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    mobile: z.string().regex(/^[0-9]{10}$/),
    message: z.string().min(10).max(500)
});

module.exports.sendMessage = async (req, res) => {
    try {
        const { success, data} = contactSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ message: "Please fill all the fields correctly" });
        }

        const newMessage = new contactModel({
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            message: data.message
        })

        const result = await newMessage.save();

        return res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}