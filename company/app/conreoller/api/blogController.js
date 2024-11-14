const Blog = require('../../model/blog');
const Reply = require('../../model/reply');

class blogController{
    async getBlog(req,res){
        try {
            const blogs = await Blog.find();
            return res.status(200).json({ success: true, blogs });  
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return res.status(500).render('error', { error: 'Failed to retrieve blogs!' });
        }
    }

    async getBlogById(req, res) {
        try {
            const { blogId } = req.params;  // Get the blogId from the request parameters
            const blog = await Blog.findById(blogId);  // Find the blog by ID

            if (!blog) {
                return res.status(404).json({
                    success: false,
                    message: "Blog not found!"
                });
            }

            return res.status(200).json({
                success: true,
                blog
            });
        } catch (error) {
            console.error("Error fetching blog by ID:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to retrieve the blog!",
                error: error.message
            });
        }
    }

    async getReply(req,res){
        try {
            const replies = await Reply.find();
            return res.status(200).json({ success: true, replies });  
        } catch (error) {
            console.error('Error fetching replies:', error);
            return res.status(500).render('error', { error: 'Failed to retrieve replies!' });
        }
    }

    async postReply(req, res) {
        try {
            // Destructure the required fields from the request body
            const { name, email, website, comment } = req.body;

            // Create a new message instance
            const newReply = new Reply({
                name,
                email,
                website,
                comment,
                isActive: true,  // Assuming isActive is default, no need to manually set it unless needed
            });

            // Save the message to the database
            await newReply.save();

            // Send success response
            return res.status(200).json({
                success: true,
                message: "Reply posted successfully!",
                data: newReply
            });
        } catch (error) {
            // Handle any errors
            console.error("Error posting reply:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to post the reply!",
                error: error.message
            });
        }
    }

    async searchBlogByTitle(req, res) {
        try {
            const { title } = req.query;  // Get the title query from the request

            if (!title) {
                return res.status(400).json({
                    success: false,
                    message: "Title query parameter is required!"
                });
            }

            // Find blogs where the title contains the search term (case-insensitive)
            const blogs = await Blog.find({ 
                title: { $regex: title, $options: "i" } 
            });

            if (blogs.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No blogs found with the specified title!"
                });
            }

            return res.status(200).json({
                success: true,
                blogs
            });
        } catch (error) {
            console.error("Error searching blogs by title:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to search blogs!",
                error: error.message
            });
        }
    }

}

module.exports=new blogController()