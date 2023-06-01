const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Please add a task"]
        },
        completed: {
            type: Boolean,
            required:true,
            dafault: false
        },
    },
    {
        timestamps: true,
    }
)

const Task =mongoose.model("tak",taskSchema)

module.exports=Task;