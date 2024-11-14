const Blog = require('../../../model/blog');
const Reply = require('../../../model/reply');

class BlogController{
    
    async getBlog(req,res){
        try {
            const blogs = await Blog.find();
             
            res.render('blog/blog/list', { blogs }); 
        } catch (error) {
            console.error('Error fetching blogs:', error);
            res.status(500).render('error', { error: 'Failed to retrieve blogs!' });
        }
    }

    async addblogView(req,res){
        res.render('blog/blog/add');
    }

    async createBlog(req, res) {
        try {
            const { title, subtitle, content, author } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : undefined; 
    
            const newBlog = new Blog({
                title,
                subtitle,
                content,
                author,
                image: image || 'https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg',
                isActive: true
            });
    
            await newBlog.save();
            res.redirect('/blog/blog');
        } catch (error) {
            console.error('Error creating blog:', error);
            res.status(500).render('error', { error: 'Failed to create blog!' });
        }
    }

    async editBlogView(req, res) {
        try {
            const blogId = req.params.id;
            const blog = await Blog.findById(blogId); 
            
            if (!blog) {
                return res.status(404).render('error', { error: 'blog not found!' });
            }

            res.render('blog/blog/edit', { blog }); 
        } catch (error) {
            console.error('Error fetching blog for edit:', error);
            res.status(500).render('error', { error: 'Failed to load blog for editing!' });
        }
    }

    async editBlog(req, res) {
        try {
            const { title, subtitle, content, author } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : undefined;
            const blogId = req.params.id; 

            const updatedBlogData = {
                title,
                subtitle,
                content,
                author
            };

            if (image) {
                updatedBlogData.image = image;
            }

            const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedBlogData, { new: true });

            if (!updatedBlog) {
                return res.status(404).render('error', { error: 'Blog not found!' });
            }

            res.redirect('/blog/blog'); 
        } catch (error) {
            console.error('Error updating blog:', error);
            res.status(500).render('error', { error: 'Failed to update blog!' });
        }
    }



    async deleteBlog(req, res) {
        try {
            const blogId = req.params.id; 
            
            const deletedBlog = await Blog.findByIdAndDelete(blogId); 
    
            if (!deletedBlog) {
                return res.status(404).render('error', { error: 'Blog not found!' });
            }
    
          
            res.redirect('/blog/blog');
    
        } catch (error) {
            console.error('Error deleting blog:', error);
            res.status(500).render('error', { error: 'Failed to delete blog!' });
        }
    }

    async activateBlog(req, res) {
        try {
            const blogId = req.params.id;
            const blog = await Blog.findById(blogId);
            
            if (!blog) {
                return res.status(404).render('error', { error: 'Blog not found!' });
            }

            // Update the isActive field to true
            blog.isActive = true;
            await blog.save();

            res.redirect('/blog/blog'); // Redirect to banner list after activation
        } catch (error) {
            console.error('Error activating blog:', error);
            res.status(500).render('error', { error: 'Failed to activate blog!' });
        }
    }

    async deactivateBlog(req, res) {
        try {
            const blogId = req.params.id;
            const blog = await Blog.findById(blogId);

            if (!blog) {
                return res.status(404).render('error', { error: 'Blog not found!' });
            }

            // Update the isActive field to false
            blog.isActive = false;
            await blog.save();

            res.redirect('/blog/blog'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating blog:', error);
            res.status(500).render('error', { error: 'Failed to deactivate blog!' });
        }
    }

    async activateReply(req, res) {

        try {
            const replyId = req.params.id;
            const reply = await Reply.findById(replyId);
            
            if (!reply) {
                return res.status(404).render('error', { error: 'Reply not found!' });
            }

            // Update the isActive field to true
            reply.isActive = true;
            await reply.save();

            res.redirect('/blog/reply'); // Redirect to banner list after activation
        } catch (error) {
            console.error('Error activating reply:', error);
            res.status(500).render('error', { error: 'Failed to activate reply!' });
        }
    }

    async deactivateReply(req, res) {
        try {
            const replyId = req.params.id;
            const reply = await Reply.findById(replyId);

            if (!reply) {
                return res.status(404).render('error', { error: 'Reply not found!' });
            }

            // Update the isActive field to false
            reply.isActive = false;
            await reply.save();

            res.redirect('/blog/reply'); // Redirect to banner list after deactivation
        } catch (error) {
            console.error('Error deactivating reply:', error);
            res.status(500).render('error', { error: 'Failed to deactivate reply!' });
        }
    }

    async getReply(req,res){
        try {
            const replies = await Reply.find();
             
            res.render('blog/reply/list', { replies }); 
        } catch (error) {
            console.error('Error fetching replies:', error);
            res.status(500).render('error', { error: 'Failed to retrieve replies!' });
        }
    }



    async deleteReply(req, res) {
        try {
            const replyId = req.params.id; 
            
            const deletedReply = await Reply.findByIdAndDelete(replyId); 
    
            if (!deletedReply) {
                return res.status(404).render('error', { error: 'Reply not found!' });
            }

            res.redirect('/blog/reply');
    
        } catch (error) {
            console.error('Error deleting reply:', error);
            res.status(500).render('error', { error: 'Failed to delete reply!' });
        }
    }

}

module.exports =new  BlogController()