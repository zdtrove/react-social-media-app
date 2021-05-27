const { compareSync } = require('bcrypt')
const Notifies = require('../models/notifyModel')

const notifyCtrl = {
    createNotify: async (req, res) => {
        try {
            const { id, recipients, url, text, content, image } = req.body
            const notify = new Notifies({
                id, recipients, url, text, content, image, user: req.user._id
            })
            await notify.save()

            return res.json({
                msg: "Created Notify Success",
                notify
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    removeNotify: async (req, res) => {
        try {
            const notify = await Notifies.findOneAndDelete({
                id: req.params.id, url: req.query.url
            })

            return res.json({
                msg: "Delete Notify Success",
                notify
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getNotifies: async (req, res) => {
        try {
            console.log(req.user)
            const notifies = await Notifies.find({ recipients: req.user._id })
                .sort('isRead').populate('user', 'avatar username')
            console.log(notifies)
            res.json({
                msg: "Get Notifies Success",
                notifies
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = notifyCtrl