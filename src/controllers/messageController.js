const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
    try {
        const newMessage = new Message(req.body);

        await newMessage.save();

        res.json({
            success: true,
            message: "تم استلام رسالتك بنجاح!"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "حدث خطأ أثناء الإرسال"
        });
    }
};